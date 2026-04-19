// app.jsx — Viajero PWA router
const ViajeroApp = () => {
  const [screen, setScreen] = React.useState('home');
  const navigate = React.useCallback(s => setScreen(s), []);

  const views = {
    home:        <Screen1_Trips navigate={navigate} />,
    plan:        <Screen2_Plan navigate={navigate} />,
    'type-pick': <Screen3_TypePick navigate={navigate} />,
    form:        <Screen4_Form navigate={navigate} />,
    invite:      <Screen5_Invite navigate={navigate} />,
    posted:      <Screen6_Posted navigate={navigate} />,
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
