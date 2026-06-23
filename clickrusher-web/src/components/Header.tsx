import React, { useEffect, useState } from 'react';
import { C, FF } from '../theme';

const TZ_OFFSETS = [
  { label: 'TR', offset: 3 },
  { label: 'ET', offset: -4 },
  { label: 'PT', offset: -7 },
];

interface Props { onMenuPress: () => void; }

export default function Header({ onMenuPress }: Props) {
  const [tzIdx, setTzIdx] = useState(0);
  const [time, setTime]   = useState('');
  const [gmt, setGmt]     = useState('GMT+3');

  useEffect(() => {
    const tick = () => {
      const offset = TZ_OFFSETS[tzIdx].offset;
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + offset * 3600000);
      const h = String(local.getHours()).padStart(2,'0');
      const m = String(local.getMinutes()).padStart(2,'0');
      const s = String(local.getSeconds()).padStart(2,'0');
      setTime(`${h}:${m}:${s}`);
      setGmt(`GMT${offset >= 0 ? '+' : ''}${offset}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tzIdx]);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '12px 16px', backgroundColor: C.headerBg,
      borderBottom: '1px solid rgba(0,200,255,0.12)', position: 'relative',
      flexShrink: 0,
    }}>
      <button onClick={onMenuPress} style={{
        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
        width: 38, height: 38, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 18, height: 1.5, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
        ))}
      </button>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: FF.bc, fontWeight: 900, fontSize: 36, letterSpacing: 4, color: '#fff',
          textShadow: '0 0 20px rgba(0,200,255,0.8)',
        }}>CLICKRUSHER</div>
        <div style={{
          fontFamily: FF.bc, fontWeight: 700, fontSize: 11, letterSpacing: 10, color: C.cyan, marginTop: 1,
        }}>TOURNAMENT 2026</div>
      </div>

      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', textAlign: 'right' }}>
        <div style={{ fontFamily: FF.bc, fontWeight: 900, fontSize: 16, letterSpacing: 2, color: '#fff' }}>{time}</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 3, justifyContent: 'flex-end' }}>
          {TZ_OFFSETS.map((tz, i) => (
            <button key={tz.label} onClick={() => setTzIdx(i)} style={{
              padding: '2px 5px', borderRadius: 3,
              backgroundColor: i === tzIdx ? '#FF8C00' : 'rgba(255,255,255,0.08)',
              fontFamily: FF.bc, fontWeight: 800, fontSize: 8, letterSpacing: 1,
              color: i === tzIdx ? '#fff' : C.dim2,
            }}>{tz.label}</button>
          ))}
        </div>
        <div style={{ fontFamily: FF.bc, fontWeight: 400, fontSize: 9, letterSpacing: 2, color: C.dim, marginTop: 1 }}>{gmt}</div>
      </div>
    </div>
  );
}
