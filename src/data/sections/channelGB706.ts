import type { SteelSectionRecord } from './types.ts';

/**
 * 热轧槽钢（GB/T 706-2016）常用规格。
 *
 * dimensions 键：h（高度,mm）、b（腿宽,mm）、d（腰厚,mm）、t（平均腿厚,mm）、
 * r（内圆弧半径,mm）、r1（腿端圆弧半径,mm）、z0（重心距离,cm）。
 * 数值来源：GB/T 706-2016 截面特性表（mechtool.cn《热轧槽钢(摘自GB/T 706-2016)》），
 * 并与 GB/T 707-1988 同表交叉核对。
 */
export const channelGB706: SteelSectionRecord[] = [
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[5', dimensions: { h: 50, b: 37, d: 4.5, t: 7, r: 7, r1: 3.5, z0: 1.35 }, A: 6.925, Ix: 26, Iy: 8.3, Wx: 10.4, Wy: 3.55, ix: 1.94, iy: 1.10, kgPerM: 5.44 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[6.3', dimensions: { h: 63, b: 40, d: 4.8, t: 7.5, r: 7.5, r1: 3.8, z0: 1.36 }, A: 8.446, Ix: 50.8, Iy: 11.9, Wx: 16.1, Wy: 4.5, ix: 2.45, iy: 1.19, kgPerM: 6.63 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[8', dimensions: { h: 80, b: 43, d: 5, t: 8, r: 8, r1: 4, z0: 1.43 }, A: 10.24, Ix: 101, Iy: 16.6, Wx: 25.3, Wy: 5.79, ix: 3.15, iy: 1.27, kgPerM: 8.04 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[10', dimensions: { h: 100, b: 48, d: 5.3, t: 8.5, r: 8.5, r1: 4.2, z0: 1.52 }, A: 12.74, Ix: 198, Iy: 25.6, Wx: 39.7, Wy: 7.8, ix: 3.95, iy: 1.41, kgPerM: 10.0 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[12.6', dimensions: { h: 126, b: 53, d: 5.5, t: 9, r: 9, r1: 4.5, z0: 1.59 }, A: 15.69, Ix: 391, Iy: 38, Wx: 62.1, Wy: 10.2, ix: 4.95, iy: 1.57, kgPerM: 12.3 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[14a', dimensions: { h: 140, b: 58, d: 6, t: 9.5, r: 9.5, r1: 4.8, z0: 1.71 }, A: 18.51, Ix: 564, Iy: 53.2, Wx: 80.5, Wy: 13, ix: 5.52, iy: 1.70, kgPerM: 14.5 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[14b', dimensions: { h: 140, b: 60, d: 8, t: 9.5, r: 9.5, r1: 4.8, z0: 1.67 }, A: 21.31, Ix: 609, Iy: 61.1, Wx: 87.1, Wy: 14.1, ix: 5.35, iy: 1.69, kgPerM: 16.7 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[16a', dimensions: { h: 160, b: 63, d: 6.5, t: 10, r: 10, r1: 5, z0: 1.80 }, A: 21.95, Ix: 866, Iy: 73.3, Wx: 108, Wy: 16.3, ix: 6.28, iy: 1.83, kgPerM: 17.2 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[16b', dimensions: { h: 160, b: 65, d: 8.5, t: 10, r: 10, r1: 5, z0: 1.75 }, A: 25.15, Ix: 935, Iy: 83.4, Wx: 117, Wy: 17.6, ix: 6.10, iy: 1.82, kgPerM: 19.8 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[18a', dimensions: { h: 180, b: 68, d: 7, t: 10.5, r: 10.5, r1: 5.2, z0: 1.88 }, A: 25.69, Ix: 1270, Iy: 98.6, Wx: 141, Wy: 20, ix: 7.04, iy: 1.96, kgPerM: 20.2 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[18b', dimensions: { h: 180, b: 70, d: 9, t: 10.5, r: 10.5, r1: 5.2, z0: 1.84 }, A: 29.29, Ix: 1370, Iy: 111, Wx: 152, Wy: 21.5, ix: 6.84, iy: 1.95, kgPerM: 23.0 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[20a', dimensions: { h: 200, b: 73, d: 7, t: 11, r: 11, r1: 5.5, z0: 2.01 }, A: 28.83, Ix: 1780, Iy: 128, Wx: 178, Wy: 24.2, ix: 7.86, iy: 2.11, kgPerM: 22.6 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[20b', dimensions: { h: 200, b: 75, d: 9, t: 11, r: 11, r1: 5.5, z0: 1.95 }, A: 32.83, Ix: 1910, Iy: 144, Wx: 191, Wy: 25.9, ix: 7.64, iy: 2.09, kgPerM: 25.8 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[22a', dimensions: { h: 220, b: 77, d: 7, t: 11.5, r: 11.5, r1: 5.8, z0: 2.10 }, A: 31.83, Ix: 2390, Iy: 158, Wx: 218, Wy: 28.2, ix: 8.67, iy: 2.23, kgPerM: 25.0 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[25a', dimensions: { h: 250, b: 78, d: 7, t: 12, r: 12, r1: 6, z0: 2.07 }, A: 34.91, Ix: 3370, Iy: 176, Wx: 270, Wy: 30.6, ix: 9.82, iy: 2.24, kgPerM: 27.4 },
  { standard: 'GB/T 706-2016', category: '槽钢', designation: '[25b', dimensions: { h: 250, b: 80, d: 9, t: 12, r: 12, r1: 6, z0: 1.98 }, A: 39.91, Ix: 3530, Iy: 196, Wx: 282, Wy: 32.7, ix: 9.41, iy: 2.22, kgPerM: 31.3 },
];