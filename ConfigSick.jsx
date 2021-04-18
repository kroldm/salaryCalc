import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const ConfigSick = () => {

    const [daysSick, setDaysSick] = useState('0');
    const [daySick1, setDaySick1] = useState('0');
    const [daySick2, setDaySick2] = useState('50');
    const [daySick3, setDaySick3] = useState('50');

    const save = async () => {
        await SecureStore.setItemAsync('daysSick', daysSick);
        await SecureStore.setItemAsync('daySick1', daySick1);
        await SecureStore.setItemAsync('daySick2', daySick2);
        await SecureStore.setItemAsync('daySick3', daySick3);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('daysSick');
        if (result) {
            setDaysSick(result);
        }
        result = await SecureStore.getItemAsync('daySick1');
        if (result) {
            setDaySick1(result);
        }
        result = await SecureStore.getItemAsync('daySick2');
        if (result) {
            setDaySick2(result);
        }
        result = await SecureStore.getItemAsync('daySick3');
        if (result) {
            setDaySick3(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [daysSick, daySick1, daySick2, daySick3]);

    return (
        <View>
            <ConfigInput callback={setDaysSick} value={daysSick} text={i18n.t('daysSick')} />
            <ConfigInput callback={setDaySick1} value={daySick1} text={i18n.t('daySick1')} />
            <ConfigInput callback={setDaySick2} value={daySick2} text={i18n.t('daySick2')} />
            <ConfigInput callback={setDaySick3} value={daySick3} text={i18n.t('daySick3')} />
        </View>
    );
}


export default ConfigSick;
