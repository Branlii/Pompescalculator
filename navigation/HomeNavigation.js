import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Components/HomeScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Pompes calculator" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }