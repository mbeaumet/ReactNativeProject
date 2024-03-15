import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, SafeAreaView, Button, Alert, ImageBackground, TouchableOpacity} from 'react-native';
import {Modal, Title} from 'react-native-paper';
import {FontAwesome as Icon} from 'react-native-vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  // Ajout de l'image de fond 
  const image = {uri: 'https://cdn.shopify.com/s/files/1/0287/6738/7780/files/22.jpg?v=1619602571'};
  const [newTask, setNewTask] = useState('');
  const [valeurInput, setValeurInput] = useState('');

  // Liste des tache qui seront afficher au lancement de l'application
  const [sampleGoals,setSampleGoals] = useState( [
    "1.Faire les courses",
    "2.Aller à la salle de sport 3 fois par semaine",
    "3.Monter à plus de 5000m d'altitude",
    "4.Acheter mon premier appartement",
    "5.Perdre 5 kgs",
    "6.Gagner en productivité",
    "7.Apprendre un nouveau langage",
    "8.Faire une mission en freelance",
    "9.Organiser un meetup autour de la tech",
    "10.Faire un triathlon",
  ]);
  
  // Constante qui a pour but de permettre d'afficher dans une les item de la liste
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item}</Text>
      {/*  Icone de poubelle comme bouton pour la supression d'élément */}
      <Icon name="trash" size={30} color="#900"></Icon> 
    </View> 
  );

  return (
    //  Affichage de l'image de fond 
    <ImageBackground source={image} resizeMode="cover" style={styles.imageContainer}>
        <View style={{marginTop:20}}>        
          <Title>To Do List</Title>
        </View> 
          {/* Balise permettant d'afficher les éléments sous forme de liste */}
          <FlatList data={sampleGoals} renderItem={renderItem} />
          
          {/* Affiche sur une ligne une zone de texte et le bouton d'ajout d'une nouvelle task */}
          <View style={styles.rowContainer}>
            <TextInput
                placeholder="Qu'elle nouvelle tache voulez vous ajoutez ?"
                value={valeurInput}
                onChangeText={e => setValeurInput(e)}
                style={styles.input}
            />
              <Button
                title="Add"
                onPress={() => {
                  setSampleGoals((goals) => [...goals, sampleGoals.length+1+"."+valeurInput]);
                }}
              />
          </View>
        <StatusBar style="auto" />
      </ImageBackground>
  );
}
// Constante permettant d'ajouter du style sur l'application mpobile 
const styles = StyleSheet.create({
  container: {
    textAlign:"center",
    marginTop: 50,
  },
  Text: {
    fontSize: 24,
    textAlign: "center",
  },
  imageContainer: {
    flex:1,
  },
  rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
    },
  });