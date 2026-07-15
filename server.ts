import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Custom helper to load keys from .env and .env.example into process.env at runtime
function loadEnv() {
  const envPaths = [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), ".env.example")
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        console.log(`[Env Loader] Scanning config file: ${path.basename(envPath)}`);
        const content = fs.readFileSync(envPath, "utf-8");
        const lines = content.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const index = trimmed.indexOf("=");
          if (index > -1) {
            const key = trimmed.substring(0, index).trim();
            let val = trimmed.substring(index + 1).trim();
            // Strip any enclosing single or double quotes
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.substring(1, val.length - 1);
            }
            if (key) {
              // Override or set key in process.env so it's always up to date
              process.env[key] = val;
              console.log(`[Env Loader] Loaded key: ${key}`);
            }
          }
        }
      } catch (err) {
        console.error(`[Env Loader] Error reading ${envPath}:`, err);
      }
    }
  }
}

// Boot environment loader immediately
loadEnv();

const app = express();
const PORT = 3000;
const MESSAGES_FILE = path.join(process.cwd(), "messages.json");

// Parse JSON request bodies
app.use(express.json());

// Helper to read messages from local storage
function readMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading messages file:", error);
  }
  return [];
}

// Helper to write messages to local storage
function writeMessages(messages: any[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing messages file:", error);
  }
}

// 1. API: Submit Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields (name, email, subject, message) are required.",
    });
  }

  const newMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  };

  // 1. Persist locally to server JSON storage
  const currentMessages = readMessages();
  currentMessages.unshift(newMessage);
  writeMessages(currentMessages);

  console.log(`[Contact Form] New message saved from: ${email}`);

  return res.json({
    success: true,
    message: "Your message was successfully registered in the secure database.",
    localMessageId: newMessage.id
  });
});

// 2. API: Fetch received messages list (for developer monitoring/dashboard)
app.get("/api/messages", (req, res) => {
  const messages = readMessages();
  res.json({ success: true, messages });
});

// API: Config check
app.get("/api/config", (req, res) => {
  loadEnv();
  const rawKey = process.env.WEB3FORMS_ACCESS_KEY || "";
  const isValid = !!rawKey && rawKey !== "MY_WEB3FORMS_ACCESS_KEY";
  res.json({
    success: true,
    hasWeb3FormsKey: isValid,
    web3FormsKey: isValid ? rawKey : "",
    email: "ayushsaini13january@gmail.com"
  });
});

// 3. API: Delete message by ID
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const currentMessages = readMessages();
  const filtered = currentMessages.filter((m: any) => m.id !== id);
  writeMessages(filtered);
  res.json({ success: true, message: "Inquiry removed from log." });
});

// Vite middleware setup or Static file server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} (Access key status: ${process.env.WEB3FORMS_ACCESS_KEY ? "CONFIGURED" : "NOT CONFIGURED"})`);
  });
}

startServer();
