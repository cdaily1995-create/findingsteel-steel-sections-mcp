# FindingSteel Steel Sections MCP Server

[![LightNow capabilities](https://lightnow.ai/badge/io.github.cdaily1995-create/findingsteel-steel-sections)](https://lightnow.ai/servers/io.github.cdaily1995-create/findingsteel-steel-sections)

An [MCP](https://modelcontextprotocol.io) server for **Chinese (GB standard) steel sections**: look up section properties and calculate theoretical weight for the sections used in everyday structural steelwork in China.

Built by [FindingSteel](https://www.findingsteel.com/en/) — a steel structure manufacturer in Foshan, China — and backed by the same verified GB standard data tables used on our website.

## Why this is useful

- **GB standard data is missing from most MCP tools.** Existing section databases are mostly ASTM / EN / JIS. This server fills the GB/T gap used across Chinese steel fabrication, detailing (Tekla), purchasing and structural design.
- **Verified values.** Every section comes from the GB/T standard tables (see [Data sources](#-data-sources)); designations use the standard Chinese notation such as `HN400×200×8×13`.

## Tools

| Tool | Description |
| --- | --- |
| `section_categories` | List all section categories (HW/HM/HN, I-beam, channel, angle, C/Z purlin, square/rectangular tube) and total stored count. |
| `section_search` | Search sections by category or designation keyword; returns designation, standard, dimensions, kg/m. |
| `section_lookup` | Look up full section properties by exact designation: A (cm²), Ix/Iy (cm⁴), Wx/Wy (cm³), ix/iy (cm), kg/m. |
| `section_welded_i` | Compute welded I-section properties from plate dimensions (hw, tw, bf, tf in mm). |
| `section_welded_box` | Compute welded box-section properties from plate dimensions (h, b, tw, tf in mm). |
| `weight_calculate` | Theoretical weight for plates, round/square/hex/oct bars, rebar, pipe, square/rectangular tube, C/Z profiles, welded I/box, or standard sections (kg/m, kg, tonnes). |
| `weight_materials` | List built-in material densities (Q235/Q355, 304, 316, aluminium, copper). |

## Quick start

```bash
# stdio transport (recommended for local clients)
git clone https://github.com/cdaily1995-create/findingsteel-steel-sections-mcp.git
cd findingsteel-steel-sections-mcp
npm install
npm run build
node dist/index.js

# or without cloning:
npx -y findingsteel-steel-sections-mcp
```

### Example client config (Claude Desktop)

```json
{
  "mcpServers": {
    "findingsteel-steel-sections": {
      "command": "node",
      "args": ["/absolute/path/to/findingsteel-steel-sections-mcp/src/index.ts"]
    }
  }
}
```

### Remote (Streamable HTTP)

The server also ships a stateless HTTP entry for remote deployment:

```bash
PORT=3001 node src/serve.ts
# -> http://localhost:3001/mcp
```

## Examples

> Find the weight of 12 metres of HN400×200×8×13, 4 pieces

```
section_lookup { "designation": "HN400×200×8×13" }
# -> A 83.37 cm², Ix 23500 cm⁴, Wx 1170 cm³, kg/m 65.4

weight_calculate { "shape": "standard", "designation": "HN400×200×8×13", "lengthM": 12, "quantity": 4 }
# -> total 3139.2 kg (3.14 t)
```

> Weight of pipe 168×6 for 12 m

```
weight_calculate { "shape": "pipe", "dims": { "D": 168, "t": 6 }, "lengthM": 12 }
# -> 23.97 kg/m, total 287.6 kg
```

## Design notes

- All dimensions in **mm**; density default **7.85 g/cm³** (carbon steel Q235/Q355).
- Section properties: A (cm²), Ix/Iy (cm⁴), Wx/Wy (cm³), ix/iy (cm), kg/m.
- Designations use the `×` separator (e.g. `HN400×200×8×13`); search is case-insensitive.
- `weight_calculate` accepts shape keys case-insensitively (`rectTube` = `recttube`).

## Data sources

- **GB/T 11263-2017** hot-rolled H-beams (HW / HM / HN)
- **GB/T 706-2016** hot-rolled I-beams, channels, equal/unequal angles
- **GB/T 6723-2017** cold-formed C / Z profiles
- **GB/T 6728-2017** cold-formed square and rectangular hollow sections
- Theoretical weight formulas from the corresponding GB standards; density constants from common engineering handbooks.

The same data powers our online [steel weight calculator](https://www.findingsteel.com/en/tools/steel-weight-calculator/) and [steel section properties calculator](https://www.findingsteel.com/en/tools/section-properties/) tools.
## Development

```bash
npm install
npm run typecheck   # tsc --noEmit
npm test            # smoke + stdio E2E + HTTP E2E
```

## License

MIT
