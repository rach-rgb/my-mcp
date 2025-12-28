import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { z } from "zod";

async function main() {
    // Replace this with your actual Render URL
    const argUrl = process.argv[2];
    if (!argUrl) {
        console.error("Usage: npx tsx test_client.ts <YOUR_RENDER_URL>");
        console.error("Example: npx tsx test_client.ts https://my-app.onrender.com/sse");
        process.exit(1);
    }

    console.log(`Connecting to ${argUrl}...`);

    const transport = new SSEClientTransport(new URL(argUrl));
    const client = new Client(
        {
            name: "test-client",
            version: "1.0.0",
        },
        {
            capabilities: {},
        }
    );

    try {
        await client.connect(transport);
        console.log("✅ Custom Client Connected!");

        // List tools
        const tools = await client.listTools();
        console.log("📋 Available Tools:", tools.tools.map(t => t.name));

        // Call tool
        console.log("Testing calculate_sum(10, 20)...");
        const result = await client.callTool({
            name: "calculate_sum",
            arguments: { a: 10, b: 20 },
        });

        console.log("🎉 Result:", JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("❌ Connection failed:", error);
    } finally {
        process.exit(0);
    }
}

main();
