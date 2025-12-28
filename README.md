# Hello World MCP Server

This is a starter MCP server for the **PlayMCP** contest.

## What is this?
It implements the Model Context Protocol (MCP) to provide tools and resources to an AI client.

### Features
1.  **Tool**: `calculate_sum(a, b)` - Adds two numbers.
2.  **Resource**: `greeting://hello` - Returns a welcome message.

## How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Server**:
    ```bash
    npm start
    ```
    *The server will start on port 3000.*

## Connection Details (Endpoint)
- **Base URL**: `http://localhost:3000`
- **MCP Endpoint**: `http://localhost:3000/sse`

### How to Test / Connect
You can use the MCP Inspector or connect via a Client that supports SSE.

#### Using MCP Inspector
```bash
npx @modelcontextprotocol/inspector http://localhost:3000/sse
```
