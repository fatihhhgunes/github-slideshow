import React from 'react';
import { C, FF, FLAG_SM } from '../theme';
import { SORTED_TEAMS, Team } from '../data/teams';

interface Props { onTeamPress: (team: Team) => void; }

function rankStyle(rank: number) {
  if (rank <= 3) return { color: C.gold, borderColor: C.gold };
  if (rank === 4) return { color: '#C8A020', borderColor: '#C8A020' };
  if (rank <= 10) return { color: '#666', borderColor: '#444' };
  return { color: '#555', borderColor: '#333' };
}

export default function NationsGrid({ onTeamPress }: Props) {
  return (
    <div style={{ width: '100%', paddingTop: 99, paddingBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontFamily: FF.lilita, fontSize: 18, letterSpacing: 3, color: '#fff', textTransform: 'uppercase', marginBottom: 10 }}>
        TÜM TAKIMLAR
      </div>
      <div style={{ width: '85%', height: 2, marginBottom: 20, borderRadius: 2, backgroundColor: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        rowGap: 148,
        columnGap: 165,
        width: '100%',
        paddingInline: 8,
        paddingTop: 14,
      }}>
        {SORTED_TEAMS.map((team, index) => {
          const rank = index + 1;
          const rs = rankStyle(rank);
          return (
            <div key={team.code} onClick={() => onTeamPress(team)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer',
            }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute', top: -12, zIndex: 3,
                  backgroundColor: '#08101e', border: `1.5px solid ${rs.borderColor}`,
                  borderRadius: 20, padding: '1px 8px',
                }}>
                  <span style={{ fontFamily: FF.bc, fontWeight: 900, fontSize: 10, letterSpacing: 1, color: rs.color }}>#{rank}</span>
                </div>
                <div style={{
                  width: 139, height: 139, borderRadius: 70, border: `2px solid ${rs.borderColor}`,
                  overflow: 'hidden', backgroundColor: 'rgba(5,20,40,0.4)',
                }}>
                  <img src={`${FLAG_SM}${team.fc}.png`} alt={team.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <span style={{
                fontFamily: FF.bc, fontWeight: 700, fontSize: 12, letterSpacing: 0.5, color: '#fff',
                textAlign: 'center', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{team.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
