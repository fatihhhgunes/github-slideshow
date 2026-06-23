import React, { useState } from 'react';
import { QUIZ_COUNTRIES } from '../../data/questions';

interface Props {
  lang: 'tr' | 'en';
  onConfirm: (countryIdx: number, name: string) => void;
  onBack: () => void;
}

const T = {
  tr: { title: 'Ülkeni seç', cont: 'Devam →', placeholder: 'Adın (isteğe bağlı)', err: 'Lütfen bir ülke seç!' },
  en: { title: 'Choose your country', cont: 'Continue →', placeholder: 'Your name (optional)', err: 'Please select a country!' },
};

export default function CountryScreen({ lang, onConfirm, onBack }: Props) {
  const [sel, setSel] = useState<number | null>(null);
  const [name, setName] = useState('');
  const t = T[lang];

  const confirm = () => {
    if (sel === null) { alert(t.err); return; }
    onConfirm(sel, name.trim() || QUIZ_COUNTRIES[sel].n);
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 16, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)', overflowY: 'auto',
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 14 }}>{t.title}</div>

      <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 16, width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {QUIZ_COUNTRIES.map((c, i) => (
            <button key={c.n} onClick={() => setSel(i)} style={{
              width: 'calc(25% - 5px)', padding: 8, borderRadius: 10, cursor: 'pointer',
              border: `2px solid ${sel === i ? '#7b2fbe' : 'transparent'}`,
              backgroundColor: sel === i ? '#d9bcff' : '#f4eeff',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            }}>
              <span style={{ fontSize: 24 }}>{c.f}</span>
              <span style={{ fontSize: 9, textAlign: 'center', color: '#555' }}>{c.n}</span>
            </button>
          ))}
        </div>

        <input
          value={name} onChange={e => setName(e.target.value)} maxLength={14}
          placeholder={t.placeholder}
          style={{
            width: '100%', border: '2px solid #ddd', borderRadius: 10,
            padding: '12px 14px', fontSize: 15, marginBottom: 10, color: '#222', display: 'block',
          }}
        />

        <button onClick={confirm} style={{
          width: '100%', backgroundColor: '#7b2fbe', borderRadius: 14, padding: '14px 0',
          color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8, cursor: 'pointer', border: 'none',
        }}>{t.cont}</button>

        <button onClick={onBack} style={{
          width: '100%', padding: '8px 0', background: 'none', border: 'none',
          color: '#888', fontSize: 14, cursor: 'pointer',
        }}>← Geri</button>
      </div>
    </div>
  );
}
