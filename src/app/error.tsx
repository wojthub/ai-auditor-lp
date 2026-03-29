'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: '#0d0d12' }}>Coś poszło nie tak</h2>
      <button onClick={reset} style={{ padding: '8px 20px', borderRadius: 6, background: '#0b7983', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
        Spróbuj ponownie
      </button>
    </div>
  );
}
