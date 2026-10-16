#!/usr/bin/env node
/**
 * FindingSteel Steel Sections MCP Server — Streamable HTTP entry
 * Usage:
 *   node src/serve.ts                          # base path /mcp, port 3001
 *   MCP_BASE_PATH=/mcp/sections PORT=3001 node src/serve.ts
 *
 * Endpoint: http://localhost:<PORT><MCP_BASE_PATH>
 * Standard implementation: one StreamableHTTPServerTransport per MCP session,
 * keyed by Mcp-Session-Id (per SDK docs). Used for remote deployment and
 * directory-listing verification.
 */

import { randomUUID } from 'node:crypto';
import { createServer as createHttpServer } from 'node:http';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createServer } from './server/index.ts';

const PORT = Number(process.env.PORT ?? 3001);
// 允许部署时把端点挂在指定路径下（nginx 反代场景），如 /mcp/sections
const BASE_PATH = (process.env.MCP_BASE_PATH ?? '/mcp').replace(/\/+$/, '') || '/mcp';

// One transport per session (stateful), as recommended by the SDK docs.
const transports = new Map();

async function main() {
  const httpServer = createHttpServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
    // 精确匹配 BASE_PATH，BASE_PATH 之后允许 /（MCP 客户端可能带尾斜杠或空段）
    if (url.pathname !== BASE_PATH && url.pathname !== `${BASE_PATH}/`) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: `Not Found. Use GET/POST ${BASE_PATH}` }));
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Mcp-Session-Id');
    res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id, Mcp-Protocol-Version');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const sessionId = req.headers['mcp-session-id'];
    let transport = sessionId ? transports.get(sessionId) : undefined;

    if (!transport) {
      // New session: create server + transport bound to this session only.
      const mcpServer = createServer();
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sid) => {
          transports.set(sid, transport);
        },
      });
      mcpServer.connect(transport).catch((e) => console.error('[mcp] connect error', e));
      transport.onclose = () => {
        if (sessionId) transports.delete(sessionId);
      };
    }

    try {
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error('[findingsteel-steel-sections] request error:', error);
      if (!res.writableEnded) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`[findingsteel-steel-sections] Streamable HTTP listening on http://localhost:${PORT}${BASE_PATH}`);
  });
}

main().catch((error) => {
  console.error('[findingsteel-steel-sections] fatal:', error);
  process.exit(1);
});
