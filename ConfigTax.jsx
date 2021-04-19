import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigPicker from './ConfigPicker';
import { Ionicons } from '@expo/vector-icons';
import ConfigDatePicker from './ConfigDatePicker';
import ConfigInput from './ConfigInput';

const genderOptions = [ 'man', 'woman' ];
const familyStatusOptions = [ 'bachelor', 'married', 'divorcee', 'widower' ];

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
    const [immigrationDate, setImmigrationDate] = useState(new Date(0));
    const [armyStartDate, setArmyStartDate] = useState(new Date(0));
    const [armyStopDate, setArmyStopDate] = useState(new Date(0));
    const [degreeDate, setDegreeDate] = useState(new Date(0));

    const [children, setChildren] = useState([]);

    const save = async () => {
        await SecureStore.setItemAsync('isCitizen', isCitizen.toString());
        await SecureStore.setItemAsync('gender', gender);
        await SecureStore.setItemAsync('familyStatus', familyStatus);
        await SecureStore.setItemAsync('birthDay', birthDay.toString());
        await SecureStore.setItemAsync('immigrationDate', immigrationDate.toString());
        await SecureStore.setItemAsync('armyStartDate', armyStartDate.toString());
        await SecureStore.setItemAsync('armyStopDate', armyStopDate.toString());
        await SecureStore.setItemAsync('degreeDate', degreeDate.toString());
        children.map(async (child, index) => (
            await SecureStore.setItemAsync(`child${index}`, child.toString())
        ));
        // questions.map(async q => (await Question.findByIdAndUpdate(q._id, { hide: 1 })));
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
        result = await SecureStore.getItemAsync('degreeDate');
        if (result) {
            setDegreeDate(new Date(result));
        }
        let index = 0;
        const arr = [];
        while (result = await SecureStore.getItemAsync(`child${index}`)) {
            arr.push(new Date(result));
            index+=1;
        }
        setChildren(arr);
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [isCitizen, gender, familyStatus, birthDay, immigrationDate, armyStartDate, armyStopDate, degreeDate, children]);

    const addChild = () => {
        setChildren(prevItems => [...prevItems, new Date(0)]);
    };
    const updateChild = (currentDate, index) => {
        let arr = [...children]; // copying the old datas array
        arr[index] = currentDate; 
        setChildren(arr);
    };

    return (
        <ScrollView>
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

            <ConfigPicker callback={setGender} value={gender} text={i18n.t('gender')} options={genderOptions} />
            {isCitizen ? <ConfigPicker callback={setFamilyStatus} value={familyStatus} text={i18n.t('familyStatus')} options={familyStatusOptions} /> : null}

            {isCitizen ? <ConfigDatePicker callback={setBirthDay} value={birthDay} text={i18n.t('birthDay')} index={100} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setImmigrationDate} value={immigrationDate} text={i18n.t('immigrationDate')} index={101} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setArmyStartDate} value={armyStartDate} text={i18n.t('armyStartDate')} index={102} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setArmyStopDate} value={armyStopDate} text={i18n.t('armyStopDate')} index={103} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setDegreeDate} value={degreeDate} text={i18n.t('degreeDate')} index={104} /> : null}

            <View style={styles.container}>
                <Text style={styles.text}>{i18n.t('addChild')}</Text>
                <Ionicons name="add" onPress={addChild} size={32} color="green" />
            </View>
            {children.map((child, index) => (
                <ConfigDatePicker callback={updateChild} value={child} text={`${i18n.t('child')} ${index+1}`} index={index}/>
            ))}
        </ScrollView>
    );
}


export default ConfigTax;
