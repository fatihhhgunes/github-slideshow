import React, { useState } from 'react';
import {
  View, ScrollView, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { C, F } from '../theme';
import Header from '../components/Header';
import GlobeView from '../components/GlobeView';
import StatsBar from '../components/StatsBar';
import Top3Grid from '../components/Top3Grid';
import NationsGrid from '../components/NationsGrid';
import TeamModal from '../components/TeamModal';
import Sidebar from '../components/Sidebar';
import StarField from '../components/StarField';
import { Team } from '../data/teams';

const TABS = [
  { key: 'bayrak', label: 'BAYRAK YARIŞI' },
  { key: 'gun',    label: 'GÜNÜN KAPIŞMASI' },
  { key: 'rush',   label: 'RUSH' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('bayrak');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleSidebarItem = (key: string) => {
    if (key === 'quiz') {
      setSidebarOpen(false);
      (navigation as any).navigate('Quiz');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <StarField />

      <SafeAreaView style={{ flex: 1 }}>
        <Header onMenuPress={() => setSidebarOpen(true)} />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <GlobeView onTeamPress={t => setSelectedTeam(t)} />

          {/* Tabs */}
          <View style={styles.tabs}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab.key}
                style={styles.tab}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabActive,
                  tab.key === 'rush' && styles.tabRush,
                ]}>
                  {tab.label}
                </Text>
                {activeTab === tab.key && (
                  <View style={[
                    styles.tabUnder,
                    tab.key === 'rush' ? { backgroundColor: '#FF8800' } : undefined,
                  ]} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <StatsBar />

          <View style={styles.main}>
            <Top3Grid onTeamPress={t => setSelectedTeam(t)} />
            <NationsGrid onTeamPress={t => setSelectedTeam(t)} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onItemPress={handleSidebarItem} />
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(2,10,22,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,200,255,0.1)',
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  tabText: {
    fontFamily: F.lilita,
    fontSize: 11,
    letterSpacing: 1,
    color: C.dim2,
    textTransform: 'uppercase',
  },
  tabActive: {
    color: C.cyan,
  },
  tabRush: {
    color: '#FF6600',
  },
  tabUnder: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: C.cyan,
    borderRadius: 1,
  },
  main: {
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
});
