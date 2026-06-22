import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  onSelect: (lang: 'tr' | 'en') => void;
}

export default function LangScreen({ onSelect }: Props) {
  return (
    <LinearGradient
      colors={['#2d0a5e', '#6a1aad', '#3a0f72']}
      style={styles.wrap}
    >
      <Text style={styles.ball}>⚽</Text>
      <Text style={styles.title}>ClickRusher</Text>
      <Text style={styles.sub}>QUIZ</Text>

      <TouchableOpacity style={styles.btn} onPress={() => onSelect('tr')}>
        <Text style={styles.btnText}>🇹🇷 &nbsp; Türkçe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => onSelect('en')}>
        <Text style={styles.btnText}>🇬🇧 &nbsp; English</Text>
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
  ball: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
  },
  sub: {
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 36,
    letterSpacing: 4,
  },
  btn: {
    width: '100%',
    maxWidth: 280,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    marginBottom: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
