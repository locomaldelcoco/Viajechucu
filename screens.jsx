// screens.jsx — Mingo

const PAL = {
  bg: '#FAF8FF', white: '#FFFFFF',
  purple: '#7C3AED', purpleSoft: '#EDE9FE', purpleDeep: '#4C1D95',
  pink: '#DB2777', pinkSoft: '#FCE7F3',
  green: '#059669', greenSoft: '#D1FAE5',
  red: '#DC2626', redSoft: '#FEE2E2',
  orange: '#EA580C', orangeSoft: '#FFF7ED',
  yellow: '#D97706', yellowSoft: '#FFFBEB',
  blue: '#2563EB', blueSoft: '#EFF6FF',
  ink: '#1E1B2E', inkMid: '#4B5563', inkSoft: '#9CA3AF', line: '#EDE9FE',
};

const NOTE_TYPES = [
  { k:'gusto-bueno', label:'Gusto bueno',  color:PAL.green,  bg:PAL.greenSoft,  icon:'heart'  },
  { k:'gusto-malo',  label:'Gusto malo',   color:PAL.red,    bg:PAL.redSoft,    icon:'ban'    },
  { k:'enojo',       label:'Enojo',        color:PAL.orange, bg:PAL.orangeSoft, icon:'bolt'   },
  { k:'actitud',     label:'Actitud',      color:PAL.blue,   bg:PAL.blueSoft,   icon:'eye'    },
  { k:'momento',     label:'Momento',      color:PAL.purple, bg:PAL.purpleSoft, icon:'camera' },
  { k:'cumpleanos',  label:'Cumpleaños',   color:PAL.pink,   bg:PAL.pinkSoft,   icon:'cake'   },
  { k:'regalo',      label:'Para regalar', color:PAL.yellow, bg:PAL.yellowSoft, icon:'gift'   },
];

const AVATAR_COLORS = [
  '#7C3AED','#DB2777','#059669','#2563EB','#D97706','#DC2626','#EA580C','#0891B2',
];

function colorForName(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function daysUntilBirthday(isoDate) {
  if (!isoDate) return null;
  const today = new Date();
  const bday  = new Date(isoDate);
  const next  = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.round((next - today) / 86400000);
}

function formatBirthday(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  return d.toLocaleDateString('es-AR', { day:'numeric', month:'long' });
}

function noteTypeInfo(k) {
  return NOTE_TYPES.find(t => t.k === k) || NOTE_TYPES[0];
}

function relNote(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return 'hoy';
  if (diff === 1) return 'ayer';
  if (diff < 7)  return `hace ${diff} días`;
  if (diff < 30) return `hace ${Math.floor(diff/7)} sem.`;
  if (diff < 365)return `hace ${Math.floor(diff/30)} mes.`;
  return `hace ${Math.floor(diff/365)} año${Math.floor(diff/365)>1?'s':''}`;
}

// ─── GlobalStyles ────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${PAL.bg}; font-family: 'Inter', system-ui, sans-serif; }
    input, textarea, select { font-family: inherit; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }
    ::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }
    input[type=date]::-webkit-calendar-picker-indicator { opacity: 0.5; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
  `}</style>
);

// ─── Tap ─────────────────────────────────────────────────────
const Tap = ({ children, onTap, style, disabled }) => {
  const [active, setActive] = React.useState(false);
  return (
    <div
      style={{ ...style, opacity: disabled ? 0.45 : active ? 0.7 : 1, transition:'opacity .12s', cursor: disabled?'default':'pointer', userSelect:'none' }}
      onPointerDown={() => !disabled && setActive(true)}
      onPointerUp={() => { setActive(false); !disabled && onTap?.(); }}
      onPointerLeave={() => setActive(false)}
    >
      {children}
    </div>
  );
};

// ─── Icon ────────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.8 }) => {
  const paths = {
    // navigation
    chevR:    <polyline points="9 6 15 12 9 18"/>,
    chevL:    <polyline points="15 6 9 12 15 18"/>,
    chevD:    <polyline points="6 9 12 15 18 9"/>,
    chevU:    <polyline points="18 15 12 9 6 15"/>,
    close:    <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus:     <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    back:     <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    // note types
    heart:    <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>,
    ban:      <><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    bolt:     <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    eye:      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    camera:   <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    cake:     <><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><line x1="2" y1="21" x2="22" y2="21"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></>,
    gift:     <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>,
    // ui
    search:   <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    user:     <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    users:    <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    bell:     <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    trash:    <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,
    edit:     <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    signout:  <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    google:   <path d="M21.8 10.2H12v3.6h5.6c-.5 2.6-2.8 4.4-5.6 4.4-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 2.9.5 3.9 1.4l2.7-2.7C16.9 3.2 14.6 2.2 12 2.2 6.5 2.2 2.2 6.5 2.2 12S6.5 21.8 12 21.8c5.5 0 9.8-4.3 9.8-9.8 0-.6-.1-1.2-.2-1.8z"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></>,
    check:    <polyline points="20 6 9 17 4 12"/>,
    info:     <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    star:     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ─── Avatar ──────────────────────────────────────────────────
const Avatar = ({ name = '', photoURL, size = 44 }) => {
  const color  = colorForName(name);
  const letter = (name || '?')[0].toUpperCase();
  const [err, setErr] = React.useState(false);
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', overflow:'hidden', background:color, flexShrink:0,
      display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*0.42, fontWeight:700, color:'#fff' }}>
      {photoURL && !err
        ? <img src={photoURL} referrerPolicy="no-referrer" onError={() => setErr(true)}
            style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        : letter}
    </div>
  );
};

// ─── NoteChip ────────────────────────────────────────────────
const NoteChip = ({ kind, small }) => {
  const t = noteTypeInfo(kind);
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding: small ? '2px 7px' : '3px 10px',
      borderRadius:99, background:t.bg, color:t.color, fontSize: small ? 11 : 12, fontWeight:600 }}>
      <Icon name={t.icon} size={small?11:13} color={t.color} stroke={2} />
      {t.label}
    </span>
  );
};

// ─── Phone shell ─────────────────────────────────────────────
const Phone = ({ children }) => (
  <div style={{ width:'100%', maxWidth:430, minHeight:'100dvh', background:PAL.bg,
    display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
    {children}
  </div>
);

// ─── TabBar ──────────────────────────────────────────────────
const TabBar = ({ active, navigate, onAddTap }) => {
  const tabs = [
    { id:'home',      label:'Personas',   icon:'users'    },
    { id:'reminders', label:'Recordar',   icon:'bell'     },
  ];
  return (
    <div style={{ position:'relative', height:68 }}>
      {/* FAB center */}
      <div style={{ position:'absolute', top:-22, left:'50%', transform:'translateX(-50%)', zIndex:20 }}>
        <Tap onTap={onAddTap}>
          <div style={{ width:56, height:56, borderRadius:28, background:PAL.purple,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 4px 20px ${PAL.purple}66` }}>
            <Icon name="plus" size={26} color="#fff" stroke={2.2} />
          </div>
        </Tap>
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:68,
        background:PAL.white, borderTop:`1.5px solid ${PAL.line}`,
        display:'flex', alignItems:'center', paddingBottom:'env(safe-area-inset-bottom)' }}>
        {/* left tabs */}
        <div style={{ flex:1, display:'flex' }}>
          {tabs.map(t => {
            const on = active === t.id;
            return (
              <Tap key={t.id} onTap={() => navigate(t.id)}
                style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3, paddingTop:8 }}>
                <Icon name={t.icon} size={22} color={on ? PAL.purple : PAL.inkSoft} stroke={on ? 2.2 : 1.8} />
                <span style={{ fontSize:11, color: on ? PAL.purple : PAL.inkSoft, fontWeight: on ? 700 : 400 }}>{t.label}</span>
              </Tap>
            );
          })}
        </div>
        {/* spacer for FAB */}
        <div style={{ width:72 }} />
        {/* right tab - profile */}
        <div style={{ flex:1, display:'flex' }}>
          <Tap onTap={() => navigate('profile')}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3, paddingTop:8 }}>
            <Icon name="user" size={22} color={active==='profile' ? PAL.purple : PAL.inkSoft} stroke={active==='profile'?2.2:1.8} />
            <span style={{ fontSize:11, color: active==='profile' ? PAL.purple : PAL.inkSoft, fontWeight: active==='profile'?700:400 }}>Perfil</span>
          </Tap>
        </div>
      </div>
    </div>
  );
};

// ─── Screen0 Login ───────────────────────────────────────────
const Screen0_Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [err, setErr]         = React.useState('');

  const handleGoogle = async () => {
    setLoading(true); setErr('');
    try { await signInWithGoogle(); }
    catch(e) { setErr('No se pudo iniciar sesión. Intentá de nuevo.'); setLoading(false); }
  };

  return (
    <Phone>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32, gap:0 }}>
        {/* logo */}
        <div style={{ width:90, height:90, borderRadius:26, background:PAL.purpleSoft,
          display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24,
          boxShadow:`0 8px 32px ${PAL.purple}33` }}>
          <span style={{ fontSize:44 }}>🧠</span>
        </div>
        <h1 style={{ fontSize:36, fontWeight:800, color:PAL.ink, letterSpacing:-1 }}>Mingo</h1>
        <p style={{ fontSize:15, color:PAL.inkSoft, marginTop:8, textAlign:'center', lineHeight:1.5 }}>
          Tu memoria social. Guardá lo que importa<br/>de las personas que querés.
        </p>

        <div style={{ height:48 }} />

        <Tap onTap={handleGoogle} disabled={loading}
          style={{ width:'100%' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12,
            padding:'15px 24px', borderRadius:16, background:PAL.purple, color:'#fff' }}>
            {loading
              ? <span style={{ fontSize:15, fontWeight:600 }}>Entrando…</span>
              : <>
                  <Icon name="google" size={20} color="#fff" stroke={1.5} />
                  <span style={{ fontSize:15, fontWeight:700 }}>Continuar con Google</span>
                </>
            }
          </div>
        </Tap>

        {err && <p style={{ marginTop:16, fontSize:13, color:PAL.red, textAlign:'center' }}>{err}</p>}

        <p style={{ marginTop:40, fontSize:12, color:PAL.inkSoft, textAlign:'center', lineHeight:1.6 }}>
          Tus datos se guardan en la nube, solo para vos.
        </p>
      </div>
    </Phone>
  );
};

// ─── Screen1 Home (people list) ──────────────────────────────
const Screen1_Home = ({ navigate, authUser, people, onRefresh }) => {
  const [query, setQuery] = React.useState('');

  // birthdays within 7 days
  const soonBirthdays = people.filter(p => {
    const d = daysUntilBirthday(p.birthday);
    return d !== null && d <= 7;
  }).sort((a,b) => daysUntilBirthday(a.birthday) - daysUntilBirthday(b.birthday));

  const filtered = people
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a,b) => a.name.localeCompare(b.name, 'es'));

  return (
    <Phone>
      {/* header */}
      <div style={{ padding:'56px 20px 12px', background:PAL.white, borderBottom:`1.5px solid ${PAL.line}` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:PAL.ink, letterSpacing:-0.5 }}>Mingo</h1>
          <Tap onTap={() => navigate('add-person')}>
            <div style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px',
              borderRadius:12, background:PAL.purpleSoft, color:PAL.purple }}>
              <Icon name="plus" size={16} color={PAL.purple} stroke={2.2} />
              <span style={{ fontSize:13, fontWeight:700 }}>Nueva persona</span>
            </div>
          </Tap>
        </div>
        {/* search */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
          borderRadius:12, background:PAL.bg, border:`1.5px solid ${PAL.line}` }}>
          <Icon name="search" size={16} color={PAL.inkSoft} />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Buscar persona…"
            style={{ flex:1, border:'none', background:'transparent', fontSize:14, color:PAL.ink, outline:'none' }} />
          {query && <Tap onTap={() => setQuery('')}><Icon name="close" size={16} color={PAL.inkSoft} /></Tap>}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 0 16px' }}>

        {/* birthday banner */}
        {soonBirthdays.length > 0 && !query && (
          <div style={{ margin:'16px 16px 0', padding:'14px 16px',
            borderRadius:16, background:PAL.pinkSoft, border:`1.5px solid ${PAL.pink}33` }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <Icon name="cake" size={16} color={PAL.pink} stroke={1.8} />
              <span style={{ fontSize:13, fontWeight:700, color:PAL.pink }}>Próximos cumpleaños</span>
            </div>
            {soonBirthdays.map(p => {
              const d = daysUntilBirthday(p.birthday);
              return (
                <Tap key={p.id} onTap={() => navigate('person', { personId: p.id })}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:6 }}>
                    <Avatar name={p.name} photoURL={p.photoURL} size={28} />
                    <span style={{ flex:1, fontSize:13, color:PAL.ink, fontWeight:500 }}>{p.name}</span>
                    <span style={{ fontSize:12, color:PAL.pink, fontWeight:600 }}>
                      {d === 0 ? '¡Hoy!' : d === 1 ? 'Mañana' : `En ${d} días`}
                    </span>
                  </div>
                </Tap>
              );
            })}
          </div>
        )}

        {/* people list */}
        {filtered.length === 0
          ? <div style={{ padding:40, display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <Icon name="users" size={40} color={PAL.line} />
              <p style={{ fontSize:14, color:PAL.inkSoft, textAlign:'center' }}>
                {query ? 'No encontramos a nadie con ese nombre.' : 'Todavía no agregaste personas.\nTocá "+ Nueva persona" para empezar.'}
              </p>
            </div>
          : <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:10 }}>
              {filtered.map(p => (
                <PersonCard key={p.id} person={p} navigate={navigate} />
              ))}
            </div>
        }
      </div>

      <TabBar active="home" navigate={navigate} onAddTap={() => navigate('add-note', {})} />
    </Phone>
  );
};

const PersonCard = ({ person, navigate }) => {
  const days = daysUntilBirthday(person.birthday);
  const hasBirthday = days !== null && days <= 30;
  return (
    <Tap onTap={() => navigate('person', { personId: person.id })}>
      <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
        borderRadius:16, background:PAL.white, boxShadow:`0 1px 4px ${PAL.ink}0d` }}>
        <Avatar name={person.name} photoURL={person.photoURL} size={48} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:16, fontWeight:700, color:PAL.ink }}>{person.name}</span>
            {hasBirthday && (
              <span style={{ fontSize:11, color:PAL.pink, fontWeight:600 }}>
                🎂 {days === 0 ? '¡Hoy!' : days === 1 ? 'Mañana' : `${days}d`}
              </span>
            )}
          </div>
          {person.tags && person.tags.length > 0 && (
            <div style={{ display:'flex', gap:4, marginTop:4, flexWrap:'wrap' }}>
              {person.tags.slice(0,3).map(tag => (
                <span key={tag} style={{ fontSize:11, padding:'2px 8px', borderRadius:99,
                  background:PAL.purpleSoft, color:PAL.purple, fontWeight:500 }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <Icon name="chevR" size={18} color={PAL.inkSoft} />
      </div>
    </Tap>
  );
};

// ─── Screen2 Person detail ───────────────────────────────────
const Screen2_Person = ({ navigate, authUser, personId, people, onRefresh }) => {
  const [notes, setNotes]       = React.useState(null);
  const [filter, setFilter]     = React.useState('all');
  const [deleting, setDeleting] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const person = (people || []).find(p => p.id === personId);

  React.useEffect(() => {
    if (!authUser || !personId) return;
    getNotes(authUser.uid, personId).then(setNotes);
  }, [authUser?.uid, personId]);

  if (!person) return (
    <Phone>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <p style={{ color:PAL.inkSoft }}>Persona no encontrada</p>
      </div>
      <TabBar active="home" navigate={navigate} onAddTap={() => navigate('add-note', {})} />
    </Phone>
  );

  const days = daysUntilBirthday(person.birthday);

  const noteCounts = NOTE_TYPES.reduce((acc, t) => {
    acc[t.k] = (notes || []).filter(n => n.kind === t.k).length;
    return acc;
  }, {});

  const filtered = (notes || [])
    .filter(n => filter === 'all' || n.kind === filter)
    .sort((a,b) => {
      const ta = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
      const tb = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
      return tb - ta;
    });

  const handleDelete = async () => {
    if (!authUser) return;
    setDeleting(true);
    try {
      await deletePerson(authUser.uid, personId);
      onRefresh?.();
      navigate('home');
    } catch(e) { setDeleting(false); }
  };

  return (
    <Phone>
      {/* header */}
      <div style={{ padding:'52px 20px 16px', background:PAL.white, borderBottom:`1.5px solid ${PAL.line}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <Tap onTap={() => navigate('home')}>
            <Icon name="back" size={22} color={PAL.ink} />
          </Tap>
          <div style={{ flex:1 }} />
          <Tap onTap={() => setShowConfirm(true)}>
            <Icon name="trash" size={20} color={PAL.red} />
          </Tap>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <Avatar name={person.name} photoURL={person.photoURL} size={64} />
          <div style={{ flex:1 }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:PAL.ink, letterSpacing:-0.5 }}>{person.name}</h2>
            {person.birthday && (
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                <Icon name="cake" size={13} color={PAL.pink} />
                <span style={{ fontSize:13, color:PAL.inkMid }}>
                  {formatBirthday(person.birthday)}
                  {days !== null && days <= 30 && (
                    <span style={{ color:PAL.pink, fontWeight:600, marginLeft:6 }}>
                      {days === 0 ? '¡Hoy!' : days === 1 ? 'Mañana' : `en ${days}d`}
                    </span>
                  )}
                </span>
              </div>
            )}
            {person.tags && person.tags.length > 0 && (
              <div style={{ display:'flex', gap:4, marginTop:6, flexWrap:'wrap' }}>
                {person.tags.map(tag => (
                  <span key={tag} style={{ fontSize:11, padding:'2px 8px', borderRadius:99,
                    background:PAL.purpleSoft, color:PAL.purple, fontWeight:500 }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* stats */}
        {notes && (
          <div style={{ display:'flex', gap:8, marginTop:16, overflowX:'auto', paddingBottom:2 }}>
            <Tap onTap={() => setFilter('all')}>
              <div style={{ padding:'5px 12px', borderRadius:99, flexShrink:0,
                background: filter==='all' ? PAL.purple : PAL.bg,
                color: filter==='all' ? '#fff' : PAL.inkMid,
                fontSize:12, fontWeight:600, border:`1.5px solid ${filter==='all'?PAL.purple:PAL.line}` }}>
                Todas ({notes.length})
              </div>
            </Tap>
            {NOTE_TYPES.filter(t => noteCounts[t.k] > 0).map(t => (
              <Tap key={t.k} onTap={() => setFilter(t.k)}>
                <div style={{ padding:'5px 12px', borderRadius:99, flexShrink:0,
                  background: filter===t.k ? t.color : t.bg,
                  color: filter===t.k ? '#fff' : t.color,
                  fontSize:12, fontWeight:600, border:`1.5px solid ${t.color}44` }}>
                  {t.label} ({noteCounts[t.k]})
                </div>
              </Tap>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'12px 16px 16px', display:'flex', flexDirection:'column', gap:10 }}>
        {/* add note button */}
        <Tap onTap={() => navigate('add-note', { personId: person.id, personName: person.name })}>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'13px 16px',
            borderRadius:14, background:PAL.purpleSoft, border:`1.5px dashed ${PAL.purple}66` }}>
            <Icon name="plus" size={18} color={PAL.purple} stroke={2} />
            <span style={{ fontSize:14, fontWeight:600, color:PAL.purple }}>Agregar nota sobre {person.name}</span>
          </div>
        </Tap>

        {notes === null
          ? <div style={{ padding:24, textAlign:'center', color:PAL.inkSoft, fontSize:13 }}>Cargando…</div>
          : filtered.length === 0
            ? <div style={{ padding:32, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
                <Icon name="info" size={32} color={PAL.line} />
                <p style={{ fontSize:13, color:PAL.inkSoft }}>No hay notas{filter!=='all'?' de este tipo':''} todavía.</p>
              </div>
            : filtered.map(note => <NoteCard key={note.id} note={note} authUser={authUser} personId={personId} onDelete={() => getNotes(authUser.uid, personId).then(setNotes)} />)
        }
      </div>

      {/* confirm delete person */}
      {showConfirm && (
        <div style={{ position:'absolute', inset:0, background:'#0008', display:'flex', alignItems:'flex-end', zIndex:100 }}
          onClick={() => setShowConfirm(false)}>
          <div style={{ width:'100%', background:PAL.white, borderRadius:'20px 20px 0 0', padding:'24px 20px 40px' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize:18, fontWeight:700, color:PAL.ink, marginBottom:8 }}>¿Eliminar a {person.name}?</h3>
            <p style={{ fontSize:14, color:PAL.inkMid, marginBottom:24 }}>Se van a borrar todas las notas. Esta acción no se puede deshacer.</p>
            <div style={{ display:'flex', gap:12 }}>
              <Tap onTap={() => setShowConfirm(false)} style={{ flex:1 }}>
                <div style={{ padding:14, borderRadius:14, background:PAL.bg, textAlign:'center',
                  fontSize:15, fontWeight:600, color:PAL.ink }}>Cancelar</div>
              </Tap>
              <Tap onTap={handleDelete} disabled={deleting} style={{ flex:1 }}>
                <div style={{ padding:14, borderRadius:14, background:PAL.red, textAlign:'center',
                  fontSize:15, fontWeight:600, color:'#fff' }}>{deleting ? 'Borrando…' : 'Eliminar'}</div>
              </Tap>
            </div>
          </div>
        </div>
      )}

      <TabBar active="home" navigate={navigate} onAddTap={() => navigate('add-note', { personId: person.id, personName: person.name })} />
    </Phone>
  );
};

const NoteCard = ({ note, authUser, personId, onDelete }) => {
  const t = noteTypeInfo(note.kind);
  const [showDel, setShowDel] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteNote(authUser.uid, personId, note.id);
      onDelete?.();
    } catch(e) { setDeleting(false); }
  };

  return (
    <div style={{ padding:'14px 16px', borderRadius:16, background:PAL.white,
      borderLeft:`4px solid ${t.color}`, boxShadow:`0 1px 4px ${PAL.ink}0d` }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <NoteChip kind={note.kind} small />
            <span style={{ fontSize:11, color:PAL.inkSoft }}>{relNote(note.createdAt)}</span>
          </div>
          <p style={{ fontSize:14, color:PAL.ink, lineHeight:1.55 }}>{note.text}</p>
          {note.date && (
            <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:6 }}>
              <Icon name="calendar" size={12} color={PAL.inkSoft} />
              <span style={{ fontSize:11, color:PAL.inkSoft }}>{note.date}</span>
            </div>
          )}
        </div>
        <Tap onTap={() => setShowDel(!showDel)}>
          <Icon name="trash" size={16} color={showDel ? PAL.red : PAL.inkSoft} />
        </Tap>
      </div>
      {showDel && (
        <div style={{ marginTop:10, display:'flex', gap:8 }}>
          <Tap onTap={() => setShowDel(false)} style={{ flex:1 }}>
            <div style={{ padding:'7px 0', borderRadius:10, background:PAL.bg, textAlign:'center', fontSize:13, fontWeight:600, color:PAL.inkMid }}>Cancelar</div>
          </Tap>
          <Tap onTap={handleDelete} disabled={deleting} style={{ flex:1 }}>
            <div style={{ padding:'7px 0', borderRadius:10, background:PAL.red, textAlign:'center', fontSize:13, fontWeight:600, color:'#fff' }}>
              {deleting ? '…' : 'Borrar nota'}
            </div>
          </Tap>
        </div>
      )}
    </div>
  );
};

// ─── Screen3 Add Note ────────────────────────────────────────
const Screen3_AddNote = ({ navigate, authUser, people, personId: initPersonId, personName: initPersonName, onRefresh }) => {
  const [selectedPerson, setSelectedPerson] = React.useState(initPersonId || '');
  const [kind, setKind]   = React.useState('momento');
  const [text, setText]   = React.useState('');
  const [date, setDate]   = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [err, setErr]     = React.useState('');

  const personName = initPersonName || (people || []).find(p => p.id === selectedPerson)?.name || '';

  const handleSave = async () => {
    if (!selectedPerson) { setErr('Seleccioná una persona.'); return; }
    if (!text.trim())    { setErr('Escribí la nota.'); return; }
    setSaving(true); setErr('');
    try {
      await addNote(authUser.uid, selectedPerson, { kind, text: text.trim(), date: date || null });
      onRefresh?.();
      navigate('person', { personId: selectedPerson });
    } catch(e) { setErr('No se pudo guardar. Intentá de nuevo.'); setSaving(false); }
  };

  return (
    <Phone>
      <div style={{ padding:'52px 20px 16px', background:PAL.white, borderBottom:`1.5px solid ${PAL.line}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Tap onTap={() => navigate(initPersonId ? 'person' : 'home', initPersonId ? { personId: initPersonId } : {})}>
            <Icon name="back" size={22} color={PAL.ink} />
          </Tap>
          <h2 style={{ fontSize:20, fontWeight:800, color:PAL.ink }}>Nueva nota</h2>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'20px 20px', display:'flex', flexDirection:'column', gap:20 }}>

        {/* person picker (only if no pre-selected person) */}
        {!initPersonId && (
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:8, display:'block' }}>
              Sobre quién
            </label>
            <select value={selectedPerson} onChange={e => setSelectedPerson(e.target.value)}
              style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:`1.5px solid ${PAL.line}`,
                background:PAL.white, fontSize:15, color: selectedPerson ? PAL.ink : PAL.inkSoft, outline:'none' }}>
              <option value="">Elegí una persona…</option>
              {(people || []).sort((a,b) => a.name.localeCompare(b.name,'es')).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}

        {initPersonId && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
            borderRadius:12, background:PAL.purpleSoft }}>
            <Avatar name={personName} size={32} />
            <span style={{ fontSize:15, fontWeight:600, color:PAL.purple }}>{personName}</span>
          </div>
        )}

        {/* note type */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:10, display:'block' }}>
            Tipo de nota
          </label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {NOTE_TYPES.map(t => (
              <Tap key={t.k} onTap={() => setKind(t.k)}>
                <div style={{ display:'flex', alignItems:'center', gap:9, padding:'11px 14px', borderRadius:12,
                  background: kind===t.k ? t.color : t.bg,
                  border: `2px solid ${kind===t.k ? t.color : 'transparent'}`,
                  transition:'all .15s' }}>
                  <Icon name={t.icon} size={16} color={kind===t.k ? '#fff' : t.color} stroke={2} />
                  <span style={{ fontSize:13, fontWeight:600, color: kind===t.k ? '#fff' : t.color }}>{t.label}</span>
                </div>
              </Tap>
            ))}
          </div>
        </div>

        {/* text */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:8, display:'block' }}>
            Nota
          </label>
          <textarea
            value={text} onChange={e => setText(e.target.value)}
            placeholder="¿Qué querés recordar?"
            rows={4}
            style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:`1.5px solid ${PAL.line}`,
              background:PAL.white, fontSize:15, color:PAL.ink, outline:'none', resize:'none', lineHeight:1.5 }}
          />
        </div>

        {/* optional date */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:8, display:'block' }}>
            Fecha (opcional)
          </label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:`1.5px solid ${PAL.line}`,
              background:PAL.white, fontSize:15, color: date ? PAL.ink : PAL.inkSoft, outline:'none' }} />
        </div>

        {err && <p style={{ fontSize:13, color:PAL.red }}>{err}</p>}

        <Tap onTap={handleSave} disabled={saving}>
          <div style={{ padding:'15px', borderRadius:14, background:PAL.purple, textAlign:'center',
            color:'#fff', fontSize:15, fontWeight:700,
            boxShadow:`0 4px 16px ${PAL.purple}55` }}>
            {saving ? 'Guardando…' : 'Guardar nota'}
          </div>
        </Tap>

        <div style={{ height:16 }} />
      </div>
    </Phone>
  );
};

// ─── Screen4 Add Person ──────────────────────────────────────
const Screen4_AddPerson = ({ navigate, authUser, onRefresh }) => {
  const [name, setName]       = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [tagInput, setTagInput] = React.useState('');
  const [tags, setTags]         = React.useState([]);
  const [saving, setSaving]     = React.useState(false);
  const [err, setErr]           = React.useState('');

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  const handleSave = async () => {
    if (!name.trim()) { setErr('Escribí el nombre.'); return; }
    setSaving(true); setErr('');
    try {
      const id = await addPerson(authUser.uid, {
        name: name.trim(),
        birthday: birthday || null,
        tags,
        photoURL: null,
      });
      onRefresh?.();
      navigate('person', { personId: id });
    } catch(e) { setErr('No se pudo guardar. Intentá de nuevo.'); setSaving(false); }
  };

  return (
    <Phone>
      <div style={{ padding:'52px 20px 16px', background:PAL.white, borderBottom:`1.5px solid ${PAL.line}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Tap onTap={() => navigate('home')}>
            <Icon name="back" size={22} color={PAL.ink} />
          </Tap>
          <h2 style={{ fontSize:20, fontWeight:800, color:PAL.ink }}>Nueva persona</h2>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'24px 20px', display:'flex', flexDirection:'column', gap:20 }}>

        {/* avatar preview */}
        <div style={{ display:'flex', justifyContent:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
            <Avatar name={name || '?'} size={80} />
            <span style={{ fontSize:12, color:PAL.inkSoft }}>El avatar se genera del nombre</span>
          </div>
        </div>

        {/* name */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:8, display:'block' }}>
            Nombre
          </label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="¿Cómo se llama?"
            style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:`1.5px solid ${PAL.line}`,
              background:PAL.white, fontSize:15, color:PAL.ink, outline:'none' }} />
        </div>

        {/* birthday */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:8, display:'block' }}>
            Cumpleaños (opcional)
          </label>
          <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}
            style={{ width:'100%', padding:'13px 14px', borderRadius:12, border:`1.5px solid ${PAL.line}`,
              background:PAL.white, fontSize:15, color: birthday ? PAL.ink : PAL.inkSoft, outline:'none' }} />
        </div>

        {/* tags */}
        <div>
          <label style={{ fontSize:12, fontWeight:700, color:PAL.inkMid, letterSpacing:.5, textTransform:'uppercase', marginBottom:8, display:'block' }}>
            Etiquetas (opcional)
          </label>
          <div style={{ display:'flex', gap:8, marginBottom:8 }}>
            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && (e.preventDefault(), addTag())}
              placeholder="amigo, trabajo, familia…"
              style={{ flex:1, padding:'11px 14px', borderRadius:12, border:`1.5px solid ${PAL.line}`,
                background:PAL.white, fontSize:14, color:PAL.ink, outline:'none' }} />
            <Tap onTap={addTag} disabled={!tagInput.trim()}>
              <div style={{ padding:'11px 14px', borderRadius:12, background:PAL.purpleSoft,
                display:'flex', alignItems:'center' }}>
                <Icon name="plus" size={18} color={PAL.purple} stroke={2} />
              </div>
            </Tap>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {tags.map(tag => (
              <div key={tag} style={{ display:'flex', alignItems:'center', gap:5, padding:'4px 10px',
                borderRadius:99, background:PAL.purpleSoft, color:PAL.purple }}>
                <span style={{ fontSize:12, fontWeight:600 }}>{tag}</span>
                <Tap onTap={() => setTags(tags.filter(t => t !== tag))}>
                  <Icon name="close" size={12} color={PAL.purple} />
                </Tap>
              </div>
            ))}
          </div>
        </div>

        {err && <p style={{ fontSize:13, color:PAL.red }}>{err}</p>}

        <Tap onTap={handleSave} disabled={saving}>
          <div style={{ padding:'15px', borderRadius:14, background:PAL.purple, textAlign:'center',
            color:'#fff', fontSize:15, fontWeight:700,
            boxShadow:`0 4px 16px ${PAL.purple}55` }}>
            {saving ? 'Guardando…' : 'Agregar persona'}
          </div>
        </Tap>

        <div style={{ height:16 }} />
      </div>
    </Phone>
  );
};

// ─── Screen5 Reminders ───────────────────────────────────────
const Screen5_Reminders = ({ navigate, authUser, people }) => {
  const withBirthday = (people || [])
    .filter(p => p.birthday)
    .map(p => ({ ...p, days: daysUntilBirthday(p.birthday) }))
    .sort((a,b) => a.days - b.days);

  const upcoming  = withBirthday.filter(p => p.days <= 30);
  const rest      = withBirthday.filter(p => p.days > 30);

  const Section = ({ title, items }) => (
    <div style={{ marginBottom:20 }}>
      <h3 style={{ fontSize:13, fontWeight:700, color:PAL.inkSoft, letterSpacing:.5, textTransform:'uppercase',
        padding:'0 16px', marginBottom:8 }}>{title}</h3>
      <div style={{ display:'flex', flexDirection:'column', gap:8, padding:'0 16px' }}>
        {items.map(p => (
          <Tap key={p.id} onTap={() => navigate('person', { personId: p.id })}>
            <div style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 16px',
              borderRadius:16, background:PAL.white, boxShadow:`0 1px 4px ${PAL.ink}0d` }}>
              <Avatar name={p.name} photoURL={p.photoURL} size={44} />
              <div style={{ flex:1 }}>
                <span style={{ fontSize:15, fontWeight:700, color:PAL.ink }}>{p.name}</span>
                <div style={{ fontSize:13, color:PAL.inkMid, marginTop:2 }}>{formatBirthday(p.birthday)}</div>
              </div>
              <span style={{ fontSize:13, fontWeight:700, color: p.days===0?PAL.pink:p.days<=7?PAL.orange:PAL.inkSoft }}>
                {p.days === 0 ? '¡Hoy! 🎂' : p.days === 1 ? 'Mañana' : `${p.days}d`}
              </span>
            </div>
          </Tap>
        ))}
      </div>
    </div>
  );

  return (
    <Phone>
      <div style={{ padding:'56px 20px 16px', background:PAL.white, borderBottom:`1.5px solid ${PAL.line}`, marginBottom:16 }}>
        <h1 style={{ fontSize:24, fontWeight:800, color:PAL.ink }}>Recordatorios</h1>
        <p style={{ fontSize:13, color:PAL.inkSoft, marginTop:4 }}>Cumpleaños de tus contactos</p>
      </div>

      <div style={{ flex:1, overflowY:'auto' }}>
        {withBirthday.length === 0
          ? <div style={{ padding:48, display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <Icon name="cake" size={40} color={PAL.line} />
              <p style={{ fontSize:14, color:PAL.inkSoft, textAlign:'center' }}>
                Todavía no cargaste cumpleaños.<br/>Editá una persona para agregarlos.
              </p>
            </div>
          : <>
              {upcoming.length > 0 && <Section title={`Próximos 30 días (${upcoming.length})`} items={upcoming} />}
              {rest.length > 0 && <Section title="Más adelante" items={rest} />}
            </>
        }
      </div>

      <TabBar active="reminders" navigate={navigate} onAddTap={() => navigate('add-note', {})} />
    </Phone>
  );
};

// ─── Screen6 Profile ─────────────────────────────────────────
const Screen6_Profile = ({ navigate, authUser }) => {
  const [signingOut, setSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try { await fbSignOut(); }
    catch(e) { setSigningOut(false); }
  };

  return (
    <Phone>
      <div style={{ padding:'56px 20px 16px', background:PAL.white, borderBottom:`1.5px solid ${PAL.line}` }}>
        <h1 style={{ fontSize:24, fontWeight:800, color:PAL.ink }}>Perfil</h1>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'24px 16px', display:'flex', flexDirection:'column', gap:16 }}>

        {/* user card */}
        <div style={{ display:'flex', alignItems:'center', gap:16, padding:'20px 16px',
          borderRadius:20, background:PAL.white, boxShadow:`0 1px 4px ${PAL.ink}0d` }}>
          <Avatar name={authUser?.displayName || ''} photoURL={authUser?.photoURL} size={60} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:700, color:PAL.ink }}>{authUser?.displayName || 'Usuario'}</div>
            <div style={{ fontSize:13, color:PAL.inkSoft, marginTop:2 }}>{authUser?.email}</div>
          </div>
        </div>

        <div style={{ height:8 }} />

        {/* feedback */}
        <div style={{ borderRadius:16, background:PAL.white, overflow:'hidden', boxShadow:`0 1px 4px ${PAL.ink}0d` }}>
          <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:12,
            borderBottom:`1px solid ${PAL.line}` }}>
            <Icon name="star" size={18} color={PAL.yellow} stroke={1.8} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:PAL.ink }}>Sugerencias y fallas</div>
              <div style={{ fontSize:12, color:PAL.inkSoft, marginTop:1 }}>github.com/locomaldelcoco</div>
            </div>
            <Icon name="chevR" size={16} color={PAL.inkSoft} />
          </div>
        </div>

        <div style={{ height:8 }} />

        {/* sign out */}
        <Tap onTap={handleSignOut} disabled={signingOut}>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'16px',
            borderRadius:16, background:PAL.redSoft, border:`1.5px solid ${PAL.red}33` }}>
            <Icon name="signout" size={20} color={PAL.red} />
            <span style={{ fontSize:15, fontWeight:600, color:PAL.red }}>
              {signingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
            </span>
          </div>
        </Tap>

        <p style={{ fontSize:12, color:PAL.inkSoft, textAlign:'center', marginTop:16 }}>
          Mingo v1 — Hecho con ❤️ por @locomaldelcoco
        </p>
      </div>

      <TabBar active="profile" navigate={navigate} onAddTap={() => navigate('add-note', {})} />
    </Phone>
  );
};
