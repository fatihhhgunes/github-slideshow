import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  BarlowCondensed_400Regular,
  BarlowCondensed_700Bold,
  BarlowCondensed_800ExtraBold,
  BarlowCondensed_900Black,
} from '@expo-google-fonts/barlow-condensed';
import {
  Barlow_400Regular,
  Barlow_700Bold,
} from '@expo-google-fonts/barlow';
import { LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'BarlowCondensed-Regular':   BarlowCondensed_400Regular,
    'BarlowCondensed-Bold':      BarlowCondensed_700Bold,
    'BarlowCondensed-ExtraBold': BarlowCondensed_800ExtraBold,
    'BarlowCondensed-Black':     BarlowCondensed_900Black,
    'Barlow-Regular':            Barlow_400Regular,
    'Barlow-Bold':               Barlow_700Bold,
    'LilitaOne-Regular':         LilitaOne_400Regular,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <StatusBar style="light" backgroundColor="#000009" />
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}
