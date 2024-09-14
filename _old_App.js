import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native'
import { ActivityIndicator, Text, Button, TextInput, List, Appbar, FAB } from 'react-native-paper'
import { styles } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons';


const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

const addTask = () => {
  if (task.length > 0) {
    setTasks([...tasks, {
      id: tasks.length + 1,
      name: task,
    }]);
    setTask('');
  }
};

const deleteTask = (id) => {
  setTasks(tasks.filter( (task) => task.id !== id));
}


// Fonction pour récupérer les données depuis l'API JSOPlaceholder
const fetchTodos = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    setTodos(data.slice(0, 10)); // Limite l'affichage des tâches à 10
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

      <Text style={styles.title}>Ma Liste de Tâches</Text>

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

      {/* Affichage des tâches locales */}
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

      {/* Affichage des tâches récupérées depuis l'API */}
      <Text style={styles.title}>Tâches depuis l'API</Text>
      <FlatList 
        data={todos}
        keyExtractor={ (item) => item.id.toString() }
        renderItem={ ({item}) => (
          <List.Item  
            title={item.title}
            right={ () => (
              <Icon  
                name="delete"
                size={24}
                color="gray"
                onPress={ () => console.log('Suppression non implémetter pour les tâches de l\'API') }
              />
            )}
          />
        )}
      />






    </SafeAreaView>
  );
};

export default App