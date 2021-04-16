import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ConfigInput from './ConfigInput';

const ConfigSalary = () => {

    const [salary, setSalary] = useState('100');
    const [extra, setExtra] = useState('0');

    const save = async () => {
        await SecureStore.setItemAsync('salary', salary);
        await SecureStore.setItemAsync('extra', extra);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('salary');
        if (result) {
            setSalary(result);
        }
        result = await SecureStore.getItemAsync('extra');
        if (result) {
            setExtra(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [salary, extra]);

    return (
        <View>
            <ConfigInput callback={setSalary} value={salary} text='שכר בסיס:' />
            <ConfigInput callback={setExtra} value={extra} text='תוספות:' />
        </View>
    );
}


export default ConfigSalary;
