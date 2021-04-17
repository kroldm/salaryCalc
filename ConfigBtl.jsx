import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
                <Switch style={styles.switch}
                    trackColor={{ false: 'red', true: 'yellow' }}
                    thumbColor={isBtl ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isBtl}
                />
                <Text style={styles.text}>{isBtl ? 'משלם ביטוח לאומי' : 'פטור מתשלום ביטוח לאומי'}</Text>
            </View>
        </View>
    );
}


export default ConfigBtl;
