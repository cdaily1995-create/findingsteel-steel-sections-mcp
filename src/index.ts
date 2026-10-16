#!/usr/bin/env node
/**
 * FindingSteel Steel Sections MCP Server — stdio entry
 * Usage: npx findingsteel-steel-sections   (or: node src/index.ts)
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server/index.ts';

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('[findingsteel-steel-sections] fatal:', error);
  process.exit(1);
});
