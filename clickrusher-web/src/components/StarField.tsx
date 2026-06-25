import React, { useMemo } from 'react';

interface Star {
  x: number; y: number; size: number;
  opacity: number; duration: number; delay: number;
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => Array.from({ length: 120 }, () => {
    const big = Math.random() < 0.06;
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: big ? Math.random() * 1.4 + 1.6 : Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 6 + 3,
      delay: Math.random() * 12,
    };
  }), []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          backgroundColor: '#fff',
          animation: `twinkle ${s.duration}s ${s.delay}s infinite alternate`,
          opacity: s.opacity,
        }} />
      ))}
    </div>
  );
}
