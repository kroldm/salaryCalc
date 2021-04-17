import React from 'react';
import { StyleSheet, View, CheckBox, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
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
            <CheckBox value={value} onValueChange={callback} style={styles.checkbox} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}


export default ConfigCheck;
