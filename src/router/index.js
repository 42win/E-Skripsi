import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Home, About, Skripsi, Upload, Profile, ProfileEdit, ChangePass, Login, Register, SkripsiDetail, mySkripsi, mySkripsiEdit, Preview} from '../pages';
 
const Stack = createNativeStackNavigator();
 
const Router = () => {
   
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Skripsi"
        component={Skripsi}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SkripsiDetail"
        component={SkripsiDetail}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="mySkripsi"
        component={mySkripsi}
        options={{title: 'My Skripsi '}} 
      />

      <Stack.Screen
        name="mySkripsiEdit"
        component={mySkripsiEdit}
        options={{title: 'Edit Data '}} 
      />
 
      <Stack.Screen
        name="Upload"
        component={Upload}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{title: 'Edit Profile '}} />

      <Stack.Screen
        name="ChangePass"
        component={ChangePass}
        options={{title: 'Change Password '}} />

        
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}/>

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}/>


      <Stack.Screen
        name="Preview"
        component={Preview} 
        options={{title: 'Preview '}} />

    </Stack.Navigator>
  );
};

export default Router;
