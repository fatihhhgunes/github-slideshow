import { QUIZ_COUNTRIES } from './questions';

// Seed data — realistic starting scores for all 20 countries
const BASE: Record<number, number> = {
  3:  55680,  // Argentina
  13: 48920,  // Japan
  9:  45230,  // Türkiye
  0:  42560,  // Brazil
  8:  41320,  // England
  2:  38120,  // France
  16: 36740,  // USA
  15: 35670,  // Morocco
  1:  33210,  // Germany
  10: 31250,  // Belgium
  6:  29580,  // Netherlands
  11: 28940,  // Uruguay
  12: 27340,  // Croatia
  17: 26830,  // S. Korea
  4:  24680,  // Spain
  7:  22150,  // Portugal
  5:  21940,  // Italy
  18: 18760,  // Mexico
  14: 17340,  // Senegal
  19: 15120,  // Chile
};

let scores: Record<number, number> = { ...BASE };

export function addQuizScore(countryIdx: number, score: number) {
  scores[countryIdx] = (scores[countryIdx] || 0) + score;
}

export function getAllScores() {
  return QUIZ_COUNTRIES.map((c, i) => ({
    country: c,
    idx: i,
    score: scores[i] || 0,
  })).sort((a, b) => b.score - a.score);
}

export function getLeader() {
  return getAllScores()[0];
}
