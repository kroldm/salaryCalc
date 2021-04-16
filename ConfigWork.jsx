import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ConfigInput from './ConfigInput';

const ConfigWork = () => {

    const [kerenCeil, setKerenCeil] = useState('15712');
    const [keren, setKeren] = useState('7.5');
    const [rewards, setRewards] = useState('5.0');
    const [compensation, setCompensation] = useState('8.33');
    const [loss, setLoss] = useState('1.0');

    const save = async () => {
        await SecureStore.setItemAsync('kerenCeil', kerenCeil);
        await SecureStore.setItemAsync('kerenWork', keren);
        await SecureStore.setItemAsync('rewardsWork', rewards);
        await SecureStore.setItemAsync('compensationWork', compensation);
        await SecureStore.setItemAsync('lossWork', loss);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('kerenCeil');
        if (result) {
            setKerenCeil(result);
        }
        result = await SecureStore.getItemAsync('kerenWork');
        if (result) {
            setKeren(result);
        }
        result = await SecureStore.getItemAsync('rewardsWork');
        if (result) {
            setRewards(result);
        }
        result = await SecureStore.getItemAsync('compensationWork');
        if (result) {
            setCompensation(result);
        }
        result = await SecureStore.getItemAsync('lossWork');
        if (result) {
            setLoss(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [kerenCeil, keren, rewards, compensation, loss]);

    return (
        <View>
            <ConfigInput callback={setKerenCeil} value={kerenCeil} text='תקרת קרן השתלמות:' />
            <ConfigInput callback={setKeren} value={keren} text='קרן השתלמות:' />
            <ConfigInput callback={setRewards} value={rewards} text='תיגמולים:' />
            <ConfigInput callback={setCompensation} value={compensation} text='פיצויים:' />
            <ConfigInput callback={setLoss} value={loss} text='אובדן כושר עבודה:' />
        </View>
    );
}


export default ConfigWork;
