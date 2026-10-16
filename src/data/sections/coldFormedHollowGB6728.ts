import type { SteelSectionRecord } from './types.ts';

/**
 * 结构用冷弯空心型钢：方形钢管与矩形钢管（GB/T 6728-2017）常用规格。
 *
 * 方管 dimensions：B（外边长,mm）、t（壁厚,mm）。
 * 矩形管 dimensions：B（外宽,mm）、H（外高,mm）、t（壁厚,mm）。
 * 方管 Ix=Iy、Wx=Wy、ix=iy（双轴对称）。
 * 数值来源：GB/T 6728-2017 截面特性表（mechtool.cn《结构用冷弯空心型钢(摘自GB/T 6728)》）。
 * TODO(6728-2025)：任务书要求 GB/T 6728-2025；当前以 2017 版公开表值入库，
 *   待 2025 版原文可获取后逐条比对更新（常见规格表值通常一致）。
 */
export const squareTubeGB6728: SteelSectionRecord[] = [
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS40×40×2.5', dimensions: { B: 40, t: 2.5 }, A: 3.589, Ix: 8.213, Iy: 8.213, Wx: 4.106, Wy: 4.106, ix: 1.512, iy: 1.512, kgPerM: 2.817 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS40×40×3.0', dimensions: { B: 40, t: 3.0 }, A: 4.208, Ix: 9.320, Iy: 9.320, Wx: 4.660, Wy: 4.660, ix: 1.488, iy: 1.488, kgPerM: 3.303 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS50×50×3.0', dimensions: { B: 50, t: 3.0 }, A: 5.408, Ix: 19.463, Iy: 19.463, Wx: 7.785, Wy: 7.785, ix: 1.897, iy: 1.897, kgPerM: 4.245 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS50×50×4.0', dimensions: { B: 50, t: 4.0 }, A: 6.947, Ix: 23.725, Iy: 23.725, Wx: 9.490, Wy: 9.490, ix: 1.847, iy: 1.847, kgPerM: 5.454 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS60×60×2.5', dimensions: { B: 60, t: 2.5 }, A: 5.589, Ix: 30.340, Iy: 30.340, Wx: 10.113, Wy: 10.113, ix: 2.329, iy: 2.329, kgPerM: 4.387 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS60×60×3.0', dimensions: { B: 60, t: 3.0 }, A: 6.608, Ix: 35.130, Iy: 35.130, Wx: 11.710, Wy: 11.710, ix: 2.305, iy: 2.305, kgPerM: 5.187 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS80×80×3.0', dimensions: { B: 80, t: 3.0 }, A: 9.008, Ix: 87.838, Iy: 87.838, Wx: 21.959, Wy: 21.959, ix: 3.122, iy: 3.122, kgPerM: 7.071 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS80×80×4.0', dimensions: { B: 80, t: 4.0 }, A: 11.747, Ix: 111.031, Iy: 111.031, Wx: 27.757, Wy: 27.757, ix: 3.074, iy: 3.074, kgPerM: 9.222 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS120×120×4.0', dimensions: { B: 120, t: 4.0 }, A: 18.147, Ix: 402.260, Iy: 402.260, Wx: 67.043, Wy: 67.043, ix: 4.708, iy: 4.708, kgPerM: 14.246 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS120×120×5.0', dimensions: { B: 120, t: 5.0 }, A: 22.356, Ix: 485.441, Iy: 485.441, Wx: 80.906, Wy: 80.906, ix: 4.659, iy: 4.659, kgPerM: 17.549 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS150×150×6.0', dimensions: { B: 150, t: 6.0 }, A: 33.633, Ix: 1145.9, Iy: 1145.9, Wx: 152.79, Wy: 152.79, ix: 5.837, iy: 5.837, kgPerM: 26.402 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS150×150×8.0', dimensions: { B: 150, t: 8.0 }, A: 43.242, Ix: 1411.8, Iy: 1411.8, Wx: 188.25, Wy: 188.25, ix: 5.714, iy: 5.714, kgPerM: 33.945 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS200×200×6.0', dimensions: { B: 200, t: 6.0 }, A: 45.60, Ix: 2833, Iy: 2833, Wx: 283, Wy: 283, ix: 7.88, iy: 7.88, kgPerM: 35.80 },
  { standard: 'GB/T 6728-2017', category: '方管', designation: 'SHS200×200×8.0', dimensions: { B: 200, t: 8.0 }, A: 59.20, Ix: 3566, Iy: 3566, Wx: 357, Wy: 357, ix: 7.76, iy: 7.76, kgPerM: 46.50 },
];

export const rectTubeGB6728: SteelSectionRecord[] = [
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS80×40×3.0', dimensions: { B: 80, H: 40, t: 3.0 }, A: 6.608, Ix: 52.246, Iy: 17.552, Wx: 13.061, Wy: 8.776, ix: 2.811, iy: 1.629, kgPerM: 5.187 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS100×50×3.0', dimensions: { B: 100, H: 50, t: 3.0 }, A: 8.408, Ix: 106.451, Iy: 36.053, Wx: 21.290, Wy: 14.421, ix: 3.558, iy: 2.070, kgPerM: 6.60 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS100×50×4.0', dimensions: { B: 100, H: 50, t: 4.0 }, A: 10.947, Ix: 134.124, Iy: 44.938, Wx: 26.824, Wy: 17.975, ix: 3.500, iy: 2.026, kgPerM: 8.594 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS120×60×3.0', dimensions: { B: 120, H: 60, t: 3.0 }, A: 10.208, Ix: 189.113, Iy: 64.398, Wx: 31.581, Wy: 24.666, ix: 4.304, iy: 2.511, kgPerM: 8.013 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS120×60×4.0', dimensions: { B: 120, H: 60, t: 4.0 }, A: 13.347, Ix: 240.724, Iy: 81.235, Wx: 40.120, Wy: 27.078, ix: 4.246, iy: 2.466, kgPerM: 10.478 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS160×80×4.0', dimensions: { B: 160, H: 80, t: 4.0 }, A: 18.117, Ix: 597.691, Iy: 203.532, Wx: 71.711, Wy: 50.883, ix: 5.738, iy: 3.348, kgPerM: 14.216 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS160×80×6.0', dimensions: { B: 160, H: 80, t: 6.0 }, A: 26.433, Ix: 835.936, Iy: 286.832, Wx: 104.192, Wy: 76.208, ix: 5.623, iy: 3.259, kgPerM: 20.749 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS200×100×6.0', dimensions: { B: 200, H: 100, t: 6.0 }, A: 33.632, Ix: 1703.224, Iy: 576.855, Wx: 170.332, Wy: 115.371, ix: 7.116, iy: 4.141, kgPerM: 26.40 },
  { standard: 'GB/T 6728-2017', category: '矩形管', designation: 'RHS200×100×8.0', dimensions: { B: 200, H: 100, t: 8.0 }, A: 43.791, Ix: 2145.993, Iy: 719.014, Wx: 214.599, Wy: 143.802, ix: 7.000, iy: 4.052, kgPerM: 34.376 },
];

/** 冷弯空心型钢合集（方管 + 矩形管） */
export const coldFormedHollowGB6728: SteelSectionRecord[] = [...squareTubeGB6728, ...rectTubeGB6728];