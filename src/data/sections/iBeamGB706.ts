import type { SteelSectionRecord } from './types.ts';

/**
 * 热轧工字钢（GB/T 706-2016）常用规格。
 *
 * dimensions 键：h（高度,mm）、b（腿宽,mm）、d（腰厚,mm）、t（平均腿厚,mm）、
 * r（内圆弧半径,mm）、r1（腿端圆弧半径,mm）。
 * 数值来源：GB/T 706-2016 截面特性表（mechtool.cn《热轧工字钢(摘自GB/T 706-2016)》），
 * 并与 GB/T 706-1988 同表交叉核对。
 */
export const iBeamGB706: SteelSectionRecord[] = [
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I10', dimensions: { h: 100, b: 68, d: 4.5, t: 7.6, r: 6.5, r1: 3.3 }, A: 14.33, Ix: 245, Iy: 33, Wx: 49, Wy: 9.72, ix: 4.14, iy: 1.52, kgPerM: 11.3 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I12.6', dimensions: { h: 126, b: 74, d: 5, t: 8.4, r: 7, r1: 3.5 }, A: 18.10, Ix: 488, Iy: 46.9, Wx: 77.5, Wy: 12.7, ix: 5.2, iy: 1.61, kgPerM: 14.2 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I14', dimensions: { h: 140, b: 80, d: 5.5, t: 9.1, r: 7.5, r1: 3.8 }, A: 21.50, Ix: 712, Iy: 64.4, Wx: 102, Wy: 16.1, ix: 5.76, iy: 1.73, kgPerM: 16.9 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I16', dimensions: { h: 160, b: 88, d: 6, t: 9.9, r: 8, r1: 4 }, A: 26.11, Ix: 1130, Iy: 93.1, Wx: 141, Wy: 21.2, ix: 6.58, iy: 1.89, kgPerM: 20.5 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I18', dimensions: { h: 180, b: 94, d: 6.5, t: 10.7, r: 8.5, r1: 4.3 }, A: 30.74, Ix: 1660, Iy: 122, Wx: 185, Wy: 26, ix: 7.36, iy: 2.0, kgPerM: 24.1 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I20a', dimensions: { h: 200, b: 100, d: 7, t: 11.4, r: 9, r1: 4.5 }, A: 35.55, Ix: 2370, Iy: 158, Wx: 237, Wy: 31.5, ix: 8.15, iy: 2.12, kgPerM: 27.9 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I20b', dimensions: { h: 200, b: 102, d: 9, t: 11.4, r: 9, r1: 4.5 }, A: 39.55, Ix: 2500, Iy: 169, Wx: 250, Wy: 33.1, ix: 7.96, iy: 2.06, kgPerM: 31.1 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I22a', dimensions: { h: 220, b: 110, d: 7.5, t: 12.3, r: 9.5, r1: 4.8 }, A: 42.10, Ix: 3400, Iy: 225, Wx: 309, Wy: 40.9, ix: 8.99, iy: 2.31, kgPerM: 33.1 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I22b', dimensions: { h: 220, b: 112, d: 9.5, t: 12.3, r: 9.5, r1: 4.8 }, A: 46.50, Ix: 3570, Iy: 239, Wx: 325, Wy: 42.7, ix: 8.78, iy: 2.27, kgPerM: 36.5 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I25a', dimensions: { h: 250, b: 116, d: 8, t: 13, r: 10, r1: 5 }, A: 48.51, Ix: 5020, Iy: 280, Wx: 402, Wy: 48.3, ix: 10.2, iy: 2.4, kgPerM: 38.1 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I25b', dimensions: { h: 250, b: 118, d: 10, t: 13, r: 10, r1: 5 }, A: 53.51, Ix: 5280, Iy: 309, Wx: 423, Wy: 52.4, ix: 9.94, iy: 2.4, kgPerM: 42.0 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I28a', dimensions: { h: 280, b: 122, d: 8.5, t: 13.7, r: 10.5, r1: 5.3 }, A: 55.37, Ix: 7110, Iy: 345, Wx: 508, Wy: 56.6, ix: 11.3, iy: 2.5, kgPerM: 43.5 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I28b', dimensions: { h: 280, b: 124, d: 10.5, t: 13.7, r: 10.5, r1: 5.3 }, A: 60.97, Ix: 7480, Iy: 379, Wx: 534, Wy: 61.2, ix: 11.1, iy: 2.49, kgPerM: 47.9 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I32a', dimensions: { h: 320, b: 130, d: 9.5, t: 15, r: 11.5, r1: 5.8 }, A: 67.12, Ix: 11100, Iy: 460, Wx: 692, Wy: 70.8, ix: 12.8, iy: 2.62, kgPerM: 52.7 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I32c', dimensions: { h: 320, b: 134, d: 13.5, t: 15, r: 11.5, r1: 5.8 }, A: 79.92, Ix: 12200, Iy: 544, Wx: 760, Wy: 81.2, ix: 12.3, iy: 2.61, kgPerM: 62.7 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I36a', dimensions: { h: 360, b: 136, d: 10, t: 15.8, r: 12, r1: 6 }, A: 76.44, Ix: 15800, Iy: 552, Wx: 875, Wy: 81.2, ix: 14.4, iy: 2.69, kgPerM: 60.0 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I40a', dimensions: { h: 400, b: 142, d: 10.5, t: 16.5, r: 12.5, r1: 6.3 }, A: 86.07, Ix: 21700, Iy: 660, Wx: 1090, Wy: 93.2, ix: 15.9, iy: 2.77, kgPerM: 67.6 },
  { standard: 'GB/T 706-2016', category: '工字钢', designation: 'I45a', dimensions: { h: 450, b: 150, d: 11.5, t: 18, r: 13.5, r1: 6.8 }, A: 102.4, Ix: 32200, Iy: 855, Wx: 1430, Wy: 114, ix: 17.7, iy: 2.89, kgPerM: 80.4 },
];