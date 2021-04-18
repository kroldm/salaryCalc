import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const ConfigSalary = () => {

    const [salary, setSalary] = useState('100');
    const [extraMonth, setExtraMonth] = useState('0');
    const [extraDay, setExtraDay] = useState('0');
    
    const [isMonthly, setIsMonthly] = useState(true);

    const save = async () => {
        await SecureStore.setItemAsync('salary', salary);
        await SecureStore.setItemAsync('extraMonth', extraMonth);
        await SecureStore.setItemAsync('extraDay', extraDay);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('salary');
        if (result) {
            setSalary(result);
        }
        result = await SecureStore.getItemAsync('extraMonth');
        if (result) {
            setExtraMonth(result);
        }
        result = await SecureStore.getItemAsync('extraDay');
        if (result) {
            setExtraDay(result);
        }
        result = await SecureStore.getItemAsync('isMonthly');
        if (result) {
            setIsMonthly(result === 'true');
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [salary, extraMonth, extraDay]);

    return (
        <View>
            <ConfigInput callback={setSalary} value={salary} text={i18n.t('basic')} />
            {!isMonthly ? <ConfigInput callback={setExtraDay} value={extraDay} text={i18n.t('extraDay')} /> : null}
            <ConfigInput callback={setExtraMonth} value={extraMonth} text={i18n.t('extraMonth')} />
        </View>
    );
}


export default ConfigSalary;
