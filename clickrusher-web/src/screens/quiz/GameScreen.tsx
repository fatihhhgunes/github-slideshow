import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QUESTIONS, QUIZ_COUNTRIES } from '../../data/questions';

const Q_TOTAL = 7;
const Q_TIME  = 10000;
const LABELS  = ['A', 'B', 'C', 'D'];

const T = {
  tr: { q:'Soru', of:'/ 7', score:'Puan:', correct:'✓ Doğru cevap!', wrong:'✗ Yanlış', timeout:'⏱ Süre Doldu!', next:'Sonraki soru...' },
  en: { q:'Question', of:'/ 7', score:'Score:', correct:'✓ Correct!', wrong:'✗ Wrong', timeout:"⏱ Time's Up!", next:'Next question...' },
};

function shuffle(n: number) {
  const a = Array.from({length:n},(_,i)=>i);
  for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

interface Props {
  lang: 'tr' | 'en'; countryIdx: number; playerName: string;
  onFinish: (score: number, answers: boolean[]) => void;
}

type Phase = 'question' | 'result';

export default function GameScreen({ lang, countryIdx, playerName, onFinish }: Props) {
  const country = QUIZ_COUNTRIES[countryIdx];
  const t = T[lang];

  const [qIdxs]    = useState<number[]>(() => shuffle(QUESTIONS.length).slice(0, Q_TOTAL));
  const [qCur,     setQCur]     = useState(0);
  const [score,    setScore]    = useState(0);
  const [phase,    setPhase]    = useState<Phase>('question');
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [chosen,   setChosen]   = useState<number | null>(null);
  const [timerSec, setTimerSec] = useState(10);
  const [arcOff,   setArcOff]   = useState(0);
  const [barW,     setBarW]     = useState(100);

  const startRef  = useRef(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const barRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (barRef.current)   { clearInterval(barRef.current);   barRef.current = null; }
  }, []);

  const scheduleNext = useCallback((wasCorrect: boolean) => {
    const newAnswered = [...answered, wasCorrect];
    setAnswered(newAnswered);
    setPhase('result');
    setBarW(100);

    const start = Date.now();
    barRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setBarW(Math.max(0, 100 - (elapsed / 3200) * 100));
    }, 50);

    setTimeout(() => {
      stopTimer();
      if (qCur + 1 >= Q_TOTAL) {
        const correct = newAnswered.filter(Boolean).length;
        const finalScore = correct * 10 - (Q_TOTAL - correct) * 2;
        onFinish(Math.max(0, finalScore), newAnswered);
      } else {
        setQCur(q => q + 1);
        setChosen(null);
        setPhase('question');
      }
    }, 3200);
  }, [answered, qCur, stopTimer, onFinish]);

  useEffect(() => {
    if (phase !== 'question') return;
    startRef.current = Date.now();
    setTimerSec(10); setArcOff(0);
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const rem = Math.max(0, Q_TIME - elapsed);
      setTimerSec(Math.ceil(rem / 1000));
      setArcOff(150.8 * (1 - rem / Q_TIME));
      if (rem <= 0) { stopTimer(); setChosen(-1); scheduleNext(false); }
    }, 80);
    return stopTimer;
  }, [qCur, phase]);

  const onAnswer = (idx: number) => {
    if (phase !== 'question' || chosen !== null) return;
    stopTimer();
    const qObj = QUESTIONS[qIdxs[qCur]];
    const correct = idx === qObj.ans;
    if (correct) {
      const elapsed = Date.now() - startRef.current;
      setScore(s => s + Math.max(1, 10 - Math.floor(elapsed / 1000)));
    }
    setChosen(idx);
    scheduleNext(correct);
  };

  const qObj      = QUESTIONS[qIdxs[qCur]];
  const isCorrect = chosen !== null && chosen === qObj.ans;
  const isTimeout = chosen === -1;
  const timerColor = timerSec <= 3 ? '#ff5722' : '#ffd700';
  const circumference = 150.8;

  return (
    <div style={{ flex: 1, background: 'linear-gradient(180deg,#2d0a5e,#6a1aad,#3a0f72)', overflowY: 'auto' }}>
      <div style={{ padding: '14px 14px 40px', paddingTop: 60 }}>

        {/* Meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, opacity: 0.75 }}>
          <span style={{ color: '#fff', fontSize: 13 }}>{t.q} {qCur+1} {t.of}</span>
          <span style={{ color: '#fff', fontSize: 13 }}>{t.score} {score}</span>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 14 }}>
          {Array.from({length:Q_TOTAL},(_,i) => (
            <div key={i} style={{
              width: 30, height: 5, borderRadius: 3,
              backgroundColor: i < qCur ? '#ffd700' : i === qCur ? '#fff' : 'rgba(255,255,255,0.25)',
            }} />
          ))}
        </div>

        {/* Timer + Question */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
          <svg viewBox="0 0 80 88" width={65} height={71} style={{ flexShrink: 0 }}>
            <ellipse cx="20" cy="19" rx="7" ry="7" fill="none" stroke="#ffd700" strokeWidth="3" />
            <line x1="20" y1="26" x2="30" y2="34" stroke="#ffd700" strokeWidth="2.5" />
            <ellipse cx="60" cy="19" rx="7" ry="7" fill="none" stroke="#ffd700" strokeWidth="3" />
            <line x1="60" y1="26" x2="50" y2="34" stroke="#ffd700" strokeWidth="2.5" />
            <line x1="28" y1="76" x2="22" y2="84" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="52" y1="76" x2="58" y2="84" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="53" r="28" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
            <circle cx="40" cy="53" r="24" fill="none" stroke={timerColor} strokeWidth="5.5"
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={arcOff}
              transform="rotate(-90 40 53)" />
            <text x="40" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">{timerSec}</text>
          </svg>
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 14, boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#222', lineHeight: 1.5 }}>{qObj[lang] || qObj.tr}</span>
          </div>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {qObj.opts.map((opt, i) => {
            const isRight = phase === 'result' && i === qObj.ans;
            const isWrong = phase === 'result' && chosen === i && chosen !== qObj.ans;
            return (
              <button key={i} onClick={() => onAnswer(i)} disabled={phase === 'result'} style={{
                display: 'flex', alignItems: 'center', gap: 0,
                backgroundColor: isRight ? '#e8f5e9' : isWrong ? '#ffebee' : '#fff',
                border: `2px solid ${isRight ? '#43a047' : isWrong ? '#e53935' : 'transparent'}`,
                borderRadius: 14, padding: '13px 14px', cursor: phase === 'result' ? 'default' : 'pointer',
                textAlign: 'left',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14, marginRight: 12, flexShrink: 0,
                  backgroundColor: isRight ? '#c8e6c9' : isWrong ? '#ffcdd2' : '#f0e8ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: isRight ? '#1b5e20' : isWrong ? '#c62828' : '#7b2fbe', fontWeight: 700, fontSize: 13 }}>{LABELS[i]}</span>
                </div>
                <span style={{ flex: 1, color: isRight ? '#1b5e20' : isWrong ? '#b71c1c' : '#333', fontSize: 14, fontWeight: 600 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Result panel */}
        {phase === 'result' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: 14, marginTop: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ffd700', marginBottom: 8 }}>
              {isTimeout ? t.timeout : isCorrect ? t.correct : t.wrong}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, marginTop: 4,
              backgroundColor: isCorrect ? 'rgba(67,160,71,0.25)' : 'rgba(229,57,53,0.15)',
            }}>
              <span style={{ fontSize: 22 }}>{country.f}</span>
              <span style={{ flex: 1, fontSize: 14, color: '#fff' }}>{playerName}</span>
              {isCorrect && (
                <span style={{ fontSize: 16, fontWeight: 800, color: '#ffd700' }}>
                  +{Math.max(1, 10 - Math.floor((Date.now() - startRef.current) / 1000))}
                </span>
              )}
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 4, marginTop: 12, overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: '#ffd700', width: `${barW}%`, transition: 'width 50ms linear' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{t.next}</div>
          </div>
        )}
      </div>
    </div>
  );
}
