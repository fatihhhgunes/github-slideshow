import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { C, F, FLAG_SM } from '../theme';

export default function StatsBar() {
  const [rushers, setRushers] = useState(2475327);
  const countRef = useRef(2475327);

  useEffect(() => {
    const id = setInterval(() => {
      countRef.current += Math.floor(Math.random() * 40 - 8);
      setRushers(countRef.current);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.wrap}>
      <View style={styles.stat}>
        <Text style={styles.lbl}>TOTAL POINTS</Text>
        <Text style={[styles.val, { color: C.orange }]}>4.846</Text>
      </View>

      <View style={[styles.stat, styles.lead]}>
        <Text style={styles.lbl}>TOURNAMENT LEADER</Text>
        <View style={styles.leadRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>#1</Text>
          </View>
          <Image source={{ uri: `${FLAG_SM}jp.png` }} style={styles.flag} />
          <Text style={[styles.val, { color: C.cyan, fontSize: 16 }]}>Japonya</Text>
        </View>
      </View>

      <View style={styles.stat}>
        <Text style={styles.lbl}>ONGOING RUSHERS</Text>
        <Text style={[styles.val, { color: C.green }]}>
          {rushers.toLocaleString('tr')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: C.statsBg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,200,255,0.07)',
  },
  stat: {
    flex: 1,
    maxWidth: 160,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(5,20,38,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.12)',
    borderRadius: 4,
    alignItems: 'center',
  },
  lead: {
    borderColor: 'rgba(0,200,255,0.35)',
    backgroundColor: 'rgba(0,200,255,0.04)',
  },
  lbl: {
    fontFamily: F.bcReg,
    fontSize: 9,
    letterSpacing: 2,
    color: C.dim,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  val: {
    fontFamily: F.bcBlack,
    fontSize: 20,
    letterSpacing: 1,
    color: '#fff',
  },
  leadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chip: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: C.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: F.bcBlack,
    fontSize: 9,
    color: '#020C18',
  },
  flag: {
    width: 22,
    height: 14,
    borderRadius: 2,
    resizeMode: 'cover',
  },
});
