import React from 'react';
import { C, FF, FLAG_BASE } from '../theme';
import { TOP3_DATA } from '../data/teams';

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const MEDAL_GLOW   = ['rgba(255,215,0,0.7)', 'rgba(192,192,192,0.5)', 'rgba(205,127,50,0.5)'];
const ORDER = [1, 0, 2];

interface Props { onTeamPress: (team: any) => void; }

export default function Top3Grid({ onTeamPress }: Props) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
      <div style={{
        border: `2px solid #FFD700`, borderRadius: 60,
        padding: '6px 32px', marginBottom: 8,
        boxShadow: '0 0 18px rgba(255,215,0,0.4)',
      }}>
        <span style={{
          fontFamily: FF.bc, fontWeight: 900, fontSize: 28, letterSpacing: 10, color: '#FFD700',
          textShadow: '0 0 18px rgba(255,215,0,0.8)',
        }}>TOP 3</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20, paddingBottom: 28, paddingTop: 6 }}>
        {ORDER.map((idx, pos) => {
          const { team, pts } = TOP3_DATA[idx];
          const color = MEDAL_COLORS[idx];
          const glow  = MEDAL_GLOW[idx];
          return (
            <div key={team.code} onClick={() => onTeamPress(team)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer',
              transform: pos === 1 ? 'translateY(-24px)' : undefined,
            }}>
              <span style={{ fontFamily: FF.bc, fontWeight: 900, fontSize: 13, letterSpacing: 2, color }}>#{idx+1}</span>
              <div style={{
                width: 110, height: 110, borderRadius: 55, border: `3px solid ${color}`,
                overflow: 'hidden', backgroundColor: 'rgba(5,20,40,0.4)',
                boxShadow: `0 0 20px ${glow}`,
              }}>
                <img src={`${FLAG_BASE}${team.fc}.png`} alt={team.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: FF.bc, fontWeight: 700, fontSize: 14, letterSpacing: 1, color: '#fff' }}>{team.name}</span>
              <span style={{ fontFamily: FF.bc, fontWeight: 800, fontSize: 11, color }}>
                {pts.toLocaleString('tr')} puan
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
