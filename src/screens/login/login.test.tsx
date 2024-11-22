import React from 'react';
import { render, screen /* userEvent  */} from '@testing-library/react-native';
import {it, describe, expect} from '@jest/globals';
import { Login } from './login';
import { RootStackParamList } from '../../interfaces';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PAINEL_PATHS } from '../../helpers';

describe('Login', () => {
    /* const user = userEvent.setup(); */
    const Stack = createNativeStackNavigator<RootStackParamList>();
  it('Should render login screen', () => {
    render(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name={PAINEL_PATHS.login.name}
                component={Login}
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

    const title = screen.getByText('Social Here');

    expect(title).toBeTruthy();
  });
});
