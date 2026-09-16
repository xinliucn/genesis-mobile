import { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import { AppProviders } from './src/app/providers/AppProviders';
import { SplashScreen } from './src/features/splash/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const finishSplash = useCallback(() => setShowSplash(false), []);

  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {showSplash ? <SplashScreen onFinish={finishSplash} /> : <AppNavigator />}
    </AppProviders>
  );
}

export default App;
