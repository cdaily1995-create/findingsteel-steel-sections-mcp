/**
 * 国标型钢库通用字段定义。
 *
 * 字段口径：
 *  - dimensions：尺寸参数（mm），键名随型材类别变化，见各数据文件头注释；
 *  - A：截面积，cm²；
 *  - Ix / Iy：对截面主轴（x 轴 / y 轴）的惯性矩，cm⁴；
 *  - Wx / Wy：对 x / y 轴的截面模量，cm³；
 *  - ix / iy：对 x / y 轴的回转半径，cm；
 *  - kgPerM：每米理论重量，kg/m（按 ρ=7.85 g/cm³）。
 */
export interface SteelSectionRecord {
  /** 执行标准，如 "GB/T 11263-2017" */
  standard: string;
  /** 类别：HW / HM / HN / 工字钢 / 槽钢 / 等边角钢 / 不等边角钢 / C型钢 / Z型钢 / 方管 / 矩形管 */
  category: string;
  /** 型号，如 "HN400×200×8×13" */
  designation: string;
  /** 尺寸参数（mm） */
  dimensions: Record<string, number>;
  /** 截面积 A，cm² */
  A: number;
  /** 惯性矩，cm⁴ */
  Ix: number;
  /** 惯性矩，cm⁴ */
  Iy: number;
  /** 截面模量，cm³ */
  Wx: number;
  /** 截面模量，cm³ */
  Wy: number;
  /** 回转半径，cm */
  ix: number;
  /** 回转半径，cm */
  iy: number;
  /** 每米理论重量，kg/m */
  kgPerM: number;
}