import React from 'react';
import { QUIZ_COUNTRIES } from '../../data/questions';

interface Props {
  lang: 'tr' | 'en'; countryIdx: number; playerName: string;
  score: number; answers: boolean[]; onPlayAgain: () => void;
}

const T = {
  tr: { title: 'Quiz Bitti! 🏆', again: 'Tekrar Oyna', correct: 'Doğru', wrong: 'Yanlış', total: 'Toplam Puan' },
  en: { title: 'Quiz Over! 🏆',  again: 'Play Again', correct: 'Correct', wrong: 'Wrong',  total: 'Total Score' },
};

export default function OverScreen({ lang, countryIdx, playerName, score, answers, onPlayAgain }: Props) {
  const t       = T[lang];
  const country = QUIZ_COUNTRIES[countryIdx];
  const correct = answers.filter(Boolean).length;
  const wrong   = answers.length - correct;
  const pct     = Math.round((correct / answers.length) * 100);

  const grade =
    pct >= 80 ? { label: '🏆 MÜKEMMEL',       color: '#FFD700' } :
    pct >= 60 ? { label: '⭐ İYİ',             color: '#00C8FF' } :
    pct >= 40 ? { label: '👍 FENA DEĞİL',      color: '#00FF88' } :
               { label: '📚 ÇALIŞMAYA DEVAM', color: '#FF8800' };

  return (
    <div style={{ flex: 1, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 40px', paddingTop: 60 }}>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', marginBottom: 20, textAlign: 'center' }}>{t.title}</div>

        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>{country.f}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>{playerName}</span>
          </div>

          <div style={{
            width: 120, height: 120, borderRadius: 60, backgroundColor: '#f0e8ff',
            border: '3px solid #7b2fbe', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#7b2fbe' }}>{score}</span>
            <span style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{t.total}</span>
          </div>

          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, letterSpacing: 1, color: grade.color }}>{grade.label}</div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16, width: '100%' }}>
            {[
              { v: correct, l: t.correct, c: '#43a047', bg: 'rgba(67,160,71,0.15)' },
              { v: wrong,   l: t.wrong,   c: '#e53935', bg: 'rgba(229,57,53,0.15)' },
              { v: `${pct}%`, l: 'Başarı', c: '#FFD700', bg: 'rgba(255,215,0,0.1)' },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, border: `1.5px solid ${s.c}`, borderRadius: 10, padding: 10, textAlign: 'center',
                backgroundColor: s.bg,
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#222' }}>{s.v}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: s.c, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, justifyContent: 'center' }}>
            {answers.map((ok, i) => (
              <div key={i} style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: ok ? '#43a047' : '#e53935' }} />
            ))}
          </div>

          <button onClick={onPlayAgain} style={{
            backgroundColor: '#7b2fbe', borderRadius: 14, padding: '14px 0',
            color: '#fff', fontWeight: 700, fontSize: 16, width: '100%', cursor: 'pointer', border: 'none',
          }}>{t.again}</button>
        </div>
      </div>
    </div>
  );
}
