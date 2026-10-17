/**
 * FindingSteel Steel Sections MCP Server
 *
 * Tools:
 *  - section_categories / section_search / section_lookup（国标型钢库 + 截面特性）
 *  - section_welded_i / section_welded_box（焊接组合截面特性）
 *  - weight_calculate / weight_materials（理论重量、材质密度）
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import {
  sectionCategoriesTool,
  searchSectionsTool,
  sectionLookupTool,
  weldedISectionTool,
  weldedBoxSectionTool,
} from '../tools/sections.ts';
import { weightTool, materialsTool } from '../tools/weight.ts';

export const SERVER_NAME = 'findingsteel-steel-sections';
export const SERVER_VERSION = '0.1.0';

// All tools are read-only queries/calculations against static GB standard data.
const readOnlyAnnotations = (title: string) => ({
  title,
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
});

// Shared units object returned by section-property tools.
const unitsSchema = z
  .object({
    A: z.string(),
    Ix: z.string(),
    Iy: z.string(),
    Wx: z.string(),
    Wy: z.string(),
    ix: z.string(),
    iy: z.string(),
    kgPerM: z.string(),
  })
  .passthrough();

const sectionSummarySchema = z
  .object({
    standard: z.string(),
    category: z.string(),
    designation: z.string(),
    dimensions: z.record(z.string(), z.number()),
    kgPerM: z.number(),
  })
  .passthrough();

const sectionPropertiesSchema = z
  .object({
    found: z.boolean(),
    message: z.string().optional(),
    suggestion: z.string().optional(),
    standard: z.string().optional(),
    category: z.string().optional(),
    designation: z.string().optional(),
    dimensions: z.record(z.string(), z.number()).optional(),
    A: z.number().optional(),
    Ix: z.number().optional(),
    Iy: z.number().optional(),
    Wx: z.number().optional(),
    Wy: z.number().optional(),
    ix: z.number().optional(),
    iy: z.number().optional(),
    kgPerM: z.number().optional(),
    units: unitsSchema.optional(),
  })
  .passthrough();

const weldedPropertiesSchema = z
  .object({
    valid: z.boolean(),
    message: z.string().optional(),
    A: z.number().optional(),
    Ix: z.number().optional(),
    Iy: z.number().optional(),
    Wx: z.number().optional(),
    Wy: z.number().optional(),
    ix: z.number().optional(),
    iy: z.number().optional(),
    kgPerM: z.number().optional(),
    units: unitsSchema.optional(),
  })
  .passthrough();

const shapeInfoSchema = z
  .object({
    shape: z.string(),
    name: z.string(),
    dims: z.array(z.string()),
    note: z.string(),
  })
  .passthrough();

export function createServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
    description: 'Chinese (GB standard) steel section database and calculator. Look up section properties (A, Ix, Iy, Wx, Wy, ix, iy, weight per metre) for H-beams, I-beams, channels, angles, cold-formed C/Z purlins, square/rectangular hollow sections; compute welded I/box section properties; calculate theoretical weight. Designations use the × separator, e.g. HN400×200×8×13. Dimensions in mm; density default 7.85 g/cm³.',
  });

  server.registerTool(
    'section_categories',
    {
      title: 'List steel section categories',
      description:
        '列出国标型钢全部类别（HW/HM/HN、工字钢、槽钢、角钢、C/Z型钢、方管、矩形管）及库存规格总数。' +
        'List all standard section categories and total count of stored specifications.',
      inputSchema: z.object({}),
      outputSchema: z
        .object({
          categories: z.array(z.string()),
          total: z.number(),
        })
        .passthrough(),
      annotations: readOnlyAnnotations('List steel section categories'),
    },
    async () => {
      const result = sectionCategoriesTool();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  server.registerTool(
    'section_search',
    {
      title: 'Search standard steel sections',
      description:
        '按类别（category）或关键词（query）搜索国标型钢规格，返回型号、标准、尺寸与每米重量。' +
        '类别示例：HN / 工字钢 / 槽钢 / 等边角钢 / C型钢 / 方管。关键词可匹配型号片段，如 "HN400" 或 "200×200"。' +
        'Search GB steel sections by category or keyword; returns designation, standard, dimensions, kg/m.',
      inputSchema: z.object({
        category: z.string().optional().describe('类别，如 HN / 工字钢 / 槽钢 / 等边角钢 / 不等边角钢 / C型钢 / Z型钢 / 方管 / 矩形管'),
        query: z.string().optional().describe('型号或标准关键词片段，如 HN400 或 200×200'),
        limit: z.number().int().positive().max(200).optional().describe('返回条数上限（默认 50）'),
      }),
      outputSchema: z
        .object({
          total: z.number(),
          returned: z.number(),
          hint: z.string().optional(),
          sections: z.array(sectionSummarySchema),
        })
        .passthrough(),
      annotations: readOnlyAnnotations('Search standard steel sections'),
    },
    async ({ category, query, limit }) => {
      const result = searchSectionsTool({ category, query, limit });
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  server.registerTool(
    'section_lookup',
    {
      title: 'Look up section properties by designation',
      description:
        '按精确型号查国标型钢截面特性：A(cm²)、Ix/Iy(cm⁴)、Wx/Wy(cm³)、ix/iy(cm)、每米重量 kg/m。' +
        '型号写法用 × 分隔，如 HN400×200×8×13、HW250×250×9×14、L50×5、C140×50×20×2.5。' +
        'Look up full section properties for an exact GB designation.',
      inputSchema: z.object({
        designation: z.string().describe('精确型号，如 HN400×200×8×13'),
      }),
      outputSchema: sectionPropertiesSchema,
      annotations: readOnlyAnnotations('Look up section properties by designation'),
    },
    async ({ designation }) => {
      const result = sectionLookupTool({ designation });
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  server.registerTool(
    'section_welded_i',
    {
      title: 'Compute welded I-section properties',
      description:
        '由总高 hw、腹板厚 tw、翼缘宽 bf、翼缘厚 tf（mm）计算焊接工字形截面特性。' +
        'Compute section properties of a welded I-section from plate dimensions (mm).',
      inputSchema: z.object({
        hw: z.number().positive().describe('腹板高/总高 mm'),
        tw: z.number().positive().describe('腹板厚 mm'),
        bf: z.number().positive().describe('翼缘宽 mm'),
        tf: z.number().positive().describe('翼缘厚 mm'),
      }),
      outputSchema: weldedPropertiesSchema,
      annotations: readOnlyAnnotations('Compute welded I-section properties'),
    },
    async ({ hw, tw, bf, tf }) => {
      const result = weldedISectionTool({ hw, tw, bf, tf });
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  server.registerTool(
    'section_welded_box',
    {
      title: 'Compute welded box-section properties',
      description:
        '由总高 h、总宽 b、腹板厚 tw、翼缘厚 tf（mm）计算焊接箱形截面特性。' +
        'Compute section properties of a welded box section from plate dimensions (mm).',
      inputSchema: z.object({
        h: z.number().positive().describe('总高 mm'),
        b: z.number().positive().describe('总宽 mm'),
        tw: z.number().positive().describe('腹板厚 mm'),
        tf: z.number().positive().describe('翼缘厚 mm'),
      }),
      outputSchema: weldedPropertiesSchema,
      annotations: readOnlyAnnotations('Compute welded box-section properties'),
    },
    async ({ h, b, tw, tf }) => {
      const result = weldedBoxSectionTool({ h, b, tw, tf });
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  server.registerTool(
    'weight_calculate',
    {
      title: 'Calculate steel theoretical weight',
      description:
        '计算常用钢材理论重量。shape 可选：plate钢板 / round圆钢 / square方钢 / flat扁钢 / hex六角钢 / oct八角钢 / ' +
        'rebar螺纹钢 / pipe圆管 / squareTube方管 / rectTube矩形管 / cProfile C型钢 / zProfile Z型钢 / ' +
        'weldedI焊接工字 / weldedBox焊接箱形 / standard国标型钢库（按型号）。尺寸单位 mm，长度 m。' +
        'Calculate theoretical weight (kg/m, kg, tonnes) for common steel shapes or GB sections.',
      inputSchema: z.object({
        shape: z.string().describe('形状：plate/round/square/flat/hex/oct/rebar/pipe/squareTube/rectTube/cProfile/zProfile/weldedI/weldedBox/standard'),
        dims: z.record(z.string(), z.number()).describe('尺寸 mm：各形状所需键不同（见描述），如 plate 需 t/w/l，pipe 需 D/t，cProfile 需 h/b/c/t'),
        lengthM: z.number().positive().optional().describe('长度 m（省略则只返回 kg/m）'),
        quantity: z.number().int().positive().optional().describe('数量（默认 1）'),
        material: z.string().optional().describe('材质键：q235/q355/ss304/ss316/aluminum/copper（默认碳钢 7.85）'),
        customDensity: z.number().positive().optional().describe('自定义密度 g/cm³，覆盖 material'),
        designation: z.string().optional().describe('shape=standard 时的国标型号，如 HN400×200×8×13'),
      }),
      outputSchema: z
        .object({
          valid: z.boolean(),
          shape: z.string().optional(),
          name: z.string().optional(),
          kgPerM: z.number().optional(),
          lengthM: z.number().nullable().optional(),
          quantity: z.number().optional(),
          totalKg: z.number().optional(),
          totalTons: z.number().optional(),
          note: z.string().optional(),
          densityGPerCm3: z.number().optional(),
          material: z.string().optional(),
          message: z.string().optional(),
          shapes: z.array(shapeInfoSchema).optional(),
        })
        .passthrough(),
      annotations: readOnlyAnnotations('Calculate steel theoretical weight'),
    },
    async (args) => {
      const result = weightTool(args as never);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  server.registerTool(
    'weight_materials',
    {
      title: 'List material densities',
      description: '列出内置材质密度表（Q235/Q355、304、316、铝、铜）与默认值。List supported material densities.',
      inputSchema: z.object({}),
      outputSchema: z
        .object({
          materials: z.array(
            z
              .object({
                key: z.string(),
                nameZh: z.string(),
                nameEn: z.string(),
                density: z.number(),
              })
              .passthrough(),
          ),
          default: z.string(),
        })
        .passthrough(),
      annotations: readOnlyAnnotations('List material densities'),
    },
    async () => {
      const result = materialsTool();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result) }],
        structuredContent: result as never,
      };
    },
  );

  return server;
}
