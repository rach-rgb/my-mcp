import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import express from "express";
import cors from "cors";

// 1. Create the MCP Server instance
const server = new McpServer({
  name: "hello-world-server",
  version: "1.0.0",
});

// 2. Define a Tool
server.tool(
  "calculate_sum",
  {
    a: z.number().describe("The first number to add"),
    b: z.number().describe("The second number to add"),
  },
  async ({ a, b }) => {
    const sum = a + b;
    return {
      content: [{ type: "text", text: `The sum of ${a} and ${b} is ${sum}` }],
    };
  }
);

// 3. Define a Resource
server.resource(
  "greeting",
  "greeting://hello",
  async (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: "Hello! This is a message from your first MCP server. Welcome to the PlayMCP contest!"
      }],
    };
  }
);

// 4. Start the HTTP Server with SSE
const app = express();
app.use(cors()); // Allow all origins (required for PlayMCP)

const PORT = process.env.PORT || 3000;

// This object maps session IDs to transports
let transport: SSEServerTransport | null = null;

app.get("/sse", async (req, res) => {
  console.log("New connection established");
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});

app.listen(PORT, () => {
  console.log(`MCP Server is running on http://localhost:${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/sse`);
});
