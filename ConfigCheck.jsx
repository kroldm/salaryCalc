import React from 'react';
import { StyleSheet, View, CheckBox, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    checkbox: {
        alignSelf: "center",
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigCheck = ({ callback, value, text }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <CheckBox value={value} onValueChange={callback} style={styles.checkbox} />
        </View>
    );
}


export default ConfigCheck;
