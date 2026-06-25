import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  lang: 'tr' | 'en';
  onSolo: () => void;
  onBack: () => void;
}

const T = {
  tr: { title: 'Nasıl oynamak istersin?', solo: 'Solo Oyna', mp: 'Çok Oyunculu (Yakında)', back: '← Geri' },
  en: { title: 'How do you want to play?', solo: 'Play Solo', mp: 'Multiplayer (Coming Soon)', back: '← Back' },
};

export default function ModeScreen({ lang, onSolo, onBack }: Props) {
  const t = T[lang];
  return (
    <LinearGradient colors={['#2d0a5e', '#6a1aad', '#3a0f72']} style={styles.wrap}>
      <Text style={styles.trophy}>🏆</Text>
      <Text style={styles.title}>{t.title}</Text>

      <TouchableOpacity style={styles.btn} onPress={onSolo}>
        <Text style={styles.btnText}>🎯 &nbsp;{t.solo}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.btnDisabled]} disabled>
        <Text style={[styles.btnText, { opacity: 0.5 }]}>🌍 &nbsp;{t.mp}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>{t.back}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  trophy: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 28,
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    marginBottom: 14,
    alignItems: 'center',
  },
  btnDisabled: {
    borderColor: 'rgba(255,255,255,0.25)',
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  backBtn: {
    marginTop: 8,
    paddingVertical: 10,
    opacity: 0.65,
  },
  backText: {
    color: '#fff',
    fontSize: 15,
  },
});
