import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PlanetsScreen from './PlanetsScreen';
import StarshipsScreen from './StarshipsScreen';
import FilmsScreen from './FilmsScreen';

import PlanetDetailsScreen from './PlanetDetailsScreen';
import StarshipDetailsScreen from './StarshipDetailsScreen';
import FilmDetailsScreen from './FilmDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator for Planets, Starships, and Films
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Planets" component={PlanetsScreen} />
      <Tab.Screen name="Starships" component={StarshipsScreen} />
      <Tab.Screen name="Films" component={FilmsScreen} />
    </Tab.Navigator>
  );
}

// Stack navigator with detail screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Star Wars" component={MainTabs} />
        <Stack.Screen name="PlanetDetails" component={PlanetDetailsScreen} options={{ title: 'Planet Details' }} />
        <Stack.Screen name="StarshipDetails" component={StarshipDetailsScreen} options={{ title: 'Starship Details' }} />
        <Stack.Screen name="FilmDetails" component={FilmDetailsScreen} options={{ title: 'Film Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
