import React, { useState } from 'react';
import { QUIZ_COUNTRIES } from '../../data/questions';

const BAD_WORDS = [
  'amk','amq','bok','orospu','pic','sik','yarrak','kahpe','oc',
  'amina','sikik','kic','ibne','pezevenk','serefsiz','gottum','got','bitch','fuck','shit','ass',
];

function normalize(s: string): string {
  return s.toLowerCase()
    .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s')
    .replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c')
    .replace(/[^a-z0-9]/g,'');
}

function hasProfanity(text: string): boolean {
  const n = normalize(text);
  return BAD_WORDS.some(w => n.includes(normalize(w)));
}

interface Props {
  lang: 'tr' | 'en';
  onConfirm: (countryIdx: number, name: string) => void;
  onBack: () => void;
}

const T = {
  tr: {
    title: 'Ülkeni seç', cont: 'Devam →', placeholder: 'Adın (zorunlu, min 2 harf)',
    errName: 'İsim zorunlu (en az 2 harf)', errProfanity: 'Uygunsuz kelime tespit edildi', errCountry: 'Lütfen bir ülke seç!',
  },
  en: {
    title: 'Choose your country', cont: 'Continue →', placeholder: 'Your name (required, min 2 chars)',
    errName: 'Name required (at least 2 chars)', errProfanity: 'Inappropriate word detected', errCountry: 'Please select a country!',
  },
};

export default function CountryScreen({ lang, onConfirm, onBack }: Props) {
  const [sel,        setSel]        = useState<number | null>(null);
  const [name,       setName]       = useState('');
  const [nameErr,    setNameErr]    = useState('');
  const [countryErr, setCountryErr] = useState('');
  const t = T[lang];

  const confirm = () => {
    const trimmed = name.trim();
    let valid = true;

    if (trimmed.length < 2) {
      setNameErr(t.errName); valid = false;
    } else if (hasProfanity(trimmed)) {
      setNameErr(t.errProfanity); valid = false;
    } else {
      setNameErr('');
    }

    if (sel === null) {
      setCountryErr(t.errCountry); valid = false;
    } else {
      setCountryErr('');
    }

    if (!valid) return;
    onConfirm(sel!, trimmed);
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 16, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)', overflowY: 'auto',
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 14 }}>{t.title}</div>

      <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 16, width: '100%', maxWidth: 420 }}>
        {countryErr && (
          <div style={{ color: '#e53935', fontSize: 11, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
            {countryErr}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {QUIZ_COUNTRIES.map((c, i) => (
            <button key={c.n} onClick={() => { setSel(i); setCountryErr(''); }} style={{
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
          value={name}
          onChange={e => { setName(e.target.value); setNameErr(''); }}
          maxLength={14}
          placeholder={t.placeholder}
          style={{
            width: '100%', boxSizing: 'border-box',
            border: `2px solid ${nameErr ? '#e53935' : '#ddd'}`, borderRadius: 10,
            padding: '12px 14px', fontSize: 15, color: '#222', display: 'block',
            marginBottom: nameErr ? 4 : 10,
          }}
        />
        {nameErr && (
          <div style={{ color: '#e53935', fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{nameErr}</div>
        )}

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
