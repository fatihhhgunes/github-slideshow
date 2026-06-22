import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width: SW, height: SH } = Dimensions.get('window');

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: Animated.Value;
  duration: number;
  delay: number;
}

function makeStar(): Star {
  const big = Math.random() < 0.06;
  return {
    x: Math.random() * SW,
    y: Math.random() * SH,
    size: big ? Math.random() * 1.4 + 1.6 : Math.random() * 1.2 + 0.3,
    opacity: new Animated.Value(Math.random() * 0.5 + 0.1),
    duration: (Math.random() * 6 + 3) * 1000,
    delay: Math.random() * 12000,
  };
}

const STARS = Array.from({ length: 120 }, makeStar);

export default function StarField() {
  useEffect(() => {
    STARS.forEach(star => {
      const animate = () => {
        Animated.sequence([
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.8 + 0.1,
            duration: star.duration / 2,
            delay: star.delay,
            useNativeDriver: true,
          }),
          Animated.timing(star.opacity, {
            toValue: Math.random() * 0.2 + 0.05,
            duration: star.duration / 2,
            useNativeDriver: true,
          }),
        ]).start(() => animate());
      };
      animate();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {STARS.map((star, i) => (
        <Animated.View
          key={i}
          style={[
            styles.star,
            {
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              opacity: star.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
});
