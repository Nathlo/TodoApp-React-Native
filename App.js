import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { styles } from './style'


const App = () => {
  const [task, setTask] = useState('');

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

      
    </SafeAreaView>


  )
}

export default App