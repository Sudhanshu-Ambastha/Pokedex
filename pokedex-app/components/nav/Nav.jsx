import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonSearchApp from './src/components/PokemonSearchApp';
import PokemonGrid from './src/components/grid/Grid';
import Error from './src/components/error/Error';
import Welcome from '../welcome/Welcome';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonSearch">
      <Stack.Screen name="Welcome" component={Welcome} />
       <Stack.Screen name="Home" component={PokemonGrid} />
        <Stack.Screen name="PokemonSearch" component={PokemonSearchApp} />
        <Stack.Screen name="EvolutionPage" component={EvolutionPage} />
        <Stack.Screen name="Error" component={Error} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
