import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../app/theme/theme';

type Props = { onFinish: () => void };

export function SplashScreen({ onFinish }: Props) {
  const glow = useRef(new Animated.Value(0)).current;
  const gate = useRef(new Animated.Value(0)).current;
  const logo = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 350, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.parallel([
        Animated.spring(gate, { toValue: 1, friction: 7, tension: 45, useNativeDriver: true }),
        Animated.timing(logo, { toValue: 1, duration: 650, delay: 150, useNativeDriver: true }),
      ]),
      Animated.delay(650),
      Animated.timing(exit, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start(({ finished }) => finished && onFinish());
  }, [exit, gate, glow, logo, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: exit }]}>
      <Animated.View style={[styles.glow, { opacity: glow, transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }] }]} />
      <Animated.View style={{ opacity: gate, transform: [{ scale: gate }] }}>
        <Text style={styles.gate}>⛩</Text>
      </Animated.View>
      <Animated.View style={[styles.brand, { opacity: logo, transform: [{ translateY: logo.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] }]}>
        <Text style={styles.title}>创世录</Text>
        <Text style={styles.english}>CREATE YOUR WORLD</Text>
        <View style={styles.line} />
        <Text style={styles.tagline}>每一次行动，都在创造新的自己。</Text>
      </Animated.View>
      <View style={styles.petals} pointerEvents="none">
        <Text style={[styles.petal, styles.petalOne]}>✿</Text>
        <Text style={[styles.petal, styles.petalTwo]}>✦</Text>
        <Text style={[styles.petal, styles.petalThree]}>✿</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F8', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  glow: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: '#F8D9DD' },
  gate: { fontSize: 96, color: colors.primary, textAlign: 'center' },
  brand: { alignItems: 'center', marginTop: 18 },
  title: { color: '#2B1B1B', fontSize: 42, fontWeight: '800', letterSpacing: 8 },
  english: { color: colors.primary, fontSize: 11, fontWeight: '700', letterSpacing: 3, marginTop: 8 },
  line: { width: 36, height: 2, backgroundColor: colors.primary, marginVertical: 18, borderRadius: 1 },
  tagline: { color: '#806B6B', fontSize: 13, letterSpacing: 1 },
  petals: { ...StyleSheet.absoluteFillObject },
  petal: { position: 'absolute', color: '#E997A2' },
  petalOne: { top: '18%', left: '16%', fontSize: 20, transform: [{ rotate: '-18deg' }] },
  petalTwo: { top: '27%', right: '18%', fontSize: 15 },
  petalThree: { bottom: '22%', right: '24%', fontSize: 18, transform: [{ rotate: '24deg' }] },
});
