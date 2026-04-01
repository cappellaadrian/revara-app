import net from "net";

const REVIT_HOST = process.env.REVIT_HOST || "localhost";
const REVIT_PORT = parseInt(process.env.REVIT_PORT || "8080");
const TIMEOUT = 30000;

export interface RevitCommand {
  command: string;
  data?: Record<string, unknown>;
}

export interface RevitResponse {
  success: boolean;
  result?: unknown;
  error?: string;
}

export async function sendToRevit(command: string, data?: Record<string, unknown>): Promise<RevitResponse> {
  return new Promise((resolve) => {
    const client = new net.Socket();
    let responseData = "";
    let resolved = false;

    const finish = (res: RevitResponse) => {
      if (resolved) return;
      resolved = true;
      client.destroy();
      resolve(res);
    };

    const timer = setTimeout(() => {
      finish({ success: false, error: "Connection timeout — is Revit running with the MCP plugin?" });
    }, TIMEOUT);

    client.connect(REVIT_PORT, REVIT_HOST, () => {
      const payload = JSON.stringify({ command, data: data || {} });
      // Send length-prefixed message (4-byte header + JSON)
      const buf = Buffer.from(payload, "utf-8");
      const header = Buffer.alloc(4);
      header.writeInt32LE(buf.length);
      client.write(Buffer.concat([header, buf]));
    });

    client.on("data", (chunk) => {
      responseData += chunk.toString();
      // Try to parse — the response might come in multiple chunks
      try {
        // Skip 4-byte length header if present
        let jsonStr = responseData;
        if (responseData.charCodeAt(0) < 32) {
          jsonStr = responseData.substring(4);
        }
        const parsed = JSON.parse(jsonStr);
        clearTimeout(timer);
        finish({ success: true, result: parsed });
      } catch {
        // Wait for more data
      }
    });

    client.on("error", (err) => {
      clearTimeout(timer);
      finish({ success: false, error: `Revit connection failed: ${err.message}. Make sure Revit is open with the MCP plugin loaded.` });
    });

    client.on("close", () => {
      clearTimeout(timer);
      if (!resolved) {
        if (responseData) {
          try {
            const parsed = JSON.parse(responseData);
            finish({ success: true, result: parsed });
          } catch {
            finish({ success: true, result: responseData });
          }
        } else {
          finish({ success: false, error: "Connection closed without response" });
        }
      }
    });
  });
}

export async function checkRevitConnection(): Promise<{ connected: boolean; tools?: number; error?: string }> {
  try {
    const res = await sendToRevit("say_hello", {});
    return { connected: res.success, tools: 83 };
  } catch {
    return { connected: false, error: "Cannot reach Revit MCP server" };
  }
}

export async function sendCodeToRevit(code: string, parameters: unknown[] = []): Promise<RevitResponse> {
  return sendToRevit("send_code_to_revit", { code, parameters });
}
