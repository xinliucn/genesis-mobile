import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const splashBackground = require('../../assets/branding/splash_background.png');

type Props = { onFinish: () => void };

export function SplashScreen({ onFinish }: Props) {
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const brandOpacity = useRef(new Animated.Value(0)).current;
  const brandTranslateY = useRef(new Animated.Value(10)).current;
  const exit = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(brandOpacity, {
          toValue: 1,
          duration: 480,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(brandTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(650),
      Animated.timing(exit, {
        toValue: 0,
        duration: 360,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onFinish();
    });
  }, [backgroundOpacity, brandOpacity, brandTranslateY, exit, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: exit }]}>
      <Animated.View style={[styles.backgroundLayer, { opacity: backgroundOpacity }]}>
        <ImageBackground
          source={splashBackground}
          resizeMode="cover"
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.softOverlay} />
          <View style={styles.brandArea} pointerEvents="none">
            <Animated.View
              style={[
                styles.brand,
                {
                  opacity: brandOpacity,
                  transform: [{ translateY: brandTranslateY }],
                },
              ]}
            >
              <Text style={styles.title}>创世录</Text>
              <Text style={styles.english}>CREATE YOUR WORLD</Text>
              <Text style={styles.tagline}>每一次行动，都在创造新的自己</Text>
            </Animated.View>
          </View>
        </ImageBackground>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F3F1',
  },
  backgroundLayer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    transform: [{ scale: 1.015 }],
  },
  softOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 250, 248, 0.04)',
  },
  brandArea: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '22%',
    paddingHorizontal: 36,
  },
  brand: {
    alignItems: 'center',
  },
  title: {
    color: '#3A292B',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 10,
    marginLeft: 10,
    textShadowColor: 'rgba(255,255,255,0.72)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  english: {
    color: 'rgba(119, 61, 69, 0.76)',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 3.4,
    marginTop: 9,
  },
  tagline: {
    color: 'rgba(58, 41, 43, 0.68)',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.5,
    marginTop: 18,
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
});
