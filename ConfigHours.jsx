import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigInput from './ConfigInput';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigHours = () => {

    const [daysWork, setDaysWork] = useState('22');
    const [hours100, setHours100] = useState('185');
    const [hours125, setHours125] = useState('0');
    const [hours150, setHours150] = useState('0');
    const [hours175, setHours175] = useState('0');
    const [hours200, setHours200] = useState('0');
    
    const [isMonthly, setIsMonthly] = useState(true);
    const toggleSwitch = () => setIsMonthly(previousState => !previousState);

    const save = async () => {
        await SecureStore.setItemAsync('daysWork', daysWork);
        await SecureStore.setItemAsync('hours100', hours100);
        await SecureStore.setItemAsync('hours125', hours125);
        await SecureStore.setItemAsync('hours150', hours150);
        await SecureStore.setItemAsync('hours175', hours175);
        await SecureStore.setItemAsync('hours200', hours200);
        await SecureStore.setItemAsync('isMonthly', isMonthly.toString());
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('daysWork');
        if (result) {
            setDaysWork(result);
        }
        result = await SecureStore.getItemAsync('hours100');
        if (result) {
            setHours100(result);
        }
        result = await SecureStore.getItemAsync('hours125');
        if (result) {
            setHours125(result);
        }
        result = await SecureStore.getItemAsync('hours150');
        if (result) {
            setHours150(result);
        }
        result = await SecureStore.getItemAsync('hours175');
        if (result) {
            setHours175(result);
        }
        result = await SecureStore.getItemAsync('hours200');
        if (result) {
            setHours200(result);
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
    }, [daysWork, hours100, hours125, hours150, hours175, hours200, isMonthly]);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>{isMonthly ? i18n.t('global') : i18n.t('byHour')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: 'red', true: 'yellow' }}
                    thumbColor={isMonthly ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isMonthly}
                />
            </View>
            {!isMonthly ?
                <View> 
                    <ConfigInput callback={setDaysWork} value={daysWork} text={i18n.t('daysWork')} /> 
                    <ConfigInput callback={setHours100} value={hours100} text={i18n.t('hours100')} /> 
                    <ConfigInput callback={setHours125} value={hours125} text={i18n.t('hours125')} /> 
                    <ConfigInput callback={setHours150} value={hours150} text={i18n.t('hours150')} /> 
                    <ConfigInput callback={setHours175} value={hours175} text={i18n.t('hours175')} /> 
                    <ConfigInput callback={setHours200} value={hours200} text={i18n.t('hours200')} />
                </View>
            : null}
        </View>
    );
}


export default ConfigHours;
