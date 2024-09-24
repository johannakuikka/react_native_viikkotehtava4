import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Row from './components/Row';
import Add from './components/Add';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'

const generateId = () => {
  return Date.now().toString();
};

export default function App() {
  const [data, setData] = useState([])
  const add = useCallback((name) => {
    const newItem = {
      id: generateId(),
      name: name,
      done: false
    }
    const tempData = [...data,newItem]
    setData(tempData)
  }, [data])

  useEffect(() => {
    //AsyncStorage.clear()
    getData()
  }, [])
  
  useEffect(() => {
    storeData(data)
  }, [data])

  const toggleTask = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setData(json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async(value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY,json)
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo list</Text>
      <Add add={add} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Row item={item} toggleTask={toggleTask}/>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    alignSelf: 'center',  
    marginBottom: 20, 
    fontWeight: 'bold'    
  },
  listContainer: {
    alignItems: 'flex-start'
  }
});
