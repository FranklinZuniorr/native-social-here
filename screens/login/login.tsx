import { RouteProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Image, SafeAreaView,  StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../../interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ENUM_SCREENS_NAMES } from '../../constants';
import { stylesLogin } from './styles';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as Progress from 'react-native-progress';
import { LocationIdContext } from '../../contexts/location-id';
import { LoginApiRoutes } from './service';
import { PAINEL_PATHS } from '../../helpers';

interface LoginProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.LOGIN>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.LOGIN>
}

export const Login = ({ navigation }: LoginProps) => {
    const { setId } = useContext(LocationIdContext);
    const { hasGeolocationAccess, coordinates } = useGeolocation();
    const [textInput, setTextInput] = useState<string>('');
    const [inputErrorText, setInputErrorText] = useState<string>('');
    const [isLoadingSubmitBtn, setIsLoadingSubmitBtn] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (textInput.length < 10) {
            setInputErrorText('Insert minimum 10 characters!');
            return;
        }

        setInputErrorText('');
        setIsLoadingSubmitBtn(true);

        try {
            const response = await LoginApiRoutes.newLocation({ userName: textInput, location: { coordinates } });

            setIsLoadingSubmitBtn(false);
            setId(response.locationId);
            navigation.navigate(PAINEL_PATHS.map.name);
        } catch (error: any) {
            setIsLoadingSubmitBtn(false);
        }

    };

    return (
        <SafeAreaView style={stylesLogin.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={Colors.white} />
            <View style={stylesLogin.content}>
                <Image
                style={stylesLogin.logo}
                source={require('../../assets/images/location.png')}
                />
                <Text style={stylesLogin.text}>Social Here</Text>
                <TextInput
                style={stylesLogin.input}
                onChangeText={setTextInput}
                value={textInput}
                placeholder="Username"
                />
                {
                    inputErrorText && <Text style={stylesLogin.textInputError}>{inputErrorText}</Text>
                }
                <TouchableOpacity
                onPress={handleSubmit}
                disabled={!hasGeolocationAccess}
                style={stylesLogin.appButtonContainer}
                >
                    {
                        (hasGeolocationAccess && !isLoadingSubmitBtn) &&
                        <Text style={stylesLogin.appButtonText}>Join</Text>
                    }
                    {
                        (!hasGeolocationAccess || isLoadingSubmitBtn) &&
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
