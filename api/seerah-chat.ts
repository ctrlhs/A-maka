import { askSeerahGuide } from '../server/seerahService';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string' || message.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'يرجى كتابة سؤال صالح باللغة العربية.',
      });
      return;
    }

    const result = await askSeerahGuide(message.trim(), history || []);
    res.status(200).json({
      success: true,
      reply: result.reply,
      modelUsed: result.modelUsed,
      sources: result.sources,
    });
  } catch (err: any) {
    console.error('Vercel API error:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'حدث خطأ أثناء معالجة السؤال.',
    });
  }
}
