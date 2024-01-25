import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, ScrollView } from 'react-native';
import * as Location from 'expo-location';
// import momant from 'momant';

export default function App() {

  // const axios = require(axios);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dataResponseName, setDataResponseName] = useState(null);
  const [dataResponseTemp,setDataResponseTemp] = useState(null);
  const [dataResponseDescription,setDataDescription] = useState(null);
  const [DataIconWeather,setDataIconWeather] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [DataResponseTempPast, setDataResponseTempPast] = useState(null);


  const [dataResponseNamePast,setDataResponseNamePast] = useState(null);
  // const [dataList,setDataList] = useState(null);
  // const [dataWeatherTempPre,setDataWeatherTempPre]= useState(null);
  // const [ForecastData,setForecastData]=useState([]);
  const apiKey = `2f071855ca5ff35e7177e187257888e3`

  // Récupération de la localisation de la personne 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    })();
  }, []);

// Récupération des données météo en direct 
useEffect(() => {
  if (latitude != null && longitude != null) { // Si la latitude et la longitude sont différentes de null 

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setDataResponseName(data.name);
        setDataResponseTemp(data.main.temp);
        setDataDescription(data.weather[0].description);
        setDataIconWeather(data.weather[0].icon);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données météorologiques:", error);
      });
  }
}, [latitude, longitude, apiKey]);


    
// }, [latitude,longitude])

// Prévisionnel : Valeur prévisionnel de la météo avec l'utilisationn de Forecast
function fetchForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

  axios.get(forecastUrl)
    .then(function(response) {
      setForecastData(response.config.main);   
      setDataResponseNamePast(response.name);
      setDataResponseTempPast(response.main.temp);        
    })
    .catch(function(error) {
      console.error('Erreur lors de la récupération des données de prévision:', error);
    });
}

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // Style de l'application 
  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#AEF6F4',
      padding: 15,
      alignItems: 'center',
      size:15,
      fontWeight:'bold',
    },
    title: {
      marginTop:15,
    },
    value:{
      marginRight:10,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    preview: {
      flexDirection:'row',
      justifyContent: 'space-around',
      marginRight:10,
    }

  })

 return (
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>Weather App</Text>
    </View>
    <View style={styles.container}>
      <Text>{dataResponseName}</Text>
      <Text>{dataResponseTemp} ° C</Text>
      <Text>{dataResponseDescription}</Text>
      <Image source={{uri: `http://openweathermap.org/img/wn/${DataIconWeather}.png`}}></Image>
    </View>
    <View>
      <Text>Météo Actuel :</Text>
      <Text style={styles.value}>{dataResponseName}</Text>
      <Text>{dataResponseTemp} ° C</Text>
      <Text>{dataResponseDescription}</Text>
    </View>
    <View>
    <Text>Prévisionel :</Text>
      <Text style={styles.value}>{dataResponseNamePast}</Text>
      <Text>{DataResponseTempPast}</Text>
      <Text>{weatherData.name}</Text>
    </View>
</View>
)}