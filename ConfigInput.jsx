import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    input: {
        width: 150,
        height: 50,
        borderWidth: 1,
        textAlign: 'center',
        marginLeft: 10,
        fontSize: 18,
        color: 'black',
    },
    text: {
        fontSize: 18,
        color: 'blue',
    },
});

const ConfigInput = ({ callback, value, text }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TextInput style={styles.input} onChangeText={callback} value={value} placeholder={value} keyboardType='numeric'/>
        </View>
    );
}


export default ConfigInput;
