import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import i18n from 'i18n-js';
import ConfigButton from './ConfigButton';
import { yearsDiffFromNow, monthesDiff } from './dateDiff';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveArea: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});

const Home = ({ navigation }) => { 

    const [taxPoints, setTaxPoints] = useState(0.0);
    const [salary, setSalary] = useState(0.0);
    const [valuation, setValuation] = useState(0.0);

    const calcTaxPoints = async () => {
        let result, result1, result2, result3;
        let index;
        let points = 0.0;
        let armyMonthes = 0;
        let gender = '';
        let familyStatus = '';

        result = await SecureStore.getItemAsync('isCitizen');
        if (result === 'true') {
            points+=2.25;
            armyMonthes = 23;
            result = await SecureStore.getItemAsync('gender');
            gender = result;
            if (result === 'woman') {
                points+=0.5;
                armyMonthes = 22;
            }
            result = await SecureStore.getItemAsync('birthDay');
            if (result) {
                if (yearsDiffFromNow(result) <= 18) {
                    points+=1.0;
                }
            }
            result = await SecureStore.getItemAsync('familyStatus');
            familyStatus = result;
            if (result === 'married') {
                result1 = await SecureStore.getItemAsync('spouseBirthDay');
                if (result1) {
                    if (yearsDiffFromNow(result1) <= 18) {
                        points+=1.0;
                    }
                }
            }
            result = await SecureStore.getItemAsync('degreeDate');
            if (result) {
                if (yearsDiffFromNow(result) <= 1) {
                    points+=1.0;
                }
            }
            result = await SecureStore.getItemAsync('armyStopDate');
            if (result) {
                if (yearsDiffFromNow(result) <= 3) {
                    result1 = await SecureStore.getItemAsync('armyStartDate');
                    result2 = await SecureStore.getItemAsync('armyStopDate');
                    if (result1 && result2) {
                        result3 = monthesDiff(result2, result1);
                        if (result3 >= 12) {
                            points+=1.0;
                        }
                        if (result3 >= armyMonthes) {
                            points+=1.0;
                        }
                    }
                }
            }
            result = await SecureStore.getItemAsync('immigrationDate');
            if (result) {
                result1 = yearsDiffFromNow(result);
                if (result1 <= 1) {
                    points+=0.25;
                } else if (result1 <= 2) {
                    points+=0.1666;
                } else if (result1 <= 3) {
                    points+=0.0833;
                }
            }
            index = 0;
            while (result = await SecureStore.getItemAsync(`childMyHold${index}`)) {
                result1 = yearsDiffFromNow(result);
                if (result1 === 0) {
                    points+=1.5;
                    if (familyStatus === 'widower') {
                        points+=1.5;
                    }
                } else if ((result1 >= 1) && (result1 <= 5)) {
                    points+=2.5;
                    if (familyStatus === 'widower') {
                        points+=2.5;
                    }
                } else if (result1 < 18) {
                    if (gender === 'woman') {
                        points+=1.0;
                    }
                    if (familyStatus === 'widower') {
                        points+=1.0;
                    }
                } else if (result1 === 18) {
                    if (gender === 'woman') {
                        points+=0.5;
                    }
                    if (familyStatus === 'widower') {
                        points+=0.5;
                    }
                }
                index+=1;
            }
            result = await SecureStore.getItemAsync('isChildrenFoods');
            if (result === 'true') {
                points+=1.0;
            } else {
                index = 0;
                while (result = await SecureStore.getItemAsync(`childNotMyHold${index}`)) {
                    result1 = yearsDiffFromNow(result);
                    if (result1 === 0) {
                        points+=1.5;
                    } else if ((result1 >= 1) && (result1 <= 5)) {
                        points+=2.5;
                    } else if ((result1 < 18) && (gender === 'woman')) {
                        points+=1.0;
                    } else if ((result1 === 18) && (gender === 'woman')) {
                        points+=0.5;
                    }
                    index+=1;
                }
            }
            result = await SecureStore.getItemAsync('isSpouseFoods');
            if (result === 'true') {
                points+=1.0;
            }

        } else {
            result = await SecureStore.getItemAsync('work');
            if (result === 'nurse') {
                points+=2.25;
            } else {
                points+=1.0;
            }
            result = await SecureStore.getItemAsync('gender');
            if (result === 'woman') {
                points+=0.5;
            }
        }

        setTaxPoints(points.toFixed(2));
    };

    const calcSalary = async () => {
        let result;
        let sum = 0.0;

        let salaryBasic = 0.0;
        let extraMonth = 0.0;
        let extraDay = 0.0;

        let daysWork = 0;
        let hours100 = 0.0;
        let hours125 = 0.0;
        let hours150 = 0.0;
        let hours175 = 0.0;
        let hours200 = 0.0;

        let daysVacation = 0;

        let daysSick = 0;
        let daySick1 = 0.0;
        let daySick2 = 0.0;
        let daySick3 = 0.0;

        result = await SecureStore.getItemAsync('salary');
        if (result) {
            salaryBasic = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('extraMonth');
        if (result) {
            extraMonth = parseFloat(result);
        }
        result = await SecureStore.getItemAsync('extraDay');
        if (result) {
            extraDay = parseFloat(result);
        }

        result = await SecureStore.getItemAsync('isMonthly');
        if (result === 'true') {
            sum+=salaryBasic;
            sum+=extraMonth;
        } else {
            result = await SecureStore.getItemAsync('daysWork');
            if (result) {
                daysWork = parseInt(result);
            }
            result = await SecureStore.getItemAsync('hours100');
            if (result) {
                hours100 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours125');
            if (result) {
                hours125 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours150');
            if (result) {
                hours150 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours175');
            if (result) {
                hours175 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('hours200');
            if (result) {
                hours200 = parseFloat(result);
            }

            result = await SecureStore.getItemAsync('daysVacation');
            if (result) {
                daysVacation = parseInt(result);
            }

            result = await SecureStore.getItemAsync('daysSick');
            if (result) {
                daysSick = parseInt(result);
            }
            result = await SecureStore.getItemAsync('daySick1');
            if (result) {
                daySick1 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('daySick2');
            if (result) {
                daySick2 = parseFloat(result);
            }
            result = await SecureStore.getItemAsync('daySick3');
            if (result) {
                daySick3 = parseFloat(result);
            }

            sum+=(salaryBasic*hours100);
            sum+=(salaryBasic*1.25*hours125);
            sum+=(salaryBasic*1.5*hours150);
            sum+=(salaryBasic*1.75*hours175);
            sum+=(salaryBasic*2.0*hours200);

            sum+=(daysWork*extraDay);
            sum+=extraMonth;

            sum+=(salaryBasic*9.0*daysVacation);

            if (daysSick >= 1) {
                sum+=(salaryBasic*9.0*(daySick1/100));
            }
            daysSick-=1;
            if (daysSick >= 1) {
                sum+=(salaryBasic*9.0*(daySick2/100));
            }
            daysSick-=1;
            if (daysSick >= 1) {
                sum+=(salaryBasic*9.0*(daySick3/100));
            }
            daysSick-=1;
            if (daysSick >= 1) {
                sum+=(salaryBasic*9.0*daysSick);
            }
        }

        setSalary(sum.toFixed(2));
    };

    const calcValuation = async () => {
        let result;
        let sum = 0.0;

        result = await SecureStore.getItemAsync('car');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('phone');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('food');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('insurance');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('present');
        if (result) {
            sum+=parseFloat(result);
        }
        result = await SecureStore.getItemAsync('otherValuation');
        if (result) {
            sum+=parseFloat(result);
        }

        setValuation(sum.toFixed(2));
    };

    useEffect(() => {
        calcTaxPoints();
        calcSalary();
        calcValuation();
        const unsubscribe = navigation.addListener('focus', () => {
            calcTaxPoints();
            calcSalary();
            calcValuation();
        });
        return unsubscribe;
    }, [navigation]);

    const config = () => {
        navigation.navigate('Config');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <SafeAreaView style={styles.saveArea}>
                    <ScrollView>
                        <Text>{taxPoints}</Text>
                        <Text>{salary}</Text>
                        <Text>{valuation}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <View style={styles.bottomContainer}>
                <ConfigButton callback={config} title={i18n.t('configBtn')} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default Home;
