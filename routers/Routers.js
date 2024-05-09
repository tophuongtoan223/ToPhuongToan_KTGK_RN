import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Text, StyleSheet } from 'react-native';
import Login from '../screen/Login'
import Register from '../screen/Register';
import Jobs from '../screen/Jobs';

const Stack = createStackNavigator();

const Routers = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Jobs" component={Jobs}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Routers;