import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import VerificationCode from '../screens/VerificationCode';


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
      <Stack.Screen 
       name="ForgotPassword"
       component={ForgotPassword}
       options={{ headerShown: false }} 
        />
      <Stack.Screen 
       name="VerificationCode"
       component={VerificationCode}
       options={{ headerShown: false }}
        />


      
    </Stack.Navigator>
  );
  
  export default AppNavigator;
  
