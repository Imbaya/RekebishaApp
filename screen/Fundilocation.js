import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import firebase from 'firebase';
import { dbc } from '../Database/fundiDB';

export default function FundiLocation({route}) {
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [agentid, setAgentId] = useState(route.params.agentid);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 10000,
        },
        async (location) => {
          const { latitude, longitude } = location.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setRouteCoordinates([...routeCoordinates, { latitude, longitude }]);
        }
      );
    })();

    // Replace 'agentId' with the actual agent's ID
    const docRef = dbc.collection('Location').doc(agentid);

    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setRouteCoordinates([...routeCoordinates, {
          latitude: data.location.latitude,
          longitude: data.location.longitude
        }]);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the onSnapshot listener
    return () => unsubscribe();
  }, []);

  return (
    <MapView style={{ flex: 1 }} initialRegion={location}>
      {location && (
        <>
          <Marker coordinate={routeCoordinates} />
        </>
      )}
    </MapView>
  );
}
