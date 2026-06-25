import React from 'react';
import { C, FF, FLAG_BASE, FLAG_SM } from '../theme';
import { TEAMS, Team } from '../data/teams';

interface Props { team: Team | null; onClose: () => void; }

export default function TeamModal({ team, onClose }: Props) {
  if (!team) return null;

  const members = TEAMS.filter(t => t.grp === team.grp).sort((a,b) => b.pts - a.pts || b.w - a.w);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 300,
      backgroundColor: 'rgba(0,0,0,0.82)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        backgroundColor: '#020e1e', border: '1.5px solid rgba(0,200,255,0.4)',
        borderRadius: 12, padding: 20, width: '100%', maxWidth: 400,
        boxShadow: '0 0 20px rgba(0,200,255,0.2)', position: 'relative',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 10, right: 10, width: 26, height: 26, borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
          color: C.dim2, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        <img src={`${FLAG_BASE}${team.fc}.png`} alt={team.name}
          style={{ width: 120, height: 80, borderRadius: 4, display: 'block', margin: '0 auto 10px', objectFit: 'cover' }} />
        <div style={{ textAlign: 'center', fontFamily: FF.bc, fontWeight: 900, fontSize: 20, letterSpacing: 3, color: C.cyan, marginBottom: 2 }}>
          {team.name.toUpperCase()}
        </div>
        <div style={{ textAlign: 'center', fontFamily: FF.bc, fontWeight: 400, fontSize: 9, letterSpacing: 2, color: C.dim, marginBottom: 14 }}>
          GRUP {team.grp} · 2026 FİFA DÜNYA KUPASI
        </div>

        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', padding: '4px', borderBottom: '1px solid rgba(0,200,255,0.12)', marginBottom: 2 }}>
            {['#','Ülke','G','B','M','P'].map((h,i) => (
              <div key={h} style={{
                flex: i===1 ? 2 : 1, fontFamily: FF.bc, fontWeight: 400, fontSize: 8, letterSpacing: 1,
                color: C.dim, textTransform: 'uppercase', textAlign: 'center',
              }}>{h}</div>
            ))}
          </div>
          {members.map((m, i) => (
            <div key={m.code} style={{
              display: 'flex', alignItems: 'center', padding: '6px 4px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              backgroundColor: m.code === team.code ? 'rgba(0,200,255,0.05)' : 'transparent',
            }}>
              <div style={{ flex: 1, fontFamily: FF.bc, fontWeight: 700, fontSize: 11, color: C.dim, textAlign: 'center' }}>{i+1}</div>
              <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                <img src={`${FLAG_SM}${m.fc}.png`} alt={m.name} style={{ width: 18, height: 12, borderRadius: 1, objectFit: 'cover' }} />
                <span style={{ fontFamily: FF.bc, fontWeight: 700, fontSize: 11, color: m.code === team.code ? C.cyan : '#fff' }}>{m.name}</span>
              </div>
              {[m.w, m.d, m.l].map((v, vi) => (
                <div key={vi} style={{ flex: 1, fontFamily: FF.bc, fontWeight: 700, fontSize: 11, color: '#fff', textAlign: 'center' }}>{v}</div>
              ))}
              <div style={{ flex: 1, fontFamily: FF.bc, fontWeight: 800, fontSize: 11, color: C.cyan, textAlign: 'center' }}>{m.pts}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
