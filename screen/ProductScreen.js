import React from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import { TextInput } from 'react-native-gesture-handler';

const ProductScreen = ({ navigation }) => {




    return (


        <View style={styles.container}>






            <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >

                <View style={styles.banner}>

                <Image
                        source={require('../assets/4k-background.png')}
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
                    <TitleText style={styles.Text}>Food and Drinks</TitleText>

                </View>

                <View style={styles.offer}>
                    <TitleText style={styles.offerText}>Best Offers Today</TitleText>





                    <Card style={styles.offerProduct}>
                        <ImageBackground
                            source={require('../assets/4k-background.png')}
                            resizeMode="cover"
                            style={styles.imageBg}
                        >

                            <View style={styles.sideView}>
                                <TitleText style={styles.offerText}>Burger</TitleText>
                                <TitleText style={styles.subText}>King Burger</TitleText>
                                <TitleText style={styles.subText}>Vendor : John Doe</TitleText>

                                <View style={styles.priceView}>
                                    <Text style={styles.offerText1}>KES 300/-</Text>
                                    <Text style={styles.subText1}>SAVE 100/-</Text>
                                </View>
                            </View>


                        </ImageBackground>

                    </Card>

                </View>


                <View style={styles.fastFoods}>
                    <TitleText style={styles.offerText}>Fast Foods</TitleText>





                    <Card style={styles.Product}>

                        <View style={styles.prodImageView}>

                            <View style={styles.imageView}>
                                <Image
                                      source={require('../assets/4k-background.png')}
                                    style={styles.image}
                                // resizeMode="cover" 
                                />

                            </View>

                        </View>


                        <View style={styles.buyView}>

                            <TitleText style={styles.prodName}>Chicken</TitleText>
                            <TitleText style={styles.prodVendor}>Kibandaski</TitleText>

                            <View style={styles.BuyView}>
                                <TitleText style={styles.prodName}>KES 100</TitleText>




                                <View style={styles.buttonView}>
                                    <TouchableOpacity onPress={() => { navigation.navigate("VendorMenuScreen", { state: 0 }) }}>

                                        


                                            <TitleText style={styles.prodName}>BUY</TitleText>


                                    

                                    </TouchableOpacity>
                                </View>

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
        justifyContent: 'space-around'
    },

    searchButton:{
      height: '100%',
      width: '70%'  ,
      alignContent: 'center',
      //alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 2
    },


    image: {
        height: Dimensions.get('window').width * 0.08,
        width: Dimensions.get('window').width * 0.08,
      
    },

    back: {
flexDirection: 'row',
alignContent: 'center' ,
alignItems: 'center'
    },

    imageView: {
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
        backgroundColor: '#F5F2F0'
    },
    buttonText: {
        //  fontWeight: 'bold',
        fontFamily: 'Lexend-light'

    },


    button: {
        flex: 1,


        //  width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        height: 30,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740'
    },

    prodName: {
        fontFamily: 'Lexend-light',

        color: 'black',
        fontSize: 15,
        padding: 2
    },

    buttonView: {


        // zIndex: 30,
        // position: 'absolute',
        // bottom: 92,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 100,
        height: '100%',
        backgroundColor: '#8CC740'

    },

    icons: {
        position: 'absolute',
        top: 50,
        height: '13%',
        width: '100%' ,
        flexDirection: 'row' ,
        justifyContent: 'space-between',
        paddingLeft: 10 ,
        paddingRight: 30,
        alignContent: 'center' ,
        alignItems: 'center'
    },

    prodVendor: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 15,
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
        flexDirection: 'row',

        height: 20,
        width: '98%',
        //justifyContent:'center',
        alignItems: 'center',
        justifyContent: 'space-between',


    },




    sideView: {
        width: '65%',
        height: '100%',
        backgroundColor: 'rgba(140, 199, 64, 0.3)',
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
        height: '60%',

        alignItems: 'center',
        justifyContent: 'center',


    },

    offer: {
        height: Dimensions.get('window').height * 0.20,
        width: Dimensions.get('window').width * 1,
        paddingLeft: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },

    fastFoods: {
        height: Dimensions.get('window').height * 0.20,
        width: Dimensions.get('window').width * 1,
        paddingLeft: 20,
        //  backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },

    offerProduct: {

        height: '80%',
        width: '70%',
        overflow: 'hidden',
    },

    Product: {

        height: '100%',
        width: '40%',
        overflow: 'hidden',
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
        height: Dimensions.get('window').height * 0.25,
        width: Dimensions.get('window').width * 1,
    },

    Text: {
        fontFamily: 'Lexend-bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30
    },

    offerText: {
        fontFamily: 'Lexend-bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
        paddingBottom: 5

    },

    offerText1: {
        fontFamily: 'Lexend-bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 17
    },

    subText: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        padding: 2
    },
    subText1: {
        fontFamily: 'Lexend-lighter',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 13
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
    },



});

export default ProductScreen;