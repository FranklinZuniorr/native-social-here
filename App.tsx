/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PAINEL_PATHS } from './helpers';
import { Login } from './screens/login';
import { RootStackParamList } from './interfaces';
import Geolocation from '@react-native-community/geolocation';
import { LocationIdProvider } from './contexts/location-id';
import { Map } from './screens/map';
import Toast from 'react-native-toast-message';

Geolocation.setRNConfiguration({ skipPermissionRequests: false });

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
      <LocationIdProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={PAINEL_PATHS.login.name}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={PAINEL_PATHS.map.name}
              component={Map}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </LocationIdProvider>
  );
}

export default App;
