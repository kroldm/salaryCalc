import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        width: 200,
        height: 50,
        borderWidth: 1,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 20,
        color: 'black',
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigInput = ({ callback, value, text }) => {

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={callback} value={value} placeholder={value} keyboardType='numeric'/>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}


export default ConfigInput;
