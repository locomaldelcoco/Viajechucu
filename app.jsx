// app.jsx — Viajero PWA router
const ViajeroApp = () => {
  const [screen, setScreen]       = React.useState('home');
  const [navParams, setNavParams] = React.useState({});
  const [authUser, setAuthUser]   = React.useState(undefined); // undefined=cargando, null=no logueado, obj=logueado

  React.useEffect(() => {
    return FB_AUTH.onAuthStateChanged(user => setAuthUser(user || null));
  }, []);

  const navigate = React.useCallback((s, params = {}) => {
    setNavParams(params);
    setScreen(s);
  }, []);

  // Cargando
  if (authUser === undefined) return (
    <div style={{ minHeight: '100dvh', background: '#1b2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GlobalStyles />
      <div style={{ color: '#fff', opacity: 0.4, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Cargando…</div>
    </div>
  );

  // No logueado
  if (authUser === null) return (
    <div style={{ minHeight: '100dvh', background: '#1b2030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GlobalStyles />
      <Screen0_Login />
    </div>
  );

  const views = {
    home:              <Screen1_Trips navigate={navigate} currentUser={authUser} />,
    plan:              <Screen2_Plan navigate={navigate} />,
    'type-pick':       <Screen3_TypePick navigate={navigate} />,
    form:              <Screen4_Form navigate={navigate} />,
    invite:            <Screen5_Invite navigate={navigate} />,
    posted:            <Screen6_Posted navigate={navigate} />,
    profile:           <Screen7_Profile navigate={navigate} currentUser={authUser} />,
    group:             <Screen8_Group navigate={navigate} />,
    'activity-detail': <Screen9_ActivityDetail navigate={navigate} {...navParams} />,
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#1b2030',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <GlobalStyles />
      {views[screen]}
    </div>
  );
};
