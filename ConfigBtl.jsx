import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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

const ConfigBtl = () => {

    const [isBtl, setIsBtl] = useState(true);
    const toggleSwitch = () => setIsBtl(previousState => !previousState);

    const save = async () => {
        await SecureStore.setItemAsync('isBtl', isBtl.toString());
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('isBtl');
        if (result) {
            setIsBtl(result === 'true');
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [isBtl]);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>{isBtl ? i18n.t('payBtl') : i18n.t('freeBtl')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: 'red', true: 'yellow' }}
                    thumbColor={isBtl ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isBtl}
                />
            </View>
        </View>
    );
}


export default ConfigBtl;
