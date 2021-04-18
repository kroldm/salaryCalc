import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import i18n from 'i18n-js';
import ConfigButton from './ConfigButton';
import ConfigHours from './ConfigHours';
import ConfigSalary from './ConfigSalary';
import ConfigSick from './ConfigSick';
import ConfigVacation from './ConfigVacation';
import ConfigValuation from './ConfigValuation';
import ConfigTax from './ConfigTax';
import ConfigBtl from './ConfigBtl';
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

    const hours = () => {
        setConfig('hours');
    };
    const salary = () => {
        setConfig('salary');
    };
    const sick = () => {
        setConfig('sick');
    };
    const vacation = () => {
        setConfig('vacation');
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

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                {config === 'salary' ? <ConfigSalary /> : 
                (config === 'valuation' ? <ConfigValuation /> : 
                (config === 'work' ? <ConfigWork /> : 
                (config === 'worker' ? <ConfigWorker /> : 
                (config === 'btl' ? <ConfigBtl /> : 
                (config === 'hours' ? <ConfigHours /> : 
                (config === 'sick' ? <ConfigSick /> : 
                (config === 'vacation' ? <ConfigVacation /> : 
                (config === 'tax' ? <ConfigTax /> : null))))))))}
            </View>
            <View style={styles.bottomContainer}>
                <ScrollView horizontal>
                    <ConfigButton callback={hours} title={i18n.t('hoursBtn')} />
                    <ConfigButton callback={salary} title={i18n.t('salaryBtn')} />
                    <ConfigButton callback={sick} title={i18n.t('sickBtn')} />
                    <ConfigButton callback={vacation} title={i18n.t('vacationBtn')} />
                    <ConfigButton callback={valuation} title={i18n.t('valuationBtn')} />
                    <ConfigButton callback={tax} title={i18n.t('taxBtn')} />
                    <ConfigButton callback={btl} title={i18n.t('btlBtn')} />
                    <ConfigButton callback={work} title={i18n.t('workBtn')} />
                    <ConfigButton callback={worker} title={i18n.t('workerBtn')} />
                </ScrollView>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


export default Config;
