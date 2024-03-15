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
  const apiKey = `123d1e4d375366e2f26a9005f945d865`

  // Recuperation des datas de prévisualisation : 
  const [PreviTemp,setPreviTemp] = useState([])
  const [TypeTime, SetTypeTime] = useState(null)

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

// Pour la prévision essayer de mettre ca dans un use effect 
useEffect(() => {
  if (latitude != null && longitude != null){
    // Mettre un loader ici 
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang={fr}&units=metric&appid=${apiKey}`)
    .then (response =>  response.json())
    .then(response => {return response})
    .then (response => {setDataResponseName(response.name); return (response)})
    .then (response => {setDataResponseTemp(response.main.temp); return (response)})
    .then(response => {setDataDescription(response.weather[0].description); return(response)})
    .then(response => {setDataIconWeather(response.weather[0].icon); return(response)})


    // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`)
    // .then (response =>  response.json())
    // const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;
    // console.log(forecastUrl)
    
    // const response = await(fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`))
    // const data = await response.json();
    // setForecastData(data.list);
    
    // .then(response =>response.json())
    // .then(data => [
    //   console.log(data.list.main)
    // ])
    // .then(data => {
    //   // Utiliser les données ici
    // data.list.forEach(item => {
        // {setPreviTemp.append(item.main.temp)}
        // console.log({PreviTemp})
        // console.log(item.main.temp)
        // setList((item) => [...list, item.main])
        // console.log(item.weather.main) // Type de temps et pour l'icone c'est avec un .icon en plus 
        // console.log(item.dt_txt,item.main.temp); // date et heure du time + température 
      // });
    //   // dataList.map((item) => {
    //   //   // Assuming 'item.main.temp' is a valid property
    //   //   setList((list) => [...list, item.main.temp]);
    //   //   // Other logic related to 'item' can be added here
    //   // });
    // })
    // .catch(error => {
    //   console.error('Erreur lors de la récupération des données:', error);
    // });
  }
}, [latitude,longitude])

// useEffect(() => {
//   const fetchForecast = async () => {
//     try {
//       if (latitude && longitude) {
//         const response = await fetch(
//           'https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr'
//         );
//         const data = await response.json();
//         setForecastData(data.list);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchForecast();
// }, [latitude,longitude]);

// console.log(ForecastData)
// console.log(PreviTemp)
// useEffect(() => {
//     axios.get('')
//     .then(function(response) {
//       console.log("Response prevision :",response.response)
//       console.log(response.response)
//       setForecastData(response.config.main);     
//     })
//     .catch(function(error) {
//       console.error('Erreur lors de la récupération des données de prévision:', error);
//     });
//   })

// Prévisionnel : 
// function fetchForecast(lat,lon,apiKey) {
//   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${45.7688167}&lon=${4.8593558}&appid=${'123d1e4d375366e2f26a9005f945d865'}&units=metric&lang=fr`)
//   .then (response =>  response.json())
// }


// console.log(longitude)
// console.log(latitude)
// console.log(apiKey)

// console.log(  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${45.7688167}&lon=${4.8593558}&appid=${'123d1e4d375366e2f26a9005f945d865'}&units=metric&lang=fr`)
// .then (response =>  response.json()))



  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // if ({DataIconWeather} != null){
    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>

        <Text style={styles.value}>{dataResponseName}</Text>
        <Text>{dataResponseTemp} ° C</Text>
        <Text>{dataResponseDescription}</Text>
        <Image style={styles.iconWeather} source={{uri: `http://openweathermap.org/img/wn/${DataIconWeather}.png`}}></Image>
      
        <Text>Prévisionel :</Text>
        <Text style={styles.value}>{dataResponseNamePast}</Text>      
      </View>
      
    );
  }

// }
// Constante permettant d'ajouter du style sur l'application mpobile 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    marginBottom: 5,
  },
  iconWeather: {
    width: 50,
    height: 50,
  },
});