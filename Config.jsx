import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import ConfigButton from './ConfigButton';
import ConfigSalary from './ConfigSalary';
import ConfigValuation from './ConfigValuation';
import ConfigWork from './ConfigWork';
import ConfigWorker from './ConfigWorker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flex: 4,
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
});

const Config = () => { 

    const [config, setConfig] = useState('');

    const salary = () => {
        setConfig('salary');
    };
    const valuation = () => {
        setConfig('valuation');
    };
    const tax = () => {
        setConfig('tax');
    };
    const btl = () => {
        setConfig('btl');
    };
    const work = () => {
        setConfig('work');
    };
    const worker = () => {
        setConfig('worker');
    };
    const other = () => {
        setConfig('other');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                {config === 'salary' ? <ConfigSalary /> : 
                (config === 'valuation' ? <ConfigValuation /> : 
                (config === 'work' ? <ConfigWork /> : 
                (config === 'worker' ? <ConfigWorker /> : null)))}
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView horizontal>
                    <ConfigButton callback={salary} title='שכר' />
                    <ConfigButton callback={valuation} title='שווי מס' />
                    <ConfigButton callback={tax} title='מס הכנסה' />
                    <ConfigButton callback={btl} title='ביטוח לאומי' />
                    <ConfigButton callback={work} title='מעביד' />
                    <ConfigButton callback={worker} title='עובד' />
                    <ConfigButton callback={other} title='כללי' />
                </ScrollView>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default Config;
