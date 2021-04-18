import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        marginLeft: 10,
    },
    picker: {
        width: 150,
        height: 50,
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigTax = () => {

    const [isCitizen, setIsCitizen] = useState(true);
    const toggleSwitch = () => setIsCitizen(previousState => !previousState);

    const [gender, setGender] = useState('man');
    const [familyStatus, setFamilyStatus] = useState('bachelor');

    const save = async () => {
        await SecureStore.setItemAsync('isCitizen', isCitizen.toString());
        await SecureStore.setItemAsync('gender', gender);
        await SecureStore.setItemAsync('familyStatus', familyStatus);
    };
    const read = async () => {
        let result = await SecureStore.getItemAsync('isCitizen');
        if (result) {
            setIsCitizen(result === 'true');
        }
        result = await SecureStore.getItemAsync('gender');
        if (result) {
            setGender(result);
        }
        result = await SecureStore.getItemAsync('familyStatus');
        if (result) {
            setFamilyStatus(result);
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [isCitizen, gender, familyStatus]);

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>{isCitizen ? i18n.t('israelCitizen') : i18n.t('notIsraelCitizen')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: 'red', true: 'yellow' }}
                    thumbColor={isCitizen ? 'yellow' : 'red'}
                    ios_backgroundColor="white"
                    onValueChange={toggleSwitch}
                    value={isCitizen}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>{i18n.t('gender')}</Text>
                <Picker style={styles.picker}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                    <Picker.Item label={i18n.t('man')} value="man" />
                    <Picker.Item label={i18n.t('woman')} value="woman" />
                </Picker>
            </View>
            {isCitizen ? 
                <View style={styles.container}>
                    <Text style={styles.text}>{i18n.t('familyStatus')}</Text>
                    <Picker style={styles.picker}
                        selectedValue={familyStatus}
                        onValueChange={(itemValue, itemIndex) => setFamilyStatus(itemValue)}
                    >
                        <Picker.Item label={i18n.t('bachelor')} value="bachelor" />
                        <Picker.Item label={i18n.t('married')} value="married" />
                        <Picker.Item label={i18n.t('divorcee')} value="divorcee" />
                        <Picker.Item label={i18n.t('widower')} value="widower" />
                    </Picker>
                </View> : null}
        </View>
    );
}


export default ConfigTax;
