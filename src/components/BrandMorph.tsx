'use client';

import { useState, useEffect } from 'react';

/**
 * Typing animation: CitatioNone → CitationOne
 * Types "CitatioNone", pauses, backspaces "None", types "nOne".
 * Then loops after a delay.
 */

const FULL_NONE = 'CitatioNone';
const FULL_ONE = 'CitationOne';
const STATIC_PREFIX = 'Citatio';

// Timing (ms)
const TYPE_SPEED = 80;
const DELETE_SPEED = 60;
const PAUSE_AFTER_NONE = 1200;
const PAUSE_AFTER_ONE = 4000;
const INITIAL_DELAY = 600;

type Phase = 'typing-none' | 'pause-none' | 'deleting' | 'typing-one' | 'pause-one' | 'deleting-one' | 'typing-none-again';

export default function BrandMorph() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;

    let phase: Phase = 'typing-none';
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      switch (phase) {
        case 'typing-none': {
          idx++;
          setText(FULL_NONE.slice(0, idx));
          if (idx >= FULL_NONE.length) {
            phase = 'pause-none';
            timer = setTimeout(tick, PAUSE_AFTER_NONE);
          } else {
            timer = setTimeout(tick, TYPE_SPEED);
          }
          break;
        }
        case 'pause-none': {
          phase = 'deleting';
          idx = FULL_NONE.length;
          timer = setTimeout(tick, DELETE_SPEED);
          break;
        }
        case 'deleting': {
          idx--;
          setText(FULL_NONE.slice(0, idx));
          if (idx <= STATIC_PREFIX.length) {
            phase = 'typing-one';
            idx = STATIC_PREFIX.length;
            timer = setTimeout(tick, TYPE_SPEED);
          } else {
            timer = setTimeout(tick, DELETE_SPEED);
          }
          break;
        }
        case 'typing-one': {
          idx++;
          setText(FULL_ONE.slice(0, idx));
          if (idx >= FULL_ONE.length) {
            phase = 'pause-one';
            timer = setTimeout(tick, PAUSE_AFTER_ONE);
          } else {
            timer = setTimeout(tick, TYPE_SPEED);
          }
          break;
        }
        case 'pause-one': {
          phase = 'deleting-one';
          idx = FULL_ONE.length;
          timer = setTimeout(tick, DELETE_SPEED);
          break;
        }
        case 'deleting-one': {
          idx--;
          setText(FULL_ONE.slice(0, idx));
          if (idx <= STATIC_PREFIX.length) {
            phase = 'typing-none-again';
            idx = STATIC_PREFIX.length;
            timer = setTimeout(tick, TYPE_SPEED);
          } else {
            timer = setTimeout(tick, DELETE_SPEED);
          }
          break;
        }
        case 'typing-none-again': {
          idx++;
          setText(FULL_NONE.slice(0, idx));
          if (idx >= FULL_NONE.length) {
            phase = 'pause-none';
            timer = setTimeout(tick, PAUSE_AFTER_NONE);
          } else {
            timer = setTimeout(tick, TYPE_SPEED);
          }
          break;
        }
      }
    }

    timer = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timer);
  }, [started]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Color the suffix after "Citatio"
  const prefix = text.slice(0, STATIC_PREFIX.length);
  const suffix = text.slice(STATIC_PREFIX.length);

  // Determine if we're in "One" state (suffix starts with "n" and has "O")
  const isOneState = suffix.length > 0 && suffix[0] === 'n';

  return (
    <span
      style={{
        fontSize: 'inherit',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
      aria-label="CitationOne"
    >
      {isOneState ? (
        <span style={{
          background: 'linear-gradient(90deg, #1a3a4a 0%, #0b7983 45%, #0b9aa6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>{text}</span>
      ) : (
        <>
          <span style={{ color: '#0d0d12' }}>{prefix}</span>
          <span style={{ color: '#a4acb9' }}>{suffix}</span>
        </>
      )}
      <span style={{
        color: '#0b7983',
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.08s',
        marginLeft: 1,
        fontWeight: 300,
      }}>|</span>
    </span>
  );
}
