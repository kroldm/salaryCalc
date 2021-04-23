import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import Home from './Home';
import Config from './Config';

i18n.translations = {
  he: { home: 'תלוש',
        config: 'הגדרות', 
        hoursBtn: 'שעות', 
        salaryBtn: 'שכר',  
        sickBtn: 'מחלה',  
        vacationBtn: 'חופש',  
        valuationBtn: 'שווי מס', 
        taxBtn: 'מס הכנסה',
        btlBtn: 'ביטוח לאומי',
        workBtn: 'מעביד',
        workerBtn: 'עובד',
        configBtn: 'הגדרות',
        calcBtn: 'תלוש',
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
        travel: 'נסיעות יומית',
        car: 'רכב',
        phone: 'טלפון',
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
        spouseBirthDay: 'תאריך לידה בן זוג',
        immigrationDate: 'תאריך עליה',
        armyStartDate: 'תאריך גיוס',
        armyStopDate: 'תאריך שיחרור',
        degreeDate: 'תאריך סיום תואר',
        addChildMyHold: 'ילדים בחזקתי',
        addChildNotMyHold: 'ילדים לא בחזקתי',
        removeChildren: 'למחוק ילדים',
        child: 'תאריך לידה ילד',
        specialTown: 'גר בישוב מאוחד',
        spouseFoods: 'משלם מזונות לבן זוג',
        childrenFoods: 'משלם מזונות לילדים',
        work: 'עיסוק',
        nurse: 'סיעוד',
        other: 'אחר',
        taxPoints: 'נקודות זיכוי',
        salary: 'משכורת ברוטו',
        valuation: 'שווי מס',
        tax: 'מס הכנסה',
        btl: 'ביטוח לאומי',
        health: 'ביטוח בריאות',
        kerenWork: 'קרן השתלמות מעביד',
        kerenWorker: 'קרן השתלמות עובד',
        rewardsWork: 'פנסיה מעביד',
        rewardsWorker: 'פנסיה עובד',
        salaryNetto: 'משכורת נטו',
      },
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: i18n.t('home') }} />
        <Stack.Screen name="Config" component={Config} options={{ title: i18n.t('config') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
