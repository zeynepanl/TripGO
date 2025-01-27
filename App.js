import React from "react";
import "./global.css";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ScheduleProvider } from "./src/context/ScheduleContext";

export default function App() {
  return (
    <ScheduleProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ScheduleProvider>
  );
}
