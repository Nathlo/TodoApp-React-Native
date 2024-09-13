import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { styles } from './style'


const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  return (

    <SafeAreaView style={styles.container}>

      <Text 
        style={styles.title}>
          Ma Liste de Tâches
      </Text>

      <TextInput  
        label="Nouvelle tâche"
        value={task}
        mode="outlined"
        style={styles.input}
      />

      <Button 
        mode="contained"
        style={styles.addButtton}>
          Ajoutez une tâche
      </Button>

      <FlatList 
        data={task}
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


  )
}

export default App