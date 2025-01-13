import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome, PokemonGrid, PokeData, Evolutions, Error } from './screens/index.js';

const StackNavigator = createNativeStackNavigator(); 

const Home = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Welcome" component={Welcome} />
      <StackNavigator.Screen name="PokemonGrid" component={PokemonGrid} />
      <StackNavigator.Screen name="PokeData" component={PokeData} />
      <StackNavigator.Screen name="Evolutions" component={Evolutions} />
      <StackNavigator.Screen name="Error" component={Error} />
    </StackNavigator.Navigator>
  );
};

export default Home;
