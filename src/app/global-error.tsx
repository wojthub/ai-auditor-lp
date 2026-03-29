'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 16, fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Coś poszło nie tak</h2>
        <button onClick={reset} style={{ padding: '8px 20px', borderRadius: 6, background: '#0b7983', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14 }}>
          Spróbuj ponownie
        </button>
      </body>
    </html>
  );
}
