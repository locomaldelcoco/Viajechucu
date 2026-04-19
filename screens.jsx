// screens.jsx — Viajero (collaborative trip planner)
// Plan upcoming activities together. Anyone can add/edit/remove.
// Palette: celeste + naranja. Argentine context (Patagonia trip).

const PAL = {
  blue: '#1FA2D8',
  blueDeep: '#0E7AAB',
  blueSoft: '#E2F2FA',
  blueInk: '#2C6E8C',
  orange: '#FF6B35',
  orangeSoft: '#FFE9DE',
  orangeInk: '#C24A1A',
  bg: '#FAF8F4',
  ink: '#121826',
  inkSoft: '#5A6476',
  line: '#E6E2DA',
  white: '#FFFFFF',
  green: '#2E9E6A',
  greenSoft: '#E2F4EA',
  yellow: '#F4B941',
  yellowSoft: '#FBEFD0',
  red: '#D94B4B',
};

const FONT = `'Inter', 'Roboto', system-ui, sans-serif`;

// Participants — shared across screens
const GROUP = [
  { id: 'lu', name: 'Luna',  color: '#FF6B35', initial: 'L', me: true },
  { id: 'to', name: 'Tomás', color: '#1FA2D8', initial: 'T' },
  { id: 'ca', name: 'Cami',  color: '#F4B941', initial: 'C' },
  { id: 'ma', name: 'Mateo', color: '#2E9E6A', initial: 'M' },
];

// ─── Icon set ────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.8 }) => {
  const p = {
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    chevR: <polyline points="9 6 15 12 9 18"/>,
    chevL: <polyline points="15 6 9 12 15 18"/>,
    chevD: <polyline points="6 9 12 15 18 9"/>,
    pin: <><path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
    food: <><path d="M6 3v8a2 2 0 0 0 2 2v8"/><path d="M10 3v8"/><path d="M14 3v18"/><path d="M18 3c0 4-2 6-2 8s2 2 2 2v8"/></>,
    plane: <path d="M21 14 3 10l3-3 5 1 4-5 2 1-3 5 7 3-2 2-5-1-3 6-1-1 1-4z"/>,
    bed: <><path d="M3 18V9"/><path d="M3 13h18"/><path d="M21 18v-4a2 2 0 0 0-2-2h-9v6"/><circle cx="7" cy="11" r="2"/></>,
    hike: <><circle cx="12" cy="4" r="2"/><path d="M12 7v6l4 2v5"/><path d="M12 13l-3 3v4"/><path d="M8 9l4 2"/></>,
    mus: <><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6"/><line x1="4" y1="20" x2="20" y2="20"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></>,
    dollar: <><line x1="12" y1="3" x2="12" y2="21"/><path d="M17 6H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6"/></>,
    check: <polyline points="4 12 10 18 20 6"/>,
    star: <polygon points="12 3 14.8 9.3 21.5 10 16.5 14.6 18 21.2 12 17.8 6 21.2 7.5 14.6 2.5 10 9.2 9.3"/>,
    back: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    home: <><path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/></>,
    map: <><polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c1-3 3-5 6-5s5 2 6 5"/><path d="M15 20c.5-2 2-3.5 4-3.5s2 .5 2.5 1"/></>,
    edit: <><path d="M4 20h4l11-11-4-4L4 16z"/><line x1="14" y1="6" x2="18" y2="10"/></>,
    trash: <><polyline points="4 7 20 7"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></>,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>,
    sparkle: <><path d="M12 3v6"/><path d="M12 15v6"/><path d="M3 12h6"/><path d="M15 12h6"/></>,
    tag: <><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.3"/></>,
    mate: <><path d="M7 9c0 6 2 11 5 11s5-5 5-11"/><path d="M6 9h12"/><path d="M13 3v6"/><path d="M11 5l2-2 2 2"/></>,
    asado: <><path d="M5 14a7 7 0 1 1 14 0"/><path d="M3 14h18"/><path d="M6 17l-1 4"/><path d="M18 17l1 4"/><path d="M9 6V3"/><path d="M12 5V2"/><path d="M15 6V3"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="M3 12h2"/><path d="M19 12h2"/><path d="M5.6 5.6l1.4 1.4"/><path d="M17 17l1.4 1.4"/><path d="M5.6 18.4 7 17"/><path d="M17 7l1.4-1.4"/></>,
    bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5z"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    msg: <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.5-4.5A8 8 0 1 1 21 12z"/></>,
    cross: <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
    question: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7v.5"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></>,
    drag: <><circle cx="9" cy="6" r="1.2" fill="currentColor"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="18" r="1.2" fill="currentColor"/><circle cx="15" cy="6" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="18" r="1.2" fill="currentColor"/></>,
    split: <><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><line x1="9" y1="12" x2="15" y2="12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {p[name]}
    </svg>
  );
};

// ─── Animation helpers ───────────────────────────────────────
const _ANIM = `
  @keyframes shake {
    0%,100% { transform: translateX(0) rotate(0deg); }
    15%      { transform: translateX(-5px) rotate(-1.5deg); }
    30%      { transform: translateX(5px)  rotate(1.5deg); }
    45%      { transform: translateX(-4px); }
    60%      { transform: translateX(4px); }
    78%      { transform: translateX(-2px); }
    92%      { transform: translateX(2px); }
  }
  @keyframes tap {
    0%   { transform: scale(1); }
    45%  { transform: scale(0.91); }
    100% { transform: scale(1); }
  }
  @keyframes caret { 0%,50% { opacity: 1 } 51%,100% { opacity: 0 } }
`;
const GlobalStyles = () => <style>{_ANIM}</style>;

// Shake: wraps a non-functional element — vibrates on click
const Shake = ({ children }) => {
  const [on, setOn] = React.useState(false);
  const child = React.Children.only(children);
  const go = () => { if (on) return; setOn(true); setTimeout(() => setOn(false), 480); };
  return React.cloneElement(child, {
    onClick: go,
    style: { ...child.props.style, animation: on ? 'shake 0.45s ease' : undefined, cursor: 'not-allowed' },
  });
};

// Tap: wraps a functional element — scales down on click then executes
const Tap = ({ children }) => {
  const [on, setOn] = React.useState(false);
  const child = React.Children.only(children);
  const orig = child.props.onClick;
  const go = (e) => { setOn(true); setTimeout(() => setOn(false), 200); orig?.(e); };
  return React.cloneElement(child, {
    onClick: go,
    style: { ...child.props.style, animation: on ? 'tap 0.2s ease' : undefined },
  });
};

// ─── Avatar pieces ───────────────────────────────────────────
const Avatar = ({ p, size = 30, ring = false, ringColor = '#fff' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', background: p.color,
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: size * 0.42,
    border: ring ? `2px solid ${ringColor}` : 'none',
    flexShrink: 0,
  }}>{p.initial}</div>
);

const AvatarStack = ({ people, size = 28, max = 4, bg = '#fff' }) => {
  const shown = people.slice(0, max);
  const extra = people.length - max;
  return (
    <div style={{ display: 'flex' }}>
      {shown.map((p, i) => (
        <div key={p.id} style={{ marginLeft: i === 0 ? 0 : -size * 0.32 }}>
          <Avatar p={p} size={size} ring ringColor={bg}/>
        </div>
      ))}
      {extra > 0 && (
        <div style={{
          marginLeft: -size * 0.32,
          width: size, height: size, borderRadius: '50%',
          background: PAL.line, color: PAL.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: size * 0.4,
          border: `2px solid ${bg}`,
        }}>+{extra}</div>
      )}
    </div>
  );
};

// ─── Status bar / nav ────────────────────────────────────────
const StatusBar = ({ dark = false, tint }) => {
  const c = dark ? '#fff' : (tint || PAL.ink);
  return (
    <div style={{
      height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 22px', fontFamily: FONT, fontSize: 14, fontWeight: 600, color: c,
      position: 'relative', flexShrink: 0,
    }}>
      <span>9:41</span>
      <div style={{
        position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)',
        width: 22, height: 22, borderRadius: 100, background: dark ? '#000' : '#1d1d1d',
      }}/>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 10.5L.67 3.17a10.37 10.37 0 0114.66 0L8 10.5z"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M14.67 10.67V0L0 10.67h14.67z"/>
        </svg>
        <div style={{
          width: 22, height: 11, border: `1.3px solid ${c}`, borderRadius: 3,
          position: 'relative', opacity: 0.95,
        }}>
          <div style={{ position: 'absolute', inset: 1.5, width: '75%', background: c, borderRadius: 1 }}/>
          <div style={{ position: 'absolute', right: -3, top: 3, width: 2, height: 5, background: c, borderRadius: 1 }}/>
        </div>
      </div>
    </div>
  );
};

const NavPill = ({ dark = false }) => (
  <div style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <div style={{ width: 108, height: 4, borderRadius: 2, background: dark ? '#fff' : PAL.ink, opacity: 0.6 }}/>
  </div>
);

const Phone = ({ children, bg = PAL.bg, statusTint, statusDark = false, navDark = false }) => (
  <div style={{
    width: 390, height: 800, borderRadius: 40, overflow: 'hidden',
    background: bg, border: `9px solid #1b2030`,
    boxShadow: '0 40px 80px -20px rgba(11,42,89,0.35), 0 8px 20px rgba(0,0,0,0.12)',
    display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
    fontFamily: FONT, color: PAL.ink, position: 'relative',
  }}>
    <StatusBar dark={statusDark} tint={statusTint}/>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {children}
    </div>
    <NavPill dark={navDark}/>
  </div>
);

const TabBar = ({ active = 'plan', onTab = () => {} }) => {
  const tabs = [
    { k: 'home', label: 'Inicio', icon: 'home' },
    { k: 'map', label: 'Mapa', icon: 'map' },
    { k: 'plan', label: 'Proponer', icon: 'plus', fab: true },
    { k: 'group', label: 'Grupo', icon: 'users' },
    { k: 'me', label: 'Perfil', icon: 'user' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
      padding: '10px 14px 14px', background: PAL.white,
      borderTop: `1px solid ${PAL.line}`, flexShrink: 0,
    }}>
      {tabs.map(t => {
        const isA = t.k === active;
        if (t.fab) return (
          <Tap key={t.k}>
            <div onClick={() => onTab(t.k)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: -22, cursor: 'pointer' }}>
              <div style={{
                width: 54, height: 54, borderRadius: 18, background: PAL.orange,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 20px -4px rgba(255,107,53,0.5), 0 4px 8px rgba(255,107,53,0.25)',
                color: '#fff',
              }}>
                <Icon name="plus" size={26} color="#fff" stroke={2.4}/>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: PAL.orangeInk, letterSpacing: 0.2 }}>{t.label}</span>
            </div>
          </Tap>
        );
        return (
          <Shake key={t.k}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 54 }}>
              <Icon name={t.icon} size={22} color={isA ? PAL.blue : PAL.inkSoft} stroke={isA ? 2.2 : 1.8}/>
              <span style={{ fontSize: 10, fontWeight: isA ? 700 : 500, color: isA ? PAL.blue : PAL.inkSoft }}>{t.label}</span>
            </div>
          </Shake>
        );
      })}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 1 — Trips hub (próximos)
// ═════════════════════════════════════════════════════════════
const Screen1_Trips = ({ navigate = () => {} }) => (
  <Phone>
    <div style={{
      background: PAL.blue, color: '#fff', padding: '18px 24px 70px',
      borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: PAL.orange, opacity: 0.18 }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, letterSpacing: 0.4, textTransform: 'uppercase' }}>hola, Luna</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Shake>
            <div style={{ position: 'relative' }}>
              <Icon name="bell" size={22} color="#fff"/>
              <div style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, borderRadius: '50%', background: PAL.orange, border: '2px solid #1FA2D8' }}/>
            </div>
          </Shake>
          <Avatar p={GROUP[0]} size={36}/>
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.1 }}>Próximos viajes</div>
      <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>Planificá con tu grupo</div>
    </div>

    {/* Active trip card */}
    <div style={{ padding: '0 20px', marginTop: -52 }}>
      <div style={{
        background: PAL.white, borderRadius: 22, padding: 18,
        boxShadow: '0 16px 30px -12px rgba(11,42,89,0.22)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: PAL.orangeSoft, color: PAL.orangeInk, padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: PAL.orange }}/>
              En 12 días
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 10, letterSpacing: -0.3 }}>Patagonia · verano</div>
            <div style={{ fontSize: 13, color: PAL.inkSoft, marginTop: 2 }}>14 al 25 feb · Bariloche & El Bolsón</div>
          </div>
        </div>

        {/* Group + planned */}
        <div style={{
          marginTop: 14, padding: '12px 14px', borderRadius: 14, background: PAL.bg,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <AvatarStack people={GROUP} size={30} bg={PAL.bg}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: PAL.ink }}>4 viajeros</div>
            <div style={{ fontSize: 11, color: PAL.inkSoft }}>Tomás, Cami, Mateo + vos</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: PAL.blueDeep, letterSpacing: -0.3 }}>9</div>
            <div style={{ fontSize: 10, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5 }}>actividades</div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Tap>
            <div onClick={() => navigate('plan')} style={{ flex: 1, background: PAL.blue, color: '#fff', borderRadius: 12, padding: '11px 12px', fontWeight: 700, fontSize: 13, textAlign: 'center', cursor: 'pointer' }}>
              Ver plan del viaje
            </div>
          </Tap>
          <Shake>
            <div style={{ background: PAL.white, border: `1px solid ${PAL.line}`, borderRadius: 12, padding: '11px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="msg" size={18} color={PAL.ink}/>
            </div>
          </Shake>
        </div>
      </div>
    </div>

    {/* Recent activity in the group */}
    <div style={{ padding: '24px 24px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{ fontSize: 16, fontWeight: 700 }}>Movimientos del grupo</div>
      <Shake><div style={{ fontSize: 12, color: PAL.blueDeep, fontWeight: 600 }}>Ver todo</div></Shake>
    </div>
    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1, overflow: 'hidden' }}>
      {[
        { who: GROUP[1], action: 'propuso', what: 'Cerro Catedral · trekking', when: 'hace 2 h', icon: 'plus', tone: PAL.green },
        { who: GROUP[2], action: 'modificó la hora de', what: 'Asado en El Bolsón', when: 'hace 5 h', icon: 'edit', tone: PAL.yellow },
        { who: GROUP[3], action: 'eliminó', what: 'Visita museo (día 3)', when: 'ayer', icon: 'trash', tone: PAL.red },
      ].map((m, i) => (
        <div key={i} style={{
          background: PAL.white, borderRadius: 14, padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${PAL.line}`,
        }}>
          <Avatar p={m.who} size={32}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, lineHeight: 1.35 }}>
              <b>{m.who.name}</b> <span style={{ color: PAL.inkSoft }}>{m.action}</span> <b>{m.what}</b>
            </div>
            <div style={{ fontSize: 11, color: PAL.inkSoft, marginTop: 1 }}>{m.when}</div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: m.tone + '22',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name={m.icon} size={15} color={m.tone} stroke={2.2}/>
          </div>
        </div>
      ))}
    </div>

    <TabBar active="home" onTab={k => k === 'plan' && navigate('type-pick')}/>
  </Phone>
);

// ═════════════════════════════════════════════════════════════
// SCREEN 2 — Trip plan (itinerary, collaborative)
// ═════════════════════════════════════════════════════════════
const Screen2_Plan = ({ navigate = () => {} }) => {
  const T = GROUP[1], C = GROUP[2], M = GROUP[3], L = GROUP[0];
  const items = [
    {
      t: '09:00', title: 'Mate y medialunas', place: 'Refugio Bahía López',
      icon: 'mate', color: PAL.orange, status: 'confirm',
      proposer: T, going: [T, C, M, L], cost: '$ 4.800',
    },
    {
      t: '11:00', title: 'Trekking Refugio Frey', place: 'Cerro Catedral · 4 h',
      icon: 'hike', color: PAL.blue, status: 'confirm',
      proposer: T, going: [T, C, L], notGoing: [M], cost: '$ 0',
    },
    {
      t: '15:30', title: 'Asado de cordero', place: 'Parador El Bolsón',
      icon: 'asado', color: PAL.orange, status: 'voting',
      proposer: C, votes: 3, cost: '$ 28.500',
    },
    {
      t: '—', title: 'Cervecería artesanal', place: 'Sin horario · sugerencia',
      icon: 'star', color: PAL.blueDeep, status: 'pending',
      proposer: M, cost: '$ ?',
    },
  ];

  const StatusChip = ({ status }) => {
    if (status === 'confirm') return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: PAL.green, background: PAL.greenSoft, padding: '3px 7px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        <Icon name="check" size={10} color={PAL.green} stroke={2.6}/>Confirmado
      </span>
    );
    if (status === 'voting') return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: PAL.orangeInk, background: PAL.orangeSoft, padding: '3px 7px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        Votación abierta
      </span>
    );
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: PAL.blueInk, background: PAL.blueSoft, padding: '3px 7px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: 0.4 }}>
        Sugerencia
      </span>
    );
  };

  return (
    <Phone bg={PAL.bg}>
      {/* Top bar */}
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Tap>
          <div onClick={() => navigate('home')} style={{ width: 40, height: 40, borderRadius: 12, background: PAL.white, border: `1px solid ${PAL.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="back" size={20} color={PAL.ink}/>
          </div>
        </Tap>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: PAL.inkSoft, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Patagonia · verano</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginTop: -1 }}>Plan del viaje</div>
        </div>
        <AvatarStack people={GROUP} size={26} bg={PAL.bg}/>
      </div>

      {/* Day strip */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', gap: 8, overflowX: 'hidden' }}>
        {[14,15,16,17,18,19].map(d => {
          const a = d === 14;
          const DayEl = a ? Tap : Shake;
          return (
            <DayEl key={d}>
              <div style={{
                flexShrink: 0, width: 52, padding: '10px 0', borderRadius: 14, textAlign: 'center',
                background: a ? PAL.blue : PAL.white, color: a ? '#fff' : PAL.ink,
                border: `1px solid ${a ? PAL.blue : PAL.line}`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, opacity: a ? 0.7 : 0.55, textTransform: 'uppercase' }}>
                  {['vie','sáb','dom','lun','mar','mié'][d-14]}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{d}</div>
              </div>
            </DayEl>
          );
        })}
      </div>

      {/* Items */}
      <div style={{ flex: 1, padding: '4px 16px 12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((e, i) => (
          <div key={i} style={{
            background: PAL.white, borderRadius: 16, padding: 12, border: `1px solid ${PAL.line}`,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            {/* Left: time + drag */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, width: 38, textAlign: 'center' }}>{e.t}</div>
              <Icon name="drag" size={14} color={PAL.line} stroke={2}/>
            </div>

            {/* Middle: details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: e.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={e.icon} size={13} color="#fff" stroke={2.2}/>
                </div>
                <span style={{ fontSize: 14.5, fontWeight: 700 }}>{e.title}</span>
              </div>
              <div style={{ fontSize: 12, color: PAL.inkSoft, marginBottom: 6 }}>{e.place}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <StatusChip status={e.status}/>
                <span style={{ fontSize: 11, fontWeight: 700, color: PAL.orangeInk }}>{e.cost}</span>
              </div>

              {/* Bottom strip: who */}
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                {e.going && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AvatarStack people={e.going} size={22} bg={PAL.white}/>
                    <span style={{ fontSize: 11, color: PAL.inkSoft }}>
                      {e.going.length} van{e.notGoing ? ` · ${e.notGoing.length} no` : ''}
                    </span>
                  </div>
                )}
                {e.status === 'voting' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="heart" size={14} color={PAL.orange}/>
                    <span style={{ fontSize: 11, color: PAL.inkSoft }}>{e.votes}/4 a favor</span>
                  </div>
                )}
                {e.status === 'pending' && (
                  <span style={{ fontSize: 11, color: PAL.inkSoft, display: 'flex', alignItems: 'center', gap: 4 }}>
                    Propuso <b style={{ color: PAL.ink }}>{e.proposer.name}</b>
                  </span>
                )}
              </div>
            </div>

            {/* Right: edit/delete */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Shake><div style={{ display: 'flex' }}><Icon name="edit" size={16} color={PAL.inkSoft}/></div></Shake>
              <Shake><div style={{ display: 'flex' }}><Icon name="trash" size={16} color={PAL.inkSoft}/></div></Shake>
            </div>
          </div>
        ))}
      </div>

      {/* Floating add */}
      <div style={{ padding: '0 20px 14px' }}>
        <Tap>
          <div onClick={() => navigate('type-pick')} style={{
            background: PAL.orange, color: '#fff', borderRadius: 16, padding: '14px',
            textAlign: 'center', fontWeight: 700, fontSize: 15,
            boxShadow: '0 10px 24px -6px rgba(255,107,53,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer',
          }}>
            <Icon name="plus" size={18} color="#fff" stroke={2.4}/>
            Proponer actividad
          </div>
        </Tap>
      </div>
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 3 — New activity bottom sheet (type pick + WHEN)
// ═════════════════════════════════════════════════════════════
const Screen3_TypePick = ({ navigate = () => {} }) => {
  const [selected, setSelected] = React.useState('hike');
  const types = [
    { k: 'food', label: 'Comida', icon: 'food', color: PAL.orange },
    { k: 'hike', label: 'Excursión', icon: 'hike', color: PAL.blue },
    { k: 'mus', label: 'Cultura', icon: 'mus', color: PAL.orange },
    { k: 'bed', label: 'Alojamiento', icon: 'bed', color: PAL.blue },
    { k: 'plane', label: 'Transporte', icon: 'plane', color: PAL.orange },
    { k: 'star', label: 'Otra', icon: 'star', color: PAL.blue },
  ];
  return (
    <Phone bg={PAL.blueDeep} statusDark navDark>
      {/* dimmed plan peeks through */}
      <div style={{ flex: 1, opacity: 0.22, padding: '18px 20px', color: '#fff' }}>
        <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 700, letterSpacing: 0.4 }}>PATAGONIA · VERANO</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>Plan del viaje</div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 78, background: 'rgba(255,255,255,0.12)', borderRadius: 14 }}/>)}
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        background: PAL.white, borderRadius: '28px 28px 0 0',
        padding: '14px 22px 22px', flexShrink: 0,
        boxShadow: '0 -20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ width: 44, height: 5, borderRadius: 3, background: PAL.line, margin: '0 auto 16px' }}/>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>Proponer actividad</div>
          <div style={{ fontSize: 11, color: PAL.inkSoft, fontWeight: 600 }}>1 / 3</div>
        </div>
        <div style={{ fontSize: 13, color: PAL.inkSoft, marginTop: 4, marginBottom: 16 }}>
          ¿Qué querés sumar al plan del grupo?
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {types.map((t) => {
            const hi = selected === t.k;
            return (
              <div key={t.k} onClick={() => { setSelected(t.k); setTimeout(() => navigate('form'), 200); }} style={{
                background: hi ? PAL.blueSoft : PAL.bg,
                border: `${hi ? 2 : 1}px solid ${hi ? PAL.blue : PAL.line}`,
                borderRadius: 16, padding: '14px 10px', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={t.icon} size={20} color="#fff"/>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: hi ? PAL.blueInk : PAL.ink }}>{t.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: PAL.blueSoft, borderRadius: 14 }}>
          <Icon name="sparkle" size={18} color={PAL.blue}/>
          <span style={{ fontSize: 12, color: PAL.blueInk, flex: 1 }}>
            <b style={{ color: PAL.blue }}>Tomás</b> ya propuso 2 excursiones para Bariloche.
          </span>
        </div>
      </div>
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 4 — Activity details form (with day & time slot)
// ═════════════════════════════════════════════════════════════
const Screen4_Form = ({ navigate = () => {} }) => (
  <Phone bg={PAL.bg}>
    <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Tap>
        <div onClick={() => navigate('type-pick')} style={{ width: 40, height: 40, borderRadius: 12, background: PAL.white, border: `1px solid ${PAL.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="back" size={20} color={PAL.ink}/>
        </div>
      </Tap>
      <div style={{ flex: 1, fontSize: 16, fontWeight: 700 }}>Nueva excursión</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: PAL.inkSoft }}>2 / 3</div>
    </div>

    <div style={{ padding: '8px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: PAL.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="hike" size={22} color="#fff"/>
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Excursión · día 2</div>
          <div style={{ fontSize: 12, color: PAL.inkSoft }}>Patagonia · verano</div>
        </div>
      </div>

      {/* Title */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Título</div>
        <div style={{
          background: PAL.white, borderRadius: 14, padding: '13px 16px',
          border: `2px solid ${PAL.blue}`, fontSize: 15, fontWeight: 500,
          display: 'flex', alignItems: 'center',
        }}>
          Kayak en lago Gutiérrez
          <span style={{ width: 2, height: 18, background: PAL.blue, marginLeft: 2, animation: 'caret 1s infinite' }}/>
        </div>
      </div>

      {/* Place */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Lugar</div>
        <div style={{
          background: PAL.white, borderRadius: 14, padding: '13px 16px',
          border: `1px solid ${PAL.line}`, fontSize: 14,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon name="pin" size={18} color={PAL.orange}/>
          <span style={{ flex: 1 }}>Lago Gutiérrez, Bariloche</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: PAL.orangeInk, background: PAL.orangeSoft, padding: '3px 7px', borderRadius: 100 }}>GPS</span>
        </div>
      </div>

      {/* Day + time */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Día</div>
          <div style={{ background: PAL.white, borderRadius: 14, padding: '13px 12px', border: `1px solid ${PAL.line}`, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="calendar" size={16} color={PAL.inkSoft}/>
            sáb 15 feb
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Inicio</div>
          <div style={{ background: PAL.white, borderRadius: 14, padding: '13px 12px', border: `1px solid ${PAL.line}`, fontSize: 13.5, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="clock" size={15} color={PAL.inkSoft}/> 10:00
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Dura</div>
          <div style={{ background: PAL.white, borderRadius: 14, padding: '13px 12px', border: `1px solid ${PAL.line}`, fontSize: 13.5 }}>
            3 h
          </div>
        </div>
      </div>

      {/* Cost split */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5 }}>Costo estimado</div>
          <div style={{ fontSize: 11, color: PAL.blueDeep, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Icon name="split" size={12} color={PAL.blueDeep}/> Dividir
          </div>
        </div>
        <div style={{
          background: PAL.white, borderRadius: 14, padding: '13px 16px', border: `1px solid ${PAL.line}`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="dollar" size={16} color={PAL.inkSoft}/>
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>$ 18.000</span>
          <span style={{ fontSize: 11, color: PAL.inkSoft }}>≈ <b style={{ color: PAL.ink }}>$ 4.500</b> c/u</span>
        </div>
      </div>

      {/* Notas */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Notas para el grupo</div>
        <div style={{
          background: PAL.white, borderRadius: 14, padding: '12px 14px', border: `1px solid ${PAL.line}`,
          fontSize: 13, color: PAL.inkSoft, minHeight: 50,
        }}>
          Reserva con 24 hs. Llevar muda seca y protector solar.
        </div>
      </div>
    </div>

    <div style={{ padding: '8px 20px 16px', background: PAL.bg }}>
      <Tap>
        <div onClick={() => navigate('invite')} style={{
          background: PAL.blue, color: '#fff', borderRadius: 16, padding: '15px',
          textAlign: 'center', fontWeight: 700, fontSize: 15, letterSpacing: 0.1,
          boxShadow: '0 10px 24px -6px rgba(31,162,216,0.4)', cursor: 'pointer',
        }}>
          Siguiente · invitar al grupo
        </div>
      </Tap>
    </div>
  </Phone>
);

// ═════════════════════════════════════════════════════════════
// SCREEN 5 — Invite group / set RSVP
// ═════════════════════════════════════════════════════════════
const Screen5_Invite = ({ navigate = () => {} }) => {
  const [rsvp, setRsvp] = React.useState({
    lu: 'going', to: 'going', ca: 'maybe', ma: 'notgoing',
  });
  const rows = [
    { p: GROUP[0], note: 'vos' },
    { p: GROUP[1], note: 'sabe remar' },
    { p: GROUP[2], note: '' },
    { p: GROUP[3], note: 'lesionado' },
  ];
  const Pill = ({ pid, value, color, bg, label }) => {
    const [on, setOn] = React.useState(false);
    const go = () => { setOn(true); setTimeout(() => setOn(false), 200); setRsvp(r => ({ ...r, [pid]: value })); };
    return (
      <div onClick={go} style={{
        padding: '6px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700,
        background: rsvp[pid] === value ? bg : 'transparent',
        color: rsvp[pid] === value ? color : PAL.inkSoft,
        border: `1px solid ${rsvp[pid] === value ? color : PAL.line}`,
        letterSpacing: 0.2, textAlign: 'center', minWidth: 38, cursor: 'pointer',
        animation: on ? 'tap 0.2s ease' : undefined,
      }}>{label}</div>
    );
  };
  return (
    <Phone bg={PAL.bg}>
      <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Tap>
          <div onClick={() => navigate('form')} style={{ width: 40, height: 40, borderRadius: 12, background: PAL.white, border: `1px solid ${PAL.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="back" size={20} color={PAL.ink}/>
          </div>
        </Tap>
        <div style={{ flex: 1, fontSize: 16, fontWeight: 700 }}>Quién va</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: PAL.inkSoft }}>3 / 3</div>
      </div>

      <div style={{ padding: '6px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        {/* summary card */}
        <div style={{
          background: PAL.white, borderRadius: 18, overflow: 'hidden', border: `1px solid ${PAL.line}`,
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${PAL.blue}, ${PAL.blueDeep})`,
            color: '#fff', padding: '14px 16px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -20, top: -20, width: 90, height: 90, borderRadius: '50%', background: PAL.orange, opacity: 0.25 }}/>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              sáb 15 feb · 10:00
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, marginTop: 4, letterSpacing: -0.3 }}>Kayak en lago Gutiérrez</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, opacity: 0.9, fontSize: 12 }}>
              <Icon name="pin" size={13} color="#fff"/>
              <span>Lago Gutiérrez, Bariloche</span>
            </div>
          </div>
        </div>

        {/* RSVP rows */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
            Participantes · 4 personas
          </div>
          <div style={{ background: PAL.white, borderRadius: 16, border: `1px solid ${PAL.line}`, overflow: 'hidden' }}>
            {rows.map((r, i) => (
              <div key={r.p.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                borderTop: i === 0 ? 'none' : `1px solid ${PAL.line}`,
              }}>
                <Avatar p={r.p} size={34}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.p.name}{r.p.me && <span style={{ fontSize: 10, color: PAL.inkSoft, fontWeight: 600, marginLeft: 6 }}>(vos)</span>}</div>
                  {r.note && <div style={{ fontSize: 11, color: PAL.inkSoft }}>{r.note}</div>}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Pill pid={r.p.id} value="going"    label="✓" color={PAL.green}    bg={PAL.greenSoft}/>
                  <Pill pid={r.p.id} value="maybe"    label="?" color={PAL.orangeInk} bg={PAL.orangeSoft}/>
                  <Pill pid={r.p.id} value="notgoing" label="✕" color={PAL.red}      bg="#FBE5E5"/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voting toggle */}
        <div style={{
          background: PAL.white, borderRadius: 14, padding: '12px 14px',
          border: `1px solid ${PAL.line}`, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: PAL.orangeSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="heart" size={18} color={PAL.orange}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Abrir votación</div>
            <div style={{ fontSize: 11, color: PAL.inkSoft }}>Mayoría decide si entra al plan</div>
          </div>
          <Shake>
            <div style={{ width: 42, height: 24, borderRadius: 100, background: PAL.orange, position: 'relative' }}>
              <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, borderRadius: '50%', background: '#fff' }}/>
            </div>
          </Shake>
        </div>
      </div>

      <div style={{ padding: '8px 20px 16px', background: PAL.bg, display: 'flex', gap: 10 }}>
        <Shake>
          <div style={{
            flex: 1, background: PAL.white, border: `1px solid ${PAL.line}`, color: PAL.ink,
            borderRadius: 16, padding: '15px', textAlign: 'center', fontWeight: 700, fontSize: 14,
          }}>
            Borrador
          </div>
        </Shake>
        <Tap>
          <div onClick={() => navigate('posted')} style={{
            flex: 2, background: PAL.orange, color: '#fff', borderRadius: 16, padding: '15px',
            textAlign: 'center', fontWeight: 700, fontSize: 14,
            boxShadow: '0 10px 24px -6px rgba(255,107,53,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer',
          }}>
            <Icon name="check" size={16} color="#fff" stroke={2.4}/>
            Proponer al grupo
          </div>
        </Tap>
      </div>
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 6 — Confirmation: posted to group
// ═════════════════════════════════════════════════════════════
const Screen6_Posted = ({ navigate = () => {} }) => (
  <Phone bg={PAL.blueDeep} statusDark navDark>
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', color: '#fff', padding: '0 32px', textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {[{l:'12%',t:'18%',c:PAL.orange,s:12},{l:'78%',t:'14%',c:'#fff',s:8},
        {l:'20%',t:'72%',c:'#fff',s:6},{l:'82%',t:'70%',c:PAL.orange,s:10},
        {l:'8%',t:'50%',c:PAL.orange,s:6},{l:'88%',t:'42%',c:'#fff',s:10},
        {l:'60%',t:'10%',c:PAL.orange,s:6},{l:'30%',t:'20%',c:'#fff',s:4}].map((d,i)=>(
        <div key={i} style={{
          position:'absolute', left:d.l, top:d.t, width:d.s, height:d.s,
          borderRadius:'50%', background:d.c, opacity: 0.85,
        }}/>
      ))}

      <div style={{
        width: 120, height: 120, borderRadius: '50%', background: PAL.orange,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 20px 50px -10px rgba(255,107,53,0.6)',
        position: 'relative', marginBottom: 28,
      }}>
        <div style={{
          position: 'absolute', inset: -10, borderRadius: '50%',
          border: '2px solid rgba(255,107,53,0.3)',
        }}/>
        <Icon name="check" size={54} color="#fff" stroke={3}/>
      </div>

      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.15 }}>
        ¡Listo, che!<br/>Propuesta enviada
      </div>
      <div style={{ fontSize: 14, opacity: 0.8, marginTop: 12, maxWidth: 280, lineHeight: 1.5 }}>
        Avisamos a <b style={{ color: '#fff' }}>Tomás, Cami y Mateo</b> que sumaste el kayak al sábado 15.
      </div>

      {/* Live RSVP preview */}
      <div style={{
        marginTop: 26, padding: 14, borderRadius: 18, width: '100%',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, opacity: 0.7, textTransform: 'uppercase' }}>Estado en vivo</span>
          <span style={{ fontSize: 11, color: PAL.orange, fontWeight: 700 }}>1 de 4 respondió</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { p: GROUP[0], state: '✓', color: PAL.green },
            { p: GROUP[1], state: '⏳', color: PAL.yellow },
            { p: GROUP[2], state: '⏳', color: PAL.yellow },
            { p: GROUP[3], state: '⏳', color: PAL.yellow },
          ].map(x => (
            <div key={x.p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative' }}>
                <Avatar p={x.p} size={40}/>
                <div style={{
                  position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: '50%',
                  background: x.color, color: '#fff', fontSize: 9, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #0E7AAB',
                }}>{x.state === '✓' ? '✓' : '·'}</div>
              </div>
              <span style={{ fontSize: 10, opacity: 0.85, fontWeight: 600 }}>{x.p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Tap>
        <div onClick={() => navigate('plan')} style={{
          background: '#fff', color: PAL.blueDeep, borderRadius: 16, padding: '15px',
          textAlign: 'center', fontWeight: 700, fontSize: 15, cursor: 'pointer',
        }}>
          Volver al plan del viaje
        </div>
      </Tap>
      <Shake>
        <div style={{
          color: '#fff', opacity: 0.8, padding: '10px', textAlign: 'center',
          fontWeight: 600, fontSize: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="msg" size={15} color="#fff"/>
          Escribirle al grupo
        </div>
      </Shake>
    </div>
  </Phone>
);

Object.assign(window, {
  Screen1_Trips, Screen2_Plan, Screen3_TypePick,
  Screen4_Form, Screen5_Invite, Screen6_Posted,
});
