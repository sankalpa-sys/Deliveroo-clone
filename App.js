import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './Screen/HomeScreen';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux'
import { store } from './store'
import BasketScreen from './screens/BasketScreen';
import PreparingScreen from './screens/PreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Provider store={store}>
    <TailwindProvider>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Basket" component={BasketScreen} options={{
          presentation:'modal', headerShown:false
        }} />
        <Stack.Screen name="PreparingOrderScreen" component={PreparingScreen} options={{
          presentation:'fullScreenModal', headerShown:false
        }} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} options={{
          presentation:'fullScreenModal', headerShown:false
        }} />
      </Stack.Navigator>
    </TailwindProvider>
    </Provider>
    </NavigationContainer>
  );
}

