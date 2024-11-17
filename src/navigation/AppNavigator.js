import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ headerShown: false }} 
      />
      
    </Stack.Navigator>
  );
  
  export default AppNavigator;
  
