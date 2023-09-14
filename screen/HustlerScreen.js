import React from 'react';
import { View, StyleSheet, Image, ImageBackground, FlatList, Text, TouchableOpacity } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';

const HustlerScreen = ({ navigation }) => {




    return (


        <View style={styles.container}>


            <View style={styles.iconView}>
                <Icon
                    type="material-community"
                    name="menu"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />





            </View>

            <View style={styles.userIcon}>
                <Icon
                    type="material-community"
                    name="account"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.navigate("RequestScreen", { state: 0 }) }}
                />





            </View>
            <ImageBackground
                source={require('../assets/4k-background.png')}
                resizeMode="cover"
                style={styles.imageBackground}
            >

                <View style={styles.gridView}>

                    





                    <View style={styles.anchor}>
                        <View style={styles.textView}>
                            <TitleText style={styles.Text}>Find Hustlers Ready to Serve You</TitleText>

                        </View>


                        <View style={styles.list}>

                            <TouchableOpacity onPress={() => { navigation.navigate("ProductScreen", { state: 0 }) }}>
                                <View style={styles.vendorsView}>

                                    <Card style={styles.imageCard}>

                                        <View style={styles.imageView}>
                                            <Image
                                                source={require('../assets/logo.png')}
                                                style={styles.image}
                                            // resizeMode="cover" 
                                            />

                                        </View>

                                        <View style={styles.textView}>
                                            <BodyText style={styles.text}>Foods and Drinks</BodyText>

                                        </View>

                                    </Card>

                                </View>
                            </TouchableOpacity>

                           

                        </View>

                       


                    </View>








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

    anchor: {



        zIndex: 30,
        position: 'absolute',
        bottom: 92,




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

    imageCard: {
        //shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        //paddingLeft: 0,
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        //borderColor: 'black',
        //overflow: 'hidden',
        justifyContent: 'space-between',
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //   backgroundColor: 'blue'

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


    list: {
        paddingTop: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
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


    image: {
        height: Dimensions.get('window').width * 0.08,
        width: Dimensions.get('window').width * 0.08,

    },

    imageView: {
        //flex: 1,
        backgroundColor: '#17304A',
        alignItems: 'center',
        justifyContent: 'center',
        //  paddingLeft: '40%',
        height: Dimensions.get('window').width * 0.21,
        width: Dimensions.get('window').width * 0.21,
        borderRadius: 120,


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
        paddingTop: '10%'
    },


    gridView: {


        // zIndex: 30,
        //position: 'absolute',
        //bottom: 0,
        //width: Dimensions.get('window').width * 1,
        //justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.95,

    },

    buttonText: {
        fontWeight: 'bold',

    },


    vendorsView: {
        paddingVertical: Dimensions.get('window').width * 0.01,
        paddingHorizontal: Dimensions.get('window').width * 0.01,
        //backgroundColor: 'blue'
    }



});

export default HustlerScreen;