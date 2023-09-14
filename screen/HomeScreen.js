import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity , ImageBackground} from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../components/TitleText';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


const HomeScreen =({ navigation, route }) => {

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission to access the user's location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (


    <View style={styles.container}>
       {location ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}



      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}>

          <Card style={styles.button}>


            <TitleText style={styles.buttonText}>Request Service</TitleText>


          </Card>

        </TouchableOpacity>
      </View>


   

    </View>





  )
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flex: 1,


    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    shadowOpacity: 0.2,
  },
  buttonView: {


    zIndex: 30,
    position: 'absolute',
    bottom: 92,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,

  },

  buttonText: {
    //  fontWeight: 'bold',
    fontFamily: 'Lexend-light'

  },
  map: {
    height: "100%",
    width: "100%",
    flex:1
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},

});

export default HomeScreen;