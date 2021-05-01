import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        marginLeft: 10,
    },
    text: {
        fontSize: 18,
        color: 'blue',
    },
});

const ConfigBtl = () => {

    const [isBtl, setIsBtl] = useState(true);
    const toggleSwitchBtl = () => setIsBtl(previousState => !previousState);

    const [isInsurance, setIsInsurance] = useState(true);
    const toggleSwitchInsurance = () => setIsInsurance(previousState => !previousState);

    const save = async () => {
        await SecureStore.setItemAsync('isBtl', isBtl.toString());
        await SecureStore.setItemAsync('isInsurance', isInsurance.toString());
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('isBtl');
        if (result) {
            setIsBtl(result === 'true');
        }
        result = await SecureStore.getItemAsync('isInsurance');
        if (result) {
            setIsInsurance(result === 'true');
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [isBtl, isInsurance]);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>{isBtl ? i18n.t('payBtl') : i18n.t('freeBtl')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: 'green', true: 'green' }}
                    thumbColor={isBtl ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitchBtl}
                    value={isBtl}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>{isInsurance ? i18n.t('payInsurance') : i18n.t('freeInsurance')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: 'green', true: 'green' }}
                    thumbColor={isInsurance ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitchInsurance}
                    value={isInsurance}
                />
            </View>
        </View>
    );
}


export default ConfigBtl;
