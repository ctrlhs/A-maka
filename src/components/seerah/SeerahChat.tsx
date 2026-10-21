import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RotateCcw,
  BookOpen,
  AlertCircle,
  Loader2,
  Bot,
  User,
  Quote,
} from 'lucide-react';
import type { ChatMessage } from '../../types/seerah';
import { SUGGESTED_QUESTIONS } from '../../data/seerahData';

interface SeerahChatProps {
  initialQuestion?: string;
  onQuestionConsumed?: () => void;
}

export const SeerahChat: React.FC<SeerahChatProps> = ({
  initialQuestion,
  onQuestionConsumed,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `السلام عليكم ورحمة الله وبركاته، مرحباً بكم في «مرشد السيرة النبوية».

أنا مرشدكم المعرفي والتاريخي لاستكشاف حياة الحبيب المصطفى محمد ﷺ، وأحداث النبوة العطرة، والأماكن المباركة التي شهدت نزول الوحي وانطلاق رسالة الإسلام الخالدة.

تعتمد إجاباتي على القرآن الكريم، والأحاديث الصحيحة من صحيحي البخاري ومسلم، والمراجع المعتمدة كـ «سيرة ابن هشام» و«الرحيق المختوم». تفضل بطرح أي سؤال أو اختر من الأسئلة المقترحة أدناه.`,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle external initial question (e.g. from places card)
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim() !== '') {
      handleSendMessage(initialQuestion.trim());
      if (onQuestionConsumed) {
        onQuestionConsumed();
      }
    }
  }, [initialQuestion]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || isLoading) return;

    setErrorMessage(null);
    setInput('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history for API
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const response = await fetch('/api/seerah-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'حدث خطأ في استجابة الخادم.');
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        sources: data.sources,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(
        err.message || 'تعذر الاتصال بمرشد السيرة حالياً. يرجى التأكد من الاتصال والمحاولة ثانية.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'تم بدء محادثة جديدة. تفضل بسؤالك حول أحداث السيرة النبوية العطرة أو الأماكن التاريخية المرتبطة بها.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMessage(null);
  };

  // Helper to format text with Quranic verses and bold highlights
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();

      // Check if line is a header
      if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
        const headerText = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={index} className="text-base font-black text-[#0c3227] mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="text-[#c59b27]">✦</span>
            <span>{headerText}</span>
          </h4>
        );
      }

      // Check if line is Sources section
      if (trimmed.startsWith('المصادر والمراجع') || trimmed.startsWith('المراجع المعتمدة')) {
        return (
          <div key={index} className="mt-4 pt-3 border-t border-[#e8dfce] text-xs font-bold text-[#8d6919] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#c59b27]" />
            <span>{trimmed}</span>
          </div>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const bulletText = trimmed.replace(/^[-*•]\s*/, '');
        return (
          <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[#26372f] my-1 pr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27] mt-2 flex-shrink-0" />
            <span className="leading-relaxed">{renderInlineFormatting(bulletText)}</span>
          </div>
        );
      }

      // Empty line
      if (trimmed === '') {
        return <div key={index} className="h-2" />;
      }

      // Normal paragraph
      return (
        <p key={index} className="text-xs sm:text-sm text-[#26372f] leading-relaxed my-1">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  // Helper for inline bold, verses, ﷺ
  const renderInlineFormatting = (text: string) => {
    // Replace markdown bold **word**
    const parts = text.split(/(\*\*.*?\*\*|﴿.*?﴾)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-[#0c3227]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('﴿') && part.endsWith('﴾')) {
        return (
          <span key={i} className="text-[#0c3227] font-bold bg-[#f4efe4] px-1 py-0.5 rounded text-xs sm:text-sm font-serif">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ded5c2] shadow-xl overflow-hidden flex flex-col h-[650px] sm:h-[720px]" dir="rtl">
      {/* Chat Window Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0c3227] to-[#144838] text-white flex items-center justify-between border-b border-[#215a48]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#f5d77f]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                مرشد السيرة النبوية الذكي
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1d5c48] text-[#f5d77f] border border-[#d4af37]/30">
                Gemini AI
              </span>
            </div>
            <p className="text-[11px] text-[#b8ccc4]">
              إجابات موثقة بالقرآن الكريم والأحاديث الصحيحة والمراجع المعتمدة
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2 text-[#b8ccc4] hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 text-xs"
          title="بدء محادثة جديدة"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">محادثة جديدة</span>
        </button>
      </div>

      {/* Suggested Questions Ribbon */}
      <div className="p-3 bg-[#fbf9f4] border-b border-[#eee8dc] overflow-x-auto whitespace-nowrap scrollbar-thin">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#8d6919] flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>أسئلة مقترحة:</span>
          </span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#0c3227] hover:text-white text-[#3c4c44] border border-[#dcd3c0] text-xs font-semibold transition-all shadow-xs flex-shrink-0 active:scale-95 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#faf7f0]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isUser
                    ? 'bg-[#c59b27] text-[#0c3227]'
                    : 'bg-[#0c3227] text-white border border-[#215a48]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#e5c158]" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 shadow-sm text-right ${
                  isUser
                    ? 'bg-[#0c3227] text-white rounded-tl-none'
                    : 'bg-white text-[#1a2e26] border border-[#e2d8c5] rounded-tr-none'
                }`}
              >
                {/* Text Content */}
                <div className="leading-relaxed whitespace-pre-wrap">
                  {isUser ? (
                    <p className="text-xs sm:text-sm text-white font-medium">{msg.text}</p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}
                </div>

                {/* Timestamp */}
                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-[#b8ccc4] text-left' : 'text-[#8b9991] text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0c3227] text-white flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-[#e5c158]" />
            </div>
            <div className="bg-white rounded-2xl rounded-tr-none p-4 border border-[#e2d8c5] shadow-sm flex items-center gap-3 text-xs text-[#0c3227] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-[#c59b27]" />
              <span>مرشد السيرة يستحضر الإجابة من المصادر والمراجع المعتمدة...</span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-xs text-red-800">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold">تنبيه أثناء الاتصال:</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#eee8dc]">
        <div className="flex items-center gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك هنا عن السيرة النبوية (مثال: ما هي معجزات الهجرة؟ أو صف لي غار حراء...)"
            rows={1}
            disabled={isLoading}
            className="flex-1 py-3 px-4 text-xs sm:text-sm bg-[#faf7f0] border border-[#d8cfbe] rounded-xl focus:outline-none focus:border-[#0c3227] focus:bg-white resize-none text-right transition-all max-h-32"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-xl bg-gradient-to-l from-[#d4af37] to-[#c59b27] hover:from-[#c59b27] hover:to-[#b3881e] text-[#0c3227] font-bold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md active:scale-95 flex-shrink-0"
            aria-label="إرسال السؤال"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5 transform -rotate-180" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#808d85] mt-2 px-1">
          <span>اضغط Enter للإرسال • Shift+Enter لسطر جديد</span>
          <span className="flex items-center gap-1 text-[#8d6919]">
            <Quote className="w-3 h-3 text-[#c59b27]" />
            <span>مدعوم بـ Google Gemini API الرسمي</span>
          </span>
        </div>
      </div>
    </div>
  );
};
