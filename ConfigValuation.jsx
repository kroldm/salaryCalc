import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const ConfigValuation = () => {

    const [car, setCar] = useState('0');
    const [food, setFood] = useState('0');
    const [insurance, setInsurance] = useState('0');
    const [present, setPresent] = useState('0');
    const [otherValuation, setOtherValuation] = useState('0');

    const save = async () => {
        await SecureStore.setItemAsync('car', car);
        await SecureStore.setItemAsync('food', food);
        await SecureStore.setItemAsync('insurance', insurance);
        await SecureStore.setItemAsync('present', present);
        await SecureStore.setItemAsync('otherValuation', otherValuation);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('car');
        if (result) {
            setCar(result);
        }
        result = await SecureStore.getItemAsync('food');
        if (result) {
            setFood(result);
        }
        result = await SecureStore.getItemAsync('insurance');
        if (result) {
            setInsurance(result);
        }
        result = await SecureStore.getItemAsync('present');
        if (result) {
            setPresent(result);
        }
        result = await SecureStore.getItemAsync('otherValuation');
        if (result) {
            setOtherValuation(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [car, food, insurance, present, otherValuation]);

    return (
        <View>
            <ConfigInput callback={setCar} value={car} text={i18n.t('car')} />
            <ConfigInput callback={setFood} value={food} text={i18n.t('food')} />
            <ConfigInput callback={setInsurance} value={insurance} text={i18n.t('insurance')} />
            <ConfigInput callback={setPresent} value={present} text={i18n.t('present')} />
            <ConfigInput callback={setOtherValuation} value={otherValuation} text={i18n.t('otherValuation')} />
        </View>
    );
}


export default ConfigValuation;
