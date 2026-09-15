import { StatusBar } from 'react-native';
import { AppNavigator } from './src/app/navigation/AppNavigator';
import { AppProviders } from './src/app/providers/AppProviders';

function App() {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AppNavigator />
    </AppProviders>
  );
}

export default App;
