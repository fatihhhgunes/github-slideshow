import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { C, F } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import LangScreen from '../screens/quiz/LangScreen';
import CountryScreen from '../screens/quiz/CountryScreen';
import ModeScreen from '../screens/quiz/ModeScreen';
import GameScreen from '../screens/quiz/GameScreen';
import OverScreen from '../screens/quiz/OverScreen';
import { addQuizScore } from '../data/scores';

const Tab = createBottomTabNavigator();

type QuizStep = 'lang' | 'country' | 'mode' | 'game' | 'over';

function QuizStack() {
  const [step, setStep] = useState<QuizStep>('lang');
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [countryIdx, setCountryIdx] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  if (step === 'lang') {
    return (
      <LangScreen
        onSelect={l => { setLang(l); setStep('country'); }}
      />
    );
  }
  if (step === 'country') {
    return (
      <CountryScreen
        lang={lang}
        onConfirm={(idx, name) => { setCountryIdx(idx); setPlayerName(name); setStep('mode'); }}
        onBack={() => setStep('lang')}
      />
    );
  }
  if (step === 'mode') {
    return (
      <ModeScreen
        lang={lang}
        onSolo={() => setStep('game')}
        onBack={() => setStep('country')}
      />
    );
  }
  if (step === 'game') {
    return (
      <GameScreen
        lang={lang}
        countryIdx={countryIdx}
        playerName={playerName}
        onFinish={(score, ans) => { addQuizScore(countryIdx, score); setFinalScore(score); setAnswers(ans); setStep('over'); }}
      />
    );
  }
  return (
    <OverScreen
      lang={lang}
      countryIdx={countryIdx}
      playerName={playerName}
      score={finalScore}
      answers={answers}
      onPlayAgain={() => setStep('lang')}
    />
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#08101e',
            borderTopColor: 'rgba(0,200,255,0.15)',
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: C.cyan,
          tabBarInactiveTintColor: C.dim,
          tabBarLabelStyle: {
            fontFamily: F.bcBold,
            fontSize: 10,
            letterSpacing: 1,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'TURNUVA',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🌍</Text>,
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={QuizStack}
          options={{
            tabBarLabel: 'QUIZ',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>❓</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
