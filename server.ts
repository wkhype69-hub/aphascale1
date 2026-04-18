import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Rota da API de Conversões do Facebook (CAPI)
  app.post("/api/fb-event", async (req, res) => {
    const { eventName, eventData, userData } = req.body;
    const pixelId = process.env.VITE_FB_PIXEL_ID;
    const accessToken = process.env.FB_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
      return res.status(500).json({ error: "Configuração do Facebook ausente." });
    }

    try {
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/${pixelId}/events`,
        {
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              user_data: {
                client_ip_address: req.ip,
                client_user_agent: req.headers["user-agent"],
                ...userData,
              },
              custom_data: eventData,
            },
          ],
          access_token: accessToken,
        }
      );
      res.json({ success: true, fbResponse: response.data });
    } catch (error: any) {
      console.error("Erro na CAPI do Facebook:", error.response?.data || error.message);
      res.status(500).json({ error: "Falha ao enviar evento para o Facebook." });
    }
  });

  // Configuração do Vite (Middleware)
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
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();
