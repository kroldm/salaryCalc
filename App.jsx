import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Config from './Config';

i18n.translations = {
  he: { hoursBtn: 'שעות', 
        salaryBtn: 'שכר',  
        sickBtn: 'מחלה',  
        vacationBtn: 'חופש',  
        valuationBtn: 'שווי מס', 
        taxBtn: 'מס הכנסה',
        btlBtn: 'ביטוח לאומי',
        workBtn: 'מעביד',
        workerBtn: 'עובד',
        global: 'גלובלי', 
        byHour: 'לפי שעה',
        daysWork: 'ימי עבודה',
        hours100: 'שעות 100%',
        hours125: 'שעות 125%',
        hours150: 'שעות 150%',
        hours175: 'שעות 175%',
        hours200: 'שעות 200%',
        basic: 'בסיס',
        extraDay: 'תוספת יומית',
        extraMonth: 'תוספת חודשית',
        car: 'רכב',
        food: 'ארוחות',
        insurance: 'ביטוח רפואי',
        present: 'מתנות',
        otherValuation: 'אחר',
        payBtl: 'משלם ביטוח לאומי',
        freeBtl: 'פטור מתשלום ביטוח לאומי',
        kerenCeil: 'תקרת קרן השתלמות',
        keren: 'קרן השתלמות',
        rewards: 'תיגמולים',
        compensation: 'פיצויים',
        loss: 'אובדן כושר עבודה',
        daysSick: 'ימי מחלה',
        daySick1: 'יום מחלה 1',
        daySick2: 'יום מחלה 2',
        daySick3: 'יום מחלה 3',
        daysVacation: 'ימי חופש',
        israelCitizen: 'אזרח ישראלי',
        notIsraelCitizen: 'עובד זר',
        gender: 'מין',
        man: 'זכר',
        woman: 'נקבה',
        familyStatus: 'מצב משפחתי',
        bachelor: 'רווק/ה',
        married: 'נשוי/אה',
        divorcee: 'גרוש/ה',
        widower: 'אלמן/ה',
        birthDay: 'תאריך לידה',
        immigrationDate: 'תאריך עליה',
        armyStartDate: 'תאריך גיוס',
        armyStopDate: 'תאריך שיחרור',
        degreeDate: 'תאריך סיום תואר',
        addChildMyHold: 'ילדים בחזקתי',
        addChildNotMyHold: 'ילדים לא בחזקתי',
        child: 'תאריך לידה ילד',
        specialTown: 'גר בישוב מאוחד',
        spouseFoods: 'משלם מזונות לבן זוג',
        childrenFoods: 'משלם מזונות לילדים',
      },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <Config />
  );
}


export default App;
