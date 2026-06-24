import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QUIZ_COUNTRIES } from '../../data/questions';
import { getAllScores } from '../../data/scores';

interface Props {
  lang:        'tr' | 'en';
  countryIdx:  number;
  playerName:  string;
  score:       number;
  answers:     boolean[];
  onPlayAgain: () => void;
}

const T = {
  tr: { again: 'Tekrar Oyna', correct: 'Doğru', wrong: 'Yanlış', total: 'Puan', ranking: 'ÜLKE SIRALAMASI', you: 'SEN' },
  en: { again: 'Play Again',  correct: 'Correct', wrong: 'Wrong', total: 'Score', ranking: 'COUNTRY RANKINGS', you: 'YOU' },
};

export default function OverScreen({ lang, countryIdx, playerName, score, answers, onPlayAgain }: Props) {
  const t          = T[lang];
  const allScores  = getAllScores();
  const playerRank = allScores.findIndex(s => s.idx === countryIdx) + 1;
  const top3       = allScores.slice(0, 3);
  const rest       = allScores.slice(3, 10);

  const correct = answers.filter(Boolean).length;
  const wrong   = answers.length - correct;
  const pct     = Math.round((correct / answers.length) * 100);

  const grade =
    pct >= 80 ? { label: '🏆 MÜKEMMEL',       color: '#FFD700' } :
    pct >= 60 ? { label: '⭐ İYİ',             color: '#00C8FF' } :
    pct >= 40 ? { label: '👍 FENA DEĞİL',      color: '#00FF88' } :
               { label: '📚 ÇALIŞMAYA DEVAM', color: '#FF8800' };

  return (
    <LinearGradient colors={['#2d0a5e', '#6a1aad', '#3a0f72']} style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Player result banner */}
        <View style={styles.playerCard}>
          <View style={styles.playerRow}>
            <Text style={styles.playerFlag}>{QUIZ_COUNTRIES[countryIdx].f}</Text>
            <Text style={styles.playerName}>{playerName}</Text>
            <View style={[styles.rankBadge, playerRank <= 3 ? styles.rankGold : playerRank <= 10 ? styles.rankSilver : styles.rankDim]}>
              <Text style={styles.rankBadgeTxt}>#{playerRank}</Text>
            </View>
          </View>

          <View style={styles.scoreRow}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNum}>{score}</Text>
              <Text style={styles.scoreLabel}>{t.total}</Text>
            </View>
            <View style={styles.gradeBlock}>
              <Text style={[styles.grade, { color: grade.color }]}>{grade.label}</Text>
              <View style={styles.statsRow}>
                <View style={[styles.statBox, { borderColor: '#43a047', backgroundColor: 'rgba(67,160,71,0.15)' }]}>
                  <Text style={styles.statNum}>{correct}</Text>
                  <Text style={[styles.statLbl, { color: '#43a047' }]}>{t.correct}</Text>
                </View>
                <View style={[styles.statBox, { borderColor: '#e53935', backgroundColor: 'rgba(229,57,53,0.15)' }]}>
                  <Text style={styles.statNum}>{wrong}</Text>
                  <Text style={[styles.statLbl, { color: '#e53935' }]}>{t.wrong}</Text>
                </View>
                <View style={[styles.statBox, { borderColor: '#FFD700', backgroundColor: 'rgba(255,215,0,0.1)' }]}>
                  <Text style={styles.statNum}>{pct}%</Text>
                  <Text style={[styles.statLbl, { color: '#FFD700' }]}>Başarı</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.history}>
            {answers.map((ok, i) => (
              <View key={i} style={[styles.histDot, ok ? styles.histOk : styles.histFail]} />
            ))}
          </View>
        </View>

        {/* Country rankings */}
        <View style={styles.rankSection}>
          <Text style={styles.rankTitle}>{t.ranking}</Text>

          {/* Podium: 2nd — 1st — 3rd */}
          <View style={styles.podium}>
            {/* Silver #2 */}
            <View style={styles.podiumCol}>
              <Text style={styles.podiumMedal}>🥈</Text>
              <Text style={styles.podiumFlag}>{top3[1]?.country.f}</Text>
              <Text style={[styles.podiumName, { color: '#C0C0C0' }]} numberOfLines={1}>{top3[1]?.country.n}</Text>
              <Text style={[styles.podiumScore, { color: '#C0C0C0' }]}>{(top3[1]?.score ?? 0).toLocaleString('tr')}</Text>
              <View style={[styles.podiumBase, { height: 44, backgroundColor: 'rgba(192,192,192,0.25)', borderColor: '#C0C0C0' }]} />
            </View>

            {/* Gold #1 — center, elevated */}
            <View style={[styles.podiumCol, styles.podiumCenter]}>
              <Text style={styles.podiumCrown}>👑</Text>
              <Text style={[styles.podiumFlag, { fontSize: 36 }]}>{top3[0]?.country.f}</Text>
              <Text style={[styles.podiumName, { color: '#FFD700', fontWeight: '900' }]} numberOfLines={1}>{top3[0]?.country.n}</Text>
              <Text style={[styles.podiumScore, { color: '#FFD700', fontWeight: '900' }]}>{(top3[0]?.score ?? 0).toLocaleString('tr')}</Text>
              <View style={[styles.podiumBase, { height: 60, backgroundColor: 'rgba(255,215,0,0.2)', borderColor: '#FFD700' }]} />
            </View>

            {/* Bronze #3 */}
            <View style={styles.podiumCol}>
              <Text style={styles.podiumMedal}>🥉</Text>
              <Text style={styles.podiumFlag}>{top3[2]?.country.f}</Text>
              <Text style={[styles.podiumName, { color: '#CD7F32' }]} numberOfLines={1}>{top3[2]?.country.n}</Text>
              <Text style={[styles.podiumScore, { color: '#CD7F32' }]}>{(top3[2]?.score ?? 0).toLocaleString('tr')}</Text>
              <View style={[styles.podiumBase, { height: 32, backgroundColor: 'rgba(205,127,50,0.2)', borderColor: '#CD7F32' }]} />
            </View>
          </View>

          {/* Rank rows 4-10 */}
          {rest.map((item, i) => {
            const rank     = i + 4;
            const isPlayer = item.idx === countryIdx;
            return (
              <View key={item.idx} style={[styles.rankRow, isPlayer && styles.rankRowPlayer]}>
                <Text style={[styles.rankNum, isPlayer && styles.rankNumPlayer]}>#{rank}</Text>
                <Text style={styles.rankFlag}>{item.country.f}</Text>
                <Text style={[styles.rankName, isPlayer && styles.rankNamePlayer]} numberOfLines={1}>{item.country.n}</Text>
                {isPlayer && <View style={styles.youBadge}><Text style={styles.youText}>{t.you}</Text></View>}
                <Text style={[styles.rankScore, isPlayer && styles.rankScorePlayer]}>{item.score.toLocaleString('tr')}</Text>
              </View>
            );
          })}

          {/* Player row if outside top 10 */}
          {playerRank > 10 && (
            <>
              <Text style={styles.ellipsis}>• • •</Text>
              <View style={[styles.rankRow, styles.rankRowPlayer]}>
                <Text style={[styles.rankNum, styles.rankNumPlayer]}>#{playerRank}</Text>
                <Text style={styles.rankFlag}>{QUIZ_COUNTRIES[countryIdx].f}</Text>
                <Text style={[styles.rankName, styles.rankNamePlayer]} numberOfLines={1}>{QUIZ_COUNTRIES[countryIdx].n}</Text>
                <View style={styles.youBadge}><Text style={styles.youText}>{t.you}</Text></View>
                <Text style={[styles.rankScore, styles.rankScorePlayer]}>{allScores[playerRank - 1]?.score.toLocaleString('tr')}</Text>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.btn} onPress={onPlayAgain}>
          <Text style={styles.btnText}>{t.again}</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap:    { flex: 1 },
  content: { padding: 16, paddingTop: 50, paddingBottom: 40 },

  // Player card
  playerCard:  { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 18, padding: 16, marginBottom: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  playerRow:   { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  playerFlag:  { fontSize: 26 },
  playerName:  { flex: 1, fontSize: 18, fontWeight: '800', color: '#fff' },
  rankBadge:   { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 2 },
  rankGold:    { borderColor: '#FFD700', backgroundColor: 'rgba(255,215,0,0.2)' },
  rankSilver:  { borderColor: '#C0C0C0', backgroundColor: 'rgba(192,192,192,0.15)' },
  rankDim:     { borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.08)' },
  rankBadgeTxt:{ fontSize: 12, fontWeight: '900', color: '#fff' },

  scoreRow:    { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  scoreCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: 'rgba(123,47,190,0.4)', borderWidth: 2.5, borderColor: '#b57bee', alignItems: 'center', justifyContent: 'center' },
  scoreNum:    { fontSize: 28, fontWeight: '900', color: '#fff' },
  scoreLabel:  { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 1 },
  gradeBlock:  { flex: 1 },
  grade:       { fontSize: 15, fontWeight: '800', marginBottom: 8, letterSpacing: 0.5 },
  statsRow:    { flexDirection: 'row', gap: 6 },
  statBox:     { flex: 1, borderWidth: 1.5, borderRadius: 8, padding: 6, alignItems: 'center' },
  statNum:     { fontSize: 18, fontWeight: '900', color: '#fff' },
  statLbl:     { fontSize: 9, fontWeight: '700', marginTop: 1 },

  history:  { flexDirection: 'row', gap: 5, flexWrap: 'wrap', justifyContent: 'center' },
  histDot:  { width: 18, height: 18, borderRadius: 9 },
  histOk:   { backgroundColor: '#43a047' },
  histFail: { backgroundColor: '#e53935' },

  // Rankings
  rankSection: { marginBottom: 20 },
  rankTitle:   { fontSize: 14, fontWeight: '900', color: '#fff', letterSpacing: 3, textAlign: 'center', marginBottom: 18, opacity: 0.75 },

  // Podium
  podium:       { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8, marginBottom: 16 },
  podiumCol:    { flex: 1, alignItems: 'center', gap: 4 },
  podiumCenter: { marginBottom: 0 },
  podiumCrown:  { fontSize: 20 },
  podiumMedal:  { fontSize: 18 },
  podiumFlag:   { fontSize: 28 },
  podiumName:   { fontSize: 11, fontWeight: '700', color: '#fff', textAlign: 'center' },
  podiumScore:  { fontSize: 10, fontWeight: '700', color: '#fff', textAlign: 'center' },
  podiumBase:   { width: '100%', borderRadius: 4, borderTopWidth: 2, marginTop: 4 },

  // Rank rows
  rankRow:        { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, marginBottom: 4, backgroundColor: 'rgba(255,255,255,0.07)' },
  rankRowPlayer:  { backgroundColor: 'rgba(255,215,0,0.15)', borderWidth: 1, borderColor: 'rgba(255,215,0,0.4)' },
  rankNum:        { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.5)', width: 30 },
  rankNumPlayer:  { color: '#FFD700' },
  rankFlag:       { fontSize: 20 },
  rankName:       { flex: 1, fontSize: 13, fontWeight: '600', color: '#fff' },
  rankNamePlayer: { color: '#FFD700' },
  youBadge:       { backgroundColor: '#FFD700', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  youText:        { fontSize: 9, fontWeight: '900', color: '#222' },
  rankScore:        { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.6)' },
  rankScorePlayer:  { color: '#FFD700' },
  ellipsis:         { textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginVertical: 6, letterSpacing: 4 },

  btn:     { backgroundColor: '#7b2fbe', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
