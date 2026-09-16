import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { CompanionScreen } from '../../features/companion/CompanionScreen';
import { HomeScreen } from '../../features/home/HomeScreen';
import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { TaskScreen } from '../../features/task/TaskScreen';
import { WorldScreen } from '../../features/world/WorldScreen';
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

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Text style={[styles.icon, focused && styles.iconActive]}>{icon}</Text>
    </View>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: '#9A908D',
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarLabelStyle: styles.label,
          tabBarLabel: tabMeta[route.name].label,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={tabMeta[route.name].icon} focused={focused} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tasks" component={TaskScreen} />
        <Tab.Screen name="World" component={WorldScreen} />
        <Tab.Screen name="Companion" component={CompanionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 12,
    height: 72,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 0,
    borderRadius: 26,
    shadowColor: '#493739',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 10,
  },
  tabItem: {
    paddingVertical: 1,
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '600',
    marginTop: 1,
  },
  iconWrap: {
    width: 34,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.primarySoft,
  },
  icon: {
    color: '#8C8280',
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '500',
  },
  iconActive: {
    color: colors.primary,
    fontWeight: '800',
  },
});
