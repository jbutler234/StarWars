import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlanetsScreen from "./PlanetsScreen";
import SpaceshipsScreen from "./SpaceshipsScreen";
import FilmsScreen from "./FilmsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Planets" component={PlanetsScreen} />
        <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
        <Tab.Screen name="Films" component={FilmsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}