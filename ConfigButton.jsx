import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 1,
    },
});

const ConfigButton = ({ callback, title }) => {

    return (
        <View style={styles.item}>
            <Button onPress={callback} title={title} />
        </View>
    );
}


export default ConfigButton;
