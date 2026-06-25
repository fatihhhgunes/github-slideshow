import React, { useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { C, F, FLAG_BASE } from '../theme';
import { TOP3_DATA } from '../data/teams';

interface Props {
  onTeamPress: (team: any) => void;
}

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_GLOW   = ['rgba(255,215,0,0.7)', 'rgba(192,192,192,0.5)', 'rgba(205,127,50,0.5)'];
const ORDER = [1, 0, 2]; // Silver, Gold, Bronze display order

export default function Top3Grid({ onTeamPress }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>TOP 3</Text>
      </View>
      <View style={styles.grid}>
        {ORDER.map((idx, pos) => {
          const { team, pts } = TOP3_DATA[idx];
          const yOffset = pos === 1 ? -24 : 0;
          const color   = MEDAL_COLORS[idx];
          const glow    = MEDAL_GLOW[idx];
          return (
            <TouchableOpacity
              key={team.code}
              style={[styles.medal, { transform: [{ translateY: yOffset }] }]}
              onPress={() => onTeamPress(team)}
              activeOpacity={0.85}
            >
              <Text style={[styles.rank, { color }]}>#{idx + 1}</Text>
              <View style={[styles.circle, { borderColor: color, shadowColor: glow }]}>
                <Image
                  source={{ uri: `${FLAG_BASE}${team.fc}.png` }}
                  style={styles.flagImg}
                />
              </View>
              <Text style={styles.name}>{team.name}</Text>
              <Text style={[styles.pts, { color }]}>
                {pts.toLocaleString('tr')} puan
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
  },
  titleWrap: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 60,
    paddingVertical: 6,
    paddingHorizontal: 32,
    marginBottom: 32,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
  },
  title: {
    fontFamily: F.bcBlack,
    fontSize: 28,
    letterSpacing: 10,
    color: '#FFD700',
    textShadowColor: 'rgba(255,215,0,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 20,
    paddingBottom: 28,
    paddingTop: 6,
  },
  medal: {
    alignItems: 'center',
    gap: 6,
  },
  rank: {
    fontFamily: F.bcBlack,
    fontSize: 13,
    letterSpacing: 2,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(5,20,40,0.4)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 8,
  },
  flagImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontFamily: F.bcBold,
    fontSize: 14,
    letterSpacing: 1,
    color: '#fff',
  },
  pts: {
    fontFamily: F.bcXBold,
    fontSize: 11,
  },
});
