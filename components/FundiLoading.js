import { useState, useEffect,  } from 'react';
import React from 'react';
import { View, ActivityIndicator, Text, BackHandler, Alert } from 'react-native';
import { db } from '../Database/config';

function FundiLoadingScreen({navigation, route}) {
  const [currentuserProblem, setCurrentUserProblem] = useState(route.params.currentuserProblem);
  const [remainingTime, setRemainingTime] = useState(300); 


  useEffect(() => {
    const itemRef = db.collection('FundiIssues').doc(currentuserProblem);
  
    // Create a flag to track whether the status changed
    let statusChanged = false;
  
    const unsubscribe = itemRef.onSnapshot((doc) => {
      if (doc.exists) {
        const selectedOrderData = doc.data();
        if (selectedOrderData.status === 'Pending Delivery') {
          statusChanged = true; // Set the flag to true when status changes
          navigation.navigate('QuoteScreen', { currentuserProblem });
        }
      }
    });
  
    // Set a timeout to delete the document if the status didn't change
    const timeout = setTimeout(() => {
      if (!statusChanged) {
        // Status didn't change, so delete the document
        itemRef.delete()
          .then(() => {
            console.log('Document deleted because status did not change within one minute.');
            Alert.alert("Sorry!! We are unable to find a find a fundi now. Try again later");
            navigation.navigate('HomeScreen');
          })
          .catch((error) => {
            console.error('Error deleting document:', error);
          });
      }
    }, 300000); // 5 minutes
  
    return () => {
      unsubscribe();
      clearTimeout(timeout); // Clear the timeout when the component unmounts
    };
  }, [currentuserProblem, navigation]);
  

  // Inside your screen component
useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    // Return true to prevent navigation
    return true;
  });

  return () => backHandler.remove();
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#17304A' }}>
      <ActivityIndicator size="large" color="#8CC740" />
      <Text style={{color:'white', fontSize:20}}>We are looking for a fundi for you!</Text>
      <Text style={{color:'white', fontSize:25}}>Please be patient.</Text>
      <Text style={{ color: 'red', fontSize: 20 }}>
        {`Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
      </Text>
    </View>
  );
}

export default FundiLoadingScreen;
