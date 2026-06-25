import React from 'react';
import {
  Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { C, F, FLAG_BASE, FLAG_SM } from '../theme';
import { TEAMS, Team } from '../data/teams';

interface Props {
  team: Team | null;
  onClose: () => void;
}

export default function TeamModal({ team, onClose }: Props) {
  if (!team) return null;

  const members = TEAMS
    .filter(t => t.grp === team.grp)
    .sort((a, b) => b.pts - a.pts || b.w - a.w);

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.bg} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.box} onPress={() => {}}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeX}>✕</Text>
          </TouchableOpacity>

          <Image
            source={{ uri: `${FLAG_BASE}${team.fc}.png` }}
            style={styles.flagImg}
          />
          <Text style={styles.cname}>{team.name.toUpperCase()}</Text>
          <Text style={styles.grp}>GRUP {team.grp} · 2026 FİFA DÜNYA KUPASI</Text>

          <View style={styles.table}>
            <View style={styles.thead}>
              {['#', 'Ülke', 'G', 'B', 'M', 'P'].map(h => (
                <Text key={h} style={[styles.th, h === 'Ülke' && { flex: 2 }]}>{h}</Text>
              ))}
            </View>
            {members.map((m, i) => (
              <View key={m.code} style={[styles.trow, m.code === team.code && styles.trowHl]}>
                <Text style={[styles.td, { color: C.dim }]}>{i + 1}</Text>
                <View style={[styles.tdFlex, { flex: 2 }]}>
                  <Image
                    source={{ uri: `${FLAG_SM}${m.fc}.png` }}
                    style={styles.rowFlag}
                  />
                  <Text style={[styles.td, m.code === team.code && { color: C.cyan }]}>
                    {m.name}
                  </Text>
                </View>
                <Text style={styles.td}>{m.w}</Text>
                <Text style={styles.td}>{m.d}</Text>
                <Text style={styles.td}>{m.l}</Text>
                <Text style={[styles.td, { color: C.cyan, fontFamily: F.bcXBold }]}>
                  {m.pts}
                </Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#020e1e',
    borderWidth: 1.5,
    borderColor: 'rgba(0,200,255,0.4)',
    borderRadius: 12,
    padding: 20,
    width: '88%',
    maxWidth: 400,
    shadowColor: C.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeX: {
    color: C.dim2,
    fontSize: 12,
  },
  flagImg: {
    width: 120,
    height: 80,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  cname: {
    textAlign: 'center',
    fontFamily: F.bcBlack,
    fontSize: 20,
    letterSpacing: 3,
    color: C.cyan,
    marginBottom: 2,
  },
  grp: {
    textAlign: 'center',
    fontFamily: F.bcReg,
    fontSize: 9,
    letterSpacing: 2,
    color: C.dim,
    marginBottom: 14,
  },
  table: {
    width: '100%',
  },
  thead: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,200,255,0.12)',
    marginBottom: 2,
  },
  th: {
    flex: 1,
    fontFamily: F.bcReg,
    fontSize: 8,
    letterSpacing: 1,
    color: C.dim,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  trow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
  },
  trowHl: {
    backgroundColor: 'rgba(0,200,255,0.05)',
  },
  td: {
    flex: 1,
    fontFamily: F.bcBold,
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
  },
  tdFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rowFlag: {
    width: 18,
    height: 12,
    borderRadius: 1,
    resizeMode: 'cover',
  },
});
