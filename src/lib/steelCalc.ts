/**
 * 钢结构理论重量与截面特性计算库（纯函数，无 I/O、无运行时依赖）。
 *
 * 单位口径（本文件内所有函数默认公制，函数 JSDoc 另有注明时以注明为准）：
 *  - 线性尺寸 / 壁厚：mm
 *  - 密度：g/cm³（默认 7.85 = 碳钢）
 *  - 线密度：kg/m；面密度：kg/m²
 *  - 截面特性：A(cm²)、Ix/Iy(cm⁴)、Wx/Wy(cm³)、ix/iy(cm)
 *  - 重量：kg；吨：t；长度：m（重量↔长度互算口径）
 *
 * 每个理论重量公式均以 ρ(g/cm³) 写精确式，并在注释中给出国标常用系数与来源。
 */

/** 线密度/截面特性等截面计算结果（仅截面特性函数返回） */
export interface SectionProperties {
  /** 截面积 A，cm² */
  A: number;
  /** 对强轴（水平 x 轴）惯性矩，cm⁴ */
  Ix: number;
  /** 对弱轴（竖直 y 轴）惯性矩，cm⁴ */
  Iy: number;
  /** 对 x 轴截面模量，cm³ */
  Wx: number;
  /** 对 y 轴截面模量，cm³ */
  Wy: number;
  /** 对 x 轴回转半径，cm */
  ix: number;
  /** 对 y 轴回转半径，cm */
  iy: number;
  /** 每米理论重量，kg/m */
  kgPerM: number;
}

/** 材质密度条目 */
export interface MaterialDensitySpec {
  /** 程序内使用的材质标识，如 "q235" */
  key: string;
  /** 中文名 */
  nameZh: string;
  /** 英文名 */
  nameEn: string;
  /** 密度，g/cm³（20 °C 工程常用常数） */
  density: number;
}

/** 默认密度：碳钢（Q235/Q355），g/cm³ */
export const DEFAULT_STEEL_DENSITY = 7.85;

/**
 * 常用材质密度表（g/cm³）。
 *
 * 来源：
 *  - Q235/Q355 碳钢 7.85：GB/T 709 钢材尺寸系列与《五金手册》常用常数；
 *  - 不锈钢 304=7.93、316=7.98：GB/T 20878 对应钢种密度；
 *  - 铝 2.71、铜 8.96：通用工程常数。
 */
export const MATERIAL_DENSITIES: Record<string, MaterialDensitySpec> = {
  q235: { key: 'q235', nameZh: '碳钢 Q235', nameEn: 'Carbon steel Q235', density: 7.85 },
  q355: { key: 'q355', nameZh: '碳钢 Q355', nameEn: 'Carbon steel Q355', density: 7.85 },
  ss304: { key: 'ss304', nameZh: '不锈钢 304', nameEn: 'Stainless steel 304', density: 7.93 },
  ss316: { key: 'ss316', nameZh: '不锈钢 316', nameEn: 'Stainless steel 316', density: 7.98 },
  aluminum: { key: 'aluminum', nameZh: '铝', nameEn: 'Aluminum', density: 2.71 },
  copper: { key: 'copper', nameZh: '铜', nameEn: 'Copper', density: 8.96 },
};

/**
 * 解析计算用密度（g/cm³）。优先采用自定义密度，其次材质表中的密度，最后回退到碳钢 7.85。
 */
export function resolveDensity(materialKey?: string, customDensity?: number): number {
  if (
    customDensity !== undefined &&
    customDensity !== null &&
    Number.isFinite(customDensity) &&
    customDensity > 0
  ) {
    return customDensity;
  }
  const material = materialKey ? MATERIAL_DENSITIES[materialKey] : undefined;
  return material ? material.density : DEFAULT_STEEL_DENSITY;
}

/** 截面积（mm²）换算为每米重量（kg/m）：kg/m = ρ(g/cm³) × A(mm²) / 1000 */
export function areaMm2ToKgPerM(areaMm2: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * areaMm2) / 1000;
}

/**
 * 钢板每平方米理论重量（kg/m²）。
 * 公式：kg/m² = ρ × t(mm)。ρ=7.85 时即 7.85t。
 * 来源：《五金手册》钢板理论重量公式；GB/T 709 钢材密度取 7.85 g/cm³。
 */
export function steelPlateWeightPerSqm(t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return density * t;
}

/**
 * 圆钢每米理论重量（kg/m）。d 为直径（mm）。
 * 国标常用系数：W = 0.00617 d²（ρ≈7.85 的近似式）。
 * 本函数用精确式：W = ρ·(π/4)·d² / 1000；ρ=7.85 时 φ20 = 2.466 kg/m，与标准表一致。
 * 来源：GB/T 702-2017 热轧钢棒（圆钢）理论重量；0.00617 d² 为工程常用近似。
 */
export function roundSteelWeightPerM(d: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * Math.PI * d * d) / 4000;
}

/**
 * 螺纹钢筋每米理论重量（kg/m）。d 为公称直径（mm）。
 * 公式同圆钢：W = ρ·(π/4)·d² / 1000；ρ=7.85 时常用 0.00617 d²。
 * 来源：GB/T 1499.2-2018 钢筋混凝土用钢 第 2 部分：热轧带肋钢筋（公称横截面面积 × 7.85）。
 */
export function rebarWeightPerM(d: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * Math.PI * d * d) / 4000;
}

/**
 * 圆钢管每米理论重量（kg/m）。D 为外径、t 为壁厚（mm）。
 * 国标常用系数：W = 0.02466 t (D − t)（ρ≈7.85）。
 * 本函数用精确式：W = ρ·π·t·(D − t) / 1000。
 * 来源：无缝/焊接钢管理论重量公式（GB/T 17395 尺寸系列；《五金手册》）。
 */
export function steelPipeWeightPerM(D: number, t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * Math.PI * t * (D - t)) / 1000;
}

/**
 * 方钢每米理论重量（kg/m）。a 为边长（mm）。
 * 国标常用系数：W = 0.00785 a²（ρ≈7.85）。
 * 本函数用精确式：W = ρ·a² / 1000。
 * 来源：GB/T 702-2017 热轧钢棒（方钢）理论重量。
 */
export function squareSteelWeightPerM(a: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * a * a) / 1000;
}

/**
 * 扁钢每米理论重量（kg/m）。b 为宽度、t 为厚度（mm）。
 * 国标常用系数：W = 0.00785 b t（ρ≈7.85）。
 * 本函数用精确式：W = ρ·b·t / 1000。
 * 来源：GB/T 702-2017 热轧钢棒（扁钢）/ 热轧扁钢理论重量。
 */
export function flatSteelWeightPerM(b: number, t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * b * t) / 1000;
}

/**
 * 六角钢每米理论重量（kg/m）。s 为对边距离（mm）。
 * 国标常用系数：W = 0.0068 s²（ρ≈7.85）。
 * 本函数用精确式：W = ρ·(√3/2)·s² / 1000（正六边形面积 = (√3/2)s²）。
 * 来源：GB/T 702-2017 热轧钢棒（六角钢）理论重量。
 */
export function hexSteelWeightPerM(s: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * (Math.sqrt(3) / 2) * s * s) / 1000;
}

/**
 * 八角钢每米理论重量（kg/m）。s 为对边距离（mm）。
 * 国标常用系数：W = 0.0065 s²（ρ≈7.85）。
 * 本函数用精确式：W = ρ·2(√2 − 1)·s² / 1000（正八边形面积 = 2(√2 − 1)s²）。
 * 来源：GB/T 702-2017 热轧钢棒（八角钢）理论重量。
 */
export function octSteelWeightPerM(s: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * 2 * (Math.sqrt(2) - 1) * s * s) / 1000;
}

/**
 * 方管每米理论重量（kg/m）。a 为外边长、t 为壁厚（mm）。
 * 国标常用系数：W = 0.0157 t (2a − 2t) = 0.0314 t (a − t)（ρ≈7.85）。
 * 本函数用精确式：W = ρ·[a² − (a − 2t)²] / 1000 = ρ·4t(a − t) / 1000。
 * 来源：GB/T 6728 冷弯空心型钢 / 方矩管理论重量（按公称截面面积计算）。
 */
export function squareTubeWeightPerM(a: number, t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * 4 * t * (a - t)) / 1000;
}

/**
 * 矩形管每米理论重量（kg/m）。b 为外宽、h 为外高、t 为壁厚（mm）。
 * 国标常用系数：W = 0.0157 t (b + h − 2t)（ρ≈7.85）。
 * 本函数用精确式：W = ρ·2t(b + h − 2t) / 1000。
 * 来源：GB/T 6728 冷弯空心型钢 / 方矩管理论重量（按公称截面面积计算）。
 */
export function rectTubeWeightPerM(b: number, h: number, t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * 2 * t * (b + h - 2 * t)) / 1000;
}

/**
 * C 型钢（冷弯卷边槽钢）每米理论重量（kg/m）。h 腹板高、b 翼缘宽、c 卷边高、t 壁厚（mm）。
 * 公式（展开中线面积法，近似不计冷弯圆角）：W = ρ·t·(h + 2b + 2c − 4t) / 1000。
 * ρ=7.85 时：W = 0.00785 t (h + 2b + 2c − 4t)。
 * 来源：GB/T 6723-2017《通用冷弯开口型钢》理论重量按公称截面面积计算；车库/檩条常用钢板展开宽算法。
 * 注：标准表因计入冷弯圆角而与上述近似略有差异，本文件仅用于快速估算，精确值以 src/data/tools 标准库为准。
 */
export function cProfileWeightPerM(h: number, b: number, c: number, t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * t * (h + 2 * b + 2 * c - 4 * t)) / 1000;
}

/**
 * Z 型钢（冷弯卷边 Z 型钢）每米理论重量（kg/m）。h 腹板高、b 翼缘宽、c 卷边高、t 壁厚（mm）。
 * 公式同 C 型钢（中性线展开长度相等）：W = ρ·t·(h + 2b + 2c − 4t) / 1000。
 * 来源：GB/T 6723-2017《通用冷弯开口型钢》/ Z 型檩条行业常用算法。
 */
export function zProfileWeightPerM(h: number, b: number, c: number, t: number, density: number = DEFAULT_STEEL_DENSITY): number {
  return (density * t * (h + 2 * b + 2 * c - 4 * t)) / 1000;
}

/* ---------------------------------------------------------------------------
 * 公制 / 英制换算
 * ------------------------------------------------------------------------- */

/** 1 英寸 = 25.4 mm */
export const MM_PER_INCH = 25.4;
/** 1 kg = 2.2046226218 lb */
export const LB_PER_KG = 2.2046226218;
/** 1 m = 3.2808398950 ft */
export const FT_PER_M = 3.280839895;
/** 1 m² = 10.7639104167 ft² */
export const SQFT_PER_SQM = 10.7639104167;

export function mmToInch(mm: number): number {
  return mm / MM_PER_INCH;
}

export function inchToMm(inch: number): number {
  return inch * MM_PER_INCH;
}

export function kgToLb(kg: number): number {
  return kg * LB_PER_KG;
}

export function lbToKg(lb: number): number {
  return lb / LB_PER_KG;
}

export function mToFt(m: number): number {
  return m * FT_PER_M;
}

export function ftToM(ft: number): number {
  return ft / FT_PER_M;
}

/** kg/m → lb/ft */
export function kgPerMToLbPerFt(kgPerM: number): number {
  return kgPerM * (LB_PER_KG / FT_PER_M);
}

/** lb/ft → kg/m */
export function lbPerFtToKgPerM(lbPerFt: number): number {
  return lbPerFt / (LB_PER_KG / FT_PER_M);
}

/** kg/m² → lb/ft² */
export function kgPerSqmToLbPerSqft(kgPerSqm: number): number {
  return kgPerSqm * (LB_PER_KG / SQFT_PER_SQM);
}

/** lb/ft² → kg/m² */
export function lbPerSqftToKgPerSqm(lbPerSqft: number): number {
  return lbPerSqft / (LB_PER_KG / SQFT_PER_SQM);
}

/** kg → 吨 */
export function kgToTon(kg: number): number {
  return kg / 1000;
}

/** 吨 → kg */
export function tonToKg(ton: number): number {
  return ton * 1000;
}

/* ---------------------------------------------------------------------------
 * 重量 ↔ 长度 / 支数 / 吨数 / 总价
 * ------------------------------------------------------------------------- */

/**
 * 按线密度和长度计算单件重量（kg）。
 * weightPerM：kg/m；lengthM：m。
 */
export function weightFromLength(weightPerM: number, lengthM: number): number {
  return weightPerM * lengthM;
}

/**
 * 按总重和线密度反算长度（m）。
 * weightPerM ≤ 0 时返回 NaN。
 */
export function lengthFromWeight(totalWeightKg: number, weightPerM: number): number {
  if (!(weightPerM > 0)) return Number.NaN;
  return totalWeightKg / weightPerM;
}

/**
 * 一批总重（kg）= 单重(kg/m) × 长度(m/支) × 数量(支)。
 */
export function totalWeightKg(weightPerM: number, lengthM: number, quantity: number): number {
  return weightPerM * lengthM * quantity;
}

/**
 * 按总重反算支数：quantity = 总重 / (单重 × 单支长度)。
 * 单支重量 ≤ 0 时返回 NaN。
 */
export function piecesFromWeight(totalWeightKg: number, weightPerM: number, lengthM: number): number {
  const perPiece = weightPerM * lengthM;
  if (!(perPiece > 0)) return Number.NaN;
  return totalWeightKg / perPiece;
}

/**
 * 一批总吨位（t）= 单重(kg/m) × 长度(m/支) × 数量(支) / 1000。
 */
export function piecesToTons(weightPerM: number, lengthM: number, quantity: number): number {
  return totalWeightKg(weightPerM, lengthM, quantity) / 1000;
}

/**
 * 总价 = 单重(kg/m) × 长度(m/支) × 数量(支) × 单价(元 或 其它货币 / kg)。
 * 返回与 pricePerKg 相同币种的总价。
 */
export function totalPrice(weightPerM: number, lengthM: number, quantity: number, pricePerKg: number): number {
  return totalWeightKg(weightPerM, lengthM, quantity) * pricePerKg;
}

/* ---------------------------------------------------------------------------
 * 焊接组合截面几何特性（平行移轴定理）
 * ------------------------------------------------------------------------- */

function mm4ToCm4(v: number): number {
  return v / 1e4;
}

function toSectionProperties(
  areaMm2: number,
  ixMm4: number,
  iyMm4: number,
  xMaxMm: number,
  yMaxMm: number,
  density: number,
): SectionProperties {
  const A = areaMm2 / 100; // cm²
  const Ix = mm4ToCm4(ixMm4); // cm⁴
  const Iy = mm4ToCm4(iyMm4); // cm⁴
  const Wx = Ix / (yMaxMm / 10); // cm³：cm⁴ ÷ cm
  const Wy = Iy / (xMaxMm / 10); // cm³
  const ix = Math.sqrt(Ix / A); // cm
  const iy = Math.sqrt(Iy / A); // cm
  const kgPerM = areaMm2ToKgPerM(areaMm2, density);
  return { A, Ix, Iy, Wx, Wy, ix, iy, kgPerM };
}

/**
 * 焊接工字形（双轴对称 H 形）组合截面几何特性。
 *
 * 截面构成（H 为总高、B 为翼缘宽）：
 *   翼缘：2 块 B × tf（上下各一）
 *   腹板：1 块 tw × (H − 2tf)
 *
 * 采用平行移轴定理：I = Σ(I₀ + A·d²)，I₀ = b·h³/12（矩形对自身形心轴）。
 * 输出约定：A(cm²)、Ix/Iy(cm⁴)、Wx = Ix/(H/2)(cm³)、Wy = Iy/(B/2)(cm³)、
 *           ix/iy(cm)、kg/m（ρ(g/cm³) × A(mm²) / 1000）。
 * 来源：材料力学截面几何性质 + GB/T 17395 单位换算（mm⁴/1e4 = cm⁴）。
 */
export function weldedISectionProperties(
  hw: number,
  tw: number,
  bf: number,
  tf: number,
  density: number = DEFAULT_STEEL_DENSITY,
): SectionProperties {
  const H = hw; // 总高 mm
  const B = bf; // 翼缘宽 mm
  if (H <= 2 * tf) throw new RangeError('工字截面总高必须大于 2 倍翼缘厚度（H > 2tf）');
  if (tw <= 0 || tf <= 0 || B <= 0) throw new RangeError('工字截面尺寸必须为正数');

  const webHeight = H - 2 * tf;
  const areaMm2 = B * tf * 2 + tw * webHeight;

  // 对强轴 x-x（工字截面绕水平轴弯曲）
  const webIx = (tw * webHeight ** 3) / 12;
  const flangeIx = 2 * ((B * tf ** 3) / 12 + B * tf * ((H - tf) / 2) ** 2);
  const ixMm4 = webIx + flangeIx;

  // 对弱轴 y-y
  const webIy = (webHeight * tw ** 3) / 12;
  const flangeIy = 2 * ((tf * B ** 3) / 12);
  const iyMm4 = webIy + flangeIy;

  return toSectionProperties(areaMm2, ixMm4, iyMm4, B / 2, H / 2, density);
}

/**
 * 焊接箱形组合截面几何特性。
 *
 * 截面构成（H 为总高、B 为总宽）：
 *   翼缘（水平板）：2 块 B × tf（上下各一）
 *   腹板（竖直板）：2 块 tw × (H − 2tf)（左右各一）
 *
 * 采用平行移轴定理：I = Σ(I₀ + A·d²)。
 * 输出约定与 weldedISectionProperties 相同。
 * 来源：材料力学截面几何性质（矩形截面 I₀ = b·h³/12）。
 */
export function weldedBoxSectionProperties(
  h: number,
  b: number,
  tw: number,
  tf: number,
  density: number = DEFAULT_STEEL_DENSITY,
): SectionProperties {
  const H = h; // 总高 mm
  const B = b; // 总宽 mm
  if (H <= 2 * tf) throw new RangeError('箱形截面总高必须大于 2 倍翼缘厚度（H > 2tf）');
  if (B <= 2 * tw) throw new RangeError('箱形截面总宽必须大于 2 倍腹板厚度（B > 2tw）');
  if (tw <= 0 || tf <= 0) throw new RangeError('箱形截面板厚必须为正数');

  const webHeight = H - 2 * tf;
  const webWidthInside = B - 2 * tw;
  const areaMm2 = B * H - webWidthInside * webHeight;

  // 对强轴 x-x（绕水平轴）
  const flangeIx = 2 * ((B * tf ** 3) / 12 + B * tf * ((H - tf) / 2) ** 2);
  const webIx = 2 * ((tw * webHeight ** 3) / 12);
  const ixMm4 = flangeIx + webIx;

  // 对弱轴 y-y（绕竖直轴）
  const webIy = 2 * ((webHeight * tw ** 3) / 12 + webHeight * tw * ((B - tw) / 2) ** 2);
  const flangeIy = 2 * ((tf * B ** 3) / 12);
  const iyMm4 = webIy + flangeIy;

  return toSectionProperties(areaMm2, ixMm4, iyMm4, B / 2, H / 2, density);
}