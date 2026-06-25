import React from 'react';

interface Props { lang: 'tr' | 'en'; onSolo: () => void; onBack: () => void; }

const T = {
  tr: { title: 'Nasıl oynamak istersin?', solo: 'Solo Oyna', mp: 'Çok Oyunculu (Yakında)', back: '← Geri' },
  en: { title: 'How do you want to play?', solo: 'Play Solo', mp: 'Multiplayer (Coming Soon)', back: '← Back' },
};

const btn: React.CSSProperties = {
  width: '100%', maxWidth: 300, padding: '18px 24px', borderRadius: 14,
  border: '2px solid rgba(255,255,255,0.6)', marginBottom: 14,
  color: '#fff', fontSize: 17, fontWeight: 700, cursor: 'pointer', background: 'none',
};

export default function ModeScreen({ lang, onSolo, onBack }: Props) {
  const t = T[lang];
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)',
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 28, textAlign: 'center' }}>{t.title}</div>
      <button style={btn} onClick={onSolo}>🎯 &nbsp;{t.solo}</button>
      <button style={{ ...btn, borderColor: 'rgba(255,255,255,0.25)', opacity: 0.5, cursor: 'not-allowed' }} disabled>
        🌍 &nbsp;{t.mp}
      </button>
      <button onClick={onBack} style={{ marginTop: 8, padding: '10px 0', background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: 15, cursor: 'pointer' }}>
        {t.back}
      </button>
    </div>
  );
}
