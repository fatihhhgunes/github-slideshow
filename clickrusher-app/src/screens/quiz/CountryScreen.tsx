import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QUIZ_COUNTRIES } from '../../data/questions';

interface Props {
  lang: 'tr' | 'en';
  onConfirm: (countryIdx: number, name: string) => void;
  onBack: () => void;
}

const BAD_WORDS = [
  'amk', 'amq', 'bok', 'orospu', 'pic', 'sik', 'yarrak', 'kahpe', 'oc',
  'amina', 'sikik', 'kic', 'ibne', 'pezevenk', 'serefsiz', 'gottum', 'got',
  'orosbuçuk', 'orosbuçuk', 'bitch', 'fuck', 'shit', 'ass',
];

function normalize(s: string): string {
  return s.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}

function hasProfanity(text: string): boolean {
  const n = normalize(text);
  return BAD_WORDS.some(w => n.includes(normalize(w)));
}

const T = {
  tr: {
    title: 'Ülkeni seç', cont: 'Devam →',
    placeholder: 'Takma adın (zorunlu, min 2 karakter)',
    errCountry:  'Lütfen bir ülke seç!',
    errName:     'Ad en az 2 karakter olmalı!',
    errProfanity:'Lütfen uygun bir takma ad gir.',
  },
  en: {
    title: 'Choose your country', cont: 'Continue →',
    placeholder: 'Nickname (required, min 2 chars)',
    errCountry:  'Please select a country!',
    errName:     'Name must be at least 2 characters!',
    errProfanity:'Please enter an appropriate nickname.',
  },
};

export default function CountryScreen({ lang, onConfirm, onBack }: Props) {
  const [sel,  setSel]  = useState<number | null>(null);
  const [name, setName] = useState('');
  const [err,  setErr]  = useState('');
  const t = T[lang];

  const confirm = () => {
    if (sel === null)             { setErr(t.errCountry);   return; }
    const trimmed = name.trim();
    if (trimmed.length < 2)       { setErr(t.errName);      return; }
    if (hasProfanity(trimmed))    { setErr(t.errProfanity); return; }
    setErr('');
    onConfirm(sel, trimmed);
  };

  return (
    <LinearGradient colors={['#2d0a5e', '#6a1aad', '#3a0f72']} style={styles.wrap}>
      <Text style={styles.heading}>{t.title}</Text>

      <View style={styles.card}>
        <View style={styles.grid}>
          {QUIZ_COUNTRIES.map((c, i) => (
            <TouchableOpacity
              key={c.n}
              style={[styles.cc, sel === i && styles.ccSel]}
              onPress={() => { setSel(i); setErr(''); }}
            >
              <Text style={styles.cf}>{c.f}</Text>
              <Text style={styles.cn}>{c.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.input, !!err && styles.inputErr]}
          placeholder={t.placeholder}
          placeholderTextColor="#999"
          value={name}
          onChangeText={v => { setName(v); setErr(''); }}
          maxLength={14}
        />
        {!!err && <Text style={styles.errText}>{err}</Text>}

        <TouchableOpacity style={styles.btnPrimary} onPress={confirm}>
          <Text style={styles.btnText}>{t.cont}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnBack} onPress={onBack}>
          <Text style={styles.btnBackText}>← Geri</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    maxWidth: 420,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  cc: {
    width: '22%',
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f4eeff',
    alignItems: 'center',
  },
  ccSel: {
    borderColor: '#7b2fbe',
    backgroundColor: '#d9bcff',
  },
  cf: { fontSize: 24 },
  cn: { fontSize: 9, textAlign: 'center', color: '#555', marginTop: 2 },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 6,
    color: '#222',
  },
  inputErr: {
    borderColor: '#e53935',
  },
  errText: {
    fontSize: 12,
    color: '#e53935',
    marginBottom: 8,
    marginLeft: 4,
  },
  btnPrimary: {
    backgroundColor: '#7b2fbe',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  btnBack: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  btnBackText: {
    color: '#888',
    fontSize: 14,
  },
});
