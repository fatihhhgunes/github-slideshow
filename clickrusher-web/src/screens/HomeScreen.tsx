import React, { useState, useEffect } from 'react';
import { C, FF } from '../theme';
import Header from '../components/Header';
import Globe from '../components/Globe';
import StatsBar from '../components/StatsBar';
import Top3Grid from '../components/Top3Grid';
import NationsGrid from '../components/NationsGrid';
import TeamModal from '../components/TeamModal';
import Sidebar from '../components/Sidebar';
import { Team } from '../data/teams';
import { getAllScores } from '../data/scores';

const TABS = [
  { key: 'bayrak', label: 'BAYRAK YARIŞI' },
  { key: 'gun',    label: 'GÜNÜN KAPIŞMASI' },
  { key: 'rush',   label: 'RUSH' },
];

interface Props {
  onNavigateQuiz?: () => void;
}

export default function HomeScreen({ onNavigateQuiz }: Props) {
  const [activeTab,    setActiveTab]    = useState('bayrak');
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [scores,       setScores]       = useState(() => getAllScores());

  useEffect(() => {
    const id = setInterval(() => setScores(getAllScores()), 3000);
    return () => clearInterval(id);
  }, []);

  const handleSidebarItem = (key: string) => {
    if (key === 'quiz') {
      setSidebarOpen(false);
      onNavigateQuiz?.();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: C.bg, position: 'relative' }}>
      <Header onMenuPress={() => setSidebarOpen(true)} />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ paddingTop: 60, paddingBottom: 68 }}>
          <Globe onTeamClick={t => setSelectedTeam(t)} />
        </div>

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

      {/* Floating leaderboard panel */}
      <div style={{
        position: 'fixed', right: 16, top: 580, width: 240, zIndex: 100,
        backgroundColor: 'rgba(5,15,35,0.92)', border: '1px solid rgba(0,200,255,0.18)',
        borderRadius: 12, backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          fontFamily: FF.bc, fontWeight: 900, fontSize: 10, letterSpacing: 3, color: C.cyan,
          textAlign: 'center', padding: '10px 12px 8px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          ÜLKE SIRALAMASI
        </div>
        <div>
          {scores.slice(0, 10).map((entry, i) => (
            <div key={entry.country.n} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{
                fontFamily: FF.bc, fontWeight: 900, fontSize: 9, letterSpacing: 1,
                color: i < 3 ? '#FFD700' : 'rgba(255,255,255,0.4)', minWidth: 20,
              }}>#{i + 1}</span>
              <span style={{ fontSize: 14 }}>{entry.country.f}</span>
              <span style={{ fontFamily: FF.bc, fontWeight: 700, fontSize: 11, color: '#fff', flex: 1 }}>{entry.country.n}</span>
              <span style={{ fontFamily: FF.bc, fontWeight: 800, fontSize: 10, color: C.cyan }}>{entry.score.toLocaleString('tr')}</span>
            </div>
          ))}
        </div>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onItemPress={handleSidebarItem} />
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </div>
  );
}
