import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import VerificationCode from "../screens/VerificationCode";
import LocationServices from "../screens/LocationServices";
import Home from "../screens/Home";
import Discover from "../screens/Discover";
import CityDetails from "../screens/CityDetails";
import Map from "../screens/Map";
import Notes from "../screens/Notes";
import Profile from "../screens/Profile";
import FoodAndDrink from "../screens/FoodAndDrink";
import Hotels from "../screens/Hotels";
import Museum from "../screens/Museum";
import Nature from "../screens/Nature";
import Activities from "../screens/Activities";
import Weather from "../screens/Weather";
import Notifications from "../screens/Notifications";

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

    <Stack.Screen
      name="LocationServices"
      component={LocationServices}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Discover"
      component={Discover}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CityDetails"
      component={CityDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
    <Stack.Screen
      name="Notes"
      component={Notes}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FoodAndDrink"
      component={FoodAndDrink}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Hotels"
      component={Hotels}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Museum"
      component={Museum}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Nature"
      component={Nature}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Activities"
      component={Activities}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Weather"
      component={Weather}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{ headerShown: false }}
    />
    
  </Stack.Navigator>
);

export default AppNavigator;
