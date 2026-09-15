import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../../features/home/HomeScreen';
import { TaskScreen } from '../../features/task/TaskScreen';
import { WorldScreen } from '../../features/world/WorldScreen';
import { CompanionScreen } from '../../features/companion/CompanionScreen';
import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { colors } from '../theme/theme';

export type MainTabParamList = {
  Home: undefined;
  Tasks: undefined;
  World: undefined;
  Companion: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabMeta: Record<keyof MainTabParamList, { label: string; icon: string }> = {
  Home: { label: '首页', icon: '⌂' },
  Tasks: { label: '任务', icon: '✓' },
  World: { label: '世界', icon: '◇' },
  Companion: { label: '伙伴', icon: '♡' },
  Profile: { label: '我的', icon: '✦' },
};

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 64,
            paddingTop: 6,
            paddingBottom: 6,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarLabel: tabMeta[route.name].label,
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20, fontWeight: '700' }}>
              {tabMeta[route.name].icon}
            </Text>
          ),
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tasks" component={TaskScreen} />
        <Tab.Screen name="World" component={WorldScreen} />
        <Tab.Screen name="Companion" component={CompanionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
