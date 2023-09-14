import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import { TextInput } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, auth } from '../Database/config';
import * as Location from 'expo-location';
import firebase from 'firebase';
import Counter from "react-native-counters";
import 'firebase/firestore';

const HustlerCart = ({ navigation, route }) => {

    const [productId, setProductId] = useState(route.params.productId);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [userDisplayName, setUserDisplayName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [ cartItems, setCartItems]  = useState(route.params.cartItems);
    const [productCounts, setProductCounts] = useState({});
    const [overallCost, setOverallCost] = useState(0);


        // Define the onCounterChange function
        const onCounterChange = (newCount, item) => {
            // Update the count for the specific product based on its ID
            setProductCounts(prevCounts => ({
            ...prevCounts,
            [item.id]: newCount,
            }));
            
            // You can also perform any other desired actions based on the new count value
        };

        // Access the count for a specific product using its ID
        const getCountForProduct = (productId) => {
            return productCounts[productId] || 0; // If the product count doesn't exist yet, return 0
        };

        // Calculate the total cost for a specific product based on its count and price
        const calculateTotalCost = (item) => {
            const count = getCountForProduct(item.id);
            return count * item.Price;
        };

        const calculateOverallCost = () => {
            let overallCost = 0;
            for (const item of cartItems) {
              overallCost += calculateTotalCost(item);
            }
           
            return overallCost;
          };

           // Remove the product from the list
                const removeProduct = (productId) => {
                    setCartItems(prevProducts => prevProducts.filter(product => product.id !== productId));
                    setProductCounts(prevCounts => {
                    const updatedCounts = { ...prevCounts };
                    delete updatedCounts[productId];
                    return updatedCounts;
                    });
                };
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            getUserDetails();
            getProductDetails();
            getOfferProductDetails();
            Cart();
        })();
    }, []);

    const getProductDetails = async () => {
        const doc = await db.collection('DotDotProducts').doc(productId).get();
        console.log(doc.data());
        const Name = doc.data().Name;
        const Quantity = doc.data().Quantity;
        const Price = doc.data().Price;
        const Category = doc.data().Category;
        const ImgUrl = doc.data().ImgUrl;
        setName(Name);
        setQuantity(Quantity);
        setPrice(Price);
        setCategory(Category);
        setImgUrl(ImgUrl);

    }

    const getOfferProductDetails = async () => {
        const doc = await db.collection('DotDot Offer Products').doc(productId).get();
        console.log(doc.data());
        const Name = doc.data().Name;
        const Quantity = doc.data().Quantity;
        const Price = doc.data().Price;
        const Category = doc.data().Category;
        const ImgUrl = doc.data().ImgUrl;
        setName(Name);
        setQuantity(Quantity);
        setPrice(Price);
        setCategory(Category);
        setImgUrl(ImgUrl);

    }

    const handleBuyClick1 = () => {
        const { latitude, longitude } = location.coords;
        const currentOrderId = Math.floor(100000 + Math.random() * 9000).toString();
      
        // Get the selected products based on the productCounts state and add quantity property
        const selectedProducts = cartItems
          .filter((product) => productCounts[product.id] > 0)
          .map((product) => ({
            id: product.id,
            name: product.Name,
            price: product.Price,
            image: product.ImgUrl,
            description: product.Quantity,
            quantity: productCounts[product.id],
          }))
          .filter((product) => product.id && product.name && product.price && product.quantity);
      
        console.log('Selected Products:', productCounts);
        console.log('Filtered Selected Products:', selectedProducts);
      
       // Calculate the overall cost based on selected products
         const overallCost = calculateOverallCost();
      
        // Save the selected products to Firebase Firestore
        const userRef = db.collection('DotDotOrders').doc(currentOrderId);
      
        // Store products as a nested array within the document
        userRef
          .set({
            userDisplayName,
            overallCost,
            latitude,
            longitude,
            userPhoneNumber,
            TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            agentId: "",
            status: 'New Order',
            address,
            products: firebase.firestore.FieldValue.arrayUnion(...selectedProducts),
          })
          .then(() => {
            console.log('Selected products added to Firebase Firestore successfully!');
            navigation.navigate('LoadingScreen', { currentOrderId: currentOrderId });
          })
          .catch((error) => {
            console.error('Error adding selected products to Firebase Firestore:', error);
          });
      };
      
      
    const handleBuyClick = () => {
        
        const { latitude, longitude } = location.coords;
        const currentOrderId = Math.floor(100000 + Math.random() * 9000).toString();
        // Save the products array to Firebase Firestore
        cartItems.forEach((product) => {
          db.collection('DotDotOrders').doc(currentOrderId).set({
            product,
            userDisplayName,
            latitude, 
            longitude, 
            userPhoneNumber, 
            TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            agentId: "",
            status: 'New Order',
            address,

          })
            .then(() => {
              console.log('Product added to Firebase Firestore successfully!');
              navigation.navigate('LoadingScreen', { currentOrderId: currentOrderId });
            })
            .catch((error) => {
              console.error('Error adding product to Firebase Firestore:', error);
            });
        });
      };

    const BuyDotDotProduct = async () => {


        try {
            const { latitude, longitude } = location.coords;
            const currentOrderId = Math.floor(100000 + Math.random() * 9000).toString();

            await db.collection("DotDotOrders").doc(currentOrderId).set({
                userDisplayName,
                
                quantity,
                price,
                longitude,
                latitude,
                userPhoneNumber,
                address,
                status: 'New Order',
                imgUrl,
                agentId: "",
                TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                category,
                overallCost: overallCost
            });

            console.log('Location saved successfully');
            //navigation
            navigation.navigate('LoadingScreen', { currentOrderId: currentOrderId });
        } catch (error) {
            console.error('Error saving location:', error);
        }
    };



    const getUserDetails = async () => {
        const doc = await db.collection('users').doc(auth.currentUser.uid).get();
        console.log(doc.data());
        const username = doc.data().username;
        const phoneNumber = doc.data().phonenumber;
        setUserDisplayName(username);
        setUserPhoneNumber(phoneNumber);

    }





    {/*  const BuyDotDotProduct = () =>{
    getUserDetails();
    setIsLoading(true);
    

      const currentOrderId = Math.floor(100000+Math.random()*9000).toString();
         db.collection("DotDotOrders"). doc(currentOrderId).set({
            userDisplayName,
            currentQuantity,
            currentPrice,
            longitude,
            latitude,
            userPhoneNumber,
            address,
            uid: auth.currentUser.uid,
            status: 'New Order',
             currentImage,
            agentId: "",
            TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            
        });

        //navigation
        navigation.navigate('LoadingScreen', {currentOrderId: currentOrderId});     
    }
*/}

    return (

        <View style={styles.container}>

            <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >

                <View style={styles.banner}>

                    <Image
                        source={require('../assets/DotDotBanner.jpg')}
                        style={styles.bannerimage}
                    // resizeMode="cover" 
                    />

                    <View style={styles.icons}>
                        <View style={styles.back}>
                            <View
                                style={styles.iconView}
                            >
                                <Icon
                                    type="material-community"
                                    name="arrow-left"
                                    color="white"
                                    size={35}
                                    onPress={() => { navigation.navigate("DotDotScreen", { state: 0 }) }}
                                />

                            </View>

                            <TitleText style={styles.subText}>Back</TitleText>
                        </View>



                    </View>
                </View>



                   
                <View style={styles.cartview}>



                <Card style={styles.prodCard}>

                   

                    <View style={styles.orderDetails}>


                        
                {cartItems.map((item) => (
                       
                        <View key={item.id} style={styles.descriptionView}>   
                        <View style={styles.cartprodImage}>
                        <Image
                            source={{ uri: item.ImgUrl }}
                            style={styles.bannerimage}
                        // resizeMode="cover" 
                        />
                    </View>
                    <View style={styles.description}>

                        <View style={styles.textView}>

                        <Text allowFontScaling={false} style={styles.text12}> {item.Name}</Text>


                        </View>

                       
                        
                        <View style={styles.textView}>




                            <View style={styles.textView2}>
                           
                                <Text allowFontScaling={false} style={styles.text42}>{item.Quantity}</Text>
                            </View>

                            <View style={styles.textView2}>

                                {/* <Text  style={styles.text42}>Quantity</Text>*/}
                            </View>

                            <TouchableOpacity onPress={() => removeProduct(item.id)} style={styles.textView}>
                            <Text allowFontScaling={false} style={styles.text421}>Remove</Text>
                            <Icon type="material-community"
                                    name="cart-arrow-down"
                                    color="#2B5989"
                                    size={17}

                                />
                            </TouchableOpacity>
                            

                        </View>
                       


                      
                        <View style={styles.textView}>


                            <View style={styles.textView2}>
                               
                                <Text allowFontScaling={false} style={styles.text421}>Add More</Text>

                            </View>

                            
                            <Counter
                                start={getCountForProduct(item.id)} // Pass the current count for the product
                                onChange={(newCount) => onCounterChange(newCount, item)} // onCounterChange function will handle count changes
                            />

                            <View style={styles.textView2}>
                               
                            <Text allowFontScaling={false} style={styles.text2e21}>Ksh {calculateTotalCost(item)}</Text>

                           </View>

                            
                        </View>
                        </View>
                        </View>
                        ))}
                        


                        <View style={styles.textView}>

<Text allowFontScaling={false} style={styles.text2d21}>Total</Text>
<Text allowFontScaling={false} style={styles.text2e2}>Ksh {calculateOverallCost()}</Text>
</View>


                            <View style={styles.buttonView1}>


                            <Card style={styles.acceptButton}>
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("HustlerRatingScreen", { state: 0 }) }}>
                                    <Text allowFontScaling={false} style={styles.text2c2}>
                                        PLACE ORDER
                                    </Text>

                                </TouchableOpacity>
                            </Card>

                            </View>


                          

                        </View>




             





                </Card>
                














            </View>
               








                {/*  <View style={styles.productcard}>
                    <Card style={styles.Product}>

                        <View style={styles.prodImageView}>

                            <View style={styles.productImage}>
                                <Image
                                    source={require('../assets/Product2.jpg')}
                                    style={styles.image}
                                // resizeMode="cover" 
                                />

                            </View>

                        </View>


                        <View style={styles.buyView}>

                            <TitleText style={styles.prodName2}>Catalyst 1</TitleText>


                            <View style={styles.BuyView}>
                                <TitleText style={styles.prodName2}>KES 500</TitleText>



                                <View style={styles.addtocart}>
                                    <View style={styles.buttonView}>
                                        <TouchableOpacity onPress={() => { navigation.navigate("", { state: 0 }) }}>




                                            <TitleText style={styles.prodName}>Add to Cart</TitleText>




                                        </TouchableOpacity>
                                    </View>

                                </View>




                            </View>
                        </View>




                    </Card>

                </View>
       */}














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

    descriptionView: {
paddingTop: 10,
paddingBottom:10,
flexDirection: 'row',
borderBottomWidth: 1,
borderBottomColor: 'grey',

    },



    image: {
        height: Dimensions.get('window').width * 0.4,
        width: Dimensions.get('window').width * 0.4,

    },

    back: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },


    productcard: {
        padding: 10

    },


    icons: {
        position: 'absolute',
        top: 50,
        height: '13%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 30,
        alignContent: 'center',
        alignItems: 'center'
    },


    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    banner: {
        height: Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width * 1,
        borderBottomLeftRadius: 50
    },

    subText: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        padding: 2
    },

    iconView: {
        // position: "absolute",
        //top: 50,
        //left: 12,
        //  backgroundColor: '#8CC740',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 2,
        //zIndex: 8
    },

    bannerimage: {
        height: '100%',
        width: '100%'

    },

    cartview: {
        justifyContent: 'space-between',
        //  flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.17,
        borderBottomColor: '#F5F2F0',
        height: 'auto'

    },

    imageView: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        //  height: Dimensions.get('window').width * 0.24,
        // width: Dimensions.get('window').width * 0.24,
        borderRadius: 20,
        overflow: 'hidden'


    },

    imageView2: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        height: Dimensions.get('window').width * 0.21,
        width: Dimensions.get('window').width * 0.21,
        borderRadius: 10,
        overflow: 'hidden'


    },

    imagerow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    prodImage: {
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width * 0.45,
        justifyContent: 'space-between'

    },

    Product: {

        height: Dimensions.get('window').height * 0.24,
        width: Dimensions.get('window').width * 0.41,
        overflow: 'hidden',
    },

    prodImageView: {
        width: '100%',
        height: '60%',

        alignItems: 'center',
        justifyContent: 'center',


    },

    productImage: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        height: Dimensions.get('window').width * 0.24,
        width: Dimensions.get('window').width * 0.24,
        //borderRadius: 20,


    },


    buyView: {
        height: '40%',
        backgroundColor: '#F5F2F0',

    },

    prodName: {
        fontFamily: 'Lexend-light',

        color: '#F5F2F0',
        fontSize: 15,
        padding: 2
    },

    prodName2: {
        fontFamily: 'Lexend-light',

        color: 'Blacks',
        fontSize: 15,
        padding: 2
    },

    addtocart: {
        //  flexDirection: 'row',

        height: 20,
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    buttonView: {


        // zIndex: 30,
        // position: 'absolute',
        // bottom: 92,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 100,
        height: 25,
        backgroundColor: '#8CC740',
        borderRadius: 10

    },

    text1: {
        fontFamily: 'Lexend-bold',
        fontSize: 19,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text2: {
        fontFamily: 'Lexend-bold',
        fontSize: 19,
        color: '#F5F2F0',
        fontWeight: 'bold'
    },

    text3: {
        fontFamily: 'Lexend-lighter',
        fontSize: 15,
        color: '#F5F2F0',

    },

    text4: {
        fontFamily: 'Lexend-lighter',
        fontSize: 18,
        color: '#F5F2F0',

    },

    details: {
        width: Dimensions.get('window').width * 0.35,
    },


    ////
    prodCard: {
        overflow: 'hidden',
        // padding: 10,
        shadowColor: 'white',
        height: 'auto',
        borderRadius: 15
    },

    cartprodImage: {
        borderBottomColor: 'black',
        height: 80,
        backgroundColor: 'blue',
        width: 80
    },

    orderDetails: {
        padding: 5,
        justifyContent: 'space-between',
        height: 'auto',
        
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
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


    ////////////TEXT STYLES///////////////////
    text12: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    text22: {
        fontFamily: 'Lexend-bold',
        fontSize: 12,
        color: 'black',
        fontWeight: 'bold'
    },

    text2b2: {
        fontFamily: 'Lexend-bold',
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold'
    },

    text2c2: {
        fontFamily: 'Lexend-bold',
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },

    text2d2: {
        fontFamily: 'Lexend-bold',
        fontSize: 17,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text2d21: {
        fontFamily: 'Lexend-bold',
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold'
    },

    text2e2: {
        fontFamily: 'Lexend-bold',
        fontSize: 17,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text2e21: {
        fontFamily: 'Lexend-bold',
        fontSize: 15,
        color: '#8CC740',
        fontWeight: 'bold'
    },

    text32: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },

    text42: {
        fontFamily: 'Lexend-light',
        fontSize: 11,
        color: 'black',
        fontWeight: 'bold'
    },

    text421: {
        fontFamily: 'Lexend-light',
        fontSize: 11,
        color: 'grey',
        fontWeight: 'bold'
    },

    text52: {
        fontFamily: 'Lexend-light',
        fontSize: 15,
        color: 'grey',
        fontWeight: 'bold'
    },

    text62: {
        fontFamily: 'Lexend-light',
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },

    ////////////TEXT STYLES///////////////////

    buttonView1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding:5



    },

    acceptButton: {
        //  flex: 1,

        //paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: 32,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740',
    },


});

export default HustlerCart;