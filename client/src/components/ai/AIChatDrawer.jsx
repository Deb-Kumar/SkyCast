import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Loader2,
  Compass,
  ShieldCheck,
  Copy,
  Check,
  Thermometer,
  CloudRain,
  Activity,
  Wind,
  RefreshCw
} from 'lucide-react';
import { aiAPI } from '../../services/api';
import { useWeather } from '../../context/WeatherContext';

const PROMPT_SUGGESTIONS = [
  '☔ Should I carry an umbrella today?',
  '⚽ Can I play football at 5 PM?',
  '👕 What should I wear today?',
  '🧳 Is tomorrow good for travelling?'
];

export const AIChatDrawer = () => {
  const { activeLocation, weatherData } = useWeather();
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: `Hello! I'm **SkyCast AI**, your meteorological intelligence consultant.\n\nI am grounded in live, verified weather telemetry for **${activeLocation.city || 'your location'}**.\n\nAsk me anything about rainfall projections, outdoor sports suitability, clothing advice, or weekend travel plans!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleSend = async (queryText) => {
    const text = queryText || input;
    if (!text || !text.trim() || loading) return;

    const userMsg = { role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await aiAPI.chat({
        prompt: text,
        lat: activeLocation.latitude,
        lon: activeLocation.longitude,
        locationName: activeLocation.city
      });

      if (res.data?.success && res.data?.data) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content: res.data.data.reply,
            groundedMetrics: res.data.data.groundedMetrics,
            location: res.data.data.location,
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      console.error('AI chat failed:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: '⚠️ I encountered an issue connecting to the meteorological reasoning engine. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-6 flex flex-col h-[650px] relative overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">SkyCast Grounded AI</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30">
                Gemini Multi-Model
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Context: <strong className="text-slate-200">{activeLocation.city || 'Current Area'}</strong> ({weatherData?.current?.temperature || '--'}°C • {weatherData?.current?.condition || 'Live'})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Grounded Telemetry
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto py-5 space-y-5 pr-1.5 scrollbar-thin">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';

          return (
            <div
              key={idx}
              className={`flex gap-3 items-start ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600/40 to-sky-600/40 border border-indigo-500/30 flex items-center justify-center text-indigo-300 flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 transition-all shadow-md ${
                  isUser
                    ? 'bg-gradient-to-tr from-sky-600 to-indigo-600 text-white rounded-tr-sm shadow-sky-500/15'
                    : 'bg-slate-900/85 border border-white/10 text-slate-100 rounded-tl-sm shadow-black/20'
                }`}
              >
                {/* Grounded Metrics Bar on Model Responses */}
                {!isUser && m.groundedMetrics && (
                  <div className="flex flex-wrap items-center gap-2 pb-3 mb-3 border-b border-white/10 text-[11px]">
                    {m.groundedMetrics.temp !== undefined && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-sky-400">
                        <Thermometer className="w-3.5 h-3.5" />
                        {m.groundedMetrics.temp}°C
                      </span>
                    )}
                    {m.groundedMetrics.rainChance !== undefined && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-cyan-400">
                        <CloudRain className="w-3.5 h-3.5" />
                        {m.groundedMetrics.rainChance}% Rain Risk
                      </span>
                    )}
                    {m.groundedMetrics.outdoorScore !== undefined && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-amber-400">
                        <Activity className="w-3.5 h-3.5" />
                        {m.groundedMetrics.outdoorScore}/100 Activity Score
                      </span>
                    )}
                  </div>
                )}

                {/* Rich Markdown Formatted Response */}
                {isUser ? (
                  <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                ) : (
                  <div className="ai-markdown-content text-xs sm:text-sm leading-relaxed space-y-2.5">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-base font-bold text-white mt-2 mb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-sm font-bold text-white mt-2 mb-1">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xs font-bold text-sky-300 mt-2 mb-1 uppercase tracking-wider">{children}</h3>,
                        p: ({ children }) => <p className="text-slate-200 leading-relaxed">{children}</p>,
                        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                        ul: ({ children }) => <ul className="space-y-1.5 my-2 pl-4 list-disc marker:text-sky-400">{children}</ul>,
                        ol: ({ children }) => <ol className="space-y-1.5 my-2 pl-4 list-decimal marker:text-sky-400">{children}</ol>,
                        li: ({ children }) => <li className="text-slate-200 leading-relaxed">{children}</li>,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-sky-500 pl-3 my-2 text-slate-300 italic">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 text-xs font-mono">
                            {children}
                          </code>
                        )
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* Footer action bar for model message */}
                {!isUser && (
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[11px] text-slate-400">
                    <span className="text-[10px]">
                      {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                    <button
                      onClick={() => handleCopy(m.content, idx)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                      title="Copy response"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px] font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-sky-300 bg-slate-900/80 p-3.5 rounded-2xl w-max border border-sky-500/20 shadow-lg animate-pulse">
            <Loader2 className="w-4 h-4 text-sky-400 animate-spin flex-shrink-0" />
            <span>Consulting Gemini neural models with live meteorological telemetry...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="pt-2 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {PROMPT_SUGGESTIONS.map((chip, i) => (
          <button
            key={i}
            onClick={() => handleSend(chip)}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-sky-500/15 border border-white/10 hover:border-sky-500/30 text-xs font-medium text-slate-300 hover:text-sky-300 transition-all transform hover:-translate-y-0.5"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-white/10"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about the weather, sports, clothing, or travel..."
          className="flex-1 bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/50 shadow-inner"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 text-white font-bold transition-all shadow-lg shadow-sky-500/25 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
