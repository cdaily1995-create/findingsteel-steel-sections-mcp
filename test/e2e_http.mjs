/**
 * HTTP e2e test using official MCP client SDK over Streamable HTTP.
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const cwd = fileURLToPath(new URL('..', import.meta.url));
const child = spawn(process.execPath, ['src/serve.ts'], { cwd, stdio: ['ignore', 'pipe', 'inherit'], windowsHide: true });
child.stdout.on('data', (d) => process.stdout.write(`[serve] ${d}`));
child.on('exit', (code) => console.log('[serve] exited', code));

await sleep(2500);

let client;
try {
  client = new Client({ name: 'http-e2e', version: '0.0.1' });
  const transport = new StreamableHTTPClientTransport(new URL('http://localhost:3001/mcp'));
  await client.connect(transport);
  console.log('connected');

  const tools = await client.listTools();
  console.log('tools:', tools.tools.map((t) => t.name).join(', '));

  const call = await client.callTool({
    name: 'weight_calculate',
    arguments: { shape: 'rectTube', dims: { b: 200, h: 100, t: 8 }, lengthM: 6, quantity: 2 },
  });
  console.log('weight_calculate rectTube 200x100x8 x6m x2:', call.content[0].text.slice(0, 400));

  await client.close();
  console.log('HTTP E2E PASS');

} catch (error) {
  console.error('HTTP E2E FAIL:', error);
  child.kill();
  process.exitCode = 1;
} finally {
  child.kill();
}
