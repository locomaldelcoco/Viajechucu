// screens.jsx — Viajero (collaborative trip planner)
// Plan upcoming activities together. Anyone can add/edit/remove.
// Palette: celeste + naranja. Argentine context (Patagonia trip).

const PAL = {
  blue: '#1565C0',
  blueDeep: '#0D47A1',
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
  @keyframes pulseRing {
    0%   { transform: scale(1);   opacity: 0.7; }
    100% { transform: scale(2.6); opacity: 0;   }
  }
  @keyframes pinFloat {
    0%,100% { transform: translate(-50%,-100%) translateY(0px); }
    50%     { transform: translate(-50%,-100%) translateY(-6px); }
  }
  @keyframes routeFlow {
    from { stroke-dashoffset: 32; }
    to   { stroke-dashoffset: 0;  }
  }
  input, textarea { transition: border-color 0.15s, box-shadow 0.15s; }
  input:focus, textarea:focus { outline: none; border-color: #1565C0 !important; box-shadow: 0 0 0 3px rgba(21,101,192,0.12); }
`;
const GlobalStyles = () => <style>{_ANIM}</style>;

const Shake = ({ children }) => {
  const [on, setOn] = React.useState(false);
  const child = React.Children.only(children);
  const go = () => { if (on) return; setOn(true); setTimeout(() => setOn(false), 480); };
  return React.cloneElement(child, {
    onClick: go,
    style: { ...child.props.style, animation: on ? 'shake 0.45s ease' : undefined, cursor: 'not-allowed' },
  });
};

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
const Avatar = ({ p, size = 30, ring = false, ringColor = '#fff' }) => {
  const [imgErr, setImgErr] = React.useState(false);
  const borderStyle = ring ? `2px solid ${ringColor}` : 'none';
  if (p.photoURL && !imgErr) return (
    <img src={p.photoURL} alt={p.name || p.initial}
      referrerPolicy="no-referrer"
      onError={() => setImgErr(true)}
      style={{ width:size, height:size, borderRadius:'50%', objectFit:'cover', flexShrink:0, border:borderStyle }}
    />
  );
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background: p.color || '#888',
      color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
      fontWeight:700, fontSize:size * 0.42,
      border: borderStyle, flexShrink:0,
    }}>{p.initial}</div>
  );
};

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
              <div style={{ width: 54, height: 54, borderRadius: 18, background: PAL.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px -4px rgba(255,107,53,0.5), 0 4px 8px rgba(255,107,53,0.25)', color: '#fff' }}>
                <Icon name="plus" size={26} color="#fff" stroke={2.4}/>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: PAL.orangeInk, letterSpacing: 0.2 }}>{t.label}</span>
            </div>
          </Tap>
        );
        return (
          <div key={t.k} onClick={() => onTab(t.k)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 54, cursor: 'pointer' }}>
            <Icon name={t.icon} size={22} color={isA ? PAL.blue : PAL.inkSoft} stroke={isA ? 2.2 : 1.8}/>
            <span style={{ fontSize: 10, fontWeight: isA ? 700 : 500, color: isA ? PAL.blue : PAL.inkSoft }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 0 — Login
// ═════════════════════════════════════════════════════════════
const Screen0_Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError]     = React.useState(null);

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError('No se pudo iniciar sesión. Intentá de nuevo.');
      setLoading(false);
    }
  };

  return (
    <Phone bg={PAL.bg}>
      {/* Header */}
      <div style={{ background: PAL.blue, padding: '60px 32px 80px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', background: PAL.orange, opacity: 0.18 }}/>
        <div style={{ position: 'absolute', left: -40, bottom: -40, width: 160, height: 160, borderRadius: '50%', background: '#fff', opacity: 0.06 }}/>
        <div style={{ width: 72, height: 72, borderRadius: 22, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}>
          <svg width="44" height="44" viewBox="0 0 512 512">
            <path d="M380 160 160 260l40 30-20 62 42-28 32 24 126-188z" fill={PAL.orange}/>
            <path d="M200 290l-40-30 180-100-140 130z" fill={PAL.blue} opacity="0.5"/>
          </svg>
        </div>
        <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: -0.8, lineHeight: 1.1 }}>Viajechucu</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontWeight: 500 }}>Planificá viajes en grupo,<br/>sin el caos.</div>
      </div>

      {/* Features */}
      <div style={{ flex: 1, padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { icon: 'calendar', text: 'Armá el itinerario entre todos' },
          { icon: 'heart',    text: 'Votá las actividades del grupo' },
          { icon: 'users',    text: 'Coordiná sin llenar el WhatsApp' },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: PAL.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={f.icon} size={22} color={PAL.blue}/>
            </div>
            <span style={{ fontSize: 14, color: PAL.inkSoft, fontWeight: 500 }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* Login button */}
      <div style={{ padding: '0 24px 32px', display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
        {error && <div style={{ fontSize: 12, color: PAL.red, textAlign: 'center', fontWeight: 600 }}>{error}</div>}
        <div onClick={loading ? undefined : handleGoogle} style={{
          background: loading ? PAL.bg : PAL.white,
          border: `1.5px solid ${PAL.line}`,
          borderRadius: 16, padding: '15px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          cursor: loading ? 'default' : 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}>
          {!loading && (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          <span style={{ fontSize: 15, fontWeight: 700, color: loading ? PAL.inkSoft : PAL.ink }}>
            {loading ? 'Iniciando sesión…' : 'Continuar con Google'}
          </span>
        </div>
        <div style={{ fontSize: 11, color: PAL.inkSoft, textAlign: 'center', lineHeight: 1.5 }}>
          Al continuar aceptás que tus datos se<br/>usen para planificar viajes con tu grupo.
        </div>
      </div>
    </Phone>
  );
};

// ─── PlacesInput — autocomplete via Nominatim (OpenStreetMap) ───
const PlacesInput = ({ value, onChange, placeholder, inputStyle }) => {
  const [query, setQuery]     = React.useState(value || '');
  const [results, setResults] = React.useState([]);
  const [busy, setBusy]       = React.useState(false);
  const [open, setOpen]       = React.useState(false);
  const timer = React.useRef(null);

  const search = (q) => {
    clearTimeout(timer.current);
    if (!q || q.length < 3) { setResults([]); return; }
    timer.current = setTimeout(async () => {
      setBusy(true);
      try {
        const res  = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&accept-language=es`);
        const data = await res.json();
        setResults(data.map(r => r.display_name.split(',').slice(0, 2).join(',').trim()));
      } catch(_) {} finally { setBusy(false); }
    }, 500);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          style={inputStyle}
          placeholder={placeholder}
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); search(e.target.value); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
        />
        {busy && <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', fontSize:18, color:PAL.inkSoft }}>…</div>}
      </div>
      {open && results.length > 0 && (
        <div style={{ position:'absolute', top:'100%', left:0, right:0, background:'#fff', borderRadius:14, border:`1px solid ${PAL.line}`, boxShadow:'0 8px 28px rgba(0,0,0,0.14)', zIndex:200, overflow:'hidden', marginTop:4 }}>
          {results.map((r, i) => (
            <div key={i} onMouseDown={() => { setQuery(r); onChange(r); setResults([]); setOpen(false); }}
              style={{ padding:'11px 14px', fontSize:13, cursor:'pointer', borderBottom: i < results.length-1 ? `1px solid ${PAL.line}` : 'none', display:'flex', alignItems:'center', gap:10, background:'#fff' }}>
              <Icon name="pin" size={14} color={PAL.orange}/>
              <span style={{ flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── DateRangePicker — mini calendario de rango ───────────────
const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const now = new Date();
  const [yr, setYr]  = React.useState(now.getFullYear());
  const [mo, setMo]  = React.useState(now.getMonth());

  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const fmt = (d) => {
    const ms = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    return `${d.getDate()} ${ms[d.getMonth()]} ${d.getFullYear()}`;
  };
  const parse = (str) => {
    if (!str) return null;
    const ms = {ene:0,feb:1,mar:2,abr:3,may:4,jun:5,jul:6,ago:7,sep:8,oct:9,nov:10,dic:11};
    const [d,m,y] = str.toLowerCase().split(' ');
    return new Date(+y, ms[m], +d);
  };

  const startD = parse(startDate);
  const endD   = parse(endDate);

  const days   = new Date(yr, mo+1, 0).getDate();
  // Monday-first: (getDay()+6)%7
  const offset = (new Date(yr, mo, 1).getDay() + 6) % 7;
  const cells  = Array(offset).fill(null).concat(Array.from({length:days},(_,i)=>i+1));

  const dateOf = (d) => new Date(yr, mo, d);

  const isStart  = (d) => startD && dateOf(d).toDateString() === startD.toDateString();
  const isEnd    = (d) => endD   && dateOf(d).toDateString() === endD.toDateString();
  const inRange  = (d) => startD && endD && dateOf(d) > startD && dateOf(d) < endD;
  const isPast   = (d) => dateOf(d) < new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const handleDay = (d) => {
    if (isPast(d)) return;
    const clicked = dateOf(d);
    if (!startD || (startD && endD)) {
      onChange({ startDate: fmt(clicked), endDate: '' });
    } else {
      if (clicked < startD) onChange({ startDate: fmt(clicked), endDate: '' });
      else onChange({ startDate, endDate: fmt(clicked) });
    }
  };

  const prev = () => mo === 0 ? (setYr(y=>y-1), setMo(11)) : setMo(m=>m-1);
  const next = () => mo === 11 ? (setYr(y=>y+1), setMo(0))  : setMo(m=>m+1);

  return (
    <div style={{ background:PAL.white, borderRadius:16, padding:'14px 12px', border:`1px solid ${PAL.line}`, boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
      {/* Nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
        <div onClick={prev} style={{ width:30, height:30, borderRadius:8, background:PAL.bg, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Icon name="chevL" size={16} color={PAL.ink}/>
        </div>
        <span style={{ fontSize:14, fontWeight:700 }}>{MONTHS[mo]} {yr}</span>
        <div onClick={next} style={{ width:30, height:30, borderRadius:8, background:PAL.bg, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Icon name="chevR" size={16} color={PAL.ink}/>
        </div>
      </div>
      {/* Headers L M M J V S D */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:4 }}>
        {['L','M','M','J','V','S','D'].map((h,i) => (
          <div key={i} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:PAL.inkSoft, padding:'3px 0' }}>{h}</div>
        ))}
      </div>
      {/* Days */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i}/>;
          const sel = isStart(d) || isEnd(d);
          const rng = inRange(d);
          const past = isPast(d);
          return (
            <div key={i} onClick={() => handleDay(d)} style={{
              textAlign:'center', padding:'7px 0', cursor: past ? 'default' : 'pointer',
              borderRadius: sel ? 9 : (rng ? 0 : 9),
              background: sel ? PAL.blue : (rng ? PAL.blueSoft : 'transparent'),
              color: past ? PAL.line : (sel ? '#fff' : (rng ? PAL.blue : PAL.ink)),
              fontWeight: sel ? 700 : 400,
              fontSize: 13,
            }}>{d}</div>
          );
        })}
      </div>
      {/* Summary */}
      {(startDate || endDate) && (
        <div style={{ marginTop:10, padding:'8px 10px', background:PAL.blueSoft, borderRadius:10, fontSize:12, color:PAL.blueInk, fontWeight:500 }}>
          {startDate && <span>Del <b>{startDate}</b></span>}
          {endDate   && <span> al <b>{endDate}</b></span>}
          {startDate && !endDate && <span style={{ color:PAL.inkSoft }}> — Elegí la fecha de regreso</span>}
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN NEW TRIP — Crear o unirse a un viaje
// ═════════════════════════════════════════════════════════════
const ScreenNewTrip = ({ currentUser, onTripReady }) => {
  const [mode, setMode]         = React.useState(null);
  const [loading, setLoading]   = React.useState(false);
  const [error, setError]       = React.useState(null);
  const [tripName, setTripName] = React.useState('');
  const [dest, setDest]         = React.useState('');
  const [dateRange, setDateRange] = React.useState({ startDate:'', endDate:'' });
  const [showCal, setShowCal]   = React.useState(false);
  const [code, setCode]         = React.useState('');

  const firstName = currentUser?.displayName?.split(' ')[0] || 'viajero';

  const inp = {
    width:'100%', padding:'13px 16px', borderRadius:14,
    border:`1.5px solid ${PAL.line}`, fontSize:15, fontFamily:FONT,
    background:PAL.white, color:PAL.ink, boxSizing:'border-box',
  };

  const handleCreate = async () => {
    if (!tripName.trim()) { setError('Ponele un nombre al viaje.'); return; }
    setLoading(true); setError(null);
    try {
      const id = await createTrip({ name:tripName.trim(), destination:dest.trim(), startDate:dateRange.startDate, endDate:dateRange.endDate }, currentUser);
      onTripReady(id);
    } catch(e) { setError('No se pudo crear. Intentá de nuevo.'); setLoading(false); }
  };

  const handleJoin = async () => {
    if (code.trim().length < 4) { setError('Ingresá el código de invitación.'); return; }
    setLoading(true); setError(null);
    try {
      const id = await joinTrip(code.trim(), currentUser);
      onTripReady(id);
    } catch(e) { setError(e.message || 'Código inválido.'); setLoading(false); }
  };

  const dateLabel = (v, ph) => v
    ? <span style={{ fontSize:14, fontWeight:600, color:PAL.ink }}>{v}</span>
    : <span style={{ fontSize:14, color:PAL.inkSoft }}>{ph}</span>;

  if (mode === 'create') return (
    <Phone bg={PAL.bg}>
      <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <div onClick={() => { setMode(null); setError(null); }} style={{ width:38, height:38, borderRadius:11, background:PAL.white, border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Icon name="back" size={18} color={PAL.ink}/>
        </div>
        <div style={{ fontSize:17, fontWeight:700 }}>Nuevo viaje</div>
      </div>
      <div style={{ flex:1, padding:'8px 20px', display:'flex', flexDirection:'column', gap:14, overflowY:'auto' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.5, marginBottom:8 }}>Nombre del viaje *</div>
          <input style={inp} placeholder="Ej: Patagonia con los pibes" value={tripName} onChange={e => setTripName(e.target.value)}/>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.5, marginBottom:8 }}>Destino</div>
          <PlacesInput value={dest} onChange={setDest} placeholder="Ej: Bariloche, Argentina" inputStyle={inp}/>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.5, marginBottom:8 }}>Fechas</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom: showCal ? 12 : 0 }}>
            {[
              { label:'Desde', val:dateRange.startDate, ph:'Día de salida' },
              { label:'Hasta', val:dateRange.endDate,   ph:'Día de regreso' },
            ].map(f => (
              <div key={f.label} onClick={() => setShowCal(v=>!v)} style={{ background:PAL.white, borderRadius:14, padding:'12px 14px', border:`1.5px solid ${showCal ? PAL.blue : PAL.line}`, cursor:'pointer' }}>
                <div style={{ fontSize:10, fontWeight:700, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.4, marginBottom:4 }}>{f.label}</div>
                {dateLabel(f.val, f.ph)}
              </div>
            ))}
          </div>
          {showCal && (
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={dr => { setDateRange(dr); if (dr.startDate && dr.endDate) setShowCal(false); }}
            />
          )}
        </div>
      </div>
      <div style={{ padding:'12px 20px 22px', flexShrink:0 }}>
        {error && <div style={{ fontSize:12, color:PAL.red, marginBottom:10, textAlign:'center', fontWeight:600 }}>{error}</div>}
        <div onClick={loading ? undefined : handleCreate} style={{ background:loading ? PAL.line : PAL.blue, color:'#fff', borderRadius:16, padding:'15px', textAlign:'center', fontWeight:700, fontSize:15, cursor:loading?'default':'pointer', boxShadow:loading?'none':'0 10px 24px -6px rgba(21,101,192,0.4)' }}>
          {loading ? 'Creando viaje…' : 'Crear viaje'}
        </div>
      </div>
    </Phone>
  );

  if (mode === 'join') return (
    <Phone bg={PAL.bg}>
      <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <div onClick={() => { setMode(null); setError(null); }} style={{ width:38, height:38, borderRadius:11, background:PAL.white, border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Icon name="back" size={18} color={PAL.ink}/>
        </div>
        <div style={{ fontSize:17, fontWeight:700 }}>Unirme a un viaje</div>
      </div>
      <div style={{ flex:1, padding:'40px 28px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:24 }}>
        <div style={{ width:80, height:80, borderRadius:24, background:PAL.orangeSoft, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon name="users" size={38} color={PAL.orange}/>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:20, fontWeight:700, marginBottom:6 }}>Código de invitación</div>
          <div style={{ fontSize:14, color:PAL.inkSoft, lineHeight:1.5 }}>Pedíselo a quien creó el viaje.<br/>Son 6 caracteres.</div>
        </div>
        <input
          style={{ ...inp, textAlign:'center', fontSize:28, fontWeight:800, letterSpacing:8, textTransform:'uppercase', width:'100%' }}
          placeholder="ABC123" maxLength={6}
          value={code} onChange={e => setCode(e.target.value.toUpperCase())}
        />
      </div>
      <div style={{ padding:'12px 20px 22px', flexShrink:0 }}>
        {error && <div style={{ fontSize:12, color:PAL.red, marginBottom:10, textAlign:'center', fontWeight:600 }}>{error}</div>}
        <div onClick={loading ? undefined : handleJoin} style={{ background:loading ? PAL.line : PAL.orange, color:'#fff', borderRadius:16, padding:'15px', textAlign:'center', fontWeight:700, fontSize:15, cursor:loading?'default':'pointer', boxShadow:loading?'none':'0 10px 24px -6px rgba(255,107,53,0.5)' }}>
          {loading ? 'Uniéndome…' : 'Unirme al viaje'}
        </div>
      </div>
    </Phone>
  );

  return (
    <Phone bg={PAL.bg}>
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'0 24px', gap:20 }}>
        <div style={{ textAlign:'center', marginBottom:8 }}>
          <div style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5 }}>¡Hola, {firstName}!</div>
          <div style={{ fontSize:14, color:PAL.inkSoft, marginTop:8, lineHeight:1.6 }}>No tenés ningún viaje activo.<br/>¿Querés crear uno o unirte?</div>
        </div>
        {[
          { mode:'create', icon:'plus',  color:PAL.blue,   bg:PAL.blueSoft,   title:'Crear un viaje',       sub:'Vos sos el admin. Invitás al resto.' },
          { mode:'join',   icon:'users', color:PAL.orange, bg:PAL.orangeSoft, title:'Unirme a un viaje',    sub:'Necesitás el código de invitación.' },
        ].map(opt => (
          <div key={opt.mode} onClick={() => setMode(opt.mode)} style={{ background:PAL.white, borderRadius:20, padding:'20px', border:`1px solid ${PAL.line}`, cursor:'pointer', display:'flex', alignItems:'center', gap:16, boxShadow:'0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ width:56, height:56, borderRadius:18, background:opt.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={opt.icon} size={26} color={opt.color} stroke={2.2}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:700 }}>{opt.title}</div>
              <div style={{ fontSize:13, color:PAL.inkSoft, marginTop:3 }}>{opt.sub}</div>
            </div>
            <Icon name="chevR" size={18} color={PAL.inkSoft}/>
          </div>
        ))}
      </div>
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 1 — Trips hub (próximos)
// ═════════════════════════════════════════════════════════════
const Screen1_Trips = ({ navigate = () => {}, currentUser = null, currentTrip = null }) => {
  const firstName   = currentUser?.displayName?.split(' ')[0] || 'viajero';
  const userPhoto   = currentUser?.photoURL || currentUser?.providerData?.[0]?.photoURL || null;
  console.log('[Avatar debug] photoURL:', currentUser?.photoURL, '| providerData[0]:', currentUser?.providerData?.[0]?.photoURL);
  const tripName    = currentTrip?.name        || 'Mi viaje';
  const tripDest    = currentTrip?.destination || '';
  const tripDates   = [currentTrip?.startDate, currentTrip?.endDate].filter(Boolean).join(' al ');
  const memberCount = Object.keys(currentTrip?.members || {}).length;
  const memberNames = Object.values(currentTrip?.members || {})
    .filter(m => m.name !== currentUser?.displayName)
    .slice(0, 3)
    .map(m => m.name.split(' ')[0])
    .join(', ');
  // Build avatar people from trip members
  const COLORS = ['#FF6B35','#1FA2D8','#F4B941','#2E9E6A','#9C6FDE','#E94B7D'];
  const tripPeople = Object.entries(currentTrip?.members || {}).map(([uid, m], i) => ({
    id: uid, name: m.name, photoURL: m.photoURL, initial: m.name.charAt(0).toUpperCase(),
    color: COLORS[i % COLORS.length], me: uid === currentUser?.uid,
  }));

  return (
  <Phone>
    <div style={{
      background: PAL.blue, color: '#fff', padding: '18px 24px 70px',
      borderRadius: '0 0 28px 28px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: PAL.orange, opacity: 0.18 }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, letterSpacing: 0.4, textTransform: 'uppercase' }}>hola, {firstName}</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Shake>
            <div style={{ position: 'relative' }}>
              <Icon name="bell" size={22} color="#fff"/>
              <div style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, borderRadius: '50%', background: PAL.orange, border: '2px solid #1565C0' }}/>
            </div>
          </Shake>
          <Avatar p={{ photoURL: userPhoto, initial: firstName.charAt(0).toUpperCase(), color: PAL.orange }} size={36}/>
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
              Activo
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 10, letterSpacing: -0.3 }}>{tripName}</div>
            <div style={{ fontSize: 13, color: PAL.inkSoft, marginTop: 2 }}>{[tripDates, tripDest].filter(Boolean).join(' · ')}</div>
          </div>
        </div>

        {/* Group + planned */}
        <div style={{
          marginTop: 14, padding: '12px 14px', borderRadius: 14, background: PAL.bg,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <AvatarStack people={tripPeople} size={30} bg={PAL.bg}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: PAL.ink }}>{memberCount} viajero{memberCount !== 1 ? 's' : ''}</div>
            <div style={{ fontSize: 11, color: PAL.inkSoft }}>{memberNames || 'Solo vos por ahora'}</div>
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

    <TabBar active="home" onTab={k => {
      if (k === 'plan')  navigate('type-pick');
      if (k === 'me')    navigate('profile');
      if (k === 'group') navigate('group');
      if (k === 'map')   navigate('map');
    }}/>
  </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 2 — Trip plan (itinerary, collaborative)
// ═════════════════════════════════════════════════════════════
const _DAYS = [14,15,16,17,18,19];
const _DAY_LABELS = ['vie','sáb','dom','lun','mar','mié'];
const T = GROUP[1], C = GROUP[2], M = GROUP[3], L = GROUP[0];
const ACTIVITIES_BY_DAY = {
  14: [
    { id:'a1', t:'09:00', title:'Mate y medialunas', place:'Refugio Bahía López', icon:'mate', color:PAL.orange, status:'confirm', proposer:T, going:[T,C,M,L], cost:'$ 4.800', notes:'Llevar mate y yerbera.' },
    { id:'a2', t:'11:00', title:'Trekking Refugio Frey', place:'Cerro Catedral · 4 h', icon:'hike', color:PAL.blue, status:'confirm', proposer:T, going:[T,C,L], notGoing:[M], cost:'$ 0', notes:'Sendero rojo, nivel medio.' },
    { id:'a3', t:'15:30', title:'Asado de cordero', place:'Parador El Bolsón', icon:'asado', color:PAL.orange, status:'voting', proposer:C, votes:3, cost:'$ 28.500', notes:'Reserva a nombre de Cami.' },
    { id:'a4', t:'—', title:'Cervecería artesanal', place:'Sin horario · sugerencia', icon:'star', color:PAL.blueDeep, status:'pending', proposer:M, cost:'$ ?', notes:'A confirmar horario.' },
  ],
  15: [
    { id:'b1', t:'10:00', title:'Kayak lago Gutiérrez', place:'Lago Gutiérrez, Bariloche', icon:'hike', color:PAL.blue, status:'confirm', proposer:L, going:[T,C,M,L], cost:'$ 18.000', notes:'Llevar muda seca.' },
    { id:'b2', t:'14:00', title:'Almuerzo parador', place:'Parador km 8', icon:'food', color:PAL.orange, status:'confirm', proposer:C, going:[T,C,L], cost:'$ 12.000', notes:'' },
  ],
  16: [
    { id:'c1', t:'08:30', title:'Amanecer en el cerro', place:'Cerro Otto · teleférico', icon:'sun', color:PAL.yellow, status:'voting', proposer:T, votes:2, cost:'$ 9.000', notes:'Salida temprana 8:30 hs.' },
    { id:'c2', t:'13:00', title:'Picnic en el lago', place:'Playa Bonita, Bariloche', icon:'mate', color:PAL.green, status:'confirm', proposer:L, going:[T,C,M,L], cost:'$ 3.500', notes:'Cada uno lleva algo.' },
    { id:'c3', t:'19:00', title:'Show de folklore', place:'Centro Cívico', icon:'mus', color:PAL.blueDeep, status:'pending', proposer:M, cost:'$ 6.000', notes:'' },
  ],
  17: [
    { id:'d1', t:'Todo el día', title:'Día libre en El Bolsón', place:'El Bolsón, Río Negro', icon:'sun', color:PAL.green, status:'confirm', proposer:L, going:[T,C,M,L], cost:'$ 0', notes:'Feria artesanal los jueves.' },
  ],
  18: [
    { id:'e1', t:'10:00', title:'Cabalgata patagónica', place:'Estancia El Cóndor', icon:'hike', color:PAL.orange, status:'voting', proposer:C, votes:1, cost:'$ 22.000', notes:'Cupos limitados, reservar.' },
    { id:'e2', t:'20:00', title:'Cena de despedida', place:'Restaurante Casita Suiza', icon:'food', color:PAL.blue, status:'confirm', proposer:T, going:[T,C,M,L], cost:'$ 45.000', notes:'Reserva para 4 personas.' },
  ],
  19: [
    { id:'f1', t:'08:00', title:'Vuelta a Buenos Aires', place:'Aero Bariloche → AEP', icon:'plane', color:PAL.blueDeep, status:'confirm', proposer:L, going:[T,C,M,L], cost:'$ 180.000', notes:'Check-in 2 hs antes.' },
  ],
};

const StatusChip = ({ status }) => {
  if (status === 'confirm') return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, color:PAL.green, background:PAL.greenSoft, padding:'3px 7px', borderRadius:100, textTransform:'uppercase', letterSpacing:0.4 }}>
      <Icon name="check" size={10} color={PAL.green} stroke={2.6}/>Confirmado
    </span>
  );
  if (status === 'voting') return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, color:PAL.orangeInk, background:PAL.orangeSoft, padding:'3px 7px', borderRadius:100, textTransform:'uppercase', letterSpacing:0.4 }}>
      Votación abierta
    </span>
  );
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700, color:PAL.blueInk, background:PAL.blueSoft, padding:'3px 7px', borderRadius:100, textTransform:'uppercase', letterSpacing:0.4 }}>
      Sugerencia
    </span>
  );
};

const Screen2_Plan = ({ navigate = () => {} }) => {
  const [activeDay, setActiveDay] = React.useState(14);
  const [activities, setActivities] = React.useState(() =>
    Object.fromEntries(Object.entries(ACTIVITIES_BY_DAY).map(([k,v]) => [k, v.map(a => ({...a}))]))
  );
  const [deleting, setDeleting] = React.useState(null);
  const isAdmin = true;

  const items = activities[activeDay] || [];

  const deleteActivity = (id) => {
    setActivities(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].filter(a => a.id !== id),
    }));
    setDeleting(null);
  };

  const voteActivity = (id) => {
    setActivities(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].map(a =>
        a.id === id ? { ...a, votes: Math.min((a.votes || 0) + 1, 4), myVote: !a.myVote } : a
      ),
    }));
  };

  return (
    <Phone bg={PAL.bg}>
      {/* Top bar */}
      <div style={{ padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
        <Tap>
          <div onClick={() => navigate('home')} style={{ width:40, height:40, borderRadius:12, background:PAL.white, border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Icon name="back" size={20} color={PAL.ink}/>
          </div>
        </Tap>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:PAL.inkSoft, fontWeight:600, textTransform:'uppercase', letterSpacing:0.4 }}>Patagonia · verano</div>
          <div style={{ fontSize:17, fontWeight:700, marginTop:-1 }}>Plan del viaje</div>
        </div>
        <AvatarStack people={GROUP} size={26} bg={PAL.bg}/>
      </div>

      {/* Day strip */}
      <div style={{ padding:'4px 16px 12px', display:'flex', gap:8, overflowX:'hidden' }}>
        {_DAYS.map((d, i) => {
          const a = d === activeDay;
          return (
            <div key={d} onClick={() => setActiveDay(d)} style={{
              flexShrink:0, width:52, padding:'10px 0', borderRadius:14, textAlign:'center',
              background: a ? PAL.blue : PAL.white, color: a ? '#fff' : PAL.ink,
              border:`1px solid ${a ? PAL.blue : PAL.line}`,
              cursor:'pointer', transition:'background 0.15s',
            }}>
              <div style={{ fontSize:10, fontWeight:600, opacity: a ? 0.7 : 0.55, textTransform:'uppercase' }}>
                {_DAY_LABELS[i]}
              </div>
              <div style={{ fontSize:17, fontWeight:700, marginTop:2 }}>{d}</div>
            </div>
          );
        })}
      </div>

      {/* Items */}
      <div style={{ flex:1, padding:'4px 16px 12px', overflow:'hidden', display:'flex', flexDirection:'column', gap:10 }}>
        {items.length === 0 && (
          <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, opacity:0.5 }}>
            <Icon name="calendar" size={36} color={PAL.inkSoft}/>
            <div style={{ fontSize:14, color:PAL.inkSoft, fontWeight:600 }}>Sin actividades este día</div>
          </div>
        )}
        {items.map((e) => (
          <div key={e.id}>
            <div onClick={() => navigate('activity-detail', { activity: e, day: activeDay, onVote: voteActivity, onDelete: deleteActivity })}
              style={{
                background:PAL.white, borderRadius:16, padding:12, border:`1px solid ${PAL.line}`,
                display:'flex', gap:12, alignItems:'flex-start', cursor:'pointer',
              }}>
              {/* Left: time */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, paddingTop:2 }}>
                <div style={{ fontSize:11, fontWeight:700, color:PAL.inkSoft, width:38, textAlign:'center' }}>{e.t}</div>
                <Icon name="drag" size={14} color={PAL.line} stroke={2}/>
              </div>

              {/* Middle */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                  <div style={{ width:22, height:22, borderRadius:7, background:e.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name={e.icon} size={13} color="#fff" stroke={2.2}/>
                  </div>
                  <span style={{ fontSize:14.5, fontWeight:700 }}>{e.title}</span>
                </div>
                <div style={{ fontSize:12, color:PAL.inkSoft, marginBottom:6 }}>{e.place}</div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <StatusChip status={e.status}/>
                  <span style={{ fontSize:11, fontWeight:700, color:PAL.orangeInk }}>{e.cost}</span>
                </div>
                <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:8 }}>
                  {e.going && (
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <AvatarStack people={e.going} size={22} bg={PAL.white}/>
                      <span style={{ fontSize:11, color:PAL.inkSoft }}>
                        {e.going.length} van{e.notGoing ? ` · ${e.notGoing.length} no` : ''}
                      </span>
                    </div>
                  )}
                  {e.status === 'voting' && (
                    <div onClick={ev => { ev.stopPropagation(); voteActivity(e.id); }}
                      style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
                      <Icon name="heart" size={15} color={e.myVote ? PAL.red : PAL.inkSoft} stroke={e.myVote ? 2.5 : 1.8}/>
                      <span style={{ fontSize:11, color: e.myVote ? PAL.red : PAL.inkSoft, fontWeight: e.myVote ? 700 : 500 }}>{e.votes || 0}/4</span>
                    </div>
                  )}
                  {e.status === 'pending' && (
                    <span style={{ fontSize:11, color:PAL.inkSoft }}>
                      Propuso <b style={{ color:PAL.ink }}>{e.proposer.name}</b>
                    </span>
                  )}
                </div>
              </div>

              {/* Right: admin actions */}
              {isAdmin && (
                <div style={{ display:'flex', flexDirection:'column', gap:6 }} onClick={ev => ev.stopPropagation()}>
                  <Shake>
                    <div style={{ display:'flex', padding:4 }}>
                      <Icon name="edit" size={16} color={PAL.inkSoft}/>
                    </div>
                  </Shake>
                  <div onClick={() => setDeleting(e.id)} style={{ display:'flex', padding:4, cursor:'pointer' }}>
                    <Icon name="trash" size={16} color={deleting === e.id ? PAL.red : PAL.inkSoft}/>
                  </div>
                </div>
              )}
            </div>

            {/* Inline delete confirmation */}
            {deleting === e.id && (
              <div style={{ background:'#FBE5E5', borderRadius:'0 0 16px 16px', padding:'10px 14px', display:'flex', alignItems:'center', gap:8, marginTop:-4 }}>
                <span style={{ flex:1, fontSize:12, color:PAL.red, fontWeight:600 }}>¿Eliminar "{e.title}"?</span>
                <div onClick={() => deleteActivity(e.id)} style={{ padding:'5px 12px', borderRadius:8, background:PAL.red, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>Sí</div>
                <div onClick={() => setDeleting(null)} style={{ padding:'5px 12px', borderRadius:8, background:PAL.bg, border:`1px solid ${PAL.line}`, fontSize:12, fontWeight:700, cursor:'pointer' }}>No</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating add */}
      <div style={{ padding:'0 20px 14px' }}>
        <Tap>
          <div onClick={() => navigate('type-pick')} style={{ background:PAL.orange, color:'#fff', borderRadius:16, padding:'14px', textAlign:'center', fontWeight:700, fontSize:15, boxShadow:'0 10px 24px -6px rgba(255,107,53,0.55)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>Proponer actividad</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 11, color: PAL.inkSoft, fontWeight: 600 }}>1 / 3</div>
            <Tap>
              <div onClick={() => navigate('plan')} style={{ width: 32, height: 32, borderRadius: 10, background: PAL.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icon name="cross" size={16} color="#fff" stroke={2.4}/>
              </div>
            </Tap>
          </div>
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
        <div onClick={() => navigate('invite')} style={{ background: PAL.blue, color: '#fff', borderRadius: 16, padding: '15px', textAlign: 'center', fontWeight: 700, fontSize: 15, letterSpacing: 0.1, boxShadow: '0 10px 24px -6px rgba(31,162,216,0.4)', cursor: 'pointer' }}>
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
  const Pill = ({ pid, value, color, bg, label }) => (
    <div onClick={() => setRsvp(r => ({ ...r, [pid]: value }))} style={{
      padding: '6px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700,
      background: rsvp[pid] === value ? bg : 'transparent',
      color: rsvp[pid] === value ? color : PAL.inkSoft,
      border: `1px solid ${rsvp[pid] === value ? color : PAL.line}`,
      letterSpacing: 0.2, textAlign: 'center', minWidth: 38, cursor: 'pointer',
    }}>{label}</div>
  );
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
          <div style={{ flex: 1, background: PAL.white, border: `1px solid ${PAL.line}`, color: PAL.ink, borderRadius: 16, padding: '15px', textAlign: 'center', fontWeight: 700, fontSize: 14 }}>
            Borrador
          </div>
        </Shake>
        <Tap>
          <div onClick={() => navigate('posted')} style={{ flex: 2, background: PAL.orange, color: '#fff', borderRadius: 16, padding: '15px', textAlign: 'center', fontWeight: 700, fontSize: 14, boxShadow: '0 10px 24px -6px rgba(255,107,53,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
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
                  border: '2px solid #0D47A1',
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
        <div onClick={() => navigate('plan')} style={{ background: '#fff', color: PAL.blueDeep, borderRadius: 16, padding: '15px', textAlign: 'center', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          Volver al plan del viaje
        </div>
      </Tap>
      <Shake>
        <div style={{ color: '#fff', opacity: 0.8, padding: '10px', textAlign: 'center', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Icon name="msg" size={15} color="#fff"/>
          Escribirle al grupo
        </div>
      </Shake>
    </div>
  </Phone>
);

// ═════════════════════════════════════════════════════════════
// SCREEN 7 — Perfil de usuario
// ═════════════════════════════════════════════════════════════
const Screen7_Profile = ({ navigate = () => {}, currentUser = null }) => {
  const displayName = currentUser?.displayName || GROUP[0].name;
  const photoURL    = currentUser?.photoURL    || null;
  const initial     = displayName.charAt(0).toUpperCase();
  const ME = { ...GROUP[0], name: displayName, initial };
  const [notifs, setNotifs] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [socials, setSocials] = React.useState({
    instagram: { connected: true,  handle: '@luna.viajes' },
    x:         { connected: false, handle: '@luna' },
    tiktok:    { connected: true,  handle: '@lunavlogs' },
  });
  const toggleSocial = k => setSocials(s => ({ ...s, [k]: { ...s[k], connected: !s[k].connected } }));

  const IgIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill={color} stroke="none"/>
    </svg>
  );
  const XIcon = ({ color }) => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={color}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
  const TikTokIcon = ({ color }) => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={color}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.74a4.85 4.85 0 01-1.02-.05z"/>
    </svg>
  );

  const NETS = [
    { key: 'instagram', label: 'Instagram', brand: '#E1306C', bgOn: '#FDE8F0', Icon: IgIcon },
    { key: 'x',         label: 'X',         brand: '#000000', bgOn: '#E8E8E8', Icon: XIcon },
    { key: 'tiktok',    label: 'TikTok',    brand: '#FF0050', bgOn: '#FFE0EA', Icon: TikTokIcon },
  ];

  const trips = [
    { name: 'Patagonia · verano',    dates: '14-25 feb 2026', people: 4, activities: 9,  active: true  },
    { name: 'Córdoba · semana santa', dates: 'abr 2025',       people: 3, activities: 5,  active: false },
    { name: 'Mendoza · vendimia',     dates: 'mar 2025',       people: 6, activities: 7,  active: false },
  ];

  const Toggle = ({ on, onToggle }) => (
    <div onClick={onToggle} style={{ width: 44, height: 26, borderRadius: 100, background: on ? PAL.blue : PAL.line, position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
      <div style={{ position: 'absolute', left: on ? 20 : 2, top: 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
    </div>
  );

  return (
    <Phone bg={PAL.bg}>
      {/* Portada + avatar superpuesto */}
      <div style={{ position: 'relative', flexShrink: 0, marginBottom: 48 }}>
        <div style={{ height: 130, background: `linear-gradient(135deg, ${PAL.blueDeep}, ${PAL.blue})`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: PAL.orange, opacity: 0.22 }}/>
          <div style={{ position: 'absolute', left: -20, bottom: -20, width: 100, height: 100, borderRadius: '50%', background: '#fff', opacity: 0.07 }}/>
        </div>
        <div style={{ position: 'absolute', bottom: -43, left: 22 }}>
          {photoURL ? (
            <img src={photoURL} alt={displayName} style={{ width: 86, height: 86, borderRadius: '50%', border: '4px solid #FAF8F4', objectFit: 'cover', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}/>
          ) : (
            <div style={{ width: 86, height: 86, borderRadius: '50%', background: ME.color, border: '4px solid #FAF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, fontWeight: 800, color: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
              {ME.initial}
            </div>
          )}
        </div>
        {/* Iconos redes — derecha, debajo de portada */}
        <div style={{ position: 'absolute', bottom: -22, right: 20, display: 'flex', gap: 10 }}>
          {NETS.map(net => {
            const s = socials[net.key];
            return (
              <div key={net.key} onClick={() => toggleSocial(net.key)} style={{ width: 38, height: 38, borderRadius: '50%', background: s.connected ? net.bgOn : '#F2F2F2', border: `2px solid ${s.connected ? net.brand : '#D8D8D8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: s.connected ? `0 2px 8px ${net.brand}40` : 'none', transition: 'all 0.2s' }}>
                <net.Icon color={s.connected ? net.brand : '#BBBBBB'}/>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nombre */}
      <div style={{ padding: '0 24px 0', flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{ME.name}</div>
          <div style={{ fontSize: 13, color: PAL.inkSoft, marginTop: 2 }}>{currentUser?.email || '@luna · Buenos Aires'}</div>
        </div>
        <Tap>
          <div onClick={() => fbSignOut()} style={{ marginTop: 4, padding: '6px 12px', borderRadius: 10, background: PAL.bg, border: `1px solid ${PAL.line}`, fontSize: 12, fontWeight: 700, color: PAL.inkSoft, cursor: 'pointer' }}>
            Salir
          </div>
        </Tap>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '18px 20px 8px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Mis viajes */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 10 }}>Mis viajes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {trips.map((t, i) => (
              <Shake key={i}>
                <div style={{ background: PAL.white, borderRadius: 14, padding: '11px 14px', border: `1px solid ${PAL.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.active ? PAL.green : PAL.line, flexShrink: 0 }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: PAL.inkSoft, marginTop: 1 }}>{t.dates} · {t.people} viajeros · {t.activities} actividades</div>
                  </div>
                  <Icon name="chevR" size={16} color={PAL.inkSoft}/>
                </div>
              </Shake>
            ))}
          </div>
        </div>

        {/* Ajustes */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PAL.inkSoft, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 10 }}>Ajustes</div>
          <div style={{ background: PAL.white, borderRadius: 16, border: `1px solid ${PAL.line}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: `1px solid ${PAL.line}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: PAL.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="bell" size={17} color={PAL.blue}/>
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Notificaciones</span>
              <Toggle on={notifs} onToggle={() => setNotifs(v => !v)}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: `1px solid ${PAL.line}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: PAL.yellowSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="sun" size={17} color={PAL.yellow}/>
              </div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Modo oscuro</span>
              <Toggle on={darkMode} onToggle={() => setDarkMode(v => !v)}/>
            </div>
            <Shake>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#FBE5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="cross" size={17} color={PAL.red}/>
                </div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: PAL.red }}>Cerrar sesión</span>
              </div>
            </Shake>
          </div>
        </div>

      </div>

      <TabBar active="me" onTab={k => {
        if (k === 'home')  navigate('home');
        if (k === 'plan')  navigate('type-pick');
        if (k === 'group') navigate('group');
        if (k === 'map')   navigate('map');
      }}/>
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 8 — Grupo
// ═════════════════════════════════════════════════════════════
const Screen8_Group = ({ navigate = () => {}, currentUser = null, currentTrip = null, onTripUpdate = () => {} }) => {
  const COLORS = ['#FF6B35','#1FA2D8','#F4B941','#2E9E6A','#9C6FDE','#E94B7D'];
  const members = Object.entries(currentTrip?.members || {}).map(([uid, m], i) => ({
    id: uid, name: m.name, photoURL: m.photoURL || null,
    initial: m.name.charAt(0).toUpperCase(), color: COLORS[i % COLORS.length],
    role: m.role, me: uid === currentUser?.uid,
  }));
  const isAdmin = currentTrip?.members?.[currentUser?.uid]?.role === 'admin';
  const [copied,   setCopied]   = React.useState(false);
  const [removing, setRemoving] = React.useState(null);
  const [removing2, setRemoving2] = React.useState(false);

  const handleRemove = async (uid) => {
    setRemoving2(true);
    try {
      await removeTripMember(currentTrip.id, uid);
      const newMembers   = { ...currentTrip.members };
      delete newMembers[uid];
      const newMemberIds = (currentTrip.memberIds || []).filter(id => id !== uid);
      onTripUpdate({ ...currentTrip, members: newMembers, memberIds: newMemberIds });
    } finally { setRemoving(null); setRemoving2(false); }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentTrip?.inviteCode || '').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Phone bg={PAL.bg}>
      <div style={{ padding:'10px 16px', display:'flex', alignItems:'center', gap:10, background:PAL.white, borderBottom:`1px solid ${PAL.line}`, flexShrink:0 }}>
        <Tap>
          <div onClick={() => navigate('home')} style={{ width:40, height:40, borderRadius:12, background:PAL.bg, border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <Icon name="back" size={20} color={PAL.ink}/>
          </div>
        </Tap>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:PAL.inkSoft, fontWeight:600, textTransform:'uppercase', letterSpacing:0.4 }}>{currentTrip?.name || 'Mi viaje'}</div>
          <div style={{ fontSize:17, fontWeight:700 }}>Grupo</div>
        </div>
        <div style={{ fontSize:12, fontWeight:700, color:'#fff', background:PAL.blue, padding:'4px 10px', borderRadius:100 }}>
          {members.length} miembro{members.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', gap:16, padding:'16px 20px' }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.7, marginBottom:10 }}>Integrantes</div>
          <div style={{ background:PAL.white, borderRadius:16, border:`1px solid ${PAL.line}`, overflow:'hidden' }}>
            {members.map((m, i) => (
              <div key={m.id}>
                <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderBottom: removing === m.id ? 'none' : (i < members.length-1 ? `1px solid ${PAL.line}` : 'none') }}>
                  <div style={{ position:'relative', flexShrink:0 }}>
                    <Avatar p={m} size={44}/>
                    <div style={{ position:'absolute', bottom:0, right:0, width:12, height:12, borderRadius:'50%', background: m.role==='admin' ? PAL.orange : PAL.green, border:`2px solid #fff` }}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:14, fontWeight:700 }}>{m.name}</span>
                      {m.me && <span style={{ fontSize:10, color:PAL.inkSoft }}>(vos)</span>}
                    </div>
                    <span style={{ fontSize:11, fontWeight:600, color: m.role==='admin' ? PAL.orangeInk : PAL.inkSoft, textTransform:'capitalize' }}>{m.role}</span>
                  </div>
                  {isAdmin && !m.me && (
                    removing === m.id ? (
                      <div style={{ display:'flex', gap:6 }}>
                        <div onClick={() => handleRemove(m.id)} style={{ padding:'5px 10px', borderRadius:8, background:PAL.red, color:'#fff', fontSize:11, fontWeight:700, cursor:'pointer', opacity: removing2 ? 0.6 : 1 }}>
                          {removing2 ? '…' : 'Eliminar'}
                        </div>
                        <div onClick={() => setRemoving(null)} style={{ padding:'5px 10px', borderRadius:8, background:PAL.bg, border:`1px solid ${PAL.line}`, fontSize:11, fontWeight:700, cursor:'pointer' }}>No</div>
                      </div>
                    ) : (
                      <div onClick={() => setRemoving(m.id)} style={{ width:32, height:32, borderRadius:9, background:'#FBE5E5', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                        <Icon name="trash" size={15} color={PAL.red}/>
                      </div>
                    )
                  )}
                </div>
                {removing === m.id && (
                  <div style={{ padding:'8px 16px 12px', background:'#FBE5E5' }}>
                    <span style={{ fontSize:12, color:PAL.red, fontWeight:600 }}>¿Eliminar a {m.name} del grupo?</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isAdmin && (
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.7, marginBottom:10 }}>Invitar al grupo</div>
            <div style={{ background:PAL.white, borderRadius:16, border:`1px solid ${PAL.line}`, padding:'14px 16px' }}>
              <div style={{ fontSize:12, color:PAL.inkSoft, marginBottom:12 }}>Compartí el código para que alguien se una.</div>
              <div style={{ background:PAL.bg, borderRadius:12, padding:'14px', textAlign:'center', marginBottom:12, border:`1px solid ${PAL.line}` }}>
                <div style={{ fontSize:11, color:PAL.inkSoft, fontWeight:600, marginBottom:4 }}>CÓDIGO DE INVITACIÓN</div>
                <div style={{ fontSize:32, fontWeight:900, letterSpacing:8, color:PAL.blue, fontFamily:'monospace' }}>
                  {currentTrip?.inviteCode || '------'}
                </div>
              </div>
              <Tap>
                <div onClick={handleCopy} style={{ background: copied ? PAL.green : PAL.blue, color:'#fff', borderRadius:12, padding:'12px', textAlign:'center', fontWeight:700, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'background 0.2s' }}>
                  <Icon name={copied ? 'check' : 'sparkle'} size={16} color="#fff"/>
                  {copied ? '¡Código copiado!' : 'Copiar código'}
                </div>
              </Tap>
            </div>
          </div>
        )}
      </div>

      <TabBar active="group" onTab={k => {
        if (k === 'home')  navigate('home');
        if (k === 'plan')  navigate('type-pick');
        if (k === 'me')    navigate('profile');
        if (k === 'map')   navigate('map');
      }}/>
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN 9 — Activity detail + RSVP + voting
// ═════════════════════════════════════════════════════════════
const Screen9_ActivityDetail = ({ navigate = () => {}, activity = {}, day = 14, onVote = () => {}, onDelete = () => {} }) => {
  const [rsvp, setRsvp] = React.useState('going');
  const [voted, setVoted] = React.useState(false);
  const [votes, setVotes] = React.useState(activity.votes || 0);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const isAdmin = true;
  const dayLabel = _DAY_LABELS[_DAYS.indexOf(day)] || '';

  const handleVote = () => {
    const next = !voted;
    setVoted(next);
    setVotes(v => next ? Math.min(v + 1, 4) : Math.max(v - 1, 0));
    onVote(activity.id);
  };

  const handleDelete = () => {
    onDelete(activity.id);
    navigate('plan');
  };

  const rsvpOpts = [
    { k:'going',    label:'Voy',    icon:'check',    activeColor:PAL.green,    activeBg:PAL.greenSoft },
    { k:'maybe',    label:'Tal vez', icon:'question', activeColor:PAL.yellow,   activeBg:PAL.yellowSoft },
    { k:'notgoing', label:'No voy',  icon:'cross',    activeColor:PAL.red,      activeBg:'#FBE5E5' },
  ];

  if (!activity.title) {
    return (
      <Phone bg={PAL.bg}>
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color:PAL.inkSoft }}>Sin actividad</span>
        </div>
      </Phone>
    );
  }

  return (
    <Phone bg={PAL.bg}>
      {/* Header */}
      <div style={{ background:activity.color, padding:'14px 16px 28px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:-30, top:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.12)' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
          <Tap>
            <div onClick={() => navigate('plan')} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Icon name="back" size={18} color="#fff"/>
            </div>
          </Tap>
          <div style={{ flex:1 }}/>
          {isAdmin && (
            <>
              <Shake>
                <div style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name="edit" size={17} color="#fff"/>
                </div>
              </Shake>
              <div onClick={() => setConfirmDelete(true)} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <Icon name="trash" size={17} color="#fff"/>
              </div>
            </>
          )}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:44, height:44, borderRadius:14, background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name={activity.icon} size={24} color="#fff" stroke={2}/>
          </div>
          <div>
            <div style={{ fontSize:20, fontWeight:700, color:'#fff', letterSpacing:-0.3 }}>{activity.title}</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.8)', marginTop:2 }}>{activity.place}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', gap:14, padding:'16px 18px' }}>

        {/* Meta row */}
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ flex:1, background:PAL.white, borderRadius:14, padding:'10px 12px', border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="calendar" size={16} color={PAL.inkSoft}/>
            <div>
              <div style={{ fontSize:10, color:PAL.inkSoft, fontWeight:600, textTransform:'uppercase', letterSpacing:0.4 }}>Día</div>
              <div style={{ fontSize:13, fontWeight:700 }}>{dayLabel} {day} feb</div>
            </div>
          </div>
          <div style={{ flex:1, background:PAL.white, borderRadius:14, padding:'10px 12px', border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="clock" size={16} color={PAL.inkSoft}/>
            <div>
              <div style={{ fontSize:10, color:PAL.inkSoft, fontWeight:600, textTransform:'uppercase', letterSpacing:0.4 }}>Hora</div>
              <div style={{ fontSize:13, fontWeight:700 }}>{activity.t}</div>
            </div>
          </div>
          <div style={{ flex:1, background:PAL.white, borderRadius:14, padding:'10px 12px', border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', gap:8 }}>
            <Icon name="dollar" size={16} color={PAL.inkSoft}/>
            <div>
              <div style={{ fontSize:10, color:PAL.inkSoft, fontWeight:600, textTransform:'uppercase', letterSpacing:0.4 }}>Costo</div>
              <div style={{ fontSize:13, fontWeight:700 }}>{activity.cost}</div>
            </div>
          </div>
        </div>

        {/* Status + proposer */}
        <div style={{ background:PAL.white, borderRadius:14, padding:'12px 14px', border:`1px solid ${PAL.line}`, display:'flex', alignItems:'center', gap:10 }}>
          <StatusChip status={activity.status}/>
          <div style={{ flex:1 }}/>
          <Avatar p={activity.proposer || GROUP[0]} size={26}/>
          <span style={{ fontSize:12, color:PAL.inkSoft }}>Propuso <b style={{ color:PAL.ink }}>{(activity.proposer || GROUP[0]).name}</b></span>
        </div>

        {/* Notes */}
        {activity.notes ? (
          <div style={{ background:PAL.white, borderRadius:14, padding:'12px 14px', border:`1px solid ${PAL.line}` }}>
            <div style={{ fontSize:10, color:PAL.inkSoft, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, marginBottom:6 }}>Notas</div>
            <div style={{ fontSize:13, color:PAL.ink, lineHeight:1.5 }}>{activity.notes}</div>
          </div>
        ) : null}

        {/* Who's going */}
        {activity.going && (
          <div style={{ background:PAL.white, borderRadius:14, padding:'12px 14px', border:`1px solid ${PAL.line}` }}>
            <div style={{ fontSize:10, color:PAL.inkSoft, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, marginBottom:10 }}>Participantes</div>
            <div style={{ display:'flex', gap:10 }}>
              {activity.going.map(p => (
                <div key={p.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                  <Avatar p={p} size={36} ring ringColor={PAL.greenSoft}/>
                  <div style={{ width:16, height:16, borderRadius:'50%', background:PAL.greenSoft, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name="check" size={9} color={PAL.green} stroke={2.8}/>
                  </div>
                </div>
              ))}
              {(activity.notGoing || []).map(p => (
                <div key={p.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, opacity:0.5 }}>
                  <Avatar p={p} size={36}/>
                  <div style={{ width:16, height:16, borderRadius:'50%', background:'#FBE5E5', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon name="cross" size={9} color={PAL.red} stroke={2.5}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voting (only for voting-status) */}
        {activity.status === 'voting' && (
          <div style={{ background:PAL.white, borderRadius:14, padding:'12px 14px', border:`1px solid ${PAL.line}` }}>
            <div style={{ fontSize:10, color:PAL.inkSoft, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, marginBottom:10 }}>Votación</div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ flex:1, height:8, borderRadius:4, background:PAL.line, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${(votes/4)*100}%`, background:voted ? PAL.red : PAL.orange, borderRadius:4, transition:'width 0.3s' }}/>
              </div>
              <span style={{ fontSize:13, fontWeight:700, color: voted ? PAL.red : PAL.ink }}>{votes}/4</span>
              <Tap>
                <div onClick={handleVote} style={{ display:'flex', alignItems:'center', gap:6, background: voted ? '#FBE5E5' : PAL.orangeSoft, padding:'8px 14px', borderRadius:10, cursor:'pointer' }}>
                  <Icon name="heart" size={17} color={voted ? PAL.red : PAL.orange} stroke={voted ? 2.5 : 1.8}/>
                  <span style={{ fontSize:13, fontWeight:700, color: voted ? PAL.red : PAL.orangeInk }}>{voted ? 'Votado' : 'Votar'}</span>
                </div>
              </Tap>
            </div>
          </div>
        )}
      </div>

      {/* RSVP bar */}
      <div style={{ padding:'10px 18px 14px', background:PAL.white, borderTop:`1px solid ${PAL.line}`, flexShrink:0 }}>
        <div style={{ fontSize:11, color:PAL.inkSoft, fontWeight:700, textTransform:'uppercase', letterSpacing:0.5, marginBottom:10 }}>Tu confirmación</div>
        <div style={{ display:'flex', gap:8 }}>
          {rsvpOpts.map(o => {
            const active = rsvp === o.k;
            return (
              <Tap key={o.k}>
                <div onClick={() => setRsvp(o.k)} style={{
                  flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5,
                  padding:'10px 6px', borderRadius:14, cursor:'pointer', transition:'all 0.15s',
                  background: active ? o.activeBg : PAL.bg,
                  border: `${active ? 2 : 1}px solid ${active ? o.activeColor : PAL.line}`,
                }}>
                  <Icon name={o.icon} size={18} color={active ? o.activeColor : PAL.inkSoft} stroke={2.2}/>
                  <span style={{ fontSize:11, fontWeight: active ? 700 : 500, color: active ? o.activeColor : PAL.inkSoft }}>{o.label}</span>
                </div>
              </Tap>
            );
          })}
        </div>
      </div>

      {/* Delete confirmation overlay */}
      {confirmDelete && (
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:32, zIndex:10 }}>
          <div style={{ background:PAL.white, borderRadius:20, padding:'24px 22px', margin:'0 24px', textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>¿Eliminar actividad?</div>
            <div style={{ fontSize:13, color:PAL.inkSoft, marginBottom:18 }}>"{activity.title}" se eliminará del plan.</div>
            <div style={{ display:'flex', gap:10 }}>
              <div onClick={() => setConfirmDelete(false)} style={{ flex:1, padding:'12px', borderRadius:12, border:`1px solid ${PAL.line}`, fontSize:14, fontWeight:700, cursor:'pointer', textAlign:'center' }}>Cancelar</div>
              <div onClick={handleDelete} style={{ flex:1, padding:'12px', borderRadius:12, background:PAL.red, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', textAlign:'center' }}>Eliminar</div>
            </div>
          </div>
        </div>
      )}
    </Phone>
  );
};

// ═════════════════════════════════════════════════════════════
// SCREEN MAP — Mapa del viaje
// ═════════════════════════════════════════════════════════════
const ScreenMap = ({ navigate = () => {} }) => {
  const [selected, setSelected] = React.useState(0);

  const places = [
    { id:0, name:'Bariloche',      sub:'Base del viaje · 5 noches', color:PAL.blue,     icon:'bed',    x:43, y:42, activities:6, going:GROUP,                         dist:'—',    dur:'—'    },
    { id:1, name:'Cerro Catedral', sub:'Trekking Refugio Frey',     color:PAL.orange,   icon:'hike',   x:60, y:27, activities:2, going:[GROUP[0],GROUP[1],GROUP[2]],   dist:'19 km', dur:'25 min'},
    { id:2, name:'El Bolsón',      sub:'Asado · feria artesanal',   color:PAL.green,    icon:'asado',  x:27, y:62, activities:3, going:GROUP,                          dist:'120 km',dur:'1 h 40'},
    { id:3, name:'Lago Gutiérrez', sub:'Kayak · día 2',             color:'#5B7FBF',    icon:'hike',   x:55, y:55, activities:1, going:GROUP,                          dist:'8 km',  dur:'12 min'},
  ];

  const sel = places[selected];

  // Ruta en orden: 1→0→3→2
  const routeOrder = [1,0,3,2];
  const routePts = routeOrder.map(i => places[i]);

  return (
    <Phone bg="#E8E4DC">

      {/* Barra de búsqueda flotante */}
      <div style={{ position:'absolute', top:40, left:16, right:16, zIndex:20 }}>
        <div style={{ background:'#fff', borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 4px 20px rgba(0,0,0,0.18)' }}>
          <Icon name="pin" size={18} color={PAL.orange}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700 }}>Patagonia · verano</div>
            <div style={{ fontSize:11, color:PAL.inkSoft }}>Bariloche & El Bolsón · 4 destinos</div>
          </div>
          <div style={{ width:34, height:34, borderRadius:10, background:PAL.blueSoft, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="map" size={17} color={PAL.blue}/>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div style={{ flex:1, position:'relative', overflow:'hidden', minHeight:0 }}>

        {/* SVG del mapa completo */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 390 440" preserveAspectRatio="xMidYMid slice">
          {/* Fondo base beige */}
          <rect width="390" height="440" fill="#E8E4DC"/>
          {/* Bosques / parques */}
          <ellipse cx="80"  cy="80"  rx="70" ry="55"  fill="#C8DBA8" opacity="0.8"/>
          <ellipse cx="300" cy="60"  rx="90" ry="50"  fill="#BDD49E" opacity="0.7"/>
          <ellipse cx="320" cy="200" rx="60" ry="80"  fill="#C2D8A4" opacity="0.6"/>
          <ellipse cx="60"  cy="300" rx="50" ry="60"  fill="#C8DBA8" opacity="0.7"/>
          {/* Lagos */}
          <ellipse cx="170" cy="200" rx="52" ry="38"  fill="#90C4E0" opacity="0.85"/>
          <ellipse cx="220" cy="248" rx="28" ry="22"  fill="#7BBDDA" opacity="0.75"/>
          <ellipse cx="105" cy="270" rx="32" ry="24"  fill="#90C4E0" opacity="0.7"/>
          <ellipse cx="270" cy="300" rx="20" ry="28"  fill="#7BBDDA" opacity="0.65"/>
          {/* Río */}
          <path d="M150 180 Q130 220 108 270" stroke="#7BBDDA" strokeWidth="5" fill="none" opacity="0.7"/>
          <path d="M220 248 Q240 280 270 300" stroke="#7BBDDA" strokeWidth="4" fill="none" opacity="0.65"/>
          {/* Cerros (triángulos) */}
          <polygon points="240,30 255,65 225,65" fill="#A89880" opacity="0.55"/>
          <polygon points="268,22 288,62 248,62" fill="#9E8E78" opacity="0.6"/>
          <polygon points="295,35 312,68 278,68" fill="#A89880" opacity="0.5"/>
          <polygon points="320,18 342,60 298,60" fill="#9E8E78" opacity="0.55"/>
          {/* Calles secundarias */}
          <line x1="0"   y1="150" x2="390" y2="150" stroke="#fff" strokeWidth="2.5" opacity="0.5"/>
          <line x1="0"   y1="320" x2="390" y2="320" stroke="#fff" strokeWidth="2"   opacity="0.45"/>
          <line x1="100" y1="0"   x2="100" y2="440" stroke="#fff" strokeWidth="2"   opacity="0.4"/>
          <line x1="260" y1="0"   x2="260" y2="440" stroke="#fff" strokeWidth="2"   opacity="0.4"/>
          <line x1="0"   y1="240" x2="390" y2="270" stroke="#fff" strokeWidth="1.5" opacity="0.35"/>
          <line x1="50"  y1="0"   x2="160" y2="440" stroke="#fff" strokeWidth="1.5" opacity="0.3"/>
          {/* Ruta principal (RN 40) */}
          <path d="M0 360 Q100 340 165 280 Q200 240 230 200 Q260 155 320 100 Q350 75 390 60"
            stroke="#F5C842" strokeWidth="5" fill="none" opacity="0.9"/>
          <path d="M0 360 Q100 340 165 280 Q200 240 230 200 Q260 155 320 100 Q350 75 390 60"
            stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="8,6"/>
          {/* Ruta secundaria */}
          <path d="M165 280 Q140 310 105 340 Q70 370 40 390"
            stroke="#E8C55A" strokeWidth="3.5" fill="none" opacity="0.8"/>
          {/* Ruta del viaje animada */}
          <path
            d={`M${routePts[0].x*3.9} ${routePts[0].y*4.4} Q${(routePts[0].x+routePts[1].x)/2*3.9} ${(routePts[0].y+routePts[1].y)/2*4.4-20} ${routePts[1].x*3.9} ${routePts[1].y*4.4} Q${(routePts[1].x+routePts[2].x)/2*3.9} ${(routePts[1].y+routePts[2].y)/2*4.4} ${routePts[2].x*3.9} ${routePts[2].y*4.4} Q${(routePts[2].x+routePts[3].x)/2*3.9} ${(routePts[2].y+routePts[3].y)/2*4.4+10} ${routePts[3].x*3.9} ${routePts[3].y*4.4}`}
            stroke={PAL.blue} strokeWidth="3" fill="none" strokeDasharray="6,4"
            style={{ animation: 'routeFlow 1.2s linear infinite' }}
            opacity="0.9"
          />
        </svg>

        {/* Pines */}
        {places.map((p, i) => {
          const isSel = selected === i;
          return (
            <div key={p.id} onClick={() => setSelected(i)} style={{
              position:'absolute',
              left:`${p.x}%`, top:`${p.y}%`,
              transform:'translate(-50%,-100%)',
              cursor:'pointer', zIndex: isSel ? 20 : 10,
              animation: isSel ? 'pinFloat 2s ease-in-out infinite' : 'none',
            }}>
              {/* Anillo pulsante */}
              {isSel && (
                <div style={{
                  position:'absolute', left:'50%', bottom:0,
                  width:44, height:44, borderRadius:'50%',
                  transform:'translate(-50%, 50%)',
                  background:p.color, opacity:0.25,
                  animation:'pulseRing 1.4s ease-out infinite',
                }}/>
              )}
              {/* Pin */}
              <div style={{
                width: isSel ? 44 : 34, height: isSel ? 44 : 34,
                borderRadius: isSel ? 14 : 10,
                background: isSel ? p.color : '#fff',
                border:`3px solid ${p.color}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow: isSel ? `0 6px 20px ${p.color}66` : '0 2px 10px rgba(0,0,0,0.22)',
                transition:'all 0.25s cubic-bezier(.34,1.56,.64,1)',
              }}>
                <Icon name={p.icon} size={isSel ? 22 : 16} color={isSel ? '#fff' : p.color} stroke={2}/>
              </div>
              {/* Label */}
              {isSel && (
                <div style={{
                  position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)',
                  marginTop:6, background:'#fff', borderRadius:8, padding:'3px 9px',
                  fontSize:10, fontWeight:800, color:p.color, whiteSpace:'nowrap',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.18)',
                }}>
                  {p.name}
                </div>
              )}
              {/* Número de actividades (no seleccionado) */}
              {!isSel && (
                <div style={{
                  position:'absolute', top:-6, right:-6, width:16, height:16,
                  borderRadius:'50%', background:p.color, color:'#fff',
                  fontSize:9, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center',
                  border:'2px solid #E8E4DC',
                }}>
                  {p.activities}
                </div>
              )}
            </div>
          );
        })}

        {/* Controles de zoom */}
        <div style={{ position:'absolute', right:14, bottom:14, display:'flex', flexDirection:'column', gap:4 }}>
          {['+','−'].map(z => (
            <div key={z} style={{ width:34, height:34, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:700, color:PAL.ink, boxShadow:'0 2px 8px rgba(0,0,0,0.18)', cursor:'pointer' }}>{z}</div>
          ))}
        </div>

        {/* Badge distancia entre seleccionado y base */}
        {selected !== 0 && (
          <div style={{ position:'absolute', left:14, bottom:14, background:'#fff', borderRadius:10, padding:'6px 10px', boxShadow:'0 2px 10px rgba(0,0,0,0.18)', display:'flex', alignItems:'center', gap:6 }}>
            <Icon name="plane" size={13} color={PAL.inkSoft}/>
            <span style={{ fontSize:11, fontWeight:700, color:PAL.ink }}>{sel.dist}</span>
            <span style={{ fontSize:11, color:PAL.inkSoft }}>· {sel.dur}</span>
          </div>
        )}
      </div>

      {/* Card inferior */}
      <div style={{ background:'#fff', borderRadius:'24px 24px 0 0', padding:'14px 18px 10px', flexShrink:0, boxShadow:'0 -8px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ width:40, height:4, borderRadius:2, background:PAL.line, margin:'0 auto 14px' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
          <div style={{ width:50, height:50, borderRadius:16, background:sel.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 6px 16px ${sel.color}55` }}>
            <Icon name={sel.icon} size={26} color="#fff" stroke={2}/>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:16, fontWeight:800, letterSpacing:-0.3 }}>{sel.name}</div>
            <div style={{ fontSize:12, color:PAL.inkSoft, marginTop:1 }}>{sel.sub}</div>
          </div>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:800, color:sel.color, lineHeight:1 }}>{sel.activities}</div>
            <div style={{ fontSize:9, color:PAL.inkSoft, textTransform:'uppercase', letterSpacing:0.4 }}>actividades</div>
          </div>
        </div>
        {/* Chips de lugares */}
        <div style={{ display:'flex', gap:7, overflowX:'auto', paddingBottom:4 }}>
          {places.map((p, i) => (
            <div key={p.id} onClick={() => setSelected(i)} style={{
              flexShrink:0, padding:'6px 12px', borderRadius:100, fontSize:12, fontWeight:600,
              cursor:'pointer', transition:'all 0.15s',
              background: selected === i ? p.color : PAL.bg,
              color:       selected === i ? '#fff' : PAL.inkSoft,
              border:`1.5px solid ${selected === i ? p.color : PAL.line}`,
            }}>
              {p.name}
            </div>
          ))}
        </div>
      </div>

      <TabBar active="map" onTab={k => {
        if (k === 'home')  navigate('home');
        if (k === 'plan')  navigate('type-pick');
        if (k === 'group') navigate('group');
        if (k === 'me')    navigate('profile');
      }}/>
    </Phone>
  );
};

Object.assign(window, {
  Screen0_Login, ScreenNewTrip,
  Screen1_Trips, Screen2_Plan, Screen3_TypePick,
  Screen4_Form, Screen5_Invite, Screen6_Posted,
  Screen7_Profile, Screen8_Group, Screen9_ActivityDetail,
  ScreenMap,
});
