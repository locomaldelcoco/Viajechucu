// app.jsx — Viajero PWA router
const ViajeroApp = () => {
  const [screen, setScreen]       = React.useState('home');
  const [navParams, setNavParams] = React.useState({});
  const [authUser, setAuthUser]   = React.useState(undefined);
  const [currentTrip, setCurrentTrip] = React.useState(undefined);

  React.useEffect(() => {
    return FB_AUTH.onAuthStateChanged(async user => {
      if (!user) { setAuthUser(null); setCurrentTrip(null); return; }
      setAuthUser(user);
      try {
        const trip = await getUserTrip(user.uid);
        setCurrentTrip(trip); // null si no tiene viaje
      } catch(e) {
        console.error('Error cargando viaje:', e);
        setCurrentTrip(null); // sin viaje → muestra ScreenNewTrip
      }
    });
  }, []);

  const navigate = React.useCallback((s, params = {}) => {
    setNavParams(params);
    setScreen(s);
  }, []);

  const onTripReady = React.useCallback(async (tripId) => {
    const trip = await getTrip(tripId);
    setCurrentTrip(trip);
    setScreen('home');
  }, []);

  const onTripUpdate = React.useCallback(updatedTrip => {
    setCurrentTrip(updatedTrip);
  }, []);

  const onLeaveTrip = React.useCallback(() => {
    setCurrentTrip(null);
    setScreen('home');
  }, []);

  // Pedir permiso de notificaciones cuando el usuario tiene un viaje activo
  React.useEffect(() => {
    if (!authUser || !currentTrip?.id) return;
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [authUser?.uid, currentTrip?.id]);

  // Escuchar nuevas actividades en tiempo real y notificar
  React.useEffect(() => {
    if (!currentTrip?.id || !authUser?.uid) return;
    let initialized = false;
    const unsub = subscribeToActivities(currentTrip.id, changes => {
      if (!initialized) { initialized = true; return; }
      changes
        .filter(c => c.type === 'added')
        .forEach(c => {
          const act = c.doc.data();
          if (act.proposer?.uid === authUser.uid) return; // no notificar al que propone
          if (!('Notification' in window) || Notification.permission !== 'granted') return;
          const title = `${act.proposer?.name || 'Alguien'} propuso una actividad`;
          const opts  = { body: act.title, icon: '/icon-192.png', badge: '/icon-192.png' };
          if (navigator.serviceWorker?.controller) {
            navigator.serviceWorker.ready.then(reg => reg.showNotification(title, opts));
          } else {
            new Notification(title, opts);
          }
        });
    });
    return () => unsub();
  }, [currentTrip?.id, authUser?.uid]);

  const loading = authUser === undefined || (authUser !== null && currentTrip === undefined);

  if (loading) return (
    <div style={{ minHeight:'100dvh', background:'#1b2030', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      <div style={{ color:'#fff', opacity:0.4, fontSize:14, fontFamily:'Inter, sans-serif' }}>Cargando…</div>
    </div>
  );

  if (!authUser) return (
    <div style={{ minHeight:'100dvh', background:'#1b2030', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      <Screen0_Login />
    </div>
  );

  if (!currentTrip) return (
    <div style={{ minHeight:'100dvh', background:'#1b2030', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      <ScreenNewTrip currentUser={authUser} onTripReady={onTripReady} />
    </div>
  );

  const views = {
    home:              <Screen1_Trips navigate={navigate} currentUser={authUser} currentTrip={currentTrip} />,
    plan:              <Screen2_Plan  navigate={navigate} currentTrip={currentTrip} currentUser={authUser} onTripUpdate={onTripUpdate} />,
    'type-pick':       <Screen3_TypePick navigate={navigate} currentTrip={currentTrip} />,
    form:              <Screen4_Form    navigate={navigate} currentTrip={currentTrip} currentUser={authUser} {...navParams} />,
    profile:           <Screen7_Profile navigate={navigate} currentUser={authUser} currentTrip={currentTrip} onLeaveTrip={onLeaveTrip} />,
    group:             <Screen8_Group   navigate={navigate} currentUser={authUser} currentTrip={currentTrip} onTripUpdate={onTripUpdate} />,
    'activity-detail': <Screen9_ActivityDetail navigate={navigate} currentTrip={currentTrip} currentUser={authUser} {...navParams} />,
    map:               <ScreenMap navigate={navigate} currentTrip={currentTrip} />,
  };

  return (
    <div style={{ minHeight:'100dvh', background:'#1b2030', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <GlobalStyles />
      {views[screen]}
    </div>
  );
};
