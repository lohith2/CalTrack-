import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import MainScreen from './MainScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

const App = () => { return (
  <View   style={{
    overflowY: 'scroll',
    flex: 1,
    backgroundColor: '#add8e6',
    margin: -15,         
    padding: -15,       
    width: '100%',      
  }}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#add8e6', 
},
});

export default App;