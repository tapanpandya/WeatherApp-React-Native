import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  state = {
    initialLong: '',
    initialLat: '',
    lastLong: '',
    latestLat: '',
  };

  watchID: ?number = null;

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        // const initialPosition = JSON.stringify(position);
        const initialLong = JSON.stringify(position.coords.longitude);
        const initialLat = JSON.stringify(position.coords.latitude);
        this.setState({initialLong: initialLong});
        this.setState({initialLat: initialLat});
      },
      (error) => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition((position) => {
      // const lastPosition = JSON.stringify(position);
      const latestLong = JSON.stringify(position.coords.longitude);
      const latestLat = JSON.stringify(position.coords.latitude);
      this.setState({latestLong});
      this.setState({latestLat});
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          <Text style={styles.title}>Current Longitude: </Text>
          {this.state.initialLong}
        </Text>
        <Text>
          <Text style={styles.title}>Current Latitude: </Text>
          {this.state.initialLat}
        </Text>
      </View>
    );
  }
}

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
