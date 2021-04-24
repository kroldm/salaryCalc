import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from 'i18n-js';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 18,
        color: 'blue',
    },
    picker: {
        width: 150,
        height: 50,
        marginLeft: 10,
    },
});

const ConfigPicker = ({ callback, value, text, options }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Picker style={styles.picker}
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => callback(itemValue)}
            >
                {options.map((option, index) => (
                    <Picker.Item key={index} label={i18n.t(option)} value={option} />
                ))}
                </Picker>
        </View>
    );
}


export default ConfigPicker;
