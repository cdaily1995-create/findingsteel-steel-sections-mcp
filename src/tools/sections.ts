/**
 * section_* tools: look up Chinese (GB) standard steel sections and their
 * section properties (A, Ix, Iy, Wx, Wy, ix, iy, kgPerM).
 *
 * Mirrors the Section Properties calculator on findingsteel.com/tools.
 */

import {
  findSectionByDesignation,
  findSectionsByCategory,
  searchSections,
  steelSections,
  steelSectionCount,
  SECTION_CATEGORIES,
} from '../data/sections/index.ts';
import { weldedISectionProperties, weldedBoxSectionProperties, DEFAULT_STEEL_DENSITY } from '../lib/steelCalc.ts';

export interface SectionLookupInput {
  designation: string;
}

export interface SectionSearchInput {
  category?: string;
  query?: string;
  limit?: number;
}

export interface WeldedISectionInput {
  hw: number; // 腹板高/总高 mm
  tw: number; // 腹板厚 mm
  bf: number; // 翼缘宽 mm
  tf: number; // 翼缘厚 mm
}

export interface WeldedBoxSectionInput {
  h: number; // 总高 mm
  b: number; // 总宽 mm
  tw: number; // 腹板厚 mm
  tf: number; // 翼缘厚 mm
}

export function sectionCategoriesTool() {
  return {
    categories: SECTION_CATEGORIES,
    total: steelSectionCount,
  };
}

export function searchSectionsTool(input: SectionSearchInput) {
  const limit = input.limit && input.limit > 0 ? Math.min(input.limit, 200) : 50;
  let rows = input.category
    ? findSectionsByCategory(input.category)
    : input.query
      ? searchSections(input.query)
      : steelSections;
  const total = rows.length;
  rows = rows.slice(0, limit);
  return {
    total,
    returned: rows.length,
    hint: total > rows.length ? `更多结果未返回，可用更精确的 query 或 增大 limit` : undefined,
    sections: rows.map((s) => ({
      standard: s.standard,
      category: s.category,
      designation: s.designation,
      dimensions: s.dimensions,
      kgPerM: s.kgPerM,
    })),
  };
}

export function sectionLookupTool(input: SectionLookupInput) {
  const found = findSectionByDesignation(input.designation.trim());
  if (!found) {
    return {
      found: false,
      message: `未找到型号 ${input.designation}。可先 search_sections 确认拼写（如 HN400×200×8×13，乘号用 ×）。`,
      suggestion: 'HN400×200×8×13',
    };
  }
  return {
    found: true,
    standard: found.standard,
    category: found.category,
    designation: found.designation,
    dimensions: found.dimensions,
    A: found.A,
    Ix: found.Ix,
    Iy: found.Iy,
    Wx: found.Wx,
    Wy: found.Wy,
    ix: found.ix,
    iy: found.iy,
    kgPerM: found.kgPerM,
    units: {
      A: 'cm²',
      Ix: 'cm⁴',
      Iy: 'cm⁴',
      Wx: 'cm³',
      Wy: 'cm³',
      ix: 'cm',
      iy: 'cm',
      kgPerM: 'kg/m',
      dimensions: 'mm',
    },
  };
}

export function weldedISectionTool(input: WeldedISectionInput) {
  try {
    const p = weldedISectionProperties(input.hw, input.tw, input.bf, input.tf, DEFAULT_STEEL_DENSITY);
    return { valid: true, ...p, units: { A: 'cm²', Ix: 'cm⁴', Iy: 'cm⁴', Wx: 'cm³', Wy: 'cm³', ix: 'cm', iy: 'cm', kgPerM: 'kg/m' } };
  } catch (error) {
    return { valid: false, message: error instanceof Error ? error.message : String(error) };
  }
}

export function weldedBoxSectionTool(input: WeldedBoxSectionInput) {
  try {
    const p = weldedBoxSectionProperties(input.h, input.b, input.tw, input.tf, DEFAULT_STEEL_DENSITY);
    return { valid: true, ...p, units: { A: 'cm²', Ix: 'cm⁴', Iy: 'cm⁴', Wx: 'cm³', Wy: 'cm³', ix: 'cm', iy: 'cm', kgPerM: 'kg/m' } };
  } catch (error) {
    return { valid: false, message: error instanceof Error ? error.message : String(error) };
  }
}
