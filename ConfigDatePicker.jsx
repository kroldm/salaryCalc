import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 20,
        color: 'blue',
    },
});

const ConfigDatePicker = ({ id, callback, value, text }) => {

    const [show, setShow] = useState(false);
    const showDatePicker = () => setShow(true);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || value;
        setShow(false);
        callback(currentDate, id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Button onPress={showDatePicker} title={`${value.getDate().toString()}/${(value.getMonth()+1).toString()}/${value.getFullYear().toString()}`} color='black' />
            {show &&
                <DateTimePicker
                    value={value}
                    onChange={onChange}
                />}
        </View>
    );
}


export default ConfigDatePicker;
