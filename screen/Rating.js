import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text, ImageBackground } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import QuoteTable from '../components/QuoteTable';
import { QUOTE } from '../data/services';
import { db } from '../Database/config';


const RatingScreen = ({ navigation, route }) => {
    const [currentuserProblem, setCurrentUserProblem] = useState(route.params.currentuserProblem);
    
    const [agentfirstname, setAgentFirstName] = useState("");
    const [agentlastname, setAgentLastName] = useState("");

    const getOrderDetails = async () => {
        const doc = await db.collection('FundiIssues').doc(currentuserProblem).get();
        console.log(doc.data());
        const  order = doc.data();
       const agentfirstname = order.AgentFirstName;
       const agentlastname = order.AgentLastName;
       setAgentFirstName(agentfirstname);
       setAgentLastName(agentlastname);
     }
     useEffect(() => {
      getOrderDetails();
     }, [])
     
    
    
 

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
                        <TitleText style={styles.Text}>{agentfirstname} has completed the task</TitleText>

                    </View>
                    <View style={styles.flatlist}>
                    <TitleText style={styles.Text}>Thank You</TitleText>
                    <Image
                            source={require('../assets/Fundi.png')}
                            style={styles.image}
                        // resizeMode="cover" 
                        />
<TitleText style={styles.Text}>Rate your fundi</TitleText>
                    </View>

                    
                    


                    <View style={styles.buttonView0}>


                   


                        
                    


                    <View style={styles.buttonView}>


<TouchableOpacity >

<Card style={styles.submitbutton}>


<TitleText style={styles.Text}>RATE NOW</TitleText>


</Card>

</TouchableOpacity>


    
</View>

                    <View style={styles.buttonView2}>
                    <TouchableOpacity onPress={() => { navigation.navigate("HomeScreen", { state: 0 }) }}>

<Card style={styles.backButton}>


    <TitleText style={styles.Text}>HOME</TitleText>


</Card>

</TouchableOpacity>
</View>
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
    justifyContent: 'space-around',
    alignItems: 'center',
        justifyContent: 'center',
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

image: {
    height: Dimensions.get('window').width * 0.5,
    width: Dimensions.get('window').width * 0.5,
    borderRadius: 120,
    backgroundColor: '#17304A'
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
    paddingTop: 20
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
  //  position: 'absolute',
    //bottom: 90,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 48,
    //padding: 20

},

buttonView0: {


    zIndex: 30,
    //position: 'absolute',
  //  bottom: 1,
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 100,
   // height: 48,
    //padding: 20

},

buttonView2: {


    zIndex: 30,
   // position: 'absolute',
  //  bottom: 45,
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

    backgroundColor: 'transparent',
    //width: '20%',
    justifyContent: 'center',
        alignItems: 'center',
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
    borderTopRightRadius: 70,
    justifyContent: 'space-between',
    paddingBottom: 50
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



});

export default RatingScreen;