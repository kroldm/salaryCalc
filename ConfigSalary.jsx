import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const ConfigSalary = () => {

    const [salary, setSalary] = useState('100');
    const [extraMonth, setExtraMonth] = useState('0');
    const [travel, setTravel] = useState('0');
    
    const save = async () => {
        await SecureStore.setItemAsync('salary', salary);
        await SecureStore.setItemAsync('extraMonth', extraMonth);
        await SecureStore.setItemAsync('travel', travel);
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
        result = await SecureStore.getItemAsync('travel');
        if (result) {
            setTravel(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [salary, extraMonth, travel]);

    return (
        <View>
            <ConfigInput callback={setSalary} value={salary} text={i18n.t('basic')} />
            <ConfigInput callback={setExtraMonth} value={extraMonth} text={i18n.t('extraMonth')} />
            <ConfigInput callback={setTravel} value={travel} text={i18n.t('travel')} />
        </View>
    );
}


export default ConfigSalary;
