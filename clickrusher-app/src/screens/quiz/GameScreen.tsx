import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Ellipse, Text as SvgText } from 'react-native-svg';
import { QUESTIONS, QUIZ_COUNTRIES } from '../../data/questions';

const Q_TOTAL = 7;
const Q_TIME  = 10000;

interface Props {
  lang:       'tr' | 'en';
  countryIdx: number;
  playerName: string;
  onFinish:   (score: number, answers: boolean[]) => void;
}

type Phase = 'question' | 'result';

const LABELS = ['A', 'B', 'C', 'D'];

const T = {
  tr: { q: 'Soru', of: '/ 7', score: 'Puan:', correct: '✓ Doğru cevap!', wrong: '✗ Yanlış', timeout: '⏱ Süre Doldu!', next: 'Sonraki soru...' },
  en: { q: 'Question', of: '/ 7', score: 'Score:', correct: '✓ Correct!', wrong: '✗ Wrong', timeout: "⏱ Time's Up!", next: 'Next question...' },
};

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
  const arcRef   = useRef(0);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextBar  = useRef(new Animated.Value(1)).current;

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const scheduleNext = useCallback((wasCorrect: boolean) => {
    const newAnswered = [...answered, wasCorrect];
    setAnswered(newAnswered);
    setPhase('result');
    nextBar.setValue(1);
    Animated.timing(nextBar, { toValue: 0, duration: 3200, useNativeDriver: false }).start();
    setTimeout(() => {
      if (qCur + 1 >= Q_TOTAL) {
        const c = newAnswered.filter(Boolean).length;
        onFinish(Math.max(0, c * 10 - (Q_TOTAL - c) * 2), newAnswered);
      } else {
        setQCur(q => q + 1);
        setChosen(null);
        setPhase('question');
      }
    }, 3200);
  }, [answered, qCur, nextBar, onFinish]);

  useEffect(() => {
    if (phase !== 'question') return;
    startRef.current = Date.now();
    setTimerSec(10);
    setArcOff(0);
    arcRef.current = 0;
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

  return (
    <LinearGradient colors={['#2d0a5e', '#6a1aad', '#3a0f72']} style={styles.wrap}>

      {/* Scrollable content */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Meta */}
        <View style={styles.meta}>
          <Text style={styles.metaText}>{t.q} {qCur + 1} {t.of}</Text>
          <Text style={styles.metaText}>{t.score} {score}</Text>
        </View>

        {/* Race track progress bar */}
        <View style={styles.track}>
          {Array.from({ length: Q_TOTAL }, (_, i) => {
            const isPast = i < qCur;
            const isCur  = i === qCur;
            const wasOk  = answered[i];
            const dotBg  = isPast
              ? (wasOk ? '#43a047' : '#e53935')
              : isCur ? '#fff' : 'rgba(255,255,255,0.2)';
            const lineBg = (i > 0 && i <= qCur)
              ? (answered[i - 1] ? '#43a047' : '#e53935')
              : 'rgba(255,255,255,0.2)';
            return (
              <React.Fragment key={i}>
                {i > 0 && <View style={[styles.trackLine, { backgroundColor: lineBg }]} />}
                <View style={[styles.trackDot, { backgroundColor: dotBg, borderWidth: isCur ? 2 : 0, borderColor: '#ffd700' }]}>
                  <Text style={[styles.trackLabel, { color: isCur ? '#222' : '#fff' }]}>
                    {isPast ? (wasOk ? '✓' : '✗') : `${i + 1}`}
                  </Text>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        {/* Timer + Question */}
        <View style={styles.qrow}>
          <Svg viewBox="0 0 80 88" width={65} height={71}>
            <Ellipse cx="20" cy="19" rx="7" ry="7" fill="none" stroke="#ffd700" strokeWidth="3" />
            <Line x1="20" y1="26" x2="30" y2="34" stroke="#ffd700" strokeWidth="2.5" />
            <Ellipse cx="60" cy="19" rx="7" ry="7" fill="none" stroke="#ffd700" strokeWidth="3" />
            <Line x1="60" y1="26" x2="50" y2="34" stroke="#ffd700" strokeWidth="2.5" />
            <Line x1="28" y1="76" x2="22" y2="84" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" />
            <Line x1="52" y1="76" x2="58" y2="84" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" />
            <Circle cx="40" cy="53" r="28" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
            <Circle
              cx="40" cy="53" r="24"
              fill="none"
              stroke={timerColor}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="150.8"
              strokeDashoffset={arcOff}
              transform="rotate(-90 40 53)"
            />
            <SvgText x="40" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">
              {timerSec}
            </SvgText>
          </Svg>
          <View style={styles.qtxtCard}>
            <Text style={styles.qtxt}>{qObj[lang] || qObj.tr}</Text>
          </View>
        </View>

        {/* Result panel */}
        {phase === 'result' && (
          <View style={styles.result}>
            <Text style={styles.resultHead}>
              {isTimeout ? t.timeout : isCorrect ? t.correct : t.wrong}
            </Text>
            <View style={[styles.rrow, isCorrect ? styles.rrowRight : styles.rrowWrong]}>
              <Text style={styles.rFlag}>{country.f}</Text>
              <Text style={styles.rName}>{playerName}</Text>
              {isCorrect && (
                <Text style={styles.rPts}>
                  +{Math.max(1, 10 - Math.floor((Date.now() - startRef.current) / 1000))}
                </Text>
              )}
            </View>
            <View style={styles.nqBarWrap}>
              <Animated.View style={[styles.nqBar, {
                width: nextBar.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              }]} />
            </View>
            <Text style={styles.nqText}>{t.next}</Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed bottom: answer options */}
      <View style={styles.optionsWrap}>
        {qObj.opts.map((opt, i) => {
          const isRight = phase === 'result' && i === qObj.ans;
          const isWrong = phase === 'result' && chosen === i && chosen !== qObj.ans;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.obtn, isRight && styles.obtnCorrect, isWrong && styles.obtnWrong]}
              onPress={() => onAnswer(i)}
              disabled={phase === 'result'}
              activeOpacity={0.75}
            >
              <View style={[styles.olbl, isRight && styles.olblCorrect, isWrong && styles.olblWrong]}>
                <Text style={[styles.olblText, isRight && { color: '#1b5e20' }, isWrong && { color: '#c62828' }]}>
                  {LABELS[i]}
                </Text>
              </View>
              <Text style={[styles.obtnText, isRight && { color: '#1b5e20' }, isWrong && { color: '#b71c1c' }]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </LinearGradient>
  );
}

function shuffle(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const styles = StyleSheet.create({
  wrap:    { flex: 1 },
  scroll:  { flex: 1 },
  content: { padding: 14, paddingTop: 60, paddingBottom: 8 },

  meta:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, opacity: 0.75 },
  metaText: { color: '#fff', fontSize: 13 },

  // Race track
  track:      { flexDirection: 'row', alignItems: 'center', marginBottom: 14, paddingHorizontal: 4 },
  trackDot:   { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  trackLabel: { fontSize: 9, fontWeight: '700' },
  trackLine:  { flex: 1, height: 3, borderRadius: 2 },

  // Question
  qrow:     { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 14 },
  qtxtCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12 },
  qtxt:     { fontSize: 15, fontWeight: '600', color: '#222', lineHeight: 22 },

  // Options
  optionsWrap: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 24, backgroundColor: 'rgba(26,6,46,0.92)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', gap: 8 },
  obtn:        { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 2, borderColor: 'transparent', borderRadius: 14, paddingVertical: 13, paddingHorizontal: 14 },
  obtnCorrect: { backgroundColor: '#e8f5e9', borderColor: '#43a047' },
  obtnWrong:   { backgroundColor: '#ffebee', borderColor: '#e53935' },
  olbl:        { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f0e8ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  olblCorrect: { backgroundColor: '#c8e6c9' },
  olblWrong:   { backgroundColor: '#ffcdd2' },
  olblText:    { color: '#7b2fbe', fontWeight: '700', fontSize: 13 },
  obtnText:    { flex: 1, color: '#333', fontSize: 14, fontWeight: '600' },

  // Result
  result:     { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: 14, marginTop: 4 },
  resultHead: { fontSize: 13, fontWeight: '700', color: '#ffd700', marginBottom: 8 },
  rrow:       { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, marginTop: 4 },
  rrowRight:  { backgroundColor: 'rgba(67,160,71,0.25)' },
  rrowWrong:  { backgroundColor: 'rgba(229,57,53,0.15)' },
  rFlag:      { fontSize: 22 },
  rName:      { flex: 1, fontSize: 14, color: '#fff' },
  rPts:       { fontSize: 16, fontWeight: '800', color: '#ffd700' },
  nqBarWrap:  { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 4, marginTop: 12, overflow: 'hidden' },
  nqBar:      { height: '100%', backgroundColor: '#ffd700' },
  nqText:     { textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 },
});
