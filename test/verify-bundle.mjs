import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const child = spawn(process.execPath, ['dist/findingsteel-steel-sections-mcp.mjs'], {
  stdio: ['ignore', 'pipe', 'inherit'],
  windowsHide: true,
});
child.stdout.on('data', (d) => process.stdout.write(`[svc] ${d}`));
await sleep(2500);

async function post(path, body) {
  const res = await fetch(`http://localhost:3001${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 300) }; }
  return { status: res.status, json };
}

try {
  const init = await post('/mcp', { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 't', version: '1' } } });
  console.log('bundle initialize:', init.status, JSON.stringify(init.json?.result?.serverInfo ?? init.json));

  const notFound = await post('/other', { jsonrpc: '2.0', id: 2, method: 'initialize', params: {} });
  console.log('bundle /other 404 check:', notFound.status, JSON.stringify(notFound.json));
} finally {
  child.kill();
  await sleep(300);
}
process.exit(0);
