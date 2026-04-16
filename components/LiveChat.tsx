'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FAQ_PROMPTS, FAQ_ANSWERS } from '../data/faq';
import { start } from 'node:repl';

const MOBILE_SHEET_QUERY = '(max-width: 767px) and (pointer: coarse)';
const SHEET_CLOSE_THRESHOLD = 90;

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
};

type FaqId = keyof typeof FAQ_ANSWERS;

type LiveChatProps = {
  estimate?: string | null;
  onBookNow?: () => void;
};

const LiveChat: React.FC<LiveChatProps> = ({ estimate = null, onBookNow }) => {
  const [isMobileSheet, setIsMobileSheet] = useState(false);
  const [sheetDragY, setSheetDragY] = useState(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchDraggingRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [askedPromptIds, setAskedPromptIds] = useState<FaqId[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'bot',
      text: 'Hi — what would you like to know?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const promptMap = useMemo(() => {
    return new Map(FAQ_PROMPTS.map((prompt) => [prompt.id, prompt.label]));
  }, []);
  
  const visiblePrompts = useMemo(() => {
    return FAQ_PROMPTS.filter((prompt) => !askedPromptIds.includes(prompt.id as FaqId));
  }, [askedPromptIds]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia(MOBILE_SHEET_QUERY);

    const updateIsMobileSheet = () => {
      setIsMobileSheet(mediaQuery.matches);
    };

    updateIsMobileSheet();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateIsMobileSheet);
      return () => mediaQuery.removeEventListener('change', updateIsMobileSheet);
    }

    mediaQuery.addListener(updateIsMobileSheet);
    return () => mediaQuery.removeListener(updateIsMobileSheet);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen]);

  const handleSheetTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobileSheet) return;
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
    touchDraggingRef.current = true;
  };

  const handleSheetTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobileSheet || !touchDraggingRef.current || touchStartYRef.current == null) return;

    const currentY = e.touches[0]?.clientY ?? touchStartYRef.current;
    const deltaY = Math.max(0, currentY - touchStartYRef.current);
    setSheetDragY(deltaY);
  };

  const handleSheetTouchEnd = () => {
    if (!isMobileSheet) return;

    if (sheetDragY >= SHEET_CLOSE_THRESHOLD) {
      setIsOpen(false);
    }

    touchStartYRef.current = null;
    touchDraggingRef.current = false;
    setSheetDragY(0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
    
  const resolveAnswer = (id: FaqId): string => {
    const entry = FAQ_ANSWERS[id];

    if (typeof entry === 'function') {
      return entry(estimate);
    }

    return entry;
  };

  const handlePromptClick = (prompt: (typeof FAQ_PROMPTS)[number]) => {
    if (prompt.id === 'booking') {
      onBookNow?.();
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
      return;
    }

    setAskedPromptIds((prev) =>
      prev.includes(prompt.id as FaqId) ? prev : [...prev, prompt.id as FaqId]
    );
    
    const answer = resolveAnswer(prompt.id as FaqId);
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, type: 'user', text: prompt.label },
      { id: `bot-${Date.now()}`, type: 'bot', text: answer },
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
    setAskedPromptIds([]);
  };

  const handleViewServices = () => {
    onBookNow?.();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && 
        <div className="inset-0 z-40" />
      }

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-20">
        {isOpen ? (
          <div
            className={[
              "theme-card z-50 flex flex-col overflow-hidden rounded-3xl shadow-2xl",
              isMobileSheet
                ? "fixed inset-x-4 bottom-4 h-[min(78dvh,42rem)] max-w-lg mx-auto"
                : "absolute bottom-0 right-0 h-[min(42rem,calc(100dvh-7rem))] w-[380px]"
            ].join(' ')}
            style={
              isMobileSheet
                ? { 
                  transform: `translateY(${sheetDragY}px)`,
                  transition: touchDraggingRef.current ? 'none' : 'transform 180ms ease',
                }
                : undefined
            }
          >
            {isMobileSheet ? (
              <div
                className="flex cursor-grab flex-col items-center px-4 pt-3 touch-none"
                onTouchStart={handleSheetTouchStart}
                onTouchMove={(e) => {
                  const startY = touchStartYRef.current;
                  const currentY = e.touches[0]?.clientY ?? startY ?? 0;
                  const deltaY = startY == null ? 0 : Math.max(0, currentY - startY);

                  if (deltaY > 0) e.preventDefault();
                  handleSheetTouchMove(e);
                }}
                onTouchEnd={handleSheetTouchEnd}
              >
                <div className="mb-2 h-1.5 w-12 rounded-full bg-[var(--border)]" />
                </div>
            ) : null}
            
            <div className=" flex items-center justify-between border-b px-4 py-3">
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

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.type === 'bot'
                      ? 'theme-surface text-[var(--text)]'
                      : 'ml-auto theme-accent text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[var(--border)] px-4 py-4">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                Quick questions
              </p>

              <div className="max-h-24 overflow-y-auto pr-1 sm:max-h-28">
                <div className="flex flex-wrap gap-2">
                  {visiblePrompts.map((prompt) => (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => handlePromptClick(prompt)}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-left text-[11px] text-[var(--text)] transition hover:bg-white/10"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleViewServices}
                  className="theme-accent w-full rounded-2xl py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-[var(--text)] px-5 py-4 rounded-full shadow-lg hover:bg-white/20 transition"
          >
            Chat
          </button>
        )}
      </div>
    </>
  );
};

export default LiveChat;