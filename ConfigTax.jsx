import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import i18n from 'i18n-js';
import ConfigPicker from './ConfigPicker';
import { Ionicons } from '@expo/vector-icons';
import ConfigDatePicker from './ConfigDatePicker';
import ConfigCheck from './ConfigCheck';

const genderOptions = [ 'man', 'woman' ];
const familyStatusOptions = [ 'bachelor', 'married', 'divorcee', 'widower' ];
const workOptions = [ 'nurse', 'other' ];

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
    const [work, setWork] = useState('nurse');

    const [birthDay, setBirthDay] = useState(new Date(0));
    const [spouseBirthDay, setSpouseBirthDay] = useState(new Date(0));
    const [immigrationDate, setImmigrationDate] = useState(new Date(0));
    const [armyStartDate, setArmyStartDate] = useState(new Date(0));
    const [armyStopDate, setArmyStopDate] = useState(new Date(0));
    const [degreeDate, setDegreeDate] = useState(new Date(0));

    const [isSpecialTown, setIsSpecialTown] = useState(false);
    const [isSpouseFoods, setIsSpouseFoods] = useState(false);
    const [isChildrenFoods, setIsChildrenFoods] = useState(false);

    const [childrenMyHold, setChildrenMyHold] = useState([]);
    const [childrenNotMyHold, setChildrenNotMyHold] = useState([]);

    const save = async () => {
        await SecureStore.setItemAsync('isCitizen', isCitizen.toString());
        await SecureStore.setItemAsync('gender', gender);
        await SecureStore.setItemAsync('familyStatus', familyStatus);
        await SecureStore.setItemAsync('work', work);
        await SecureStore.setItemAsync('birthDay', birthDay.toString());
        await SecureStore.setItemAsync('spouseBirthDay', spouseBirthDay.toString());
        await SecureStore.setItemAsync('immigrationDate', immigrationDate.toString());
        await SecureStore.setItemAsync('armyStartDate', armyStartDate.toString());
        await SecureStore.setItemAsync('armyStopDate', armyStopDate.toString());
        await SecureStore.setItemAsync('degreeDate', degreeDate.toString());
        await SecureStore.setItemAsync('isSpecialTown', isSpecialTown.toString());
        await SecureStore.setItemAsync('isSpouseFoods', isSpouseFoods.toString());
        await SecureStore.setItemAsync('isChildrenFoods', isChildrenFoods.toString());
        childrenMyHold.map(async (child, index) => (
            await SecureStore.setItemAsync(`childMyHold${index}`, child.toString())
        ));
        childrenNotMyHold.map(async (child, index) => (
            await SecureStore.setItemAsync(`childNotMyHold${index}`, child.toString())
        ));
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
        result = await SecureStore.getItemAsync('work');
        if (result) {
            setWork(result);
        }
        result = await SecureStore.getItemAsync('birthDay');
        if (result) {
            setBirthDay(new Date(result));
        }
        result = await SecureStore.getItemAsync('spouseBirthDay');
        if (result) {
            setSpouseBirthDay(new Date(result));
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
        result = await SecureStore.getItemAsync('isSpecialTown');
        if (result) {
            setIsSpecialTown(result === 'true');
        }
        result = await SecureStore.getItemAsync('isSpouseFoods');
        if (result) {
            setIsSpouseFoods(result === 'true');
        }
        result = await SecureStore.getItemAsync('isChildrenFoods');
        if (result) {
            setIsChildrenFoods(result === 'true');
        }
        let index = 0;
        let arr = [];
        while (result = await SecureStore.getItemAsync(`childMyHold${index}`)) {
            arr.push(new Date(result));
            index+=1;
        }
        setChildrenMyHold(arr);
        index = 0;
        arr = [];
        while (result = await SecureStore.getItemAsync(`childNotMyHold${index}`)) {
            arr.push(new Date(result));
            index+=1;
        }
        setChildrenNotMyHold(arr);
    };

    useEffect(() => {
        read();
    }, []);

    useEffect(() => {
        save();
    }, [isCitizen, gender, familyStatus, work, birthDay, spouseBirthDay, immigrationDate, armyStartDate, armyStopDate, degreeDate, isSpecialTown, isSpouseFoods, isChildrenFoods, childrenMyHold, childrenNotMyHold]);

    const addChildMyHold = () => {
        setChildrenMyHold(prevItems => [...prevItems, new Date(0)]);
    };
    const updateChildMyHold = (currentDate, index) => {
        let arr = [...childrenMyHold]; // copying the old datas array
        arr[index] = currentDate; 
        setChildrenMyHold(arr);
    };

    const addChildNotMyHold = () => {
        setChildrenNotMyHold(prevItems => [...prevItems, new Date(0)]);
    };
    const updateChildNotMyHold = (currentDate, index) => {
        let arr = [...childrenNotMyHold]; // copying the old datas array
        arr[index] = currentDate; 
        setChildrenNotMyHold(arr);
    };

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

            <ConfigPicker callback={setGender} value={gender} text={i18n.t('gender')} options={genderOptions} />

            {!isCitizen ? <ConfigPicker callback={setWork} value={work} text={i18n.t('work')} options={workOptions} /> : null}

            {isCitizen ? <ConfigPicker callback={setFamilyStatus} value={familyStatus} text={i18n.t('familyStatus')} options={familyStatusOptions} /> : null}

            {isCitizen ? <ConfigDatePicker callback={setBirthDay} value={birthDay} text={i18n.t('birthDay')} /> : null}
            {(isCitizen && familyStatus === 'married') ? <ConfigDatePicker callback={setSpouseBirthDay} value={spouseBirthDay} text={i18n.t('spouseBirthDay')} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setImmigrationDate} value={immigrationDate} text={i18n.t('immigrationDate')} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setArmyStartDate} value={armyStartDate} text={i18n.t('armyStartDate')} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setArmyStopDate} value={armyStopDate} text={i18n.t('armyStopDate')} /> : null}
            {isCitizen ? <ConfigDatePicker callback={setDegreeDate} value={degreeDate} text={i18n.t('degreeDate')} /> : null}

            {isCitizen ? <ConfigCheck callback={setIsSpecialTown} value={isSpecialTown} text={i18n.t('specialTown')} /> : null}

            {isCitizen ? 
                <View>
                    <View style={styles.container}>
                        <Text style={styles.text}>{i18n.t('addChildMyHold')}</Text>
                        <Ionicons name="add" onPress={addChildMyHold} size={32} color="green" />
                    </View>
                    {childrenMyHold.map((child, index) => (
                        <ConfigDatePicker key={index} id={index} callback={updateChildMyHold} value={child} text={`${i18n.t('child')} ${index+1}`} />
                    ))}

                    <View style={styles.container}>
                        <Text style={styles.text}>{i18n.t('addChildNotMyHold')}</Text>
                        <Ionicons name="add" onPress={addChildNotMyHold} size={32} color="green" />
                    </View>
                    {childrenNotMyHold.map((child, index) => (
                        <ConfigDatePicker key={index} id={index} callback={updateChildNotMyHold} value={child} text={`${i18n.t('child')} ${index+1}`} />
                    ))}
                </View> : null}

                {isCitizen ? <ConfigCheck callback={setIsSpouseFoods} value={isSpouseFoods} text={i18n.t('spouseFoods')} /> : null}
                {isCitizen ? <ConfigCheck callback={setIsChildrenFoods} value={isChildrenFoods} text={i18n.t('childrenFoods')} /> : null}
        </View>
    );
}


export default ConfigTax;
