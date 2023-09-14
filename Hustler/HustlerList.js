import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { db } from '../Database/config';


const HustlerList = ({ navigation }) => {


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



    const renderItem = ({ item }) => (

        <TouchableOpacity onPress={() => { navigation.navigate("HustlerScreen", { state: 0 }) }}>
        <View style={styles.vendorList}>
<View style={styles.content}>
<View >
            <Icon
                                    type="material-community"
                                    name="shopping"
                                    color="white"
                                    size={15}
                                  
                                />
</View>
            <Text style={styles.whiteBoldSmall}>Kibandaski 1</Text>

            </View>

            <View style={styles.content}>
            <Text style={styles.whiteLightSmall}>View Products</Text>

            <View>
            <Icon
                                    type="material-community"
                                    name="arrow-right"
                                    color="white"
                                    size={15}
                                  
                                />
</View>


            </View>






        </View>
        </TouchableOpacity>
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

                            <TitleText style={styles.subText}>Back</TitleText>
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
                    <TitleText style={styles.Text}>List of Vendors</TitleText>
                    
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
                            numColumns={1}
                        />





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
        //  alignItems: 'center',
        //height:,
        width: Dimensions.get('window').width * 1,
        padding: 10
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
        paddingRight: 30
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




    searchButton: {
        height: '100%',
        width: '70%',
        alignContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2
    },



    back: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },

    vendorList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        height: 30,
        alignItems: 'center'
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

























    imageBackground: {
        //  flex: 1,
        //  justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
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





    subText: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
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

    content: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },

    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        //  position: 'absolute',
        // paddingTop: '10%'
        padding: 10
    },


    whiteLightSmall: {
        fontFamily: 'Lexend-light',
        fontSize: 12,
        color: 'white',
        
    },

    whiteBoldSmall: {
        fontFamily: 'Lexend-bold',
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },



});

export default HustlerList;