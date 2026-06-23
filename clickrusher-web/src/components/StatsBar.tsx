import React, { useEffect, useRef, useState } from 'react';
import { C, FF, FLAG_SM } from '../theme';

export default function StatsBar() {
  const [rushers, setRushers] = useState(2475327);
  const countRef = useRef(2475327);

  useEffect(() => {
    const id = setInterval(() => {
      countRef.current += Math.floor(Math.random() * 40 - 8);
      setRushers(countRef.current);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const stat: React.CSSProperties = {
    flex: 1, maxWidth: 160, padding: '10px', backgroundColor: 'rgba(5,20,38,0.8)',
    border: '1px solid rgba(0,200,255,0.12)', borderRadius: 4, textAlign: 'center',
  };
  const lbl: React.CSSProperties = {
    fontFamily: FF.bc, fontWeight: 400, fontSize: 9, letterSpacing: 2, color: C.dim,
    textTransform: 'uppercase', marginBottom: 4, display: 'block',
  };
  const val: React.CSSProperties = {
    fontFamily: FF.bc, fontWeight: 900, fontSize: 20, letterSpacing: 1, color: '#fff',
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: 2,
      padding: '10px 8px', backgroundColor: C.statsBg,
      borderBottom: '1px solid rgba(0,200,255,0.07)', flexShrink: 0,
    }}>
      <div style={stat}>
        <span style={lbl}>TOTAL POINTS</span>
        <span style={{ ...val, color: C.orange }}>4.846</span>
      </div>

      <div style={{ ...stat, borderColor: 'rgba(0,200,255,0.35)', backgroundColor: 'rgba(0,200,255,0.04)' }}>
        <span style={lbl}>TOURNAMENT LEADER</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: C.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FF.bc, fontWeight: 900, fontSize: 9, color: '#020C18' }}>#1</span>
          </div>
          <img src={`${FLAG_SM}jp.png`} style={{ width: 22, height: 14, borderRadius: 2, objectFit: 'cover' }} alt="jp" />
          <span style={{ ...val, color: C.cyan, fontSize: 16 }}>Japonya</span>
        </div>
      </div>

      <div style={stat}>
        <span style={lbl}>ONGOING RUSHERS</span>
        <span style={{ ...val, color: C.green }}>{rushers.toLocaleString('tr')}</span>
      </div>
    </div>
  );
}
