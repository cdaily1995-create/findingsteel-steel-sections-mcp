import type { SteelSectionRecord } from './types.ts';

/**
 * 热轧 H 型钢（GB/T 11263-2017），含宽翼缘 HW、中翼缘 HM、窄翼缘 HN 常用规格。
 *
 * dimensions 键：H（总高,mm）、B（翼缘宽,mm）、tw（腹板厚,mm）、tf（翼缘厚,mm）、r（内圆弧半径,mm）。
 * 数值来源：GB/T 11263-2017 截面特性表；并交叉核对 mechtool.cn
 * 《热轧H型钢和部分T型钢(摘自GB/T 11263-2017)》与 qccdata/STR-LAB 同表数据。
 */
export const hBeamGB11263: SteelSectionRecord[] = [
  // ---- HW 宽翼缘 ----
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW100×100×6×8', dimensions: { H: 100, B: 100, tw: 6, tf: 8, r: 8 }, A: 21.58, Ix: 378, Iy: 134, Wx: 75.6, Wy: 26.7, ix: 4.18, iy: 2.48, kgPerM: 16.9 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW125×125×6.5×9', dimensions: { H: 125, B: 125, tw: 6.5, tf: 9, r: 8 }, A: 30.00, Ix: 839, Iy: 293, Wx: 134, Wy: 46.9, ix: 5.28, iy: 3.12, kgPerM: 23.6 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW150×150×7×10', dimensions: { H: 150, B: 150, tw: 7, tf: 10, r: 8 }, A: 39.64, Ix: 1620, Iy: 563, Wx: 216, Wy: 75.1, ix: 6.39, iy: 3.76, kgPerM: 31.1 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW175×175×7.5×11', dimensions: { H: 175, B: 175, tw: 7.5, tf: 11, r: 13 }, A: 51.42, Ix: 2900, Iy: 984, Wx: 331, Wy: 112, ix: 7.50, iy: 4.37, kgPerM: 40.4 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW200×200×8×12', dimensions: { H: 200, B: 200, tw: 8, tf: 12, r: 13 }, A: 63.53, Ix: 4720, Iy: 1600, Wx: 472, Wy: 160, ix: 8.61, iy: 5.02, kgPerM: 49.9 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW250×250×9×14', dimensions: { H: 250, B: 250, tw: 9, tf: 14, r: 13 }, A: 91.43, Ix: 10700, Iy: 3650, Wx: 860, Wy: 292, ix: 10.8, iy: 6.31, kgPerM: 71.8 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW300×300×10×15', dimensions: { H: 300, B: 300, tw: 10, tf: 15, r: 13 }, A: 118.5, Ix: 20200, Iy: 6750, Wx: 1350, Wy: 450, ix: 13.1, iy: 7.55, kgPerM: 93.0 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW350×350×12×19', dimensions: { H: 350, B: 350, tw: 12, tf: 19, r: 13 }, A: 171.9, Ix: 39800, Iy: 13600, Wx: 2280, Wy: 776, ix: 15.2, iy: 8.88, kgPerM: 135 },
  { standard: 'GB/T 11263-2017', category: 'HW', designation: 'HW400×400×13×21', dimensions: { H: 400, B: 400, tw: 13, tf: 21, r: 22 }, A: 218.7, Ix: 66600, Iy: 22400, Wx: 3330, Wy: 1120, ix: 17.5, iy: 10.1, kgPerM: 172 },
  // ---- HM 中翼缘 ----
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM150×100×6×9', dimensions: { H: 148, B: 100, tw: 6, tf: 9, r: 8 }, A: 26.34, Ix: 1000, Iy: 150, Wx: 135, Wy: 30.1, ix: 6.16, iy: 2.38, kgPerM: 20.7 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM200×150×6×9', dimensions: { H: 194, B: 150, tw: 6, tf: 9, r: 8 }, A: 38.10, Ix: 2630, Iy: 507, Wx: 271, Wy: 67.6, ix: 8.30, iy: 3.64, kgPerM: 29.9 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM250×175×7×11', dimensions: { H: 244, B: 175, tw: 7, tf: 11, r: 13 }, A: 55.49, Ix: 6040, Iy: 984, Wx: 495, Wy: 112, ix: 10.4, iy: 4.21, kgPerM: 43.6 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM300×200×8×12', dimensions: { H: 294, B: 200, tw: 8, tf: 12, r: 13 }, A: 71.05, Ix: 11100, Iy: 1600, Wx: 756, Wy: 160, ix: 12.5, iy: 4.74, kgPerM: 55.8 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM350×250×9×14', dimensions: { H: 340, B: 250, tw: 9, tf: 14, r: 13 }, A: 99.53, Ix: 21200, Iy: 3650, Wx: 1250, Wy: 292, ix: 14.6, iy: 6.05, kgPerM: 78.1 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM400×300×10×16', dimensions: { H: 390, B: 300, tw: 10, tf: 16, r: 13 }, A: 133.3, Ix: 37900, Iy: 7200, Wx: 1940, Wy: 480, ix: 16.9, iy: 7.35, kgPerM: 105 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM450×300×11×18', dimensions: { H: 440, B: 300, tw: 11, tf: 18, r: 13 }, A: 153.9, Ix: 54700, Iy: 8110, Wx: 2490, Wy: 540, ix: 18.9, iy: 7.25, kgPerM: 121 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM500×300×11×18', dimensions: { H: 488, B: 300, tw: 11, tf: 18, r: 13 }, A: 159.2, Ix: 68900, Iy: 8110, Wx: 2820, Wy: 540, ix: 20.8, iy: 7.13, kgPerM: 125 },
  { standard: 'GB/T 11263-2017', category: 'HM', designation: 'HM600×300×12×17', dimensions: { H: 582, B: 300, tw: 12, tf: 17, r: 13 }, A: 169.2, Ix: 98900, Iy: 7660, Wx: 3400, Wy: 511, ix: 24.2, iy: 6.72, kgPerM: 133 },
  // ---- HN 窄翼缘 ----
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN100×50×5×7', dimensions: { H: 100, B: 50, tw: 5, tf: 7, r: 8 }, A: 11.84, Ix: 187, Iy: 14.8, Wx: 37.5, Wy: 5.91, ix: 3.97, iy: 1.11, kgPerM: 9.30 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN125×60×6×8', dimensions: { H: 125, B: 60, tw: 6, tf: 8, r: 8 }, A: 16.68, Ix: 409, Iy: 29.1, Wx: 65.4, Wy: 9.71, ix: 4.95, iy: 1.32, kgPerM: 13.1 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN150×75×5×7', dimensions: { H: 150, B: 75, tw: 5, tf: 7, r: 8 }, A: 17.84, Ix: 666, Iy: 49.5, Wx: 88.8, Wy: 13.2, ix: 6.10, iy: 1.66, kgPerM: 14.0 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN175×90×5×8', dimensions: { H: 175, B: 90, tw: 5, tf: 8, r: 8 }, A: 22.89, Ix: 1210, Iy: 97.5, Wx: 138, Wy: 21.7, ix: 7.25, iy: 2.06, kgPerM: 18.0 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN200×100×5.5×8', dimensions: { H: 200, B: 100, tw: 5.5, tf: 8, r: 8 }, A: 26.66, Ix: 1810, Iy: 134, Wx: 181, Wy: 26.7, ix: 8.22, iy: 2.23, kgPerM: 20.9 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN250×125×6×9', dimensions: { H: 250, B: 125, tw: 6, tf: 9, r: 8 }, A: 36.96, Ix: 3960, Iy: 294, Wx: 317, Wy: 47.0, ix: 10.4, iy: 2.81, kgPerM: 29.0 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN300×150×6.5×9', dimensions: { H: 300, B: 150, tw: 6.5, tf: 9, r: 13 }, A: 46.78, Ix: 7210, Iy: 508, Wx: 481, Wy: 67.7, ix: 12.4, iy: 3.29, kgPerM: 36.7 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN350×175×7×11', dimensions: { H: 350, B: 175, tw: 7, tf: 11, r: 13 }, A: 62.91, Ix: 13500, Iy: 984, Wx: 771, Wy: 112, ix: 14.6, iy: 3.95, kgPerM: 49.4 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN400×150×8×13', dimensions: { H: 400, B: 150, tw: 8, tf: 13, r: 13 }, A: 70.37, Ix: 18600, Iy: 734, Wx: 929, Wy: 97.8, ix: 16.3, iy: 3.22, kgPerM: 55.2 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN396×199×7×11', dimensions: { H: 396, B: 199, tw: 7, tf: 11, r: 13 }, A: 71.41, Ix: 19800, Iy: 1450, Wx: 999, Wy: 145, ix: 16.6, iy: 4.50, kgPerM: 56.1 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN400×200×8×13', dimensions: { H: 400, B: 200, tw: 8, tf: 13, r: 13 }, A: 83.37, Ix: 23500, Iy: 1740, Wx: 1170, Wy: 174, ix: 16.8, iy: 4.56, kgPerM: 65.4 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN446×150×7×12', dimensions: { H: 446, B: 150, tw: 7, tf: 12, r: 13 }, A: 66.99, Ix: 22000, Iy: 677, Wx: 985, Wy: 90.3, ix: 18.1, iy: 3.17, kgPerM: 52.6 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN446×199×8×12', dimensions: { H: 446, B: 199, tw: 8, tf: 12, r: 13 }, A: 82.97, Ix: 28100, Iy: 1580, Wx: 1260, Wy: 159, ix: 18.4, iy: 4.36, kgPerM: 65.1 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN492×150×7×12', dimensions: { H: 492, B: 150, tw: 7, tf: 12, r: 13 }, A: 70.21, Ix: 27500, Iy: 677, Wx: 1120, Wy: 90.3, ix: 19.8, iy: 3.10, kgPerM: 55.1 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN500×200×10×16', dimensions: { H: 500, B: 200, tw: 10, tf: 16, r: 13 }, A: 112.3, Ix: 46800, Iy: 2140, Wx: 1870, Wy: 214, ix: 20.4, iy: 4.36, kgPerM: 88.1 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN550×200×10×16', dimensions: { H: 550, B: 200, tw: 10, tf: 16, r: 13 }, A: 117.3, Ix: 58200, Iy: 2140, Wx: 2120, Wy: 214, ix: 22.3, iy: 4.27, kgPerM: 92.0 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN596×199×10×15', dimensions: { H: 596, B: 199, tw: 10, tf: 15, r: 13 }, A: 117.8, Ix: 66600, Iy: 1980, Wx: 2240, Wy: 199, ix: 23.8, iy: 4.09, kgPerM: 92.4 },
  { standard: 'GB/T 11263-2017', category: 'HN', designation: 'HN600×200×11×17', dimensions: { H: 600, B: 200, tw: 11, tf: 17, r: 13 }, A: 131.7, Ix: 75600, Iy: 2270, Wx: 2520, Wy: 227, ix: 24.0, iy: 4.15, kgPerM: 103 },
];