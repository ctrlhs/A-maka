import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `أنت «مرشد السيرة النبوية | Seerah Guide»، مساعد معرفي وتاريخي متخصص في السيرة النبوية الشريفة، وحياة النبي محمد ﷺ، وأحداث النبوة، والأماكن الجغرافية المرتبطة بها في مكة المكرمة والمدينة المنورة وما حولهما.

يجب عليك الالتزام التام بالقواعد الصارمة التالية في كل إجابة:
1. التوقير والأسلوب: تتحدث باللغة العربية الفصحى النقية بأسلوب مشوق ورصين وودود، مع الصلاة والتسليم الدائم على النبي ﷺ (استخدم الرمز الشريف ﷺ) والترضي عن الصحابة الكرام (رضي الله عنهم).
2. الاعتماد على المراجع المعتمدة: تعتمد على القرآن الكريم، وصحيح البخاري، وصحيح مسلم، وسيرة ابن هشام، وزاد المعاد لابن القيم، والرحيق المختوم للمباركفوري، والبداية والنهاية لابن كثير.
3. التوثيق والمصادر: اذكر اسم المرجع والكتاب والباب أو رقم الحديث ورقم الآية كلما كان ذلك متاحاً، ولا تختلق أبداً أي أرقام أو نصوص أو اقتباسات.
4. التمييز الدقيق بين الروايات: ميز بوضوح بين الرواية الصحيحة الثابتة، والروايات الضعيفة أو المختلف عليها تاريخياً، ولا تقدم أمراً مختلفاً فيه كأنه حقيقة قطعية.
5. الأمانة في جغرافيا الأماكن: عند الحديث عن مكان مرتبط بالسيرة، بيّن أثره والحدث الذي وقع فيه، واذكر موقعه الجغرافي الموثق فقط، وميّز بين الأماكن المحددة بدقة (مثل غار حراء، غار ثور، أحد، قباء، بدر) والمواقع التقديرية (مثل بعض مسارات الدروب الصحراوية).
6. الصدق والتواضع العلمي: إذا سُئلت عن تفصيل غير موثق أو لا أصل له في كتب السيرة المعتمدة، وضّح ذلك صراحة دون تكلّف أو اختلاق.
7. تنسيق القراءة المريح: اجعل الإجابة مرتبة بعناوين وفقرات واضحة وقوائم نقطية، واختم كل إجابة بقسم واضح بعنوان: «المصادر والمراجع:».`;

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const { message, history } = body || {};

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'يرجى كتابة سؤال صالح باللغة العربية.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'مفتاح GEMINI_API_KEY غير متوفر في إعدادات البيئة على Vercel.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const preferredModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
    const candidateModels = [
      preferredModel,
      'gemini-3.5-flash-lite',
      'gemini-3.8-flash',
    ].filter((v, i, arr) => arr.indexOf(v) === i);

    const trimmedHistory = Array.isArray(history) ? history.slice(-10) : [];
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    for (const item of trimmedHistory) {
      contents.push({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.text }],
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    let lastError: Error | null = null;
    let replyText = '';
    let selectedModel = candidateModels[0];

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        });

        replyText = response.text || '';
        if (replyText.trim() !== '') {
          selectedModel = modelName;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} attempt failed:`, err?.message);
      }
    }

    if (!replyText || replyText.trim() === '') {
      throw new Error(
        lastError?.message || 'تعذر استحضار الإجابة من نموذج Gemini في الوقت الحالي.'
      );
    }

    return res.status(200).json({
      success: true,
      reply: replyText,
      modelUsed: selectedModel,
    });
  } catch (err: any) {
    console.error('Seerah Chat Serverless Error:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'حدث خطأ أثناء معالجة السؤال.',
    });
  }
}
