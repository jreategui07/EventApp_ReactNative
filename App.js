import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import GenericTabNavigator from './UI/Components/GenericTabNavigator';

// Views
import SignInScreen from './View/SignInScreen';
import SignUpScreen from './View/SignUpScreen';
import HomeScreen from './View/HomeScreen';
import FavouriteListScreen from './View/FavouriteListScreen';
import EventDetailsScreen from './View/EventDetailsScreen';

// ViewModel
import useAuthViewModel from './ViewModel/AuthViewModel';

const Stack = createNativeStackNavigator();

export default function App() {
  const { signOut } = useAuthViewModel();

  const tabScreens = [
    {
      name: 'Home',
      component: HomeScreen,
      icon: { active: 'home', inactive: 'home' },
    },
    {
      name: 'My Favorites',
      component: FavouriteListScreen,
      icon: { active: 'heart', inactive: 'heart-o' },
    },
  ];

  const headerOptions = (navigation) => ({
    headerStyle: { backgroundColor: '#007BFF' },
    headerTintColor: '#FFFFFF',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
    headerRight: () => (
      <Button
        title="Logout"
        // color="#FFFFFF"
        onPress={async () => {
          try {
            await signOut();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              })
            );
          } catch (error) {
            console.error('Error during logout:', error);
          }
        }}
      />
    ),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="MainScreen"
          options={
            ({ navigation }) => headerOptions(navigation)
          }
        >
          {() => (
            <GenericTabNavigator
              screens={tabScreens}
              activeColor="#FFFFFF"
              inactiveColor="#D3D3D3"
              tabBarStyle={{
                backgroundColor: '#007BFF',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                paddingBottom: 5,
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="FavouriteList"
          component={FavouriteListScreen}
          options={
            ({ navigation }) => headerOptions(navigation)
          }
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
          options={
            ({ navigation }) => headerOptions(navigation)
          }
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
