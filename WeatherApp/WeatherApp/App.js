import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

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
  const [list, setList] = useState([]);
  const [DataResponseTempPast,setDataResponseTempPast] = useState(null);
  const [weatherData, setWeatherData] = useState(null);


  const [dataResponseNamePast,setDataResponseNamePast] = useState(null);
  const [dataList,setDataList] = useState(null);
  const [dataWeatherTempPre,setDataWeatherTempPre]= useState(null);
  const [ForecastData,setForecastData]=useState([]);
  const apiKey = `86be9fd2c35ac6c7cdfdef1ca030a3f0`

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

useEffect(() => {
  if (latitude != null && longitude != null){
    // Mettre un loader ici 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang={fr}&units=metric&appid=${apiKey}`)
    .then (response =>  response.json())
    .then(response => {console.log(response);return response})
    .then (response => {setDataResponseName(response.name); return (response)})
    .then (response => {setDataResponseTemp(response.main.temp); return (response)})
    .then(response => {setDataDescription(response.weather[0].description); return(response)})
    .then(response => {setDataIconWeather(response.weather[0].icon); return(response)})
  }

}, [latitude,longitude])

// Prévisionnel : 
function fetchForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

  axios.get(forecastUrl)
    .then(function(response) {
      console.log(response.response)
      setForecastData(response.config.main);     
    })
    .catch(function(error) {
      console.error('Erreur lors de la récupération des données de prévision:', error);
    });
}
  // console.log(fetchForecast("45.750000","4.850000"));

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  if ({DataIconWeather} != null){
    // console.log(dataResponseNamePast)
    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>

        <Text style={styles.value}>{dataResponseName}</Text>
        <Text>{dataResponseTemp} ° C</Text>
        <Text>{dataResponseDescription}</Text>
        <Image style={styles.iconWeather} source={{uri: `http://openweathermap.org/img/wn/${DataIconWeather}.png`}}></Image>
      
        <Text>Prévisionel :</Text>
        <Text style={styles.value}>{dataResponseNamePast}</Text>
        {/* <Text>{DataResponseTempPast}</Text> */}
        {/* <Text>{weatherData.name}</Text> */}
      {/* <Text>{weatherData.main.temp}°C</Text> */}
      
      </View>
      
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  iconWeather: {
    width:100,
    height:100,
  }
})
