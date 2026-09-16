import { useState } from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import { AppProviders } from './src/app/providers/AppProviders';
import { SplashScreen } from './src/features/splash/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F8" />
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AppNavigator />
      )}
    </AppProviders>
  );
}

export default App;
