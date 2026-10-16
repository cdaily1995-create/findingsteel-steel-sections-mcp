/**
 * End-to-end test: launch the stdio server, connect with the official MCP
 * client SDK, list tools and call section_lookup + weight_calculate.
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'node:url';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['src/index.ts'],
  cwd: fileURLToPath(new URL('..', import.meta.url)),
});

const client = new Client({ name: 'smoke-client', version: '0.0.1' });
await client.connect(transport);

const tools = await client.listTools();
console.log('tools:', tools.tools.map((t) => t.name).join(', '));
console.log('tool count:', tools.tools.length);

const lookup = await client.callTool({ name: 'section_lookup', arguments: { designation: 'HN400×200×8×13' } });
console.log('\nsection_lookup HN400:\n', JSON.stringify(JSON.parse(lookup.content[0].text), null, 2));

const weight = await client.callTool({ name: 'weight_calculate', arguments: { shape: 'pipe', dims: { D: 168, t: 6 }, lengthM: 12, quantity: 4 } });
console.log('\nweight_calculate pipe 168x6 x12m x4:\n', JSON.stringify(JSON.parse(weight.content[0].text), null, 2));

const search = await client.callTool({ name: 'section_search', arguments: { category: 'HN', limit: 3 } });
console.log('\nsection_search HN (3):\n', JSON.stringify(JSON.parse(search.content[0].text), null, 2));

await client.close();
process.exit(0);


