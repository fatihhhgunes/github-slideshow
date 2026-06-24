import React from 'react';
import { QUIZ_COUNTRIES } from '../../data/questions';
import { getAllScores } from '../../data/scores';

interface Props {
  lang: 'tr' | 'en'; countryIdx: number; playerName: string;
  score: number; answers: boolean[]; onPlayAgain: () => void;
}

const T = {
  tr: { title: 'QUIZ BİTTİ', again: 'Tekrar Oyna', correct: 'Doğru', wrong: 'Yanlış', total: 'TOPLAM PUAN', ranking: 'ÜLKE SIRALAMASI' },
  en: { title: 'QUIZ OVER',  again: 'Play Again',  correct: 'Correct', wrong: 'Wrong', total: 'TOTAL SCORE',  ranking: 'COUNTRY RANKING' },
};

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_GLOW   = ['rgba(255,215,0,0.6)', 'rgba(192,192,192,0.4)', 'rgba(205,127,50,0.4)'];
const ORDER   = [1, 0, 2];  // display: silver, gold, bronze
const HEIGHTS = [80, 110, 60];

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

  const allScores  = getAllScores();
  const playerRank = allScores.findIndex(e => e.idx === countryIdx) + 1;
  const top3       = allScores.slice(0, 3);
  const rows4to10  = allScores.slice(3, 10);
  const rankColor  = playerRank <= 3 ? '#FFD700' : playerRank <= 10 ? '#C0C0C0' : 'rgba(255,255,255,0.4)';

  return (
    <div style={{ flex: 1, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px 40px' }}>

        {/* Player result banner */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.09)', borderRadius: 18,
          border: '1.5px solid rgba(255,255,255,0.15)', padding: '16px 20px',
          width: '100%', maxWidth: 440, marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{country.f}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', flex: 1 }}>{playerName}</span>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '4px 10px', border: `1px solid ${rankColor}` }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: rankColor }}>#{playerRank}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{
              flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12,
              border: `1px solid ${grade.color}40`,
            }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>{score}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{t.total}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { v: correct, l: t.correct, c: '#43a047' },
                { v: wrong,   l: t.wrong,   c: '#e53935' },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px',
                  border: `1px solid ${s.c}40`,
                }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{s.l}</span>
                  <span style={{ fontSize: 16, fontWeight: 900, color: s.c }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 14, fontWeight: 800, color: grade.color, textAlign: 'center', marginBottom: 10 }}>{grade.label}</div>

          <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {answers.map((ok, i) => (
              <div key={i} style={{
                width: 20, height: 20, borderRadius: 10,
                backgroundColor: ok ? '#43a047' : '#e53935',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 8, color: '#fff' }}>{ok ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div style={{ width: '100%', maxWidth: 440, marginBottom: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 3, color: '#FFD700', textAlign: 'center', marginBottom: 14 }}>
            {t.ranking}
          </div>

          {/* Podium */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            {ORDER.map((idx, pos) => {
              const entry = top3[idx];
              if (!entry) return null;
              const color    = MEDAL_COLORS[idx];
              const glow     = MEDAL_GLOW[idx];
              const h        = HEIGHTS[pos];
              const isPlayer = entry.idx === countryIdx;
              return (
                <div key={entry.country.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 18 }}>{entry.country.f}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', textAlign: 'center', maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.country.n}</span>
                  <span style={{ fontSize: 9, color, fontWeight: 900 }}>{entry.score.toLocaleString('tr')}</span>
                  <div style={{
                    width: 70, height: h, borderRadius: '6px 6px 0 0',
                    backgroundColor: `${color}22`, border: `1.5px solid ${color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isPlayer ? `0 0 12px ${glow}` : 'none',
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color }}>{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rows 4-10 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {rows4to10.map((entry, i) => {
              const rank     = i + 4;
              const isPlayer = entry.idx === countryIdx;
              return (
                <div key={entry.country.n} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                  backgroundColor: isPlayer ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isPlayer ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.4)', minWidth: 24 }}>#{rank}</span>
                  <span style={{ fontSize: 16 }}>{entry.country.f}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isPlayer ? '#FFD700' : '#fff', flex: 1 }}>{entry.country.n}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(0,200,255,0.8)' }}>{entry.score.toLocaleString('tr')}</span>
                </div>
              );
            })}

            {/* Show player row if rank > 10 */}
            {playerRank > 10 && (
              <>
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 16, padding: '4px 0' }}>•••</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                  backgroundColor: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.4)',
                  borderRadius: 10,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: '#FFD700', minWidth: 24 }}>#{playerRank}</span>
                  <span style={{ fontSize: 16 }}>{country.f}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#FFD700', flex: 1 }}>{country.n}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(0,200,255,0.8)' }}>{allScores[playerRank - 1]?.score.toLocaleString('tr')}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <button onClick={onPlayAgain} style={{
          backgroundColor: '#7b2fbe', borderRadius: 14, padding: '14px 40px',
          color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', border: 'none',
        }}>{t.again}</button>
      </div>
    </div>
  );
}
