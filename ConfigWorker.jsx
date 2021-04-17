import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ConfigInput from './ConfigInput';

const ConfigWorker = () => {

    const [keren, setKeren] = useState('2.5');
    const [rewards, setRewards] = useState('6.0');

    const save = async () => {
        await SecureStore.setItemAsync('kerenWorker', keren);
        await SecureStore.setItemAsync('rewardsWorker', rewards);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('kerenWorker');
        if (result) {
            setKeren(result);
        }
        result = await SecureStore.getItemAsync('rewardsWorker');
        if (result) {
            setRewards(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [keren, rewards]);

    return (
        <View>
            <ConfigInput callback={setKeren} value={keren} text='קרן השתלמות:' />
            <ConfigInput callback={setRewards} value={rewards} text='תיגמולים:' />
        </View>
    );
}


export default ConfigWorker;
