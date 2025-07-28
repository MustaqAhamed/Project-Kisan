
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Translations = {
  sidebar: {
    expertSystem: string;
    visualAnalyzer: string;
    mandiPrices: string;
    kishanMitro: string;
    userHistory: string;
  };
};

const translations: Record<string, Translations> = {
  en: {
    sidebar: {
      expertSystem: 'Expert System',
      visualAnalyzer: 'Visual Analyzer',
      mandiPrices: 'Mandi Prices',
      kishanMitro: 'KishanMitro',
      userHistory: 'User History',
    },
  },
  hi: {
    sidebar: {
      expertSystem: 'विशेषज्ञ प्रणाली',
      visualAnalyzer: 'दृश्य विश्लेषक',
      mandiPrices: 'मंडी कीमतें',
      kishanMitro: 'किसान मित्र',
      userHistory: 'उपयोगकर्ता इतिहास',
    },
  },
  kn: {
    sidebar: {
      expertSystem: 'ತಜ್ಞ ವ್ಯವಸ್ಥೆ',
      visualAnalyzer: 'ದೃಶ್ಯ ವಿಶ್ಲೇಷಕ',
      mandiPrices: 'ಮಂಡಿ ಬೆಲೆಗಳು',
      kishanMitro: 'ಕಿಸಾನ್ ಮಿಟ್ರೋ',
      userHistory: 'ಬಳಕೆದಾರರ ಇತಿಹಾಸ',
    },
  },
};

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  translations: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');
  const currentTranslations = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
