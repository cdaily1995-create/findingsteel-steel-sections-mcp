/**
 * weight_* tools: calculate theoretical weight (kg/m, kg, tonnes) for common
 * steel shapes and standard GB sections.
 *
 * Mirrors the Steel Weight calculator on findingsteel.com/tools.
 * All linear dimensions in mm; density default 7.85 g/cm³ (carbon steel).
 */

import {
  resolveDensity,
  steelPlateWeightPerSqm,
  roundSteelWeightPerM,
  rebarWeightPerM,
  steelPipeWeightPerM,
  squareSteelWeightPerM,
  flatSteelWeightPerM,
  hexSteelWeightPerM,
  octSteelWeightPerM,
  squareTubeWeightPerM,
  rectTubeWeightPerM,
  cProfileWeightPerM,
  zProfileWeightPerM,
  weldedISectionProperties,
  weldedBoxSectionProperties,
  weightFromLength,
  totalWeightKg,
  piecesToTons,
  kgToTon,
  MATERIAL_DENSITIES,
} from '../lib/steelCalc.ts';
import { findSectionByDesignation } from '../data/sections/index.ts';

export interface ShapeWeightInput {
  /** 形状：plate板 / round圆钢 / square方钢 / flat扁钢 / hex六角 / oct八角 / rebar螺纹钢 / pipe圆管 / squareTube方管 / rectTube矩形管 / cProfile C型钢 / zProfile Z型钢 / weldedI焊接工字 / weldedBox焊接箱形 / standard国标型钢库 */
  shape: string;
  /** 尺寸（mm）；不同形状所需键不同，见 shape 说明 */
  dims: Record<string, number>;
  /** 长度（m） */
  lengthM?: number;
  /** 数量 */
  quantity?: number;
  /** 材质键：q235/q355/ss304/ss316/aluminum/copper，或省略用 7.85 */
  material?: string;
  /** 自定义密度 g/cm³（覆盖 material） */
  customDensity?: number;
  /** 国标型钢型号（shape=standard 时必填），如 HN400×200×8×13 */
  designation?: string;
}

export interface ShapeInputDefinition {
  name: string;
  dims: string[];
  note?: string;
}

const SHAPE_INPUTS: Record<string, ShapeInputDefinition> = {
  plate: { name: '钢板', dims: ['t 厚度', 'w 板宽', 'l 板长'], note: '按面积×厚度算重量（kg），lengthM 忽略' },
  round: { name: '圆钢', dims: ['d 直径'], note: 'kg/m' },
  square: { name: '方钢', dims: ['a 边长'], note: 'kg/m' },
  flat: { name: '扁钢', dims: ['b 宽度', 't 厚度'], note: 'kg/m' },
  hex: { name: '六角钢', dims: ['a 对边距'], note: 'kg/m' },
  oct: { name: '八角钢', dims: ['a 对边距'], note: 'kg/m' },
  rebar: { name: '螺纹钢', dims: ['d 公称直径'], note: 'kg/m' },
  pipe: { name: '圆管', dims: ['D 外径', 't 壁厚'], note: 'kg/m' },
  squareTube: { name: '方管', dims: ['a 外边长', 't 壁厚'], note: 'kg/m' },
  rectTube: { name: '矩形管', dims: ['b 外宽', 'h 外高', 't 壁厚'], note: 'kg/m' },
  cProfile: { name: 'C 型钢（冷弯）', dims: ['h 腹板高', 'b 翼缘宽', 'c 卷边高', 't 壁厚'], note: 'kg/m' },
  zProfile: { name: 'Z 型钢（冷弯）', dims: ['h 腹板高', 'b 翼缘宽', 'c 卷边高', 't 壁厚'], note: 'kg/m' },
  weldedI: { name: '焊接工字形', dims: ['hw 总高', 'tw 腹板厚', 'bf 翼缘宽', 'tf 翼缘厚'], note: '由截面特性计算 kg/m' },
  weldedBox: { name: '焊接箱形', dims: ['h 总高', 'b 总宽', 'tw 腹板厚', 'tf 翼缘厚'], note: '由截面特性计算 kg/m' },
  standard: { name: '国标型钢库', dims: ['designation 型号'], note: '按型号 kgPerM × 长度 × 数量' },
};

/** 大小写不敏感的形状键归一化（如 rectTube / recttube / RectTube → rectTube） */
const SHAPE_ALIASES: Record<string, string> = Object.fromEntries(
  Object.keys(SHAPE_INPUTS).map((k) => [k.toLowerCase(), k]),
);

export function normalizeShape(shape: string): string | undefined {
  return SHAPE_ALIASES[shape.trim().toLowerCase()];
}

const dim = (dims: Record<string, number>, key: string): number => {
  const v = dims[key];
  if (v === undefined || v === null || !Number.isFinite(v) || v <= 0) {
    throw new Error(`缺少或无效参数 dims.${key}（要求正数）`);
  }
  return v;
};

export function weightPerMForShape(input: ShapeWeightInput): { kgPerM: number; note: string } {
  const shapeKey = normalizeShape(input.shape ?? '') ?? '';
  const density = resolveDensity(input.material, input.customDensity);
  switch (shapeKey) {
    case 'plate': {
      const t = dim(input.dims, 't');
      const w = dim(input.dims, 'w');
      return { kgPerM: steelPlateWeightPerSqm(t, density) * (w / 1000), note: '按宽度折算 kg/m（板长另算）' };
    }
    case 'round':
      return { kgPerM: roundSteelWeightPerM(dim(input.dims, 'd'), density), note: 'kg/m' };
    case 'square':
      return { kgPerM: squareSteelWeightPerM(dim(input.dims, 'a'), density), note: 'kg/m' };
    case 'flat':
      return { kgPerM: flatSteelWeightPerM(dim(input.dims, 'b'), dim(input.dims, 't'), density), note: 'kg/m' };
    case 'hex':
      return { kgPerM: hexSteelWeightPerM(dim(input.dims, 'a'), density), note: 'kg/m' };
    case 'oct':
      return { kgPerM: octSteelWeightPerM(dim(input.dims, 'a'), density), note: 'kg/m' };
    case 'rebar':
      return { kgPerM: rebarWeightPerM(dim(input.dims, 'd'), density), note: 'kg/m' };
    case 'pipe':
      return { kgPerM: steelPipeWeightPerM(dim(input.dims, 'D'), dim(input.dims, 't'), density), note: 'kg/m' };
    case 'squareTube':
      return { kgPerM: squareTubeWeightPerM(dim(input.dims, 'a'), dim(input.dims, 't'), density), note: 'kg/m' };
    case 'rectTube':
      return { kgPerM: rectTubeWeightPerM(dim(input.dims, 'b'), dim(input.dims, 'h'), dim(input.dims, 't'), density), note: 'kg/m' };
    case 'cProfile':
      return { kgPerM: cProfileWeightPerM(dim(input.dims, 'h'), dim(input.dims, 'b'), dim(input.dims, 'c'), dim(input.dims, 't'), density), note: 'kg/m' };
    case 'zProfile':
      return { kgPerM: zProfileWeightPerM(dim(input.dims, 'h'), dim(input.dims, 'b'), dim(input.dims, 'c'), dim(input.dims, 't'), density), note: 'kg/m' };
    case 'weldedI':
      return { kgPerM: weldedISectionProperties(dim(input.dims, 'hw'), dim(input.dims, 'tw'), dim(input.dims, 'bf'), dim(input.dims, 'tf'), density).kgPerM, note: 'kg/m' };
    case 'weldedBox':
      return { kgPerM: weldedBoxSectionProperties(dim(input.dims, 'h'), dim(input.dims, 'b'), dim(input.dims, 'tw'), dim(input.dims, 'tf'), density).kgPerM, note: 'kg/m' };
    case 'standard': {
      if (!input.designation) throw new Error('shape=standard 时必填 designation（如 HN400×200×8×13）');
      const sec = findSectionByDesignation(input.designation.trim());
      if (!sec) throw new Error('国标库未找到型号 ' + input.designation);
      return { kgPerM: sec.kgPerM, note: 'kg/m（' + sec.standard + ' ' + sec.category + '）' };
    }
    default:
      throw new Error('不支持的 shape: ' + input.shape + '。可选：' + Object.keys(SHAPE_INPUTS).join(' / '));
  }
}

export function weightTool(input: ShapeWeightInput) {
  const rawShape = (input.shape || '').trim();
  const shapeKey = normalizeShape(rawShape) ?? '';
  const def = SHAPE_INPUTS[shapeKey];
  if (!def) {
    return {
      valid: false,
      message: '不支持的 shape: ' + rawShape + '。可选：' + Object.keys(SHAPE_INPUTS).join(' / '),
      shapes: Object.entries(SHAPE_INPUTS).map(([k, v]) => ({ shape: k, name: v.name, dims: v.dims, note: v.note })),
    };
  }
  try {
    const { kgPerM, note } = weightPerMForShape(input);
    const lengthM = input.lengthM && input.lengthM > 0 ? input.lengthM : undefined;
    const quantity = input.quantity && input.quantity > 0 ? input.quantity : 1;
    const kg = lengthM ? totalWeightKg(kgPerM, lengthM, quantity) : kgPerM;
    return {
      valid: true,
      shape: shapeKey,
      name: def.name,
      kgPerM,
      lengthM: lengthM ?? null,
      quantity,
      totalKg: kg,
      totalTons: kgToTon(kg),
      note,
      densityGPerCm3: resolveDensity(input.material, input.customDensity),
      material: input.material ?? 'carbon steel (7.85)',
    };
  } catch (error) {
    return { valid: false, message: error instanceof Error ? error.message : String(error) };
  }
}

export function materialsTool() {
  return {
    materials: Object.entries(MATERIAL_DENSITIES).map(([key, spec]) => ({
      key,
      nameZh: spec.nameZh,
      nameEn: spec.nameEn,
      density: spec.density,
    })),
    default: 'q235/q355 7.85 g/cm³',
  };
}

export { SHAPE_INPUTS };
