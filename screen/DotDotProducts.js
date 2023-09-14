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
import { db } from '../Database/config';
import Carousel from 'react-native-reanimated-carousel';



const DotDotScreen = ({ navigation }) => {


    const [bottomNavBarHeight, setBottomNavBarHeight] = useState(0);

    useEffect(() => {
        const getBottomNavBarHeight = () => {
            const windowHeight = Dimensions.get('window').height;
            const screenHeight = Dimensions.get('screen').height;

            // Calculate the height difference between the window and the screen
            const heightDifference = screenHeight - windowHeight;

            // Set the bottom navigation bar height based on the difference
            setBottomNavBarHeight(heightDifference);
        };

        getBottomNavBarHeight();
    }, []);


    const [Category, setCategory] = useState("FuelTreatment");
    const [allproducts, setallProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [allofferproducts, setallOfferProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]); // Array to store selected products in the cart


    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);


    const addToCart = (product) => {
        const isProductInCart = cartItems.some((item) => item.id === product.id);
      
        if (!isProductInCart) {
          // If the product is not in the cart, add it with a quantity of 1
          setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
        }
      };
      



    const getProducts = async () => {
        setRefreshing(true);

        const allproducts = [];
        const querySnapshot = await db.collection("DotDotProducts").get();
        querySnapshot.forEach((doc) => {
            allproducts.push({ id: doc.id, ...doc.data() });
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        setallProducts([...allproducts]);
        setRefreshing(false);

    }

    const getOfferProducts = async () => {
        setRefreshing(true);

        const allofferproducts = [];
        const querySnapshot = await db.collection("DotDot Offer Products").get();
        querySnapshot.forEach((doc) => {
            allofferproducts.push({ id: doc.id, ...doc.data() });
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        setallOfferProducts([...allofferproducts]);
        setRefreshing(false);

    }


    useEffect(() => {
        getProducts();
        getOfferProducts();
    }, []);

    const renderOfferItem = ({ item }) => (

        <View style={{ width: '100%', paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("DotDotOfferCart",
                    { productId: item.id })
            }} 
            >
                <Card style={styles.offerProduct}>
                    <ImageBackground
                        source={{ uri: item.ImgUrl }}
                        resizeMode="cover"
                        style={styles.imageBg}
                    >

                        <View style={styles.sideView}>
                            <TitleText style={styles.offerText}>{item.Category}</TitleText>
                            <TitleText style={styles.subText}>{item.Name}</TitleText>

                            <View style={styles.priceView}>
                                <Text allowFontScaling={false} style={styles.offerText1}>Ksh {item.Price}</Text>

                            </View>
                        </View>


                    </ImageBackground>

                </Card>
            </TouchableOpacity>
        </View>


    );

    const renderItem = ({ item }) => (
        <View style={styles.fastFoods}>






            <Card style={styles.Product}>

                <View style={styles.prodImageView}>

                    <View style={styles.imageView}>
                        <Image
                            source={{ uri: item.ImgUrl }}
                            style={styles.image}
                        // resizeMode="cover" 
                        />

                    </View>

                </View>


                <View style={styles.buyView}>




                    <View style={styles.BuyView}>
                        <TitleText style={styles.prodName}> {item.Name}</TitleText>
                        <TitleText style={styles.prodName}> {item.Quantity}</TitleText>
                        <TitleText style={styles.prodName}> Ksh {item.Price}</TitleText>





                        <TouchableOpacity   /* onPress={() => {
                            navigation.navigate("DotDotCart",
                                { productId: item.id })
                        }} */

                        onPress={() => addToCart(item)}
                        >
                            <View style={styles.cartButtonView}>


                                <Icon type="material-community"
                                    name="cart"
                                    color="white"
                                    size={20}

                                />



                                <TitleText style={styles.button}>ADD TO CART</TitleText>


                            </View>
                        </TouchableOpacity>





                    </View>
                </View>




            </Card>



        </View>

    );




    return (

        <View style={styles.container}>






            <ImageBackground
                source={require('../assets/IconlessBackground.jpg')}
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
                                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                                />






                            </View>

                            <TitleText style={styles.subText}>Exit</TitleText>
                        </View>


                        <Card style={styles.searchButton}>
                            <TitleText style={styles.prodVendor}>What are you looking for?</TitleText>
                            <Icon
                                type="Ionicons"
                                name="search"
                                color="grey"
                                size={25}
                            // onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                            />
                        </Card>



                    </View>


                </View>

                <View style={styles.textView}>
                    <TitleText style={styles.Text}>DotDot Products</TitleText>

                </View>

                <View style={styles.offer}>
                    <TitleText style={styles.offerText}>Best Offers Today</TitleText>
                    {/*FlatList*/}

                    <View style={styles.offerslist}>




                        <Carousel
                            loop
                            width={Dimensions.get('window').width}
                            height={'auto'}
                            autoPlay={true}
                            data={allofferproducts}
                            scrollAnimationDuration={1000}
                            onSnapToItem={(index) => console.log('current index:', index)}
                            renderItem={renderOfferItem}
                        />





                    </View>

                </View>

                {/*Flatlist*/}


                <View style={styles.flat}>





                    <FlatList
                        data={allproducts}
                        onRefresh={getProducts}
                        refreshing={refreshing}
                        showsVerticalScrollIndicator={false}
                        style={{

                        }}
                        renderItem={renderItem}
                        numColumns={2}
                    />


                </View>
                <View style={styles.cartButton}>
                    <TouchableOpacity onPress={() => { navigation.navigate("DotDotCart", { cartItems }) }}>

                        <Card style={styles.cartbutton}>
<View style={styles.insideButton}>
<Icon type="material-community"
                                name="cart"
                                color="white"
                                size={20}

                            />

<TitleText style={styles.cartbuttonText}>View Cart</TitleText>


</View>
         <View>                
<TitleText style={styles.cartbuttonText1}>{totalItems}</TitleText>                      
</View>

                        </Card>

                    </TouchableOpacity>
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
        height: Dimensions.get('window').height * 1
    },

    offerslist: {
        flex: 1,
        width: '100%'
    },

    flat: {
        flex: 1,
        alignItems: 'center',
        height: 800,
        width: Dimensions.get('window').width * 1,
        paddingTop: 10
    },


    cartButton: {
        //  flex: 1,
        alignItems: 'center',
        height: 60,
        width: Dimensions.get('window').width * 1,
        paddingTop: 5,
        paddingBottom: 20
    },

    cartbutton: {
        flex: 1,
        flexDirection: 'row',
      //  paddingHorizontal: 10,
        width: Dimensions.get('window').width * 0.94,
        justifyContent: 'space-between',
          alignItems: 'center',
        borderRadius: 10,
        height: 48,
        shadowOpacity: 0.2,
        paddingRight:30
    },


    insideButton: {
        backgroundColor: '#17304A',
       // flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: '90%',
     //   justifyContent: 'flex-start',
          alignItems: 'center',
        borderRadius: 10,
        height: '100%',
        shadowOpacity: 0.2,
    },

    cartbuttonText: {
        fontFamily: 'Lexend-light',
        color: '#8CC740',
    },

    cartbuttonText1: {
        fontFamily: 'Lexend-light',
        color: '#2B5989',
    },


    searchButton: {
        height: '100%',
        width: '70%',
        alignContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2
    },


    image: {
        height: '100%',
        width: '100%',
        // resizeMode: 'contain'

    },

    back: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },

    imageView: {
        //flex: 1,
        backgroundColor: '#17304A',
        //alignItems: 'center',
        // justifyContent: 'center',
        //  paddingLeft: '40%',
        height: '100%',
        width: '100%',
        //borderRadius: 20,


    },


    buyView: {
        height: '40%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: 5


    },
    buttonText: {
        //  fontWeight: 'bold',
        fontFamily: 'Lexend-light'

    },




    prodName: {
        fontFamily: 'Lexend-light',

        color: 'black',
        fontSize: 14,

    },

    button: {
        fontFamily: 'Lexend-light',

        color: 'white',
        fontSize: 14,

    },

    buttonView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 25,
        backgroundColor: '#8CC740',
        borderRadius: 5,
        padding: 5

    },


    cartButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',

        alignItems: 'center',
        height: 25,
        backgroundColor: '#8CC740',
        borderRadius: 5,
        padding: 5

    },

    icons: {
        position: 'absolute',
        top: 50,
        height: '16%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 30,
        alignContent: 'center',
        alignItems: 'center'
    },

    prodVendor: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 12.5,
        padding: 2
    },

    productView: {
        paddingLeft: 20
    },

    priceView: {
        flexDirection: 'row',
        backgroundColor: 'red',
        height: 20,
        width: '98%',
        //justifyContent:'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,

    },

    BuyView: {
        //  flexDirection: 'row',

        height: 20,
        width: '98%',
        //justifyContent:'center',
        // alignItems: 'center',
        justifyContent: 'space-between',


    },

    addtocart: {
        //  flexDirection: 'row',

        height: 20,
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },




    sideView: {
        width: '65%',
        height: '100%',
        backgroundColor: 'rgba(140, 199, 64, 0.8)',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5
    },

    bottomView: {
        width: '100%',
        height: '50%',
        backgroundColor: '#F5F2F0',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,

    },

    prodImageView: {
        width: '100%',
        height: '65%',

        alignItems: 'center',
        justifyContent: 'center',


    },

    offer: {
        height: Dimensions.get('window').height * 0.20,
        // width: Dimensions.get('window').width * 1,
        // paddingLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        //  flexDirection: 'row',
        paddingBottom: 5

    },

    fastFoods: {
        //   height: "auto",
        width: Dimensions.get('window').width * 0.48,
        paddingHorizontal: 5,
        //  paddingLeft: 40,
        //  marginBottom: 10,
        paddingBottom: 10

        //  backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },

    offerProduct: {

        height: 'auto',
        width: '100%',

    },

    Product: {

        height: 240,
        width: '100%',

        overflow: 'hidden',
        paddingBottom: 10
    },



    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    imageBg: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: '100%',
        height: '100%'
    },



    banner: {
        height: Dimensions.get('window').height * 0.2,
        width: Dimensions.get('window').width * 1,
        borderBottomLeftRadius: 50
    },

    Text: {
        fontFamily: 'Lexend-bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25
    },

    offerText: {
        fontFamily: 'Lexend-bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 17,
        paddingBottom: 5

    },

    offerText1: {
        fontFamily: 'Lexend-bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    },

    subText: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
        padding: 2
    },
    subText1: {
        fontFamily: 'Lexend-lighter',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 12
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





    userIcon: {
        // position: "absolute",
        //top: 50,
        //right: 12,
        backgroundColor: 'grey',
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



    text: {
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Lexend-bold'


    },

    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        //  position: 'absolute',
        // paddingTop: '10%'
        padding: 10
    },



});

export default DotDotScreen;