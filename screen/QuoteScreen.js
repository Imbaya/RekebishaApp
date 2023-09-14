import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text, ImageBackground } from 'react-native';
import Card from '../components/card';
import { Dimensions, Linking } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import QuoteTable from '../components/QuoteTable';
import { QUOTE } from '../data/services';
import { fonts } from '../components/fonts';
import { db } from '../Database/config';

const QuoteScreen = ({ navigation, route }) => {
    const [currentuserProblem, setCurrentUserProblem] = useState(route.params.currentuserProblem);
    const [budget, setBudget] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const[agentLatitude, setAgentLatitude] = useState(0);
    const[agentLongitude, setAgentLongitude] = useState(0);
    const[status, setStatus] = useState("");
    const[agentfirstname, setAgentFirstname] = useState("");
    const [agentlastname, setAgentLastname] = useState("");
    const [agentphonenumber, setAgentPhoneNumber] = useState('');

    useEffect(() => {
     getOrderDetails();
    }, [])
    

    const getOrderDetails = async () => {
        const doc = await db.collection('FundiIssues').doc(currentuserProblem).get();
        console.log(doc.data());
        const  order = doc.data();
       const budget = order.amount;
       const category = order.selected;
       const description = order.description;
       const agentLatitude = order.agentLatitude;
       const agentLongitude = order.agentLongitude;
       const phoneNumber = order.AgentPhoneNumber;
       const agentfirstname = order.AgentFirstName;
       const agentlastname = order.AgentLastName;
       const status = order.status;
       setBudget(budget);
       setCategory(category);
       setDescription(description);
       setAgentLatitude(agentLatitude);
       setAgentLongitude(agentLongitude);
       setStatus(status); 
       setAgentPhoneNumber(phoneNumber);
       setAgentFirstname(agentfirstname);
       setAgentLastname(agentlastname);
     }
     const handleAccept = () => {
        
        db.collection('FundiIssues').doc(currentuserProblem).update({
           status: "Active"
         });
         //navigate
         navigation.navigate("ConfirmScreen",  {currentuserProblem});
         
       };
 

       const openDialer = (phoneNumber) => {
        const formattedPhoneNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces from the phone number
        const dialableNumber = `tel:${formattedPhoneNumber}`;
        
        Linking.openURL(dialableNumber)
          .catch((err) => console.error('An error occurred when trying to open the dialer', err));
      };
 

return (


    <View style={styles.container}>
        
        <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
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

                

                <Card style={styles.card}>
                    <View style={styles.textView}>
                        <TitleText style={styles.Text}>We Found A Fundi For You</TitleText>

                    </View>



                    <View style={styles.descriptionView}>   
                    <View style={styles.cartprodImage}>
                    <Image
                      //  source={{ uri: imgUrl }}
                        style={styles.bannerimage}
                    // resizeMode="cover" 
                    />
                </View>
<View style={styles.description}>

                    <View style={styles.textView}>

                    <Text allowFontScaling={false} style={fonts.blueBoldMedium}> {agentfirstname} {agentlastname} </Text>
                    

                    </View>

                   
                    
                    <View style={styles.textView}>




                        <View style={styles.textView2}>
                       
                            <Text allowFontScaling={false} style={fonts.greyLightSmall}>{category}</Text>
                        </View>

                        <View style={styles.textView2}>

                            {/* <Text  style={styles.text42}>Quantity</Text>*/}
                        </View>

                        
                        

                    </View>
                   


                  
                    <View style={styles.textView}>


                        <View style={styles.textView2}>
                           
                            <Text allowFontScaling={false} style={fonts.greyLightSmall}>Completed jobs : n/a</Text>

                        </View>


                        
                    </View>

                    <View style={styles.textView}>


<View style={styles.textView2}>
   
<TouchableOpacity onPress={() => openDialer(agentphonenumber)}>
<Text allowFontScaling={false} style={fonts.blackBoldSmall}>
{agentphonenumber}
</Text>
</TouchableOpacity>

</View>








</View>



                    </View>
                    </View>





                    <View style={styles.flatlist}>

                        <View style={styles.TextView}><Text style={fonts.greyLightBig}>Labour charge</Text> 
                        <Text style={fonts.greyLightBig}>Ksh {budget}</Text>
                        </View >
                        <View  style={styles.TextView}><Text style={fonts.greyLightBig}>Transport charge</Text>
                        <Text style={fonts.greyLightBig}>Ksh N/A</Text>
                        </View>
                        <Text></Text>

                    </View>

                    <View  style={styles.TextView1}>
                    <Text style={fonts.greyLightBig}>Total</Text>
                        <Text style={fonts.greyLightBig}>Ksh {budget}</Text>
                    </View>


                    <View style={styles.buttonView}>


                    <TouchableOpacity onPress={handleAccept}>

<Card style={styles.submitbutton}>


    <TitleText style={styles.Text}>ACCEPT</TitleText>


</Card>

</TouchableOpacity>


                        
                    </View>

                    <View style={styles.buttonView2}>
                    <TouchableOpacity onPress={() => { navigation.navigate("HomeScreen", { state: 0 }) }}>

<Card style={styles.backButton}>


    <TitleText style={styles.Text}>CANCEL</TitleText>


</Card>

</TouchableOpacity>
</View>

                </Card>


            </View>
        
        </ImageBackground>

    </View>





)
};


const styles = StyleSheet.create({

container: {
    flex: 1,

    // alignItems: 'center',
    justifyContent: 'space-around'
},

TextView: {
flexDirection: 'row',
justifyContent: 'space-between'
},

TextView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
    },

table: {
  width: Dimensions.get('window').width * 0.8,
  //  paddingLeft: '15%',
    
       // width: '80%',
        borderRadius: 8,
        borderStyle: 'dashed',
        //height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'

},

imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},

logo: {
    padding: 10
},

Text: {
    fontFamily: 'Lexend-bold'
},

textView: {
    paddingTop: 50
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

userIcon: {
    position: "absolute",
    top: 50,
    right: 12,
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 8
},

buttonView: {


    zIndex: 30,
    position: 'absolute',
    bottom: 90,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    //padding: 20

},

buttonView2: {


    zIndex: 30,
    position: 'absolute',
    bottom: 45,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    paddingTop: 20

},

Text: {
    fontWeight: 'bold',

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

backButton: {
    //  flex: 1,

    backgroundColor: '#ffff',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    shadowOpacity: 0.2,
    borderColor: '#8CC740',
    borderWidth: 1,
    
},


flatlist: {
    paddingTop: 10,
    backgroundColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: '80%'
},

card: {
    flex: 1,
    backgroundColor: '#F5F2F0',

    width: Dimensions.get('window').width * 1,
  //  justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: Dimensions.get('window').height * 0.75,
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70
},



image: {
    //height: Dimensions.get('window').width * 0.25,
    //  width: Dimensions.get('window').width * 0.25,

},


gridView: {


    zIndex: 30,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width * 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: Dimensions.get('window').height * 0.75,

},

buttonText: {
    fontWeight: 'bold',

},


descriptionView: {
    paddingTop: 10,
    paddingBottom:10,
    flexDirection: 'row',
   // borderBottomWidth: 1,
    //borderBottomColor: 'grey',
    
        },


        
        cartprodImage: {
            borderBottomColor: 'black',
            height: 60,
            backgroundColor: 'blue',
            width: 60,
            borderRadius: 100,
            overflow: 'hidden'
        },

        description: {
            //  borderTopWidth: 1,
            //  borderBottomWidth: 1,
            //  borderBottomColor: '#8CC740',
             // borderTopColor: '#8CC740',
              paddingBottom: 5,
              paddingTop: 5,
              width: '77%'
           //   flexDirection: 'row'
          },

          textView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
         //   paddingHorizontal: 10,
          //  paddingTop:1,
    
        },



});

export default QuoteScreen;