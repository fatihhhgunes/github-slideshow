import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, F } from '../theme';

const SW = Dimensions.get('window').width;
const SIDEBAR_W = Math.min(300, SW * 0.82);

const MENU_ITEMS = [
  { key: 'race',     icon: '♟️', title: 'Click Yarışı Oluştur', sub: 'Kendi yarışını başlat',              color: 'rgba(0,200,255,0.1)' },
  { key: 'quiz',     icon: '❓', title: 'Quiz Oyna',             sub: 'Futbol bilgini test et',             color: 'rgba(255,50,120,0.14)' },
  { key: 'profile',  icon: '👤', title: 'Profilim',              sub: 'İstatistikler ve yarış geçmişi',     color: 'rgba(120,60,255,0.12)' },
  { key: 'tourney',  icon: '🏆', title: 'Turnuva',               sub: '2026 Dünya Kupası özel etkinliği',   color: 'rgba(255,140,0,0.1)' },
  { key: 'board',    icon: '📊', title: 'Liderlik Tablosu',       sub: 'Global sıralamalar',                 color: 'rgba(0,255,136,0.08)' },
  { key: 'settings', icon: '⚙️', title: 'Hesap Ayarları',         sub: 'Bildirimler, gizlilik, dil',         color: 'rgba(255,255,255,0.04)' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onItemPress?: (key: string) => void;
}

export default function Sidebar({ open, onClose, onItemPress }: Props) {
  const insets = useSafeAreaInsets();
  const x = useRef(new Animated.Value(-SIDEBAR_W)).current;
  const overlayOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(x, { toValue: open ? 0 : -SIDEBAR_W, duration: 280, useNativeDriver: true }),
      Animated.timing(overlayOp, { toValue: open ? 1 : 0, duration: 280, useNativeDriver: true }),
    ]).start();
  }, [open]);

  return (
    <>
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[styles.overlay, { opacity: overlayOp }]}
      >
        <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: x }], paddingTop: insets.top }]}
      >
        <View style={styles.head}>
          <Text style={styles.logo}>CLICKRUSHER</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeX}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.key}
              style={[styles.card, item.key === 'quiz' && styles.cardQuiz]}
              onPress={() => onItemPress?.(item.key)}
              activeOpacity={0.75}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.sub}</Text>
              </View>
              {item.key === 'quiz' && (
                <View style={styles.quizBadge}>
                  <Text style={styles.quizBadgeText}>YENİ</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          <Text style={styles.section}>AÇIK YARIŞLAR</Text>
          <Text style={styles.empty}>Şu an açık yarış yok</Text>
        </ScrollView>

        <View style={styles.foot}>
          <Text style={styles.version}>CLICKRUSHER v2.6 · TOURNAMENT EDITION</Text>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 200,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_W,
    backgroundColor: C.sidebarBg,
    zIndex: 201,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,200,255,0.1)',
    flexDirection: 'column',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  logo: {
    fontFamily: F.bcBlack,
    fontSize: 18,
    letterSpacing: 4,
    color: '#fff',
    textShadowColor: 'rgba(0,200,255,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeX: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  body: {
    flex: 1,
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    marginBottom: 8,
  },
  cardQuiz: {
    borderColor: 'rgba(255,50,120,0.35)',
    backgroundColor: 'rgba(255,50,120,0.06)',
  },
  quizBadge: {
    backgroundColor: '#ff3278',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  quizBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  cardTitle: {
    fontFamily: F.bcXBold,
    fontSize: 14,
    letterSpacing: 0.8,
    color: '#fff',
  },
  cardSub: {
    fontFamily: F.bReg,
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  section: {
    fontFamily: F.bcXBold,
    fontSize: 9,
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.25)',
    textTransform: 'uppercase',
    paddingVertical: 10,
    marginTop: 4,
  },
  empty: {
    fontFamily: F.bReg,
    fontSize: 12,
    color: 'rgba(255,255,255,0.22)',
    paddingBottom: 12,
  },
  foot: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  version: {
    fontFamily: F.bcReg,
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.15)',
    textAlign: 'center',
  },
});
