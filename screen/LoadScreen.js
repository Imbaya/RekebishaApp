import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground
        source={require('../assets/4k-background.png')}
        resizeMode="cover"
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />

      </ImageBackground>
    </View>
  );
}

export default LoadingScreen;
