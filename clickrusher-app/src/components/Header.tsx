import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F } from '../theme';

interface HeaderProps {
  onMenuPress: () => void;
}

const TZ_OFFSETS = [
  { label: 'TR', offset: 3 },
  { label: 'ET', offset: -4 },
  { label: 'PT', offset: -7 },
];

export default function Header({ onMenuPress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const [tzIdx, setTzIdx] = useState(0);
  const [time, setTime] = useState('');
  const [gmt, setGmt] = useState('GMT+3');

  useEffect(() => {
    const tick = () => {
      const offset = TZ_OFFSETS[tzIdx].offset;
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + offset * 3600000);
      const h = String(local.getHours()).padStart(2, '0');
      const m = String(local.getMinutes()).padStart(2, '0');
      const s = String(local.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
      setGmt(`GMT${offset >= 0 ? '+' : ''}${offset}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tzIdx]);

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <TouchableOpacity style={styles.burger} onPress={onMenuPress}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </TouchableOpacity>

      <View style={styles.logoBlock}>
        <Text style={styles.logoText}>CLICKRUSHER</Text>
        <Text style={styles.logoSub}>TOURNAMENT 2026</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.clockTime}>{time}</Text>
        <View style={styles.tzRow}>
          {TZ_OFFSETS.map((tz, i) => (
            <TouchableOpacity
              key={tz.label}
              style={[styles.tzBtn, i === tzIdx && styles.tzBtnActive]}
              onPress={() => setTzIdx(i)}
            >
              <Text style={[styles.tzBtnText, i === tzIdx && styles.tzBtnTextActive]}>
                {tz.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.gmt}>{gmt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: C.headerBg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,200,255,0.12)',
  },
  burger: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  line: {
    width: 18,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
    marginVertical: 2,
  },
  logoBlock: {
    alignItems: 'center',
  },
  logoText: {
    fontFamily: F.bcBlack,
    fontSize: 36,
    letterSpacing: 4,
    color: '#fff',
    textShadowColor: 'rgba(0,200,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoSub: {
    fontFamily: F.bcBold,
    fontSize: 11,
    letterSpacing: 10,
    color: C.cyan,
    marginTop: 1,
  },
  right: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    alignItems: 'flex-end',
  },
  clockTime: {
    fontFamily: F.bcBlack,
    fontSize: 16,
    letterSpacing: 2,
    color: '#fff',
  },
  tzRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 3,
  },
  tzBtn: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tzBtnActive: {
    backgroundColor: '#FF8C00',
  },
  tzBtnText: {
    fontFamily: F.bcXBold,
    fontSize: 8,
    letterSpacing: 1,
    color: C.dim2,
  },
  tzBtnTextActive: {
    color: '#fff',
  },
  gmt: {
    fontFamily: F.bcReg,
    fontSize: 9,
    letterSpacing: 2,
    color: C.dim,
    marginTop: 1,
  },
});
