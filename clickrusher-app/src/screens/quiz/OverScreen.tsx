import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QUIZ_COUNTRIES } from '../../data/questions';

interface Props {
  lang:        'tr' | 'en';
  countryIdx:  number;
  playerName:  string;
  score:       number;
  answers:     boolean[];
  onPlayAgain: () => void;
}

const T = {
  tr: { title: 'Quiz Bitti! 🏆', again: 'Tekrar Oyna', correct: 'Doğru', wrong: 'Yanlış', total: 'Toplam Puan' },
  en: { title: 'Quiz Over! 🏆',  again: 'Play Again', correct: 'Correct', wrong: 'Wrong',  total: 'Total Score'  },
};

export default function OverScreen({ lang, countryIdx, playerName, score, answers, onPlayAgain }: Props) {
  const t = T[lang];
  const country   = QUIZ_COUNTRIES[countryIdx];
  const correct   = answers.filter(Boolean).length;
  const wrong     = answers.length - correct;
  const pct       = Math.round((correct / answers.length) * 100);

  const grade =
    pct >= 80 ? { label: '🏆 MÜKEMMEL', color: '#FFD700' } :
    pct >= 60 ? { label: '⭐ İYİ',       color: '#00C8FF' } :
    pct >= 40 ? { label: '👍 FENA DEĞİL',color: '#00FF88' } :
                { label: '📚 ÇALIŞMAYA DEVAM', color: '#FF8800' };

  return (
    <LinearGradient colors={['#2d0a5e', '#6a1aad', '#3a0f72']} style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.title}</Text>

        <View style={styles.card}>
          {/* Player row */}
          <View style={styles.playerRow}>
            <Text style={styles.playerFlag}>{country.f}</Text>
            <Text style={styles.playerName}>{playerName}</Text>
          </View>

          {/* Score circle */}
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNum}>{score}</Text>
            <Text style={styles.scoreLabel}>{t.total}</Text>
          </View>

          {/* Grade */}
          <Text style={[styles.grade, { color: grade.color }]}>{grade.label}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: 'rgba(67,160,71,0.15)', borderColor: '#43a047' }]}>
              <Text style={styles.statNum}>{correct}</Text>
              <Text style={[styles.statLbl, { color: '#43a047' }]}>{t.correct}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: 'rgba(229,57,53,0.15)', borderColor: '#e53935' }]}>
              <Text style={styles.statNum}>{wrong}</Text>
              <Text style={[styles.statLbl, { color: '#e53935' }]}>{t.wrong}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: 'rgba(255,215,0,0.1)', borderColor: '#FFD700' }]}>
              <Text style={styles.statNum}>{pct}%</Text>
              <Text style={[styles.statLbl, { color: '#FFD700' }]}>Başarı</Text>
            </View>
          </View>

          {/* Answer history */}
          <View style={styles.history}>
            {answers.map((ok, i) => (
              <View key={i} style={[styles.dot, ok ? styles.dotOk : styles.dotFail]} />
            ))}
          </View>

          <TouchableOpacity style={styles.btn} onPress={onPlayAgain}>
            <Text style={styles.btnText}>{t.again}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  content: { alignItems: 'center', padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, width: '100%', maxWidth: 420, alignItems: 'center' },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  playerFlag: { fontSize: 28 },
  playerName: { fontSize: 18, fontWeight: '700', color: '#333' },
  scoreCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#f0e8ff', borderWidth: 3, borderColor: '#7b2fbe', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  scoreNum: { fontSize: 36, fontWeight: '900', color: '#7b2fbe' },
  scoreLabel: { fontSize: 11, color: '#999', marginTop: 2 },
  grade: { fontSize: 18, fontWeight: '800', marginBottom: 16, letterSpacing: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statBox: { flex: 1, borderWidth: 1.5, borderRadius: 10, padding: 10, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '900', color: '#222' },
  statLbl: { fontSize: 10, fontWeight: '700', marginTop: 2 },
  history: { flexDirection: 'row', gap: 6, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' },
  dot: { width: 22, height: 22, borderRadius: 11 },
  dotOk: { backgroundColor: '#43a047' },
  dotFail: { backgroundColor: '#e53935' },
  btn: { backgroundColor: '#7b2fbe', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 40, width: '100%' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' },
});
