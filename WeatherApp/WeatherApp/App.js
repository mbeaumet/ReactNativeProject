import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = 'bc803e1493a794df6a5e8887f9da8974';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  useEffect(() => {
    if (latitude != null && longitude != null) {
      fetchWeatherData();
      fetchForecast();
    }
  }, [latitude, longitude, apiKey]);

  const fetchWeatherData = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          lang: 'fr',
          units: 'metric',
          appid: apiKey,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.cod === 200) {
          setCurrentWeather({
            name: data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        } else {
          setErrorMsg(`Error fetching current weather: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
      });
  };

  const fetchForecast = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: apiKey,
          units: 'metric',
          lang: 'fr',
        },
      })
      .then((response) => {
        const data = response.data;
        console.log({data})
        if (data.cod === '200' && data.list) {
          const nextFiveDays = data.list.slice(0, 5);
          setForecast(nextFiveDays);
        } else {
          setErrorMsg(`Error fetching forecast: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de prévision:', error);
      });
  };
  console.log({forecast})
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Weather App</Text>
      </View>
      <View style={styles.container}>
        <Text>{currentWeather?.name}</Text>
        <Text>{currentWeather?.temp} ° C</Text>
        <Text>{currentWeather?.description}</Text>
        <Image source={{ uri: `http://openweathermap.org/img/wn/${currentWeather?.icon}.png` }} style={styles.weatherIcon} />
      </View>
      <View style={styles.forecastContainer}>
        <Text>Prévisionnel pour les 5 prochains jours :</Text>
        {forecast.map((day, index) => (
          <View key={index} style={styles.container}>
            <Text>{currentWeather?.name}</Text>
            <Text>{day.dt_txt}</Text>
            <Text>{day.main.temp} ° C</Text>
            <Image source={{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png` }} style={styles.weatherIcon} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#AEF6F4',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
  },
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  forecastContainer: {
    alignItems: 'center', 
    marginTop: 20, 
    margin: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});
