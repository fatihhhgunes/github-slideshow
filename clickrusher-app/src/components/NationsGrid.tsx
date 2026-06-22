import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native';
import { C, F, FLAG_SM } from '../theme';
import { SORTED_TEAMS, Team } from '../data/teams';

interface Props {
  onTeamPress: (team: Team) => void;
}

function rankClass(rank: number) {
  if (rank === 1) return { color: C.gold, borderColor: C.gold };
  if (rank <= 3) return { color: C.gold, borderColor: C.gold };
  if (rank === 4) return { color: '#C8A020', borderColor: '#C8A020' };
  if (rank <= 10) return { color: '#666', borderColor: '#444' };
  return { color: '#555', borderColor: '#333' };
}

export default function NationsGrid({ onTeamPress }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>TÜM TAKIMLAR</Text>
      <View style={styles.divider} />
      <FlatList
        data={SORTED_TEAMS}
        numColumns={3}
        keyExtractor={t => t.code}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => {
          const rank = index + 1;
          const rc = rankClass(rank);
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onTeamPress(item)}
              activeOpacity={0.75}
            >
              <View style={styles.flagWrap}>
                <View style={[styles.rankBadge, { borderColor: rc.borderColor }]}>
                  <Text style={[styles.rankText, { color: rc.color }]}>#{rank}</Text>
                </View>
                <View style={[styles.circle, { borderColor: rc.borderColor }]}>
                  <Image
                    source={{ uri: `${FLAG_SM}${item.fc}.png` }}
                    style={styles.flagImg}
                  />
                </View>
              </View>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: F.lilita,
    fontSize: 18,
    letterSpacing: 3,
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  divider: {
    width: '85%',
    height: 2,
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  grid: {
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 22,
  },
  item: {
    alignItems: 'center',
    gap: 6,
    width: 90,
  },
  flagWrap: {
    position: 'relative',
    alignItems: 'center',
  },
  rankBadge: {
    position: 'absolute',
    top: -12,
    zIndex: 3,
    backgroundColor: '#08101e',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  rankText: {
    fontFamily: F.bcBlack,
    fontSize: 10,
    letterSpacing: 1,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(5,20,40,0.4)',
  },
  flagImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontFamily: F.bcBold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 80,
  },
});
