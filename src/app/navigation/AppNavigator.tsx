import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
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

type TabName = keyof MainTabParamList;
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabMeta: Record<TabName, { label: string }> = {
  Home: { label: '首页' },
  Tasks: { label: '任务' },
  World: { label: '世界' },
  Companion: { label: '伙伴' },
  Profile: { label: '我的' },
};

function LineIcon({ name, focused }: { name: TabName; focused: boolean }) {
  const color = focused ? colors.primary : '#8F8583';
  const stroke = { borderColor: color };

  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <View style={styles.iconCanvas}>
        {name === 'Home' && (
          <>
            <View style={[styles.homeRoof, stroke]} />
            <View style={[styles.homeBody, stroke]}>
              <View style={[styles.homeDoor, { backgroundColor: color }]} />
            </View>
          </>
        )}

        {name === 'Tasks' && (
          <>
            <View style={[styles.taskBox, stroke]} />
            <View style={[styles.taskCheckA, { backgroundColor: color }]} />
            <View style={[styles.taskCheckB, { backgroundColor: color }]} />
          </>
        )}

        {name === 'World' && (
          <>
            <View style={[styles.worldCircle, stroke]} />
            <View style={[styles.worldOrbit, stroke]} />
            <View style={[styles.worldDot, { backgroundColor: color }]} />
          </>
        )}

        {name === 'Companion' && (
          <>
            <View style={[styles.companionHead, stroke]} />
            <View style={[styles.companionBody, stroke]} />
            <View style={[styles.companionSpark, { backgroundColor: color }]} />
          </>
        )}

        {name === 'Profile' && (
          <>
            <View style={[styles.profileHead, stroke]} />
            <View style={[styles.profileBody, stroke]} />
          </>
        )}
      </View>
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
          tabBarInactiveTintColor: '#948A87',
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarLabelStyle: styles.label,
          tabBarLabel: tabMeta[route.name].label,
          tabBarIcon: ({ focused }) => <LineIcon name={route.name} focused={focused} />,
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
    left: 20,
    right: 20,
    bottom: 14,
    height: 64,
    paddingTop: 7,
    paddingBottom: 6,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: 0,
    borderRadius: 22,
    shadowColor: '#493739',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 8,
  },
  tabItem: { paddingVertical: 0 },
  label: { fontSize: 10, lineHeight: 12, fontWeight: '600', marginTop: 0 },
  iconWrap: {
    width: 36,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: { backgroundColor: 'rgba(182,64,74,0.10)' },
  iconCanvas: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },

  homeRoof: {
    position: 'absolute', top: 4, width: 14, height: 14,
    borderLeftWidth: 1.8, borderTopWidth: 1.8, transform: [{ rotate: '45deg' }], borderRadius: 2,
  },
  homeBody: {
    position: 'absolute', bottom: 3, width: 15, height: 12,
    borderWidth: 1.8, borderTopWidth: 0, borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
    alignItems: 'center', justifyContent: 'flex-end',
  },
  homeDoor: { width: 3, height: 6, borderTopLeftRadius: 2, borderTopRightRadius: 2 },

  taskBox: { width: 18, height: 18, borderWidth: 1.8, borderRadius: 5 },
  taskCheckA: { position: 'absolute', width: 7, height: 1.8, left: 5, top: 13, transform: [{ rotate: '43deg' }], borderRadius: 2 },
  taskCheckB: { position: 'absolute', width: 12, height: 1.8, left: 9, top: 11, transform: [{ rotate: '-48deg' }], borderRadius: 2 },

  worldCircle: { width: 18, height: 18, borderWidth: 1.8, borderRadius: 9 },
  worldOrbit: { position: 'absolute', width: 24, height: 9, borderWidth: 1.3, borderRadius: 12, transform: [{ rotate: '-18deg' }] },
  worldDot: { position: 'absolute', right: 1, top: 7, width: 3.5, height: 3.5, borderRadius: 2 },

  companionHead: { position: 'absolute', top: 3, width: 10, height: 10, borderWidth: 1.7, borderRadius: 5 },
  companionBody: { position: 'absolute', bottom: 3, width: 17, height: 9, borderWidth: 1.7, borderBottomWidth: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  companionSpark: { position: 'absolute', right: 2, top: 4, width: 3.5, height: 3.5, borderRadius: 2 },

  profileHead: { position: 'absolute', top: 3, width: 9, height: 9, borderWidth: 1.7, borderRadius: 5 },
  profileBody: { position: 'absolute', bottom: 3, width: 18, height: 9, borderWidth: 1.7, borderBottomWidth: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
});
