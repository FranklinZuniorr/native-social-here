import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView,  StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../../interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ENUM_SCREENS_NAMES } from '../../constants';
import { stylesLogin } from './styles';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as Progress from 'react-native-progress';

interface LoginProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.LOGIN>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.LOGIN>
}

export const Login = ({ navigation, route }: LoginProps) => {
    const { hasGeolocationAccess } = useGeolocation();
    const [textInput, setTextInput] = useState<string>('');

    useEffect(() => {
        navigation.isFocused();
        route.params;
    });

    return (
        <SafeAreaView style={stylesLogin.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={Colors.white} />
            <View style={stylesLogin.content}>
                <Text style={stylesLogin.text}>Social Here</Text>
                <TextInput
                style={stylesLogin.input}
                onChangeText={setTextInput}
                value={textInput}
                placeholder="Username"
                />
                <TouchableOpacity
                disabled={!hasGeolocationAccess}
                style={stylesLogin.appButtonContainer}
                >
                    {
                        hasGeolocationAccess ?
                        <Text style={stylesLogin.appButtonText}>Join</Text> :
                        <Progress.Circle size={30} indeterminate={true} borderWidth={5} borderColor="white" />
                    }
                </TouchableOpacity>
                {
                    !hasGeolocationAccess &&
                    <Text style={stylesLogin.textInfoPermissionGeolocation}>Please, allow geolocation access in permissions configurations!</Text>
                }
            </View>
        </SafeAreaView>
      );
};
