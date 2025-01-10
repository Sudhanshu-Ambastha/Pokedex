import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { Welcome, PokemonGrid, PokeData, Evolutions } from '../screens';

const StackNavigator = createNativeStackNavigator(); 

const Home = () => {
  const router = useRouter();

  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Welcome" component={Welcome} />
      <StackNavigator.Screen name="PokemonGrid" component={PokemonGrid} />
      <StackNavigator.Screen name="Evolutions" component={Evolutions} />
      <StackNavigator.Screen name="PokeData" component={PokeData} />
    </StackNavigator.Navigator>
  );
};

export default Home;