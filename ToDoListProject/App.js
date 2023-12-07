import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {Title} from 'react-native-paper';

const sampleGoals = [
  "Faire les courses",
  "Aller à la salle de sport 3 fois par semaine",
  "Monter à plus de 5000m d'altitude",
  "Acheter mon premier appartement",
  "Perdre 5 kgs",
  "Gagner en productivité",
  "Apprendre un nouveau langage",
  "Faire une mission en freelance",
  "Organiser un meetup autour de la tech",
  "Faire un triathlon",
];
// L'ajout de nouveau items de la liste 
// La modification des items de la liste 
// la suppression d'un item de la liste 
// Création d'une modale 
// l'affichage des items de la liste 
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text>{item}</Text>
    {/* Bouton de suppression */}
  </View>
);

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};



export default function App() {

  const handleButtonPress = () => {
    // Code à exécuter lorsque le bouton est pressé
    Alert.alert('Bouton pressé !');
  };
  return (
    <View style={styles.container}>
      {/* Ajout d'une image de fond */}
      <Title>To Do List</Title>
      <FlatList data={sampleGoals} renderItem={renderItem} />

      {/* Affichage en ligne */}
      <TextInput
        placeholder="Qu'elle nouvelle tache voulez vous ajoutez ?"
        // keyboardType="alphabetic"
        onPress={() => console.log("Test")}
      />
      <Button title="Add" onPress={handleButtonPress()}/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign:"center",
    marginTop: 50,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  Text: {
    fontSize: 24,
    textAlign: "center",
  },

  input: {
    height: 40,
    marginTop: 200,
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
});
