import React, { useState } from 'react';
import { C, FF } from '../theme';
import Header from '../components/Header';
import Globe from '../components/Globe';
import StatsBar from '../components/StatsBar';
import Top3Grid from '../components/Top3Grid';
import NationsGrid from '../components/NationsGrid';
import TeamModal from '../components/TeamModal';
import Sidebar from '../components/Sidebar';
import { Team } from '../data/teams';

const TABS = [
  { key: 'bayrak', label: 'BAYRAK YARIŞI' },
  { key: 'gun',    label: 'GÜNÜN KAPIŞMASI' },
  { key: 'rush',   label: 'RUSH' },
];

export default function HomeScreen() {
  const [activeTab,    setActiveTab]    = useState('bayrak');
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: C.bg, position: 'relative' }}>
      <Header onMenuPress={() => setSidebarOpen(true)} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <Globe onTeamClick={t => setSelectedTeam(t)} />

        {/* Tabs */}
        <div style={{
          display: 'flex', backgroundColor: 'rgba(2,10,22,0.9)',
          borderBottom: '1px solid rgba(0,200,255,0.1)',
        }}>
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, padding: '10px 0', position: 'relative', background: 'none', border: 'none',
              fontFamily: FF.lilita, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
              color: activeTab === tab.key ? (tab.key === 'rush' ? '#FF8800' : C.cyan)
                : (tab.key === 'rush' ? '#FF6600' : C.dim2),
              cursor: 'pointer',
            }}>
              {tab.label}
              {activeTab === tab.key && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 8, right: 8, height: 2, borderRadius: 1,
                  backgroundColor: tab.key === 'rush' ? '#FF8800' : C.cyan,
                }} />
              )}
            </button>
          ))}
        </div>

        <StatsBar />

        <div style={{ padding: '0 8px 40px' }}>
          <Top3Grid onTeamPress={t => setSelectedTeam(t)} />
          <NationsGrid onTeamPress={t => setSelectedTeam(t)} />
        </div>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </div>
  );
}
