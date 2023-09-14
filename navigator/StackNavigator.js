import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen'
import RequestScreen from '../screen/RequestScreen'
import DescriptionScreen from '../screen/DescriptionScreen';
import ListingScreen from '../screen/ListingScreen';
import LoginScreen from '../screen/LoginScreen';
import QuoteScreen from '../screen/QuoteScreen';
import ConfirmScreen from '../screen/ConfirmScreen';
import CompletedScreen from '../screen/DotDot/Completed';
import SignUpScreen from '../screen/SignUp';
import HustlerCart from '../Hustler/HustlerCart';
import ProductScreen from '../screen/ProductScreen';
import VendorMenuScreen from '../screen/VendorMenuScreen';
import CheckoutScreen from '../screen/CheckoutScreen';
import DotDotScreen from '../screen/DotDotProducts';
import DotDotCart from '../screen/DotDotCart';
import DotDotCheckout from '../screen/DotDot/DotDotCheckout';
import LoadingScreen from '../components/Loading';
import ArrivedScreen from '../screen/ArrivedScreen';
import DoneScreen from '../screen/JobDone';
import RatingScreen from '../screen/Rating';
import MapScreen from '../screen/DotDot/MapScreen';
import DotDotOfferCart from '../screen/DotDot/CartOfferProducts';
import FundiLoadingScreen from '../components/FundiLoading';
import HustlerScreen from '../Hustler/HustlerProducts';
import HustlerRatingScreen from '../Hustler/Rating';
import FundiLocation from '../screen/Fundilocation';
import HustlerList from '../Hustler/HustlerList';


const Home = createNativeStackNavigator();

export function HomeStack() {
    return (
        <Home.Navigator>

            <Home.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="RequestScreen"
                component={RequestScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="DescriptionScreen"
                component={DescriptionScreen}
                options={{ headerShown: false }}
            />
             <Home.Screen
                name="FundiLoadingScreen"
                component={FundiLoadingScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="ListingScreen"
                component={ListingScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="QuoteScreen"
                component={QuoteScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="ArrivedScreen"
                component={ArrivedScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="DoneScreen"
                component={DoneScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="RatingScreen"
                component={RatingScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="ConfirmScreen"
                component={ConfirmScreen}
                options={{ headerShown: false }}
            />



            <Home.Screen
                name="HustlerScreen"
                component={HustlerScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="VendorMenuScreen"
                component={VendorMenuScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{ headerShown: false }}
            />


            <Home.Screen
                name="DotDotScreen"
                component={DotDotScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="DotDotCart"
                component={DotDotCart}
                options={{ headerShown: false }}
            />
              <Home.Screen
                name="DotDotOfferCart"
                component={DotDotOfferCart}
                options={{ headerShown: false }}
            />
            <Home.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="DotDotCheckout"
                component={DotDotCheckout}
                options={{ headerShown: false }}
            />
             <Home.Screen
                name="DotDotMap"
                component={MapScreen}
                options={{ headerShown: false }}
            />
            <Home.Screen
                name="CompletedScreen"
                component={CompletedScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="HustlerCart"
                component={HustlerCart}
                options={{ headerShown: false }}
            />



<Home.Screen
                name="HustlerRatingScreen"
                component={HustlerRatingScreen}
                options={{ headerShown: false }}
            />
            <Home.Screen
                name="FundiLocationScreen"
                component={FundiLocation}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="HustlerList"
                component={HustlerList}
                options={{ headerShown: false }}
            />


        </Home.Navigator>
    )
}