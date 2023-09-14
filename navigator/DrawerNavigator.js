import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeStack } from './StackNavigator'
import { Icon } from 'react-native-elements'
import { colors } from '../global/styles'
import { auth } from '../Database/config'


const Drawer = createDrawerNavigator()

export default function DrawerNavigator(){

  
      
    return(
        <Drawer.Navigator  useLegacyImplementation={true}>
            <Drawer.Screen
                name = "HomeStack"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Doe',
                    drawerLabelStyle: {
                     fontSize: 20,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "account"
                                                         color = "grey"
                                                         size = {80}
                                                         
                                                          />,  
                                                          
                     headerShown : false
                     
                }}
            />

<Drawer.Screen
                name = "Wallet"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Wallet',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "wallet"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Support"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'Support',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "face-agent"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />
             
             <Drawer.Screen
                name = "About Us"
                component = {HomeStack}
                options = {{
                  
                    drawerLabel: 'About Us',
                    drawerLabelStyle: {
                     fontSize: 15,
                     color: '#17304A',
                     fontWeight: 'bold',
                     fontFamily: 'Lexend-bold'
                   },
                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "information"
                                                         color= "#17304A"
                                                         size = {size}
                                                         
                                                          />,  
                     headerShown : false
                     
                }}
                onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}
            />

<Drawer.Screen
                name = "Logout"
                component = {HomeStack}
                options = {{
                  
                   drawerLabel: 'Logout',
                   drawerLabelStyle: {
                    fontSize: 15,
                    color: '#17304A',
                    fontWeight: 'bold',
                    fontFamily: 'Lexend-bold'
                  },
                   


                    drawerIcon : ({focused,size})=><Icon type="material-community" 
                                                         name = "logout"
                                                         color= "#17304A"
                                                         size = {size}
                                                          />,  
                     headerShown : false,
                    screenName: 'My Home'
                     
                }}
            />
             
             
        </Drawer.Navigator>
    )
}