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

const townOptions = [
    '473', 
    '1342',
    '1375',
    '1275',
    '1115',
    '1220',
    '1081',
    '400',
    '4011',
    '3786',
    '1311',
    '3759',
    '1068',
    '4010',
    '1046',
    '1358',
    '31',
    '1294',
    '67',
    '4013',
    '403',
    '821',
    '785',
    '338',
    '77',
    '294',
    '1126',
    '37',
    '4003',
    '1359',
    '330',
    '4017',
    '4002',
    '1365',
    '1248',
    '730',
    '1125',
    '3556',
    '603',
    '1064',
    '1253',
    '23',
    '4012',
    '3754',
    '4301',
    '176',
    '313',
    '3598',
    '714',
    '71',
    '1276',
    '199',
    '1188',
    '3722',
    '2021',
    '1152',
    '1256',
    '21',
    '1278',
    '399',
    '559',
    '4001',
    '762',
    '1348',
    '368',
    '480',
    '723',
    '322',
    '572',
    '3645',
    '143',
    '265',
    '598',
    '9200',
    '712',
    '1368',
    '4015',
    '1363',
    '483',
    '589',
    '3612',
    '1191',
    '428',
    '2060',
    '667',
    '1292',
    '485',
    '487',
    '352',
    '424',
    '2014',
    '1344',
    '4021',
    '342',
    '35',
    '852',
    '755',
    '1219',
    '1204',
    '736',
    '262',
    '1206',
    '3613',
    '3606',
    '463',
    '1129',
    '4022',
    '305',
    '574',
    '849',
    '62',
    '1067',
    '336',
    '490',
    '492',
    '2200',
    '2063',
    '431',
    '1317',
    '303',
    '302',
    '1241',
    '1349',
    '702',
    '356',
    '1208',
    '1261',
    '1203',
    '3639',
    '584',
    '1065',
    '2064',
    '3764',
    '4026',
    '948',
    '1239',
    '253',
    '662',
    '1332',
    '374',
    '1303',
    '496',
    '1047',
    '1272',
    '820',
    '343',
    '3646',
    '3609',
    '280',
    '4005',
    '13',
    '2034',
    '397',
    '1209',
    '6700',
    '962',
    '268',
    '1181',
    '1177',
    '8900',
    '3743',
    '1214',
    '1295',
    '1232',
    '358',
    '1158',
    '2009',
    '1226',
    '1112',
    '4007',
    '803',
    '409',
    '866',
    '3607',
    '811',
    '29',
    '575',
    '1138',
    '795',
    '3566',
    '453',
    '623',
    '2026',
    '831',
    '502',
    '916',
    '1227',
    '504',
    '576',
    '1338',
    '1252',
    '1210',
    '1367',
    '840',
    '1153',
    '1183',
    '1229',
    '1331',
    '1291',
    '1201',
    '4028',
    '63',
    '1059',
    '1296',
    '357',
    '76',
    '443',
    '1263',
    '609',
    '1297',
    '4004',
    '507',
    '1095',
    '297',
    '345',
    '845',
    '579',
    '1130',
    '295',
    '605',
    '1285',
    '664',
    '1085',
    '1374',
    '1139',
    '768',
    '1198',
    '3656',
    '1207',
    '1230',
    '2023',
    '380',
    '595',
    '1171',
    '1255',
    '674',
    '24',
    '1173',
    '1060',
    '4204',
    '3825',
    '1080',
    '829',
    '573',
    '481',
    '65',
    '516',
    '4201',
    '695',
    '1140',
    '1360',
    '1163',
    '1178',
    '517',
    '3599',
    '1418',
    '1416',
    '1415',
    '1196',
    '308',
    '43',
    '4019',
    '1282',
    '607',
    '1268',
    '3614',
    '1343',
    '1202',
    '2044',
    '596',
    '1154',
    '347',
    '1174',
    '1205',
    '48',
    '263',
    '298',
    '748',
    '4203',
    '1082',
    '678',
    '272',
    '3657',
    '570',
    '416',
    '518',
    '1127',
    '4008',
    '1063',
    '668',
    '3745',
    '325',
    '1222',
    '99',
    '3610',
    '843',
    '4101',
    '1340',
    '421',
    '378',
    '3605',
    '3785',
    '732',
    '395',
    '1184',
    '4551',
    '1124',
    '408',
    '1197',
    '396',
    '3724',
    '9100',
    '4304',
    '1366',
    '590',
    '4303',
    '296',
    '1057',
    '1314',
    '1279',
    '15',
    '844',
    '522',
    '1147',
    '4014',
    '1369',
    '1195',
    '1280',
    '256',
    '402',
    '2047',
    '69',
    '348',
    '2048',
    '602',
    '3620',
    '4035',
    '1143',
    '3713',
    '3555',
    '1242',
    '792',
    '246',
    '525',
    '578',
    '3756',
    '1238',
    '7500',
    '1245',
    '1156',
    '3777',
    '419',
    '454',
    '1176',
    '892',
    '376',
    '328',
    '4501',
    '1175',
    '546',
    '273',
    '2042',
    '1240',
    '289',
    '383',
    '676',
    '4503',
    '1053',
    '806',
    '813',
    '4502',
    '1251',
    '1187',
    '7600',
    '1146',
    '688',
    '1212',
    '385',
    '318',
    '319',
    '708',
    '917',
    '531',
    '1246',
    '1335',
    '2560',
    '1192',
    '3748',
    '1151',
    '750',
    '1104',
    '1313',
    '749',
    '1185',
    '3723',
    '535',
    '2059',
    '3615',
    '536',
    '281',
    '599',
    '1231',
    '413',
    '1180',
    '1213',
    '1136',
    '1150',
    '1262',
    '774',
    '1221',
    '8000',
    '4025',
    '1211',
    '1179',
    '1052',
    '414',
    '3601',
    '4024',
    '1347',
    '4100',
    '3611',
    '2800',
    '4006',
    '543',
    '1334',
    '26',
    '354',
    '1225',
    '390',
    '1161',
    '2016',
    '1341',
    '362',
    '3619',
    '3782',
    '854',
    '540',
    '4702',
    '372',
    '4701',
    '789',
    '713',
    '1228',
    '437',
    '1260',
    '324',
    '1377',
    '282',
    '1286',
    '304',
    '861',
    '885',
    '36',
    '259',
    '329',
    '1058',
    '2049',
    '1223',
    '2057',
    '3578',
    '1031',
    '761',
    '394',
    '614',
    '1265',
    '415',
    '1235',
    '527',
    '1266',
    '865',
    '1267',
    '658',
    '1160',
    '873',
    '1373',
    '439',
    '812',
    '1364',
    '366',
    '3784',
    '432',
    '1287',
    '1132',
    '538',
    '4009',
    '264',
    '846',
    '1233',
    '398',
    '1045',
    '2062',
    '2061',
    '1172',
    '3558',
    '1083',
    '719',
    '1054',
    '1283',
    '3719',
    '1051',
    '2050',
    '1237',
    '814',
    '709',
    '665',
    '1346'
];


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
        fontSize: 18,
        color: 'blue',
    },
});

const ConfigTax = () => {

    const [isCitizen, setIsCitizen] = useState(true);
    const toggleSwitch = () => setIsCitizen(previousState => !previousState);

    const [gender, setGender] = useState('man');
    const [familyStatus, setFamilyStatus] = useState('bachelor');
    const [work, setWork] = useState('nurse');
    const [town, setTown] = useState('1342');

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
        await SecureStore.setItemAsync('town', town);
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
        result = await SecureStore.getItemAsync('town');
        if (result) {
            setTown(result);
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
    }, [isCitizen, gender, familyStatus, work, town, birthDay, spouseBirthDay, immigrationDate, armyStartDate, armyStopDate, degreeDate, isSpecialTown, isSpouseFoods, isChildrenFoods, childrenMyHold, childrenNotMyHold]);

    const addChildMyHold = () => {
        setChildrenMyHold(prevItems => [...prevItems, new Date(0)]);
    };
    const updateChildMyHold = (currentDate, index) => {
        let arr = [...childrenMyHold]; // copying the old datas array
        arr[index] = currentDate; 
        setChildrenMyHold(arr);
    };
    const removeChildrenMyHold = async () => {
        for (let i = 0; i < childrenMyHold.length; i++) {
            await SecureStore.deleteItemAsync(`childMyHold${i}`)
        }
        setChildrenMyHold([]);
    };
    const addChildNotMyHold = () => {
        setChildrenNotMyHold(prevItems => [...prevItems, new Date(0)]);
    };
    const updateChildNotMyHold = (currentDate, index) => {
        let arr = [...childrenNotMyHold]; // copying the old datas array
        arr[index] = currentDate; 
        setChildrenNotMyHold(arr);
    };
    const removeChildrenNotMyHold = async () => {
        for (let i = 0; i < childrenNotMyHold.length; i++) {
            await SecureStore.deleteItemAsync(`childNotMyHold${i}`)
        }
        setChildrenNotMyHold([]);
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>{isCitizen ? i18n.t('israelCitizen') : i18n.t('notIsraelCitizen')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: 'black', true: 'black' }}
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

            {isCitizen ? 
                <View>
                    <View style={styles.container}>
                        <Text style={styles.text}>{i18n.t('addChildMyHold')}</Text>
                        <Ionicons name="add" onPress={addChildMyHold} size={32} color="black" />
                    </View>
                    {childrenMyHold.map((child, index) => (
                        <ConfigDatePicker key={index} id={index} callback={updateChildMyHold} value={child} text={`${i18n.t('child')} ${index+1}`} />
                    ))}
                    {(childrenMyHold.length > 0) ? 
                        <View style={styles.container}>
                            <Text style={styles.text}>{i18n.t('removeChildren')}</Text>
                            <Ionicons name="remove" onPress={removeChildrenMyHold} size={32} color="black" />
                        </View> : null}

                    <View style={styles.container}>
                        <Text style={styles.text}>{i18n.t('addChildNotMyHold')}</Text>
                        <Ionicons name="add" onPress={addChildNotMyHold} size={32} color="black" />
                    </View>
                    {childrenNotMyHold.map((child, index) => (
                        <ConfigDatePicker key={index} id={index} callback={updateChildNotMyHold} value={child} text={`${i18n.t('child')} ${index+1}`} />
                    ))}
                    {(childrenNotMyHold.length > 0) ? 
                        <View style={styles.container}>
                            <Text style={styles.text}>{i18n.t('removeChildren')}</Text>
                            <Ionicons name="remove" onPress={removeChildrenNotMyHold} size={32} color="black" />
                        </View> : null}
                </View> : null}

            {isCitizen ? <ConfigCheck callback={setIsSpouseFoods} value={isSpouseFoods} text={i18n.t('spouseFoods')} /> : null}
            {isCitizen ? <ConfigCheck callback={setIsChildrenFoods} value={isChildrenFoods} text={i18n.t('childrenFoods')} /> : null}

            {isCitizen ? <ConfigCheck callback={setIsSpecialTown} value={isSpecialTown} text={i18n.t('specialTown')} /> : null}
            {(isCitizen && isSpecialTown) ? <ConfigPicker callback={setTown} value={town} text={i18n.t('town')} options={townOptions} /> : null}
        </View>
    );
}


export default ConfigTax;
