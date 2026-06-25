import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F } from '../theme';

interface HeaderProps {
  onMenuPress: () => void;
}

export default function Header({ onMenuPress }: HeaderProps) {
  const insets = useSafeAreaInsets();

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
});
