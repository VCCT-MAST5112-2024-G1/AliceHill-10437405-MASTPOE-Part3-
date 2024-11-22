import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import AddMenuScreen from './screens/Addmenu';
import FilterMenuScreen from './screens/FilterMenus';
import { TouchableOpacity } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const navigation = useNavigation();
const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        screenOptions={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
        
      
        <Stack.Screen name="Addmenu" 
        component={AddMenuScreen}
        />


        <Stack.Screen name="FilterMenu" 
        component={FilterMenuScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
