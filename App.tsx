/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PAINEL_PATHS } from './src/helpers';
import { Login } from './src/screens/login';
import { RootStackParamList } from './src/interfaces';
import Geolocation from '@react-native-community/geolocation';
import { Map } from './src/screens/map';
import Toast from 'react-native-toast-message';
import { GlobalStateProvider } from './src/contexts/global-state';

Geolocation.setRNConfiguration({ skipPermissionRequests: false });

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
      <GlobalStateProvider>
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
      </GlobalStateProvider>
  );
}

export default App;
