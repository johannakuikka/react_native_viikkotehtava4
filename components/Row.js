import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

export default function Row({ item, toggleTask }) {
    return (
        <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <Text style={[styles.text, item.done && styles.doneText]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        padding: 8,
    },
    doneText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});