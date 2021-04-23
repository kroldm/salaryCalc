import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    value: {
        fontSize: 20,
        color: 'black',
        marginLeft: 10,
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigOutput = ({ value, text }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}


export default ConfigOutput;
