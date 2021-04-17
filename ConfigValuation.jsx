import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ConfigInput from './ConfigInput';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        width: 200,
        height: 50,
        borderWidth: 1,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 20,
        color: 'black',
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

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
            <ConfigInput callback={setCar} value={car} text='רכב:' />
            <ConfigInput callback={setFood} value={food} text='ארוחות:' />
            <ConfigInput callback={setInsurance} value={insurance} text='ביטוח רפואי:' />
            <ConfigInput callback={setPresent} value={present} text='מתנות:' />
            <ConfigInput callback={setOtherValuation} value={otherValuation} text='אחר:' />
        </View>
    );
}


export default ConfigValuation;
