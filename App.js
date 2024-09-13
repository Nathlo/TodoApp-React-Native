import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { styles } from './style'


const App = () => {
  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Ma Liste de Tâches</Text>

      <TextInput  
        style={styles.input}
      
      
      />

      <Button style={styles.addButtton}>
        Ajoutez une tâche
      </Button>

    </SafeAreaView>


  )
}

export default App