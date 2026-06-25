import React, { useState } from 'react';
import { C, FF } from './theme';
import StarField from './components/StarField';
import HomeScreen from './screens/HomeScreen';
import { addQuizScore } from './data/scores';
import LangScreen from './screens/quiz/LangScreen';
import CountryScreen from './screens/quiz/CountryScreen';
import ModeScreen from './screens/quiz/ModeScreen';
import GameScreen from './screens/quiz/GameScreen';
import OverScreen from './screens/quiz/OverScreen';

type Tab      = 'home' | 'quiz';
type QuizStep = 'lang' | 'country' | 'mode' | 'game' | 'over';

function QuizFlow() {
  const [step,       setStep]       = useState<QuizStep>('lang');
  const [lang,       setLang]       = useState<'tr' | 'en'>('tr');
  const [countryIdx, setCountryIdx] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [answers,    setAnswers]    = useState<boolean[]>([]);

  if (step === 'lang')    return <LangScreen onSelect={l => { setLang(l); setStep('country'); }} />;
  if (step === 'country') return <CountryScreen lang={lang} onConfirm={(i,n) => { setCountryIdx(i); setPlayerName(n); setStep('mode'); }} onBack={() => setStep('lang')} />;
  if (step === 'mode')    return <ModeScreen lang={lang} onSolo={() => setStep('game')} onBack={() => setStep('country')} />;
  if (step === 'game')    return <GameScreen lang={lang} countryIdx={countryIdx} playerName={playerName} onFinish={(s,a) => { addQuizScore(countryIdx, s); setFinalScore(s); setAnswers(a); setStep('over'); }} />;
  return <OverScreen lang={lang} countryIdx={countryIdx} playerName={playerName} score={finalScore} answers={answers} onPlayAgain={() => setStep('lang')} />;
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: C.bg, position: 'relative' }}>
      <StarField />

      {/* Screen area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        {tab === 'home' ? <HomeScreen onNavigateQuiz={() => setTab('quiz')} /> : <QuizFlow />}
      </div>

      {/* Bottom Tab Bar */}
      <div style={{
        display: 'flex', backgroundColor: '#08101e',
        borderTop: '1px solid rgba(0,200,255,0.15)',
        height: 60, flexShrink: 0, zIndex: 10,
      }}>
        {([
          { key: 'home', label: 'TURNUVA', icon: '🌍' },
          { key: 'quiz', label: 'QUIZ',    icon: '❓' },
        ] as { key: Tab; label: string; icon: string }[]).map(item => (
          <button key={item.key} onClick={() => setTab(item.key)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{
              fontFamily: FF.bc, fontWeight: 700, fontSize: 10, letterSpacing: 1,
              color: tab === item.key ? C.cyan : C.dim,
            }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
