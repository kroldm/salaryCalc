import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const ConfigVacation = () => {

    const [daysVacation, setDaysVacation] = useState('0');

    const save = async () => {
        await SecureStore.setItemAsync('daysVacation', daysVacation);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('daysVacation');
        if (result) {
            setDaysVacation(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [daysVacation]);

    return (
        <View>
            <ConfigInput callback={setDaysVacation} value={daysVacation} text={i18n.t('daysVacation')} />
        </View>
    );
}


export default ConfigVacation;
