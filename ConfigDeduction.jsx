import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const ConfigDeduction = () => {

    const [foodDeduction, setFoodDeduction] = useState('0');
    const [otherDeduction, setOtherDeduction] = useState('0');

    const save = async () => {
        await SecureStore.setItemAsync('foodDeduction', foodDeduction);
        await SecureStore.setItemAsync('otherDeduction', otherDeduction);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('foodDeduction');
        if (result) {
            setFoodDeduction(result);
        }
        result = await SecureStore.getItemAsync('otherDeduction');
        if (result) {
            setOtherDeduction(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [foodDeduction, otherDeduction]);

    return (
        <View>
            <ConfigInput callback={setFoodDeduction} value={foodDeduction} text={i18n.t('food')} />
            <ConfigInput callback={setOtherDeduction} value={otherDeduction} text={i18n.t('otherValuation')} />
        </View>
    );
}


export default ConfigDeduction;
