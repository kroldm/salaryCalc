import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
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

    const [birthDay, setBirthDay] = useState(new Date(0));
    const [showBirthDay, setShowBirthDay] = useState(false);
    const showBirthDayDialog = () => setShowBirthDay(true);

    const onChangeBirthDay = (event, selectedDate) => {
        const currentDate = selectedDate || birthDay;
        setShowBirthDay(false);
        setBirthDay(currentDate);
    };

    const [immigrationDate, setImmigrationDate] = useState(new Date(0));
    const [showImmigrationDate, setShowImmigrationDate] = useState(false);
    const showImmigrationDateDialog = () => setShowImmigrationDate(true);

    const onChangeImmigrationDate = (event, selectedDate) => {
        const currentDate = selectedDate || immigrationDate;
        setShowImmigrationDate(false);
        setImmigrationDate(currentDate);
    };

    const [armyStartDate, setArmyStartDate] = useState(new Date(0));
    const [showArmyStartDate, setShowArmyStartDate] = useState(false);
    const showArmyStartDateDialog = () => setShowArmyStartDate(true);

    const onChangeArmyStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || armyStartDate;
        setShowArmyStartDate(false);
        setArmyStartDate(currentDate);
    };

    const [armyStopDate, setArmyStopDate] = useState(new Date(0));
    const [showArmyStopDate, setShowArmyStopDate] = useState(false);
    const showArmyStopDateDialog = () => setShowArmyStopDate(true);

    const onChangeArmyStopDate = (event, selectedDate) => {
        const currentDate = selectedDate || armyStopDate;
        setShowArmyStopDate(false);
        setArmyStopDate(currentDate);
    };

    const save = async () => {
        await SecureStore.setItemAsync('isCitizen', isCitizen.toString());
        await SecureStore.setItemAsync('gender', gender);
        await SecureStore.setItemAsync('familyStatus', familyStatus);
        await SecureStore.setItemAsync('birthDay', birthDay.toString());
        await SecureStore.setItemAsync('immigrationDate', immigrationDate.toString());
        await SecureStore.setItemAsync('armyStartDate', armyStartDate.toString());
        await SecureStore.setItemAsync('armyStopDate', armyStopDate.toString());
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
        result = await SecureStore.getItemAsync('birthDay');
        if (result) {
            setBirthDay(new Date(result));
        }
        result = await SecureStore.getItemAsync('immigrationDate');
        if (result) {
            setImmigrationDate(new Date(result));
        }
        result = await SecureStore.getItemAsync('armyStartDate');
        if (result) {
            setArmyStartDate(new Date(result));
        }
        result = await SecureStore.getItemAsync('armyStopDate');
        if (result) {
            setArmyStopDate(new Date(result));
        }
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [isCitizen, gender, familyStatus, birthDay, immigrationDate, armyStartDate, armyStopDate]);

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
            {isCitizen ? 
                <View style={styles.container}>
                    <Text style={styles.text}>{i18n.t('birthDay')}</Text>
                    <Button onPress={showBirthDayDialog} title={`${birthDay.getDate().toString()}/${(birthDay.getMonth()+1).toString()}/${birthDay.getFullYear().toString()}`} color='black' />
                    {showBirthDay &&
                        <DateTimePicker
                            value={birthDay}
                            onChange={onChangeBirthDay}
                        />}
                </View> : null}
            {isCitizen ? 
                <View style={styles.container}>
                    <Text style={styles.text}>{i18n.t('immigrationDate')}</Text>
                    <Button onPress={showImmigrationDateDialog} title={`${immigrationDate.getDate().toString()}/${(immigrationDate.getMonth()+1).toString()}/${immigrationDate.getFullYear().toString()}`} color='black' />
                    {showImmigrationDate &&
                        <DateTimePicker
                            value={immigrationDate}
                            onChange={onChangeImmigrationDate}
                        />}
                </View> : null}
            {isCitizen ? 
                <View style={styles.container}>
                    <Text style={styles.text}>{i18n.t('armyStartDate')}</Text>
                    <Button onPress={showArmyStartDateDialog} title={`${armyStartDate.getDate().toString()}/${(armyStartDate.getMonth()+1).toString()}/${armyStartDate.getFullYear().toString()}`} color='black' />
                    {showArmyStartDate &&
                        <DateTimePicker
                            value={armyStartDate}
                            onChange={onChangeArmyStartDate}
                        />}
                </View> : null}
            {isCitizen ? 
                <View style={styles.container}>
                    <Text style={styles.text}>{i18n.t('armyStopDate')}</Text>
                    <Button onPress={showArmyStopDateDialog} title={`${armyStopDate.getDate().toString()}/${(armyStopDate.getMonth()+1).toString()}/${armyStopDate.getFullYear().toString()}`} color='black' />
                    {showArmyStopDate &&
                        <DateTimePicker
                            value={armyStopDate}
                            onChange={onChangeArmyStopDate}
                        />}
                </View> : null}
        </View>
    );
}


export default ConfigTax;
