import React, {Component, useState} from 'react';
import {StyleSheet, View, Button, Text, ActivityIndicator} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [data, setData] = useState([]);
  const kelvinToCelsius = require('kelvin-to-celsius');

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        getCurrentWeather([pos.coords.latitude, pos.coords.longitude]);
      },
      (e) => setError(e.message),
    );
  };

  const getCurrentWeather = (props) => {
    const latt = props[0];
    const longg = props[1];
    return fetch(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        latt +
        '&lon=' +
        longg +
        '&appid=d1f279c12df868b557e60a2ca33cff3c',
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Button title="Get Current Position" onPress={getPosition} />
      {error ? (
        <Text>Error retrieving current position</Text>
      ) : (
        <>
          <Text>Latitude: {position.latitude}</Text>
          <Text>Longitude: {position.longitude}</Text>
        </>
      )}
      {/* {console.log(data.main)} */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View>
          <Text>{kelvinToCelsius(data.main.temp)}</Text>
          <Text>{data.main.temp}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: '500',
  },
});
