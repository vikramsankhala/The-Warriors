# Deploy The Warriors to Render.com

## Deployment Type: Web Service

Switch from **Static Site** to **Web Service** (the AI assistant requires a backend).

## Render.com Settings

| Setting | Value |
|---------|-------|
| **Root Directory** | *(leave blank)* |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Environment** | Add variable: `ANTHROPIC_API_KEY` = your API key |

## Environment Variable

1. In Render Dashboard → Your Service → **Environment**
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-api03-...` (your Anthropic API key)
3. Get a key at [console.anthropic.com](https://console.anthropic.com/)

## Local Development

```bash
npm install
# Create .env with: ANTHROPIC_API_KEY=your-key
npm start
```

Open http://localhost:3000 — the chat button (💬) opens the AI assistant.
