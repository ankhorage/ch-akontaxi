import { ImageResponse } from 'next/og';

import { BUSINESS } from '../constants/business';

export const alt = 'AKON TAXI – Taxi in Wetzikon';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OPEN_GRAPH_CONTENT = (
  <div
    style={{
      alignItems: 'center',
      background: '#111111',
      color: '#ffffff',
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      padding: '72px 84px',
      width: '100%',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        maxWidth: '760px',
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: '22px' }}>
        <svg aria-hidden="true" height="100" viewBox="0 0 120 100" width="120">
          <path
            d="M58 6 118 95H86L73 75H42L29 95H0L58 6Zm0 39-9 15h18L58 45Z"
            fill="#ffffff"
            fillRule="evenodd"
          />
          <path
            d="M12 88C34 61 64 47 111 29"
            fill="none"
            stroke="#ffd100"
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 0.9,
          }}
        >
          <span>AKON</span>
          <span style={{ color: '#ffd100' }}>TAXI</span>
        </div>
      </div>

      <div
        style={{
          color: '#ffd100',
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Taxi in Wetzikon
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 70,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
        }}
      >
        <span>Persönlich.</span>
        <span>Lokal. Direkt erreichbar.</span>
      </div>

      <div style={{ color: '#c7c7c7', display: 'flex', fontSize: 28 }}>
        {`${BUSINESS.locality} · ${BUSINESS.region} · ${BUSINESS.phoneDisplay}`}
      </div>
    </div>

    <div
      style={{
        background: '#ffd100',
        borderRadius: 999,
        height: 210,
        width: 34,
      }}
    />
  </div>
);

/*** Render the canonical AKON TAXI social sharing image. */
export default function OpenGraphImage() {
  return new ImageResponse(OPEN_GRAPH_CONTENT, size);
}
