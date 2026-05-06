// app.jsx — Mingo router
const MingoApp = () => {
  const [screen, setScreen]     = React.useState('home');
  const [navParams, setNavParams] = React.useState({});
  const [authUser, setAuthUser] = React.useState(undefined);
  const [people, setPeople]     = React.useState([]);

  React.useEffect(() => {
    return FB_AUTH.onAuthStateChanged(async user => {
      if (!user) { setAuthUser(null); setPeople([]); return; }
      setAuthUser(user);
      try {
        const list = await getPeople(user.uid);
        setPeople(list);
      } catch(e) {
        console.error('Error cargando personas:', e);
        setPeople([]);
      }
    });
  }, []);

  const navigate = React.useCallback((s, params = {}) => {
    setNavParams(params);
    setScreen(s);
  }, []);

  const onRefresh = React.useCallback(async () => {
    if (!authUser) return;
    try {
      const list = await getPeople(authUser.uid);
      setPeople(list);
    } catch(e) { console.error(e); }
  }, [authUser?.uid]);

  const loading = authUser === undefined;

  if (loading) return (
    <div style={{ minHeight:'100dvh', background:PAL.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      <div style={{ color:PAL.inkSoft, fontSize:14, fontFamily:'Inter, sans-serif' }}>Cargando…</div>
    </div>
  );

  if (!authUser) return (
    <div style={{ minHeight:'100dvh', background:PAL.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      <Screen0_Login />
    </div>
  );

  const sharedProps = { navigate, authUser, people, onRefresh };

  const views = {
    home:        <Screen1_Home       {...sharedProps} />,
    person:      <Screen2_Person     {...sharedProps} {...navParams} />,
    'add-note':  <Screen3_AddNote    {...sharedProps} {...navParams} />,
    'add-person':<Screen4_AddPerson  {...sharedProps} />,
    reminders:   <Screen5_Reminders  {...sharedProps} />,
    profile:     <Screen6_Profile    {...sharedProps} />,
  };

  return (
    <div style={{ minHeight:'100dvh', background:PAL.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      {views[screen] || views['home']}
    </div>
  );
};
