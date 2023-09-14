
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput, ImageBackground, Image, BackHandler, ActivityIndicator } from 'react-native';
import Card from '../../components/card';
import { Dimensions } from 'react-native';
import TitleText from '../../components/TitleText';
import * as Location from 'expo-location';
import SubText from '../../components/SubText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, {Marker, Polyline} from 'react-native-maps';
import { db } from '../../Database/config'
import { fonts } from '../../components/fonts';

const DotDotCheckout = ({ navigation, route }) => {

    const [currentOrderId, setCurrentOrderId] = useState(route.params.currentOrderId);
    const [quantity, setQuantity] = useState('')
    const [productPrice, setProductPrice] = useState(0);
    const [town, setTown] = useState("");
    const [deliveryTime, setDeliveryTime] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const [agentfirstname, setAgentFirstName] = useState("");
    const [agentlastname, setAgentLastName] = useState("");
    const [agentvehiclemodel, setAgentVehicleModel] = useState("");
    const [agentvehicleregno, setAgentVehicleRegNo] = useState("");
    const [agentlatitude, setAgentLatitude] = useState("");
    const [agentlongitude, setAgentLongitude] = useState("");
    const [couriercharges, setCourierCharges] = useState(0);
    const [distance, setDistance] = useState(0);
    const [buyerlatitude, setBuyerLatitude] = useState("");
    const [buyerlongitude, setBuyerLongitude] = useState("");
    const [mappedArray, setMappedArray] = useState([]);    
    const [showCancelButton, setShowCancelButton] = useState(true);
    const [showConfirmbutton, setShowConfirmbutton] = useState(true);
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);



    
  useEffect(() => {
    fetchAndMapNestedArray();

    const itemRef = db.collection('DotDotOrders').doc(currentOrderId);
    const unsubscribe = itemRef.onSnapshot((doc) => {
      if (doc.exists) {
        const selectedOrderData = doc.data();
        if (selectedOrderData.status === 'Delivered') {
          setDelivered(true)
        }
      }
    });
    return () => unsubscribe();
  }, [currentOrderId]);

  // Function to fetch and map the nested array from Firebase Firestore
const fetchAndMapNestedArray = () => {
    const orderRef = db.collection('DotDotOrders').doc(currentOrderId);
  
    orderRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const orderData = docSnapshot.data();
          const nestedArray = orderData.products || []; // Use an empty array as a fallback if products field is not found
          console.log('Nested Array:', nestedArray);
  
          // Map the nested array to perform any necessary transformations
          const mappedArray = nestedArray.map((product) => {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              image: product.image,
              description: product.description
            };
          });

         
          console.log('Mapped Array:', mappedArray);
          setMappedArray(mappedArray)
        } else {
          console.log('Document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error fetching nested array:', error);
      });
  };
  
 
  
  // Inside your screen component
useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Return true to prevent navigation
      return true;
    });
  
    return () => backHandler.remove();
  }, []);
  
  const total = couriercharges + totalAmount

    const getOrderDetails = async () => {
       const doc = await db.collection('DotDotOrders').doc(currentOrderId).get();
       console.log(doc.data());
       const  order = doc.data();
       const Quantity = order.currentQuantity;
       const ProductPrice = order.currentPrice;
       const address = order.address;
       const time = order.timeInMinutes;
       const totalAmount = order.overallCost;
       const agentFirstName = order.agentfirstname;
       const agentLastName = order.agentlastname;
       const vehicleModel = order.agentvehiclemodel;
       const vehicleRegNo = order.agentvehicleregno;
       const agentLatitude = order.agentLatitude;
       const agentLongitude = order.agentLongitude;
       const courierCharges = order.courierCharges;
       const distance = order.distance;
       const buyerlatitude = order.latitude;
       const buyerlongitude = order.longitude;
       setQuantity(Quantity);
       setProductPrice(ProductPrice);
       setTown(address);
       setDeliveryTime(time);
       setTotalAmount(totalAmount);
       setAgentFirstName(agentFirstName);
       setAgentLastName(agentLastName);
       setAgentVehicleModel(vehicleModel);
       setAgentVehicleRegNo(vehicleRegNo);
       setAgentLatitude(agentLatitude);
       setAgentLongitude(agentLongitude);
       setCourierCharges(courierCharges);
       setDistance(distance);
       setBuyerLongitude(buyerlongitude);
       setBuyerLatitude(buyerlatitude);
    }


    useEffect(() => {
      getOrderDetails();
    
      
    }, []);

    const handleGetDirection = () => {
        navigation.navigate('DotMap', {
          destination: {
            latitude: agentlatitude, // Replace with your desired destination latitude
            longitude: agentlongitude, // Replace with your desired destination longitude
          },
        });
      };
 
    
    const handleUpdate = () => {
        
        db.collection('DotDotOrders').doc(currentOrderId).update({
           status: "Pending Payment"
         });
         setShowCancelButton(false);
         setShowConfirmbutton(false);
         setShowActivityIndicator(true);
         setIsConfirmed(true);
 
       };

       const handlePayment = () => {
        navigation.navigate("CompletedScreen", {currentOrderId})
       }

    /*  const renderGridItem = itemData => {
          return (
              ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
              <Gigs
                  name={itemData.item.name}
  
                  image={itemData.item.image}
                  location={itemData.item.location}
                  service={itemData.item.service}
                  remarks={itemData.item.remarks}
                  onSelect={() => { navigation.replace("QuoteScreen", { state: 0 }) }}
  
  
              />
          )
      }*/

      const handleCancel = () => {
        
        db.collection('DotDotOrders').doc(currentOrderId).update({
           status: "Order Cncelled"
           
         });
         navigation.navigate("HomeScreen")
         
 
       };
    








    return (


        <View style={styles.container}>
           
            <ImageBackground
                resizeMode="cover"
                style={styles.imageBackground}
            >

<View style={styles.gigs}>

<Card style={styles.prodCard}>

   

    <View style={styles.orderDetails}>
      
    {mappedArray.length > 0 ? (
        <FlatList
          data={mappedArray}
          renderItem={({ item }) => (
            <Card style={styles.additionsView}>
            
        
            <View style={styles.descriptionView}>   
                        <View style={styles.cartprodImage}>
                        <Image
                           source={{ uri: item.image }}
                            style={styles.bannerimage}
                        // resizeMode="cover" 
                        />
                    </View>
    <View style={styles.description}>
    
                                        <View style={styles.remove}>
                                        <Text allowFontScaling={false} style={styles.text3}></Text>
                                            {/*<MaterialIcons name="delete" size={20} color="grey" />*/}
                                        </View>
                        <View style={styles.textView}>
    
                        <Text allowFontScaling={false} style={fonts.blackBoldBig}> {item.name}</Text>
                        <Text allowFontScaling={false} style={fonts.blackBoldBig}>KES {item.price}</Text>
    
                        </View>
    
                       
                        
                        <View style={styles.textView}>
    
    
    
    
                            <View style={styles.textView2}>
                           
                                <Text allowFontScaling={false} style={fonts.blackBoldSmall}>{item.description}</Text>
                            </View>
    
                            <View style={styles.textView2}>
    
                                {/* <Text  style={styles.text42}>Quantity</Text>*/}
                            </View>
    
                            
                            
    
                        </View>
                       
    
    
                      
                        <View style={styles.textView}>
    
    
                            <View style={styles.textView2}>
                               
                                <Text allowFontScaling={false} style={fonts.blackBoldSmall}>Quantity</Text>
    
                            </View>
    
                            
    
                           
    
                            <View style={styles.textView2}>
                               
                            <Text allowFontScaling={false} style={fonts.blackBoldBig}>{item.quantity}</Text>
    
                           </View>
    
                            
                        </View>
                        </View>
                        </View>
    
    
    
    
    
                        
                
    
            </Card>
    
          )}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      

       
        <View style={styles.textView}>
            <View style={styles.textView2}>
                <MaterialIcons name="motorcycle" size={24} color="grey" />
                <Text  style={fonts.blackBoldSmall}>Delivery {distance.toFixed(2)} Km</Text>
            </View>

            <View style={styles.textView2}>
                <MaterialIcons name="timer" size={24} color="red" />
                <Text  style={fonts.blackBoldSmall}> {deliveryTime.toFixed(0)} minutes</Text>
            </View>
        </View>


        <View style={styles.textView}>
            <TouchableOpacity onPress={handleGetDirection}>
            <View style={styles.textView2}>
                <MaterialIcons name="location-pin" size={24} color="black" />
                <Text style={fonts.greyLightBig}> (View map)</Text>
            </View>

            </TouchableOpacity>
           
        </View>

        
        

       


        <View style={styles.textView}>
<View style={styles.profileImage}>

</View>

            <View style={styles.customerDet}>
                

                <View style={styles.nameDetail}>
                    <Text  style={fonts.blackBoldSmall}>{agentfirstname} {agentlastname} (Rider)</Text>

                    <TouchableOpacity>
                    <Card style={styles.callButton}>
                        <Text style={fonts.whiteBoldSmall}>+254722xxxxx4</Text>
                    </Card>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.customerDet}>
                <Text style={fonts.greyLightBig}>Payment method</Text>
                <Card style={styles.callButton}>
                    <Text style={fonts.whiteBoldSmall}>Pay on delivery</Text>
                </Card>
            </View>
        </View>



        <View style={styles.textView}>

            <Text  style={fonts.greeBoldSmall}>Total</Text>
            <Text style={fonts.greenBoldBig}>KES {total.toFixed(2)} </Text>
        </View>



        <View style={styles.buttonView}>

        {showConfirmbutton &&
        <Card style={styles.acceptButton}>
            <TouchableOpacity onPress={handleUpdate}>
            <Text allowFontScaling={false} style={styles.text2c}>
                    Confirm Order
                </Text>
            </TouchableOpacity>
        </Card>
        }
                                        
        {showCancelButton && 
            <Card style={styles.acceptButton}>                              
            <TouchableOpacity onPress={handleCancel}>
                <Text allowFontScaling={false} style={styles.text2c}>
                    Cancel Order
                </Text>
            </TouchableOpacity>
            </Card>
        }

        {showActivityIndicator && (
            <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Your order is on its' way!!</Text>
            <Text>Please be patient. Thank you.</Text>
            </View>
        )}
                                
            
            
            
            
            

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
        backgroundColor: '#001B2E',
        alignItems: 'center',
        justifyContent:'space-around' ,
        height: '100%',
        //paddingTop: 50
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      },

    bannerimage: {
        height: '100%',
        width: '100%'

    },

    orderDetails: {
        padding: 10,
        justifyContent: 'space-between',
        
    },

    title1: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        paddingLeft: 20,
        color: 'white',
        fontWeight: 'bold'



    },

    title2: {
        fontFamily: 'Lexend-light',
        fontSize: 20,
        //paddingLeft: 20,
        color: 'black',
        fontWeight: 'bold'



    },

    title3: {
        fontFamily: 'Lexend-light',
        fontSize: 17,
        //paddingLeft: 20,
        color: 'black',
      //  fontWeight: 'bold'



    },


  

    gigs: {
        paddingTop: 100,
        padding: 10,
       height: 'auto',
    },

    statsCard: {
        width: 164,
        height: 80,
        shadowColor: 'white',
        padding: 10
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50
    },
    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bold: {
        fontWeight: '400',
        color: 'black',
        fontSize: 25

    },


    prodCard: {
        overflow: 'hidden',
        // padding: 10,
        shadowColor: 'white',
       height: 'auto',
        borderRadius: 15
    },

    prodImage: {
        borderBottomColor: 'black',
        height: '40%',
        backgroundColor: 'blue'
    },

    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
     //   paddingHorizontal: 10,
      //  paddingTop:1,

    },

    textView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2
    },

    textView2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 20,
        alignItems: 'center'
    },



    additionsView: {
        backgroundColor: '#F5F2F0',
        shadowOpacity: 0.15,
        height: 'auto',
        //justifyContent: 'space-around'
    },

    mapView: {
        height: 180,
        borderRadius: 15,
        
    },



    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //  paddingTop: 10



    },



    declineButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#',

        borderColor: 'red',
        borderWidth: 1
    },

    acceptButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740',
    },

    callButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 23,
        shadowOpacity: 0.2,
        backgroundColor: '#17304A',
    },

    customerDet: {
        width: Dimensions.get('window').width * 0.38,

    },

    customerDet1: {
        width: Dimensions.get('window').width * 0.30,
        flexDirection: 'row',

    },

    profileImage: {
        backgroundColor: 'black',
        height: 56,
        width: 56,
        borderRadius: 100,
        overflow: 'hidden'
    },

   



///ORDERED ITEMS STYLES///////////
    descriptionView: {
        paddingTop: 10,
        paddingBottom:10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        
            },

            cartprodImage: {
                borderBottomColor: 'black',
                height: 60,
                backgroundColor: 'blue',
                width: 60
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

            























});

export default DotDotCheckout;