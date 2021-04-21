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

    const config = () => {
        navigation.navigate('Config');
    };

    const calcTaxPoints = async () => {
        let result, result1, result2, result3;
        let points = 0.0;
        let armyMonthes = 0;
        result = await SecureStore.getItemAsync('isCitizen');
        if (result === 'true') {
            points+=2.25;
            armyMonthes = 23;
            result = await SecureStore.getItemAsync('gender');
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
            if (result === 'married') {
                result1 = await SecureStore.getItemAsync('spouseBirthDay');
                if (result1) {
                    if (yearsDiffFromNow(result1) <= 18) {
                        points+=1.0;
                    }
                }
            }
            result = await SecureStore.getItemAsync('isSpouseFoods');
            if (result === 'true') {
                points+=1.0;
            }
            result = await SecureStore.getItemAsync('isChildrenFoods');
            if (result === 'true') {
                points+=1.0;
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

    useEffect(() => {
        calcTaxPoints();
        const unsubscribe = navigation.addListener('focus', () => {
            calcTaxPoints();
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <SafeAreaView style={styles.saveArea}>
                    <ScrollView>
                        <Text>{taxPoints}</Text>
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
