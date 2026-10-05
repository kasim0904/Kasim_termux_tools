import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    brand: 'GoDrive Somalia',
    tagline: 'Somalia\'s Premier Car Rental & Fleet Management',
    home: 'Home',
    fleet: 'Fleet Catalog',
    myBookings: 'My Bookings',
    adminDashboard: 'Admin Portal',
    guardGate: 'Guard Gate Pass',
    login: 'Log In',
    register: 'Create Account',
    logout: 'Log Out',
    emergencyHotline: 'Emergency Hotline: +252 61 500 0000',
    locationAirport: 'Mogadishu Aden Adde Airport',
    locationHargeisa: 'Hargeisa Egal Airport',
    locationGarowe: 'Garowe Airport & City',
    locationKismayo: 'Kismayo Port & Downtown',
    allCategories: 'All Categories',
    suv: 'SUV & 4x4',
    sedan: 'Executive Sedan',
    luxury: 'Prestige & VIP',
    pickup: '4WD Pickup',
    economy: 'Economy City Car',
    perDay: 'day',
    perWeek: 'week',
    perMonth: 'month',
    bookNow: 'Book Now',
    viewDetails: 'View Details',
    calculatePrice: 'Calculate Price',
    digitalContract: 'Digital Agreement',
    signAndConfirm: 'Sign & Confirm',
    evidenceUpload: 'Pre-Drive 360° Inspection',
    qrPass: 'Reservation Pass',
    acceptedPayments: 'Pay with PayPal, Visa, Credit Card, EVC Plus, Zaad, Sahal',
    langName: 'Af-Soomaali',
    switchLang: 'Soomaali'
  },
  so: {
    brand: 'GoDrive Soomaaliya',
    tagline: 'Adeegga kiraynta gaadiidka ugu casrisan Soomaaliya',
    home: 'Hoyga',
    fleet: 'Liiska Gaadiidka',
    myBookings: 'Ballamaydayda',
    adminDashboard: 'Nidaamka Maamulka',
    guardGate: 'Waqtiga Ilaalada (Guard)',
    login: 'Gal Akhaun-ka',
    register: 'Samayso Akhaun',
    logout: 'Ka bax',
    emergencyHotline: 'Taleefanka Gurmadka: +252 61 500 0000',
    locationAirport: 'Garoonka Aadan Cadde Mogadishu',
    locationHargeisa: 'Garoonka Hargeysa Egal',
    locationGarowe: 'Garoonka & Magaalada Garoowe',
    locationKismayo: 'Dekedda & Magaalada Kismaayo',
    allCategories: 'Dhammaan Noocyada',
    suv: 'SUV & 4x4',
    sedan: 'Sedan Raaxo leh',
    luxury: 'V.I.P & Qaali',
    pickup: 'Shaqada & Cargo Pickup',
    economy: 'Gaadhi Yar oo Qiimo Dhimis leh',
    perDay: 'maalintii',
    perWeek: 'todobaadkii',
    perMonth: 'bishii',
    bookNow: 'Hadda Ballanso',
    viewDetails: 'Faahfaahinta',
    calculatePrice: 'Qiyaas Qiimaha',
    digitalContract: 'Heshiiska Kirada',
    signAndConfirm: 'Saxiix oo Xaqeaji',
    evidenceUpload: 'Sawirrada & Muuqaalka 360°',
    qrPass: 'Koodhka Ballanta (QR)',
    acceptedPayments: 'Ku bixi PayPal, Visa, Kaadhka Bangiga, EVC Plus, Zaad, Sahal',
    langName: 'English',
    switchLang: 'English'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'so' : 'en');
  };

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
