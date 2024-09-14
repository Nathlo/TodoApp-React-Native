import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { ActivityIndicator, Text, Button, TextInput, List } from 'react-native-paper';
import { styles } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);  // Tâches locales
  const [todos, setTodos] = useState([]);  // Tâches de l'API
  const [loading, setLoading] = useState(true);

  const addTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, {
        id: `local-${tasks.length + 1}`, // Assure une clé unique pour les tâches locales
        name: task,
        local: true  // Pour distinguer entre les tâches locales et API
      }]);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Fonction pour récupérer les données depuis l'API JSONPlaceholder
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      const formattedTodos = data.slice(0, 10).map(todo => ({
        id: `api-${todo.id}`,  // Assure une clé unique pour les tâches de l'API
        name: todo.title,
        local: false  // Pour distinguer entre les tâches locales et celles de l'API
      }));
      setTodos(formattedTodos);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  // Fusionner les tâches locales et celles de l'API
  const combinedTasks = [...tasks, ...todos];

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Ma Liste de Tâches</Text>

      <TextInput  
        label="Nouvelle tâche"
        value={task}
        onChangeText={(text) => setTask(text)}
        mode="outlined"
        style={styles.input}
      />

      <Button 
        mode="contained"
        onPress={addTask}
        style={styles.addButton}>
          Ajoutez une tâche
      </Button>

      {/* Utiliser une seule FlatList pour toutes les tâches */}
      <FlatList 
        data={combinedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <List.Item  
            title={item.name}
            right={() => (
              item.local ? (
                <Icon  
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => deleteTask(item.id)}
                />
              ) : (
                <Icon  
                  name="delete"
                  size={24}
                  color="gray"
                />
              )
            )}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default App;