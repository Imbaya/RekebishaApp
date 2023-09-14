import React from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';


const VendorMenuScreen = ({ navigation }) => {


    const renderGridItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <Services
                name={itemData.item.name}

                image={itemData.item.image}
                onSelect={() => { navigation.navigate("HustlerScreen", { state: 0 }) }}


            />
        )
    }

    return (


        <View style={styles.container}>





            <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                <View style={styles.icons}>


                    <TouchableOpacity>
                        <View style={styles.back}>

                            <View
                                style={styles.iconView}
                            >
                                <Icon
                                    type="material-community"
                                    name="arrow-left"
                                    color="white"
                                    size={35}
                                    onPress={() => { navigation.navigate("ProductScreen", { state: 0 }) }}
                                />






                            </View>

                            <TitleText style={styles.subText}>Back</TitleText>
                        </View>
                    </TouchableOpacity>


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



                <View style={styles.gridView}>








                    <Card style={styles.card}>


                        <View style={styles.detailsview}>


                            <Card style={styles.imagecard}>
                                <Image
                                    source={require('../assets/Rectangle 1986.png')}
                                    style={styles.prodImage}
                                    resizeMode="cover"
                                />


                            </Card>

                            <View style={styles.nameView}>
                                <TitleText style={styles.titleText}>Kibandaski</TitleText>
                                <TitleText style={styles.subText}>4.8</TitleText>
                            </View>

                            <View style={styles.detailsView}>
                                <TitleText style={styles.subtitleText}>Chips and 1/4 Chicken</TitleText>
                                <TitleText style={styles.subtitleText}>KES 300</TitleText>
                            </View>

                            <View style={styles.addView}>
                                <TitleText style={styles.subText}>15-20 mins</TitleText>



                                <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => { navigation.navigate("CheckoutScreen", { state: 0 }) }}>

                                        


                                            <TitleText style={styles.prodName}>ADD</TitleText>


                                        

                                    </TouchableOpacity>
                                </View>
                            </View>




                        </View>

                        <TitleText style={styles.TitleText}>On The Menu</TitleText>

                        <View style={styles.nameView}>
                            <TitleText style={styles.bodyText}>Full Chicken</TitleText>
                            <TitleText style={styles.subtitleText}>KES 1,200</TitleText>
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

    buttonView: {


        // zIndex: 30,
        // position: 'absolute',
        // bottom: 92,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 100,
       // height: '100%',
        backgroundColor: '#8CC740'

    },

    icons: {
        position: 'absolute',
        top: 10,
        height: '13%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 30,
        alignContent: 'center',
        alignItems: 'center'
    },

    back: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },

    iconView: {

        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

    },

    titleText: {
        fontFamily: 'Lexend-light',

        fontSize: 20,

    },

    TitleText: {
        fontFamily: 'Lexend-light',
        color: '#8CC740',
        fontSize: 20,
        padding: 7

    },

    bodyText: {
        fontFamily: 'Lexend-light',

        fontSize: 17,

    },

    subtitleText: {
        fontFamily: 'Lexend-light',

        fontSize: 17,

    },

    subText: {
        fontFamily: 'Lexend-lighter',

        fontSize: 15,

    },

    searchButton: {
        // height: '100%',
        width: '70%',
        alignContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2
    },

    prodVendor: {
        fontFamily: 'Lexend-light',
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 15,
        padding: 2
    },

    button: {
        //   flex: 1,


        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        height: 25,
        shadowOpacity: 0.2,
        backgroundColor: '#8CC740'
    },


    nameView: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        padding: 5
    },


    detailsView: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 5,
        //paddingBottom: 20
    },

    addView: {
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
        paddingTop: 5,
        paddingHorizontal: 5
    },


    detailsview: {
        backgroundColor: '#F5F2F0',
        height: '35%'
    },

    imagecard: {
        height: '60%',
        borderRadius: 40,
        shadowOpacity: 0.05,
    },


    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    prodImage: {
        height: Dimensions.get('window').width * 0.08,
        width: Dimensions.get('window').width * 0.08,

    },

    card: {
        flex: 1,
        // backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        //justifyContent: 'center',
        //  alignItems: 'center',
        borderRadius: 50,
        height: Dimensions.get('window').height * 0.85,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'

    },

    gridView: {


        //zIndex: 30,
        //position: 'absolute',
        //bottom: 0,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        //borderRadius: 40,
        height: Dimensions.get('window').height,

    },




});

export default VendorMenuScreen;