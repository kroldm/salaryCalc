import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from 'react-native-check-box'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    checkbox: {
        marginLeft: 10,
    },
    text: {
        fontSize: 18,
        color: 'blue',
    },
});

const ConfigCheck = ({ callback, value, text }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <CheckBox isChecked={value} onClick={() => callback(!value)} style={styles.checkbox} />
        </View>
    );
}


export default ConfigCheck;
