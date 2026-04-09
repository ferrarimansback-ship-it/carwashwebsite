'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FAQ_PROMPTS, FAQ_ANSWERS } from '../data/faq';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
};

type LiveChatProps = {
  estimate?: string | null;
  onBookNow?: () => void;
};

type FaqId = keyof typeof FAQ_ANSWERS;

const LiveChat: React.FC<LiveChatProps> = ({ estimate = null, onBookNow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: 'Hi — what would you like to know?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const promptMap = useMemo(() => {
    return new Map(FAQ_PROMPTS.map((prompt) => [prompt.id, prompt.label]));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const resolveAnswer = (id: FaqId): string => {
    const entry = FAQ_ANSWERS[id];

    if (!entry) {
      return 'Sorry, I do not have an answer for that yet.';
    }

    if (typeof entry === 'function') {
      return entry(estimate);
    }

    return entry;
  };

  const handlePromptClick = (id: FaqId) => {
    if (id === 'booking' && onBookNow) {
      onBookNow();
    }
    if (id === 'difference') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
    const userLabel = promptMap.get(id) ?? 'Question';
    const botAnswer = resolveAnswer(id);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${id}-${Date.now()}`,
        type: 'user',
        text: userLabel,
      },
      {
        id: `bot-${id}-${Date.now() + 1}`,
        type: 'bot',
        text: botAnswer,
      },
    ]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        type: 'bot',
        text: 'Hi — what would you like to know?',
      },
    ]);
  };

  return (
    <>
      <div className="fixed bottom-20 right-4 z-50">
        {isOpen ? (
          <div className="theme-card w-[min(92vw,380px)] overflow-hidden rounded-3xl shadow-2xl">
            <div className="theme-surface flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Live Chat</p>
                <p className="text-xs text-[var(--text-muted)]">Instant answers</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)] transition hover:bg-white/10"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:bg-white/10"
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[420px] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.type === 'bot'
                      ? 'theme-surface text-[var(--text)]'
                      : 'ml-auto theme-accent text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[var(--border)] px-4 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Quick questions
              </p>

              <div className="flex flex-wrap gap-2">
                {FAQ_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => handlePromptClick(prompt.id as FaqId)}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs text-[var(--text)] transition hover:bg-white/10"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={onBookNow}
                  className="theme-accent w-full rounded-2xl py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="backdrop-blur-md bg-white/10 border border-white/10 text-[var(--text)] px-5 py-4 rounded-full shadow-lg hover:bg-white/20 transition"
          >
            Chat
          </button>
        )}
      </div>
    </>
  );
};

export default LiveChat;