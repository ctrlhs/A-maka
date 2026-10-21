import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { askSeerahGuide } from './seerahService';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() !== '' &&
      !process.env.GEMINI_API_KEY.includes('your_gemini_api_key')
  );

  res.json({
    status: 'ok',
    service: 'Seerah Guide API',
    hasApiKey: hasKey,
    model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  });
});

// Seerah Chat Endpoint
app.post('/api/seerah-chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'يرجى كتابة سؤال أو استفسار صالح باللغة العربية.',
      });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({
        success: false,
        error: 'السؤال طويل جداً. يرجى إيجاز السؤال في حدود 2000 حرف.',
      });
      return;
    }

    const sanitizedHistory = Array.isArray(history) ? history : [];
    const result = await askSeerahGuide(message.trim(), sanitizedHistory);

    res.json({
      success: true,
      reply: result.reply,
      modelUsed: result.modelUsed,
      sources: result.sources,
    });
  } catch (error: any) {
    console.error('Error in /api/seerah-chat:', error?.message || error);
    res.status(500).json({
      success: false,
      error:
        error?.message ||
        'حدث خطأ أثناء معالجة السؤال بواسطة مرشد السيرة. يرجى المحاولة لاحقاً.',
    });
  }
});

// Serve frontend static assets from dist folder in production
const distPath = path.resolve('dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req: Request, res: Response, next) => {
    // If not an API request, deliver index.html for client-side routing
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });
}

// Start listening if executed directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[Seerah Guide API] Backend server running on http://localhost:${port}`);
  });
}

export default app;
