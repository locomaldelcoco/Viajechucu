// app.jsx — Viajero PWA navigator
const ALL_SCREENS = [
  { component: () => <Screen1_Trips />, label: 'Inicio' },
  { component: () => <Screen2_Plan />, label: 'Plan' },
  { component: () => <Screen3_TypePick />, label: 'Proponer' },
  { component: () => <Screen4_Form />, label: 'Detalle' },
  { component: () => <Screen5_Invite />, label: 'Invitar' },
  { component: () => <Screen6_Posted />, label: 'Listo' },
];

const ViajeroApp = () => {
  const [idx, setIdx] = React.useState(0);
  const Screen = ALL_SCREENS[idx].component;

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#1b2030',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0,
    }}>
      <Screen />

      {/* Navigation dots */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 0',
      }}>
        <button
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          style={{
            background: 'none', border: 'none', cursor: idx === 0 ? 'default' : 'pointer',
            color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
            fontSize: 20, padding: '0 6px',
          }}
        >‹</button>

        {ALL_SCREENS.map((s, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            title={s.label}
            style={{
              width: i === idx ? 22 : 8,
              height: 8,
              borderRadius: 4,
              background: i === idx ? '#1FA2D8' : 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          />
        ))}

        <button
          onClick={() => setIdx(i => Math.min(ALL_SCREENS.length - 1, i + 1))}
          disabled={idx === ALL_SCREENS.length - 1}
          style={{
            background: 'none', border: 'none', cursor: idx === ALL_SCREENS.length - 1 ? 'default' : 'pointer',
            color: idx === ALL_SCREENS.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff',
            fontSize: 20, padding: '0 6px',
          }}
        >›</button>
      </div>
    </div>
  );
};
