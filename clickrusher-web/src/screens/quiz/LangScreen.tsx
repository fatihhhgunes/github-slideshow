import React from 'react';

interface Props { onSelect: (lang: 'tr' | 'en') => void; }

const btn: React.CSSProperties = {
  width: '100%', maxWidth: 280, padding: '16px 0', borderRadius: 14,
  border: '2px solid rgba(255,255,255,0.6)', marginBottom: 14,
  color: '#fff', fontSize: 18, fontWeight: 700, cursor: 'pointer', background: 'none',
};

export default function LangScreen({ onSelect }: Props) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)',
    }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>⚽</div>
      <div style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 6 }}>ClickRusher</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 36, letterSpacing: 4 }}>QUIZ</div>
      <button style={btn} onClick={() => onSelect('tr')}>🇹🇷 &nbsp; Türkçe</button>
      <button style={btn} onClick={() => onSelect('en')}>🇬🇧 &nbsp; English</button>
    </div>
  );
}
