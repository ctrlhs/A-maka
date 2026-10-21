import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import { askSeerahGuide } from './server/seerahService.ts';

dotenv.config();

function seerahApiPlugin(): Plugin {
  return {
    name: 'seerah-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/health' && req.method === 'GET') {
          const hasKey = Boolean(
            process.env.GEMINI_API_KEY &&
              process.env.GEMINI_API_KEY.trim() !== '' &&
              !process.env.GEMINI_API_KEY.includes('your_gemini_api_key')
          );
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'ok',
              service: 'Seerah Guide API (Vite Integrated Middleware)',
              hasApiKey: hasKey,
              model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
            })
          );
          return;
        }

        if (req.url === '/api/seerah-chat' && req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });

          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            try {
              const { message, history } = JSON.parse(bodyStr || '{}');
              if (!message || typeof message !== 'string' || message.trim() === '') {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'يرجى كتابة سؤال صالح باللغة العربية.',
                  })
                );
                return;
              }

              const result = await askSeerahGuide(message.trim(), history || []);

              res.end(
                JSON.stringify({
                  success: true,
                  reply: result.reply,
                  modelUsed: result.modelUsed,
                  sources: result.sources,
                })
              );
            } catch (err: any) {
              console.error('[Vite Middleware API Error]:', err?.message || err);
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  success: false,
                  error:
                    err?.message ||
                    'حدث خطأ أثناء معالجة السؤال بواسطة مرشد السيرة. يرجى المحاولة لاحقاً.',
                })
              );
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seerahApiPlugin(),
  ],
  server: {
    port: 5173,
    proxy: {
      // If external express server runs on 5000, fallback or forward
    },
  },
});
