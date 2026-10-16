import type { SteelSectionRecord } from './types.ts';

/**
 * 热轧等边与不等边角钢（GB/T 706-2016）常用规格。
 *
 * 等边角钢 dimensions：b（边宽,mm）、d（边厚,mm）、r（内圆弧半径,mm）、z0（重心距离,cm）。
 * 不等边角钢 dimensions：B（长边宽,mm）、b（短边宽,mm）、d（边厚,mm）、r（内圆弧半径,mm）。
 * 说明：对于等边角钢，Ix=Iy、Wx=Wy、ix=iy（对平行于肢的重心轴）；表中主惯性轴（X0/Y0）值未入库。
 * 数值来源：GB/T 706-2016 截面特性表（mechtool.cn《热轧等边角钢/不等边角钢(摘自GB/T 706-2016)》），
 * 并与 GB/T 9787-1988 / GB/T 9788-1988 同表交叉核对。
 */
export const equalAngleGB706: SteelSectionRecord[] = [
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L40×4', dimensions: { b: 40, d: 4, r: 5, z0: 1.13 }, A: 3.086, Ix: 4.60, Iy: 4.60, Wx: 1.60, Wy: 1.60, ix: 1.22, iy: 1.22, kgPerM: 2.42 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L50×4', dimensions: { b: 50, d: 4, r: 5.5, z0: 1.38 }, A: 3.897, Ix: 9.26, Iy: 9.26, Wx: 2.56, Wy: 2.56, ix: 1.54, iy: 1.54, kgPerM: 3.06 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L50×5', dimensions: { b: 50, d: 5, r: 5.5, z0: 1.42 }, A: 4.803, Ix: 11.21, Iy: 11.21, Wx: 3.13, Wy: 3.13, ix: 1.53, iy: 1.53, kgPerM: 3.77 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L63×5', dimensions: { b: 63, d: 5, r: 7, z0: 1.74 }, A: 6.143, Ix: 23.17, Iy: 23.17, Wx: 5.08, Wy: 5.08, ix: 1.94, iy: 1.94, kgPerM: 4.82 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L63×6', dimensions: { b: 63, d: 6, r: 7, z0: 1.78 }, A: 7.288, Ix: 27.12, Iy: 27.12, Wx: 6.00, Wy: 6.00, ix: 1.93, iy: 1.93, kgPerM: 5.72 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L70×6', dimensions: { b: 70, d: 6, r: 8, z0: 1.95 }, A: 8.160, Ix: 37.77, Iy: 37.77, Wx: 7.48, Wy: 7.48, ix: 2.15, iy: 2.15, kgPerM: 6.41 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L70×7', dimensions: { b: 70, d: 7, r: 8, z0: 1.99 }, A: 9.424, Ix: 43.09, Iy: 43.09, Wx: 8.59, Wy: 8.59, ix: 2.14, iy: 2.14, kgPerM: 7.40 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L75×6', dimensions: { b: 75, d: 6, r: 9, z0: 2.07 }, A: 8.797, Ix: 46.95, Iy: 46.95, Wx: 8.64, Wy: 8.64, ix: 2.31, iy: 2.31, kgPerM: 6.91 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L75×8', dimensions: { b: 75, d: 8, r: 9, z0: 2.15 }, A: 11.50, Ix: 59.96, Iy: 59.96, Wx: 11.20, Wy: 11.20, ix: 2.28, iy: 2.28, kgPerM: 9.03 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L80×6', dimensions: { b: 80, d: 6, r: 9, z0: 2.19 }, A: 9.397, Ix: 57.35, Iy: 57.35, Wx: 9.87, Wy: 9.87, ix: 2.47, iy: 2.47, kgPerM: 7.38 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L80×8', dimensions: { b: 80, d: 8, r: 9, z0: 2.27 }, A: 12.30, Ix: 73.49, Iy: 73.49, Wx: 12.83, Wy: 12.83, ix: 2.44, iy: 2.44, kgPerM: 9.66 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L90×6', dimensions: { b: 90, d: 6, r: 10, z0: 2.44 }, A: 10.64, Ix: 82.77, Iy: 82.77, Wx: 12.61, Wy: 12.61, ix: 2.79, iy: 2.79, kgPerM: 8.35 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L90×8', dimensions: { b: 90, d: 8, r: 10, z0: 2.52 }, A: 13.94, Ix: 106.47, Iy: 106.47, Wx: 16.42, Wy: 16.42, ix: 2.76, iy: 2.76, kgPerM: 10.9 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L100×8', dimensions: { b: 100, d: 8, r: 12, z0: 2.76 }, A: 15.64, Ix: 148.24, Iy: 148.24, Wx: 20.47, Wy: 20.47, ix: 3.08, iy: 3.08, kgPerM: 12.3 },
  { standard: 'GB/T 706-2016', category: '等边角钢', designation: 'L100×10', dimensions: { b: 100, d: 10, r: 12, z0: 2.84 }, A: 19.26, Ix: 179.51, Iy: 179.51, Wx: 25.06, Wy: 25.06, ix: 3.05, iy: 3.05, kgPerM: 15.1 },
];

export const unequalAngleGB706: SteelSectionRecord[] = [
  { standard: 'GB/T 706-2016', category: '不等边角钢', designation: 'L63×40×6', dimensions: { B: 63, b: 40, d: 6, r: 7 }, A: 5.908, Ix: 23.36, Iy: 7.29, Wx: 5.59, Wy: 2.43, ix: 1.98, iy: 1.11, kgPerM: 4.64 },
  { standard: 'GB/T 706-2016', category: '不等边角钢', designation: 'L75×50×6', dimensions: { B: 75, b: 50, d: 6, r: 8 }, A: 7.260, Ix: 41.12, Iy: 14.70, Wx: 8.12, Wy: 3.88, ix: 2.38, iy: 1.42, kgPerM: 5.70 },
  { standard: 'GB/T 706-2016', category: '不等边角钢', designation: 'L80×50×6', dimensions: { B: 80, b: 50, d: 6, r: 8 }, A: 7.560, Ix: 49.49, Iy: 14.95, Wx: 9.25, Wy: 3.91, ix: 2.56, iy: 1.41, kgPerM: 5.93 },
  { standard: 'GB/T 706-2016', category: '不等边角钢', designation: 'L100×63×8', dimensions: { B: 100, b: 63, d: 8, r: 10 }, A: 12.58, Ix: 127.37, Iy: 39.39, Wx: 19.08, Wy: 8.21, ix: 3.18, iy: 1.77, kgPerM: 9.88 },
  { standard: 'GB/T 706-2016', category: '不等边角钢', designation: 'L100×80×8', dimensions: { B: 100, b: 80, d: 8, r: 10 }, A: 13.94, Ix: 137.92, Iy: 78.58, Wx: 19.81, Wy: 13.21, ix: 3.14, iy: 2.37, kgPerM: 10.9 },
];

/** 热轧角钢合集（等边 + 不等边） */
export const angleGB706: SteelSectionRecord[] = [...equalAngleGB706, ...unequalAngleGB706];