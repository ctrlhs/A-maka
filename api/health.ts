export default function handler(_req: any, res: any) {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() !== '' &&
      !process.env.GEMINI_API_KEY.includes('your_gemini_api_key')
  );

  res.status(200).json({
    status: 'ok',
    service: 'Seerah Guide API (Vercel Serverless)',
    hasApiKey: hasKey,
    model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  });
}
