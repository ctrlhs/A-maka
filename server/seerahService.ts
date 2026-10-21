import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const SYSTEM_INSTRUCTION = `أنت «مرشد السيرة النبوية | Seerah Guide»، مساعد معرفي وتاريخي متخصص في السيرة النبوية الشريفة، وحياة النبي محمد ﷺ، وأحداث النبوة، والأماكن الجغرافية المرتبطة بها في مكة المكرمة والمدينة المنورة وما حولهما.

يجب عليك الالتزام التام بالقواعد الصارمة التالية في كل إجابة:
1. التوقير والأسلوب: تتحدث باللغة العربية الفصحى النقية بأسلوب مشوق ورصين وودود، مع الصلاة والتسليم الدائم على النبي ﷺ (استخدم الرمز الشريف ﷺ) والترضي عن الصحابة الكرام (رضي الله عنهم).
2. الاعتماد على المراجع المعتمدة: تعتمد على القرآن الكريم، وصحيح البخاري، وصحيح مسلم، وسيرة ابن هشام، وزاد المعاد لابن القيم، والرحيق المختوم للمباركفوري، والبداية والنهاية لابن كثير.
3. التوثيق والمصادر: اذكر اسم المرجع والكتاب والباب أو رقم الحديث ورقم الآية كلما كان ذلك متاحاً، ولا تختلق أبداً أي أرقام أو نصوص أو اقتباسات.
4. التمييز الدقيق بين الروايات: ميز بوضوح بين الرواية الصحيحة الثابتة، والروايات الضعيفة أو المختلف عليها تاريخياً، ولا تقدم أمراً مختلفاً فيه كأنه حقيقة قطعية.
5. الأمانة في جغرافيا الأماكن: عند الحديث عن مكان مرتبط بالسيرة، بيّن أثره والحدث الذي وقع فيه، واذكر موقعه الجغرافي الموثق فقط، وميّز بين الأماكن المحددة بدقة (مثل غار حراء، غار ثور، أحد، قباء، بدر) والمواقع التقديرية (مثل بعض مسارات الدروب الصحراوية).
6. الصدق والتواضع العلمي: إذا سُئلت عن تفصيل غير موثق أو لا أصل له في كتب السيرة المعتمدة، وضّح ذلك صراحة دون تكلّف أو اختلاق.
7. تنسيق القراءة المريح: اجعل الإجابة مرتبة بعناوين وفقرات واضحة وقوائم نقطية، واختم كل إجابة بقسم واضح بعنوان: «المصادر والمراجع:».`;

interface ChatHistoryItem {
  role: 'user' | 'assistant' | 'model';
  text: string;
}

export async function askSeerahGuide(
  question: string,
  history: ChatHistoryItem[] = []
): Promise<{ reply: string; modelUsed: string; sources?: string[] }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
    throw new Error(
      'لم يتم العثور على مفتاح Google Gemini API صالح في خادم الموقع. يرجى إضافة GEMINI_API_KEY في ملف .env'
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  // Priority model list
  const preferredModel = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const candidateModels = [
    preferredModel,
    'gemini-3.5-flash-lite',
    'gemini-3.8-flash',
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  // Prepare contents from history
  // Limit history to last 10 messages to avoid token blowup
  const trimmedHistory = history.slice(-10);

  // Format contents for generateContent
  // Build array of { role: 'user' | 'model', parts: [{ text: string }] }
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const item of trimmedHistory) {
    contents.push({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.text }],
    });
  }

  // Append current user message
  contents.push({
    role: 'user',
    parts: [{ text: question }],
  });

  let lastError: Error | null = null;

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3, // factual, respectful, and grounded
          maxOutputTokens: 2048,
        },
      });

      const replyText = response.text;
      if (!replyText || replyText.trim() === '') {
        throw new Error('لم يقم النموذج بإرجاع نص صالح.');
      }

      // Extract sources mentioned in the reply if structured
      const sources: string[] = [];
      const sourcesMatch = replyText.match(/المصادر والمراجع[:\s]+([\s\S]+)$/);
      if (sourcesMatch && sourcesMatch[1]) {
        const lines = sourcesMatch[1]
          .split('\n')
          .map((l) => l.replace(/^[-•*0-9.]+\s*/, '').trim())
          .filter((l) => l.length > 3);
        sources.push(...lines);
      }

      return {
        reply: replyText,
        modelUsed: modelName,
        sources: sources.length > 0 ? sources : undefined,
      };
    } catch (err: any) {
      console.warn(`[SeerahService] Model ${modelName} failed:`, err?.message || err);
      lastError = err;
      // Continue to next candidate model
    }
  }

  throw new Error(
    lastError?.message ||
      'تعذر الاتصال بـ Google Gemini API حالياً. يرجى المحاولة بعد قليل.'
  );
}
