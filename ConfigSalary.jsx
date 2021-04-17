import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import ConfigInput from './ConfigInput';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
        marginRight: 10,
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigSalary = () => {

    const [salary, setSalary] = useState('100');
    const [extraMonth, setExtraMonth] = useState('0');
    const [extraDay, setExtraDay] = useState('0');
    
    const [isMonthly, setIsMonthly] = useState(true);
    const toggleSwitch = () => setIsMonthly(previousState => !previousState);

    const save = async () => {
        await SecureStore.setItemAsync('salary', salary);
        await SecureStore.setItemAsync('extraMonth', extraMonth);
        await SecureStore.setItemAsync('extraDay', extraDay);
        await SecureStore.setItemAsync('isMonthly', isMonthly.toString());
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
    }, [salary, extraMonth, extraDay, isMonthly]);

    return (
        <View>
            <View style={styles.container}>
                <Switch style={styles.switch}
                    trackColor={{ false: 'red', true: 'yellow' }}
                    thumbColor={isMonthly ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isMonthly}
                />
                <Text style={styles.text}>{isMonthly ? 'גלובלי' : 'לפי שעה'}</Text>
            </View>
            <ConfigInput callback={setSalary} value={salary} text='בסיס:' />
            {!isMonthly ? <ConfigInput callback={setExtraDay} value={extraDay} text='תוספת יומית:' /> : null}
            <ConfigInput callback={setExtraMonth} value={extraMonth} text='תוספת חודשית:' />
        </View>
    );
}


export default ConfigSalary;
