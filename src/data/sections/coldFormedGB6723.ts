import type { SteelSectionRecord } from './types.ts';

/**
 * 冷弯内卷边槽钢（C 型钢）与冷弯卷边 Z 型钢（GB/T 6723-2017）常用规格。
 *
 * 尺寸键：H（腹板高,mm）、B（翼缘宽,mm）、C（卷边高,mm）、t（壁厚,mm）、X0（重心距离,cm）。
 * 说明：C 型钢 Wy 取表列 Wymax；Z 型钢 ix/iy 由标准表列 Ix/Iy/A 按 ix=√(Ix/A) 计算。
 * 数值来源：GB/T 6723-2017《通用冷弯开口型钢》截面特性表
 * （mechtool.cn《通用冷弯开口型钢(摘自GB/T 6723)》）。
 * TODO(6728-2025)：任务书提到的 GB/T 6728-2025 首要是方矩管（空心型钢）；C/Z 属 GB/T 6723，
 *  若 2025 版对 C/Z 有修订，需按新版标准原文再核一遍。
 */
export const cProfileGB6723: SteelSectionRecord[] = [
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C100×50×15×2.5', dimensions: { H: 100, B: 50, C: 15, t: 2.5, X0: 1.706 }, A: 5.23, Ix: 81.34, Iy: 17.19, Wx: 16.27, Wy: 10.08, ix: 3.94, iy: 1.81, kgPerM: 4.11 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C100×50×20×2.5', dimensions: { H: 100, B: 50, C: 20, t: 2.5, X0: 1.853 }, A: 5.510, Ix: 84.932, Iy: 19.889, Wx: 16.986, Wy: 10.730, ix: 3.925, iy: 1.899, kgPerM: 4.325 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C100×50×20×3.0', dimensions: { H: 100, B: 50, C: 20, t: 3.0, X0: 1.848 }, A: 6.495, Ix: 98.560, Iy: 22.802, Wx: 19.712, Wy: 12.333, ix: 3.895, iy: 1.873, kgPerM: 5.098 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C120×50×20×2.5', dimensions: { H: 120, B: 50, C: 20, t: 2.5, X0: 1.706 }, A: 5.98, Ix: 129.40, Iy: 20.96, Wx: 21.57, Wy: 12.28, ix: 4.56, iy: 1.87, kgPerM: 4.70 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C120×60×20×3.0', dimensions: { H: 120, B: 60, C: 20, t: 3.0, X0: 2.106 }, A: 7.65, Ix: 170.68, Iy: 37.36, Wx: 28.45, Wy: 17.74, ix: 4.72, iy: 2.21, kgPerM: 6.01 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C140×50×20×2.0', dimensions: { H: 140, B: 50, C: 20, t: 2.0, X0: 1.590 }, A: 5.27, Ix: 154.03, Iy: 18.56, Wx: 22.00, Wy: 11.68, ix: 5.41, iy: 1.88, kgPerM: 4.14 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C140×50×20×2.5', dimensions: { H: 140, B: 50, C: 20, t: 2.5, X0: 1.580 }, A: 6.48, Ix: 186.78, Iy: 22.11, Wx: 26.68, Wy: 13.96, ix: 5.39, iy: 1.85, kgPerM: 5.09 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C140×60×20×2.5', dimensions: { H: 140, B: 60, C: 20, t: 2.5, X0: 1.974 }, A: 7.010, Ix: 212.137, Iy: 34.786, Wx: 30.305, Wy: 17.615, ix: 5.500, iy: 2.227, kgPerM: 5.503 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C140×60×20×3.0', dimensions: { H: 140, B: 60, C: 20, t: 3.0, X0: 1.969 }, A: 8.295, Ix: 248.006, Iy: 40.132, Wx: 35.429, Wy: 20.379, ix: 5.467, iy: 2.199, kgPerM: 6.511 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C160×60×20×2.0', dimensions: { H: 160, B: 60, C: 20, t: 2.0, X0: 1.850 }, A: 6.07, Ix: 236.59, Iy: 29.99, Wx: 29.57, Wy: 16.19, ix: 6.24, iy: 2.22, kgPerM: 4.76 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C160×60×20×2.5', dimensions: { H: 160, B: 60, C: 20, t: 2.5, X0: 1.850 }, A: 7.48, Ix: 288.13, Iy: 35.90, Wx: 36.02, Wy: 19.47, ix: 6.21, iy: 2.19, kgPerM: 5.87 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C160×70×20×3.0', dimensions: { H: 160, B: 70, C: 20, t: 3.0, X0: 2.224 }, A: 9.45, Ix: 373.64, Iy: 60.42, Wx: 46.71, Wy: 27.17, ix: 6.29, iy: 2.53, kgPerM: 7.42 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C180×70×20×2.5', dimensions: { H: 180, B: 70, C: 20, t: 2.5, X0: 2.110 }, A: 8.48, Ix: 420.20, Iy: 54.42, Wx: 46.69, Wy: 25.82, ix: 7.04, iy: 2.53, kgPerM: 6.66 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C180×70×20×3.0', dimensions: { H: 180, B: 70, C: 20, t: 3.0, X0: 2.106 }, A: 10.095, Ix: 496.693, Iy: 63.712, Wx: 55.188, Wy: 30.248, ix: 7.014, iy: 2.512, kgPerM: 7.924 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C200×70×20×2.5', dimensions: { H: 200, B: 70, C: 20, t: 2.5, X0: 2.000 }, A: 8.98, Ix: 538.21, Iy: 56.27, Wx: 53.82, Wy: 28.18, ix: 7.74, iy: 2.50, kgPerM: 7.05 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C200×70×20×3.0', dimensions: { H: 200, B: 70, C: 20, t: 3.0, X0: 1.996 }, A: 10.695, Ix: 636.643, Iy: 65.883, Wx: 63.664, Wy: 32.999, ix: 7.715, iy: 2.481, kgPerM: 8.395 },
  { standard: 'GB/T 6723-2017', category: 'C型钢', designation: 'C220×75×20×2.5', dimensions: { H: 220, B: 75, C: 20, t: 2.5, X0: 2.070 }, A: 9.73, Ix: 703.76, Iy: 68.66, Wx: 63.98, Wy: 33.11, ix: 8.50, iy: 2.66, kgPerM: 7.64 },
];

export const zProfileGB6723: SteelSectionRecord[] = [
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z100×40×20×2.0', dimensions: { H: 100, B: 40, C: 20, t: 2.0 }, A: 4.086, Ix: 60.618, Iy: 17.202, Wx: 12.123, Wy: 4.410, ix: 3.85, iy: 2.05, kgPerM: 3.208 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z100×40×20×2.5', dimensions: { H: 100, B: 40, C: 20, t: 2.5 }, A: 5.010, Ix: 73.047, Iy: 20.324, Wx: 14.609, Wy: 5.245, ix: 3.82, iy: 2.01, kgPerM: 3.933 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z120×50×20×2.0', dimensions: { H: 120, B: 50, C: 20, t: 2.0 }, A: 4.87, Ix: 106.97, Iy: 30.23, Wx: 17.83, Wy: 6.17, ix: 4.69, iy: 2.49, kgPerM: 3.82 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z120×50×20×2.5', dimensions: { H: 120, B: 50, C: 20, t: 2.5 }, A: 5.98, Ix: 129.39, Iy: 35.91, Wx: 21.57, Wy: 7.37, ix: 4.65, iy: 2.45, kgPerM: 4.70 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z120×50×20×3.0', dimensions: { H: 120, B: 50, C: 20, t: 3.0 }, A: 7.05, Ix: 150.14, Iy: 40.88, Wx: 25.02, Wy: 8.43, ix: 4.61, iy: 2.41, kgPerM: 5.54 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z140×50×20×2.5', dimensions: { H: 140, B: 50, C: 20, t: 2.5 }, A: 6.510, Ix: 188.502, Iy: 36.358, Wx: 26.928, Wy: 7.458, ix: 5.38, iy: 2.36, kgPerM: 5.110 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z140×50×20×3.0', dimensions: { H: 140, B: 50, C: 20, t: 3.0 }, A: 7.695, Ix: 219.848, Iy: 41.554, Wx: 31.406, Wy: 8.567, ix: 5.35, iy: 2.32, kgPerM: 6.040 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z160×60×20×2.5', dimensions: { H: 160, B: 60, C: 20, t: 2.5 }, A: 7.48, Ix: 288.12, Iy: 58.15, Wx: 36.01, Wy: 9.90, ix: 6.21, iy: 2.79, kgPerM: 5.87 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z160×60×20×3.0', dimensions: { H: 160, B: 60, C: 20, t: 3.0 }, A: 8.85, Ix: 336.66, Iy: 66.66, Wx: 42.08, Wy: 11.39, ix: 6.17, iy: 2.74, kgPerM: 6.95 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z160×70×20×2.5', dimensions: { H: 160, B: 70, C: 20, t: 2.5 }, A: 7.98, Ix: 319.13, Iy: 87.74, Wx: 39.89, Wy: 12.76, ix: 6.32, iy: 3.32, kgPerM: 6.27 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z160×70×20×3.0', dimensions: { H: 160, B: 70, C: 20, t: 3.0 }, A: 9.45, Ix: 373.64, Iy: 101.10, Wx: 46.71, Wy: 14.76, ix: 6.29, iy: 3.27, kgPerM: 7.42 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z180×70×20×2.5', dimensions: { H: 180, B: 70, C: 20, t: 2.5 }, A: 8.510, Ix: 422.926, Iy: 88.578, Wx: 46.991, Wy: 12.884, ix: 7.05, iy: 3.23, kgPerM: 6.680 },
  { standard: 'GB/T 6723-2017', category: 'Z型钢', designation: 'Z180×70×20×3.0', dimensions: { H: 180, B: 70, C: 20, t: 3.0 }, A: 10.095, Ix: 496.693, Iy: 102.345, Wx: 55.188, Wy: 14.940, ix: 7.01, iy: 3.18, kgPerM: 7.924 },
];

/** 冷弯开口型钢合集（C + Z） */
export const coldFormedOpenGB6723: SteelSectionRecord[] = [...cProfileGB6723, ...zProfileGB6723];