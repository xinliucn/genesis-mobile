import { useEffect, useRef } from 'react';
import { Animated, Easing, ImageBackground, StyleSheet, Text, View } from 'react-native';

const splashBackground = require('../../assets/branding/splash_background.png');

type Props = { onFinish: () => void };

export function SplashScreen({ onFinish }: Props) {
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentScale = useRef(new Animated.Value(0.94)).current;
  const exit = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(contentScale, { toValue: 1, duration: 850, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]),
      Animated.delay(900),
      Animated.timing(exit, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(({ finished }) => finished && onFinish());
  }, [contentOpacity, contentScale, exit, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: exit }]}>
      <ImageBackground source={splashBackground} resizeMode="cover" style={styles.background}>
        <View style={styles.tint} />
        <Animated.View style={[styles.brand, { opacity: contentOpacity, transform: [{ scale: contentScale }] }]}>
          <Text style={styles.title}>创世录</Text>
          <Text style={styles.english}>CREATE YOUR WORLD</Text>
          <View style={styles.line} />
          <Text style={styles.tagline}>每一次行动，都在创造新的自己。</Text>
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F8' },
  background: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,248,248,0.08)' },
  brand: { alignItems: 'center', paddingHorizontal: 32, marginTop: '40%' },
  title: { color: '#2B1B1B', fontSize: 42, fontWeight: '800', letterSpacing: 8 },
  english: { color: '#B6404A', fontSize: 11, fontWeight: '700', letterSpacing: 3, marginTop: 8 },
  line: { width: 36, height: 2, backgroundColor: '#B6404A', marginVertical: 18, borderRadius: 1 },
  tagline: { color: '#806B6B', fontSize: 13, letterSpacing: 1 },
});
