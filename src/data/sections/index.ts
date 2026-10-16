import type { SteelSectionRecord } from './types.ts';
import { hBeamGB11263 } from './hBeamGB11263.ts';
import { iBeamGB706 } from './iBeamGB706.ts';
import { channelGB706 } from './channelGB706.ts';
import { equalAngleGB706, unequalAngleGB706, angleGB706 } from './angleGB706.ts';
import { cProfileGB6723, zProfileGB6723, coldFormedOpenGB6723 } from './coldFormedGB6723.ts';
import { squareTubeGB6728, rectTubeGB6728, coldFormedHollowGB6728 } from './coldFormedHollowGB6728.ts';

export type { SteelSectionRecord } from './types.ts';

export {
  hBeamGB11263,
  iBeamGB706,
  channelGB706,
  equalAngleGB706,
  unequalAngleGB706,
  angleGB706,
  cProfileGB6723,
  zProfileGB6723,
  coldFormedOpenGB6723,
  squareTubeGB6728,
  rectTubeGB6728,
  coldFormedHollowGB6728,
};

/** 全部国标型钢规格（扁平化列表） */
export const steelSections: SteelSectionRecord[] = [
  ...hBeamGB11263,
  ...iBeamGB706,
  ...channelGB706,
  ...equalAngleGB706,
  ...unequalAngleGB706,
  ...cProfileGB6723,
  ...zProfileGB6723,
  ...squareTubeGB6728,
  ...rectTubeGB6728,
];

/** 已入库规格总数 */
export const steelSectionCount: number = steelSections.length;

/** 全部类别（含中文与英文标签） */
export const SECTION_CATEGORIES: { key: string; zh: string; en: string }[] = [
  { key: 'HW', zh: '宽翼缘 H 型钢', en: 'Wide-flange H-beam' },
  { key: 'HM', zh: '中翼缘 H 型钢', en: 'Medium-flange H-beam' },
  { key: 'HN', zh: '窄翼缘 H 型钢', en: 'Narrow-flange H-beam' },
  { key: '工字钢', zh: '工字钢', en: 'I-beam' },
  { key: '槽钢', zh: '槽钢', en: 'Channel' },
  { key: '等边角钢', zh: '等边角钢', en: 'Equal angle' },
  { key: '不等边角钢', zh: '不等边角钢', en: 'Unequal angle' },
  { key: 'C型钢', zh: 'C 型钢', en: 'C purlin (cold-formed)' },
  { key: 'Z型钢', zh: 'Z 型钢', en: 'Z purlin (cold-formed)' },
  { key: '方管', zh: '方管', en: 'Square hollow section' },
  { key: '矩形管', zh: '矩形管', en: 'Rectangular hollow section' },
];

/** 按精确型号查找 */
export function findSectionByDesignation(designation: string): SteelSectionRecord | undefined {
  return steelSections.find((item) => item.designation === designation);
}

/** 按类别过滤（如 'HN'、'槽钢'、'C型钢'），不传返回全部 */
export function findSectionsByCategory(category?: string): SteelSectionRecord[] {
  if (!category) return steelSections;
  return steelSections.filter((item) => item.category === category);
}

/** 按关键词模糊搜索型号或类别（大小写不敏感） */
export function searchSections(query: string): SteelSectionRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return steelSections;
  return steelSections.filter(
    (item) =>
      item.designation.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.standard.toLowerCase().includes(q),
  );
}

/** 型号显示名补充规格单位说明（供工具描述复用） */
export const DESIGNATION_EXAMPLE = 'HN400×200×8×13';
