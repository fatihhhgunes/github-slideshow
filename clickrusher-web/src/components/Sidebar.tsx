import React, { useEffect, useRef } from 'react';
import { C, FF } from '../theme';

const MENU_ITEMS = [
  { key: 'race',     icon: '♟️', title: 'Click Yarışı Oluştur',  sub: 'Kendi yarışını başlat',              color: 'rgba(0,200,255,0.1)' },
  { key: 'quiz',     icon: '❓', title: 'Quiz Oyna',              sub: 'Futbol bilgini test et',             color: 'rgba(255,50,120,0.14)' },
  { key: 'profile',  icon: '👤', title: 'Profilim',               sub: 'İstatistikler ve yarış geçmişi',     color: 'rgba(120,60,255,0.12)' },
  { key: 'tourney',  icon: '🏆', title: 'Turnuva',                sub: '2026 Dünya Kupası özel etkinliği',   color: 'rgba(255,140,0,0.1)' },
  { key: 'board',    icon: '📊', title: 'Liderlik Tablosu',        sub: 'Global sıralamalar',                 color: 'rgba(0,255,136,0.08)' },
  { key: 'settings', icon: '⚙️', title: 'Hesap Ayarları',          sub: 'Bildirimler, gizlilik, dil',         color: 'rgba(255,255,255,0.04)' },
];

const SW = 300;

interface Props {
  open: boolean;
  onClose: () => void;
  onItemPress?: (key: string) => void;
}

export default function Sidebar({ open, onClose, onItemPress }: Props) {
  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.55)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 280ms ease',
      }} />

      {/* Panel */}
      <div style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: SW,
        backgroundColor: C.sidebarBg, zIndex: 201,
        borderRight: '1px solid rgba(0,200,255,0.1)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : `translateX(-${SW}px)`,
        transition: 'transform 280ms ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span style={{
            fontFamily: FF.bc, fontWeight: 900, fontSize: 18, letterSpacing: 4, color: '#fff',
            textShadow: '0 0 12px rgba(0,200,255,0.6)',
          }}>CLICKRUSHER</span>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer',
          }}>✕</button>
        </div>

        <div style={{ flex: 1, padding: 12, overflowY: 'auto' }}>
          {MENU_ITEMS.map(item => (
            <div
              key={item.key}
              onClick={() => onItemPress?.(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                backgroundColor: item.key === 'quiz' ? 'rgba(255,50,120,0.06)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${item.key === 'quiz' ? 'rgba(255,50,120,0.35)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12, marginBottom: 8, cursor: 'pointer',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10, backgroundColor: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
              }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FF.bc, fontWeight: 800, fontSize: 14, letterSpacing: 0.8, color: '#fff' }}>{item.title}</div>
                <div style={{ fontFamily: FF.b, fontWeight: 400, fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{item.sub}</div>
              </div>
              {item.key === 'quiz' && (
                <div style={{
                  backgroundColor: '#ff3278', borderRadius: 6, padding: '3px 7px',
                  fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: 1, flexShrink: 0,
                }}>YENİ</div>
              )}
            </div>
          ))}

          <div style={{ fontFamily: FF.bc, fontWeight: 800, fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', padding: '10px 0 6px' }}>
            AÇIK YARIŞLAR
          </div>
          <div style={{ fontFamily: FF.b, fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>
            Şu an açık yarış yok
          </div>
        </div>

        <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontFamily: FF.bc, fontWeight: 400, fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.15)', textAlign: 'center' }}>
            CLICKRUSHER v2.6 · TOURNAMENT EDITION
          </div>
        </div>
      </div>
    </>
  );
}
