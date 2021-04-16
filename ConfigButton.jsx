import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'blue',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 1,
    },
});

const ConfigButton = ({ callback, title }) => {

    return (
        <View style={styles.item}>
            <Button onPress={callback} title={title} color='blue' />
        </View>
    );
}


export default ConfigButton;
