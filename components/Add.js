import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Add({ add }) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.form} value={name} onChangeText={text => setName(text)} placeholder='Enter task'
            />
            <Pressable onPress={save}>
                <Text style={styles.saveText}>Save</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16
    },
    form: {
        flex: 1,                  
        padding: 10,              
        marginRight: 10,          
    },
    saveText: {
        color: '#007BFF',
        fontSize: 16,
    },
});