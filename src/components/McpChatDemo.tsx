'use client';

import { useEffect, useRef, useState } from 'react';

// Animowana przykladowa rozmowa na /mcp i /pl/mcp. Cala tresc jest w HTML od poczatku (SEO,
// brak JS), a ukrywanie idzie przez opacity/visibility - wysokosc pudelka jest stala, wiec
// animacja nie przesuwa strony. Start, gdy rozmowa wjedzie w widok; bez JS (noscript) i przy
// prefers-reduced-motion widac od razu calosc.
//
// Kolejnosc: 1) wiadomosc uzytkownika pisze sie znak po znaku, 2) asystent wola narzedzie -
// chip ze spinnerem, po chwili ptaszek i odpowiedz, 3) to samo dla kolejnego narzedzia.

export interface ChatMessage {
  who: string;
  text: string;
  tool?: string;
}

type ToolState = 'hidden' | 'running' | 'done';

const TYPE_MS = 16;
const TOOL_RUN_MS = [900, 1700];

export default function McpChatDemo({ label, chat, accent }: { label: string; chat: readonly ChatMessage[]; accent: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  // -1 = przed startem (SSR i pierwszy render: wszystko ukryte, ale w DOM).
  const [typed, setTyped] = useState(-1);
  const [tools, setTools] = useState<ToolState[]>(() => chat.map(() => 'hidden'));
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTyped(chat[0].text.length);
      setTools(chat.map(() => 'done'));
      setShown(true);
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      setShown(true);
      const first = chat[0].text;
      let t = 300;
      for (let i = 0; i <= first.length; i++) at(t + i * TYPE_MS, () => setTyped(i));
      t += first.length * TYPE_MS + 500;
      chat.slice(1).forEach((_, k) => {
        const idx = k + 1;
        at(t, () => setTools((s) => s.map((v, j) => (j === idx ? 'running' : v))));
        t += TOOL_RUN_MS[k] ?? 1000;
        at(t, () => setTools((s) => s.map((v, j) => (j === idx ? 'done' : v))));
        t += 700;
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [chat]);

  return (
    <div ref={boxRef} className={`mcp-chat${shown ? ' is-on' : ''}`} aria-label={label} role="group">
      <noscript>
        <style>{`.mcp-chat .mcp-anim { opacity: 1 !important; transform: none !important; } .mcp-chat .mcp-hide { visibility: visible !important; }`}</style>
      </noscript>
      <p className="mcp-chat-label">{label}</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {chat.map((m, i) => {
          if (i === 0) {
            const n = Math.max(0, typed);
            return (
              <div key={i} className={`mcp-msg mcp-msg-user mcp-anim${typed >= 0 ? ' is-in' : ''}`}>
                <span className="mcp-msg-who">{m.who}</span>
                <p style={{ margin: 0 }}>
                  {m.text.slice(0, n)}
                  {typed >= 0 && n < m.text.length && <span className="mcp-caret" aria-hidden />}
                  <span className="mcp-hide" style={{ visibility: typed >= m.text.length ? 'visible' : 'hidden' }}>
                    {m.text.slice(n)}
                  </span>
                </p>
              </div>
            );
          }
          const state = tools[i];
          return (
            <div key={i} className={`mcp-msg mcp-anim${state !== 'hidden' ? ' is-in' : ''}`}>
              <span className="mcp-msg-who">{m.who}</span>
              {m.tool && (
                <span className={`mcp-msg-tool${state === 'done' ? ' is-done' : ''}`}>
                  {state === 'done' ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <span className="mcp-spin" aria-hidden />
                  )}
                  {m.tool}
                </span>
              )}
              <p className="mcp-hide" style={{ margin: 0, visibility: state === 'done' ? 'visible' : 'hidden' }}>
                {m.text}
              </p>
              {state === 'running' && (
                <span className="mcp-dots" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        .mcp-chat { border: 1px solid #dfe1e7; border-radius: 16px; padding: 20px 20px 22px; background: #f8fafb; }
        .mcp-chat-label { font-size: 12px; font-weight: 700; color: #818898; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 14px; }
        .mcp-anim { opacity: 0; transform: translateY(8px); transition: opacity 0.35s ease, transform 0.35s ease; }
        .mcp-anim.is-in { opacity: 1; transform: none; }
        .mcp-msg { position: relative; }
        .mcp-caret { display: inline-block; width: 2px; height: 1.05em; margin-left: 1px; vertical-align: -0.15em; background: ${accent}; animation: mcp-blink 0.8s steps(1) infinite; }
        .mcp-msg-tool.is-done { color: #1f7a3d; background: #eaf6ee; border-color: #cfe9d8; }
        .mcp-spin { width: 10px; height: 10px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: mcp-rot 0.7s linear infinite; }
        .mcp-dots { position: absolute; left: 14px; bottom: 14px; display: inline-flex; gap: 4px; }
        .mcp-dots i { width: 6px; height: 6px; border-radius: 50%; background: #a4acb9; animation: mcp-dot 1s ease-in-out infinite; }
        .mcp-dots i:nth-child(2) { animation-delay: 0.15s; }
        .mcp-dots i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes mcp-blink { 50% { opacity: 0; } }
        @keyframes mcp-rot { to { transform: rotate(360deg); } }
        @keyframes mcp-dot { 0%, 80%, 100% { opacity: 0.3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
        @media (prefers-reduced-motion: reduce) {
          .mcp-anim { transition: none; }
          .mcp-caret, .mcp-spin, .mcp-dots i { animation: none; }
        }
      `}</style>
    </div>
  );
}
