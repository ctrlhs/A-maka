import React, { useState, useRef, useEffect } from 'react';
import {
  PaperPlaneTilt,
  ArrowClockwise,
  BookOpen,
  WarningCircle,
  CircleNotch,
  User,
  ChatCircleDots,
} from '@phosphor-icons/react';
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
      text: `السلام عليكم ورحمة الله وبركاته، أهلاً بكم في «مرشد السيرة النبوية».

يسعدني إرشادكم والتعريف بأحداث السيرة النبوية العطرة، وحياة النبي محمد ﷺ، ومعالم مكة المكرمة والمدينة المنورة المرتبطة بنزول الوحي وانطلاق رسالة الإسلام.

تعتمد الإجابات على القرآن الكريم، وصحيحي البخاري ومسلم، وأمهات كتب السيرة المعتمدة كـ «سيرة ابن هشام» و«الرحيق المختوم». تفضل بطرح سؤالك أو اختر أحد الأسئلة المقترحة.`,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
        err.message || 'تعذر الاتصال بالمرشد حالياً. يرجى التحقق من الاتصال والمحاولة ثانية.'
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
        text: 'تم بدء محادثة جديدة. تفضل بسؤالك حول أحداث السيرة النبوية أو الأماكن التاريخية المرتبطة بها.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMessage(null);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
        const headerText = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={index} className="text-sm sm:text-base font-bold text-[#0c3227] mt-3 mb-1.5">
            {headerText}
          </h4>
        );
      }

      if (trimmed.startsWith('المصادر والمراجع') || trimmed.startsWith('المراجع المعتمدة')) {
        return (
          <div key={index} className="mt-3 pt-2.5 border-t border-[#e8dfce] text-xs font-bold text-[#8d6919] flex items-center gap-1.5">
            <BookOpen size={16} className="text-[#c59b27]" />
            <span>{trimmed}</span>
          </div>
        );
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const bulletText = trimmed.replace(/^[-*•]\s*/, '');
        return (
          <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[#26372f] my-1 pr-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27] mt-2 flex-shrink-0" />
            <span className="leading-relaxed">{renderInlineFormatting(bulletText)}</span>
          </div>
        );
      }

      if (trimmed === '') {
        return <div key={index} className="h-1.5" />;
      }

      return (
        <p key={index} className="text-xs sm:text-sm text-[#26372f] leading-relaxed my-1">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
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
    <div className="bg-white rounded-2xl border border-[#ded5c2] shadow-sm overflow-hidden flex flex-col h-[560px] sm:h-[620px]" dir="rtl">
      {/* Chat Window Header */}
      <div className="p-4 bg-[#0c3227] text-white flex items-center justify-between border-b border-[#215a48]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#f5d77f]">
            <ChatCircleDots size={20} weight="bold" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              مرشد السيرة النبوية
            </h3>
            <p className="text-[11px] text-[#b8ccc4]">
              إجابات موثقة بالقرآن الكريم والأحاديث الصحيحة والمراجع المعتمدة
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-1.5 text-[#b8ccc4] hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 text-xs"
          title="بدء محادثة جديدة"
        >
          <ArrowClockwise size={16} />
          <span className="hidden sm:inline">محادثة جديدة</span>
        </button>
      </div>

      {/* Suggested Questions Ribbon */}
      <div className="p-2.5 bg-[#fbf9f4] border-b border-[#eee8dc] overflow-x-auto whitespace-nowrap scrollbar-thin">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-[#8d6919] flex-shrink-0 ml-1">
            أسئلة مقترحة:
          </span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#0c3227] hover:text-white text-[#3c4c44] border border-[#dcd3c0] text-xs transition-all flex-shrink-0 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#faf7f0]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                  isUser
                    ? 'bg-[#c59b27] text-[#0c3227]'
                    : 'bg-[#0c3227] text-white'
                }`}
              >
                {isUser ? <User size={14} weight="bold" /> : <ChatCircleDots size={14} weight="bold" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-xl p-3.5 sm:p-4 text-right ${
                  isUser
                    ? 'bg-[#0c3227] text-white rounded-tl-none'
                    : 'bg-white text-[#1a2e26] border border-[#e2d8c5] rounded-tr-none shadow-xs'
                }`}
              >
                <div className="leading-relaxed whitespace-pre-wrap">
                  {isUser ? (
                    <p className="text-xs sm:text-sm text-white font-medium">{msg.text}</p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}
                </div>

                <div
                  className={`mt-1.5 text-[10px] ${
                    isUser ? 'text-[#b8ccc4] text-left' : 'text-[#8b9991] text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#0c3227] text-white flex items-center justify-center flex-shrink-0">
              <ChatCircleDots size={14} weight="bold" />
            </div>
            <div className="bg-white rounded-xl rounded-tr-none p-3.5 border border-[#e2d8c5] flex items-center gap-2.5 text-xs text-[#0c3227] font-semibold">
              <CircleNotch size={16} className="animate-spin text-[#c59b27]" />
              <span>جاري استحضار الإجابة من المصادر المعتمدة...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-800">
            <WarningCircle size={18} className="text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold">تنبيه:</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="p-3 sm:p-3.5 bg-white border-t border-[#eee8dc]">
        <div className="flex items-center gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب سؤالك هنا عن السيرة النبوية أو الأماكن التاريخية..."
            rows={1}
            disabled={isLoading}
            className="flex-1 py-2.5 px-3.5 text-xs sm:text-sm bg-[#faf7f0] border border-[#d8cfbe] rounded-xl focus:outline-none focus:border-[#0c3227] focus:bg-white resize-none text-right transition-all max-h-28"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-[#0c3227] hover:bg-[#07241c] text-white font-bold flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="إرسال السؤال"
          >
            {isLoading ? (
              <CircleNotch size={18} className="animate-spin" />
            ) : (
              <PaperPlaneTilt size={18} weight="bold" className="transform -rotate-90" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#808d85] mt-1.5 px-1">
          <span>اضغط Enter للإرسال • Shift+Enter لسطر جديد</span>
          <span className="text-[#8d6919]">إجابات موثقة وفق الروايات المعتمدة</span>
        </div>
      </div>
    </div>
  );
};
