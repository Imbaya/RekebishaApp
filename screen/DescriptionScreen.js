import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator,Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import TitleText from '../components/TitleText';
import { Icon } from 'react-native-elements'
import BodyText from '../components/BodyText';
import * as Location from 'expo-location';
import { db, auth, storage } from '../Database/config';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

const DescriptionScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [description, setDescription] = useState("")
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [userdisplayname, setUserDisplayName] = useState('');
  const [userphonenumber, setUserPhoneNumber] = useState('');

  const navigation = useNavigation();

useEffect(() => {
  (async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } else {
        setErrorMsg('Permission to access location was denied');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  })();
}, []);

    useEffect(() => {
      getCurrentUserDetails();
        }, []);
 

  //Get the current user Profile details.
  const getCurrentUserDetails = async () => {
    const doc = await db.collection('users').doc(auth.currentUser.uid).get();

    console.log(doc.data());
    setUserDisplayName(doc.data().username);
    setUserPhoneNumber(doc.data().phonenumber)

}



  
  const data = [
    { key: '1', value: 'Mason' },
    { key: '2', value: 'Electrician' },
    { key: '3', value: 'Plumber' },
    {key: '4 ', value:'Construction Equipment Operator'},
    {key: ' 5', value:'Carpenter'},
    {key: ' 7', value:'Plumber'},
    {key: ' 8' ,value:'Welder'},
    {key: ' 9' ,value:'Locks and Doors'},
    {key: ' 10' ,value:'Roofer' },
    {key: ' 11' ,value:'Tiler'},
    {key: ' 12' ,value:'Terrazzo'},
    {key: ' 13' ,value:'Mason'},
    {key: ' 14' ,value:'Landscaper'},
    {key: ' 15' ,value:'Window/Glass/Mirror Fixer'},
    {key: ' 16' ,value:'Plasterer'},
    {key: ' 17' ,value:'Gypsum expert'},
    {key: ' 18' ,value:'Floor carpet layer'},
    {key: ' 19' ,value:'Waterproofing'},
    {key: ' 20' ,value:'Cladding/Mazeras'},
    {key: ' 21' ,value:'External paver'},
    {key: ' 22' ,value:'Parking Sheds'}

]
const handleAmountChange = (text) => {
  // Update the "amount" state when the text input changes
  setAmount(Number(text)); // Convert text to a number
};

const handleImagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setImage(result);
  }
};


const handleImageUpload = async () => {
  
  try {
    setIsSaving(true); 
    if (!image) {
      console.error('No image selected.');
      return;
    }

    const response = await fetch(image.uri);
    const blob = await response.blob();

    // Extract the file extension from the image URI
    const fileExtension = image.uri.split('.').pop();
    // Construct a unique image file name
    const imageName = `${Date.now()}.${fileExtension}`;

    // Upload the image to Firebase Storage
    const storageRef = storage.ref().child(`images/${imageName}`);
    await storageRef.put(blob);

    // Get the image download URL
    const imageUrl = await storageRef.getDownloadURL();

    // Store image details in Firestore
    const docRef = await db.collection('FundiIssues').add({
      selected,
      description,
      amount,
      client: auth.currentUser.uid,
      imageUrl,
      location,
      status: 'New Gig',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      clientNumber: userphonenumber,
      clientName: userdisplayname
    });

    // Reset the form
    setSelected('');
    setDescription('');
    setAmount(0);
    setImage(null);

    //naviagte
    navigation.navigate('FundiLoadingScreen',{ currentuserProblem: docRef.id}); 
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


    return (

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>

        {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}


        
       

           <View style={styles.iconView}>
                <Icon
                    type="material-community"
                    name="menu"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />


            </View>



            <View style={styles.gridView}>
            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   //   style={styles.container}
      >
                <Card style={styles.card}>

               

                    <SelectList
                        style={styles.dropdown}
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />


                    <BodyText style={styles.Text}>Description of your problem</BodyText>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        multiline
                        placeholder="Description"

                    />

<View style={styles.horizontal}>
<BodyText style={styles.Text}>Labour Charge</BodyText>

<View style={styles.horizontal1}>


                    <TextInput
                        style={styles.input1}
                        value={amount.toString()}
                        onChangeText={handleAmountChange}
                        keyboardAppearance='numerical'
                        placeholder="Ksh"

                    />

</View>

</View>


                    <BodyText style={styles.Text}>Upload an image/s | Take a photo</BodyText>


                    <View style={styles.imageview}>
                    {image && (
                        <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
                      )}
                    </View>

                    <Card style={styles.button}>
                    <TouchableOpacity onPress={handleImagePicker} >
                        <TitleText style={styles.Text}>Upload</TitleText>
                    </TouchableOpacity>
                    </Card>



                    <View style={styles.buttonView}>
                    {isSaving ? (
                        <ActivityIndicator size="small" color="blue" />
                      ) : (
                        <TouchableOpacity onPress={handleImageUpload} >
                            <Card style={styles.submitbutton}>
                                <TitleText style={styles.Text}>Request Service</TitleText>
                            </Card>
                        </TouchableOpacity>
                      )}

                   
                    </View>
               


                </Card>
                </KeyboardAvoidingView>

    </View>

            
        </View>
     
       </TouchableWithoutFeedback>




    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, alpha)',
        alignItems: 'center',
        justifyContent: 'center',
    },


    iconView: {
        position: "absolute",
        top: 50,
        left: 12,
        backgroundColor: '#8CC740',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },

    dropdown: {
        width: '80%',
        
    },

    flatlist: {
        paddingTop: 50,
        backgroundColor: 'transparent'
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        paddingTop: 15,
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.9,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    gridView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.8,

    },

    buttonText: {
        fontWeight: 'bold',

    },

    input: {
        width: '80%',
        borderColor: 'white',
        height: '20%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8
    },

    input1: {
      width: 100,
      borderColor: 'white',
      height: 35,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8
  },


    buttonText: {
        fontWeight: 'bold',

    },


    button: {
        //  flex: 1,


        width: Dimensions.get('window').width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 24,
        shadowOpacity: 0.2,
    },

    imageview: {
        width: '80%',
        borderRadius: 8,
        borderStyle: 'dashed',
        height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },

    Text: {
        fontWeight: 'bold',
        fontFamily: 'Lexend-bold'

    },


    submitbutton: {
        //  flex: 1,

        backgroundColor: '#8CC740',
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
        bottom: 45,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,

    },
    map: {
        height: "100%",
        width: "100%",
      },

      horizontal: {
flexDirection: 'row',
width: '80%',
alignItems: 'center',
justifyContent: 'space-between'
      },

     


});

export default DescriptionScreen;