import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native'
import { ActivityIndicator, Text, Button, TextInput, List, Appbar, FAB } from 'react-native-paper'
import { styles } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

// Fonction pour récupérer les données depuis l'API JSOPlaceholder
const fetchTodos = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    setTodos(data);
    setLoading(false);
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    setLoading(false);
  }
};

// Utiliser UseEffect pour récupérer les données lors du montage du composant
useEffect( () => {
  fetchTodos();
}, []);

if (loading) {
  return (
    <View style={styles.loadingContaier}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
}


  return (

    <SafeAreaView style={styles.container}>

      <Text 
        style={styles.title}>
          Ma Liste de Tâches
      </Text>

      <TextInput  
        label="Nouvelle tâche"
        value={task}
        onChangeText={ (text) => setTask(text)}
        mode="outlined"
        style={styles.input}
      />

      <Button 
        mode="contained"
        onPress={addTask}
        style={styles.addButtton}>
          Ajoutez une tâche
      </Button>

      <FlatList 
        data={tasks}
        keyExtractor={ (item) => item.id.toString() }
        renderItem={ ({item}) => (
          <List.Item  
            title={item.name}
            right={ () => (
              <Icon  
                name="delete"
                size={24}
                color="red"
                onPress={ () => deleteTask(item.id)}
              />
            )}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default App