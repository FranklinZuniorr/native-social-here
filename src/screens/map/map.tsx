import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BackHandler, Image, SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../interfaces';
import { ENUM_SCREENS_NAMES } from '../../constants';
import { RouteProp } from '@react-navigation/native';
import { useGeolocation } from '../../hooks/useGeolocation';
import { MapApiRoutes } from './service';
import MapView, { Circle, Marker } from 'react-native-maps';
import { stylesMap } from './styles';
import { LocationExternal } from './interfaces';
import BackgroundTimer from 'react-native-background-timer';
import { PAINEL_PATHS } from '../../helpers';
import { PersonMarker } from './components/person-marker';
import { GlobalStateContext } from '../../contexts/global-state';

interface MapProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.MAP>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.MAP>
}

export const Map = ({ navigation }: MapProps) => {
    const { state: { locationId } } = useContext(GlobalStateContext);
    const RADIUS = 5;
    const FIVE_SECONDS = 5000;
    const { coordinates } = useGeolocation();
    const [locations, setLocations] = useState<LocationExternal[]>([]);

    const getLocations = useCallback(async () => {
        try {
            const response = await MapApiRoutes.getLocations({
                radiusInKm: RADIUS,
                long: coordinates[1],
                lat: coordinates[0],
            });
            setLocations(response.locations);
        } catch (error) {
            setLocations([]);
        }
    }, [coordinates]);

    useEffect(() => {
        const interval = setInterval(() => {
            getLocations();
        }, 5000);

        return () => clearInterval(interval);
    }, [getLocations]);

    useEffect(() => {
        BackgroundTimer.runBackgroundTimer(() => {
            MapApiRoutes.updateLocation({ locationId, coordinates });
        }, FIVE_SECONDS);

        return () => BackgroundTimer.stopBackgroundTimer();
    }, [coordinates, locationId]);

    const backAction = useCallback(() => {
        navigation.navigate(PAINEL_PATHS.login.name);
        return true;
    }, [navigation]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );

        return () => backHandler.remove();
      }, [backAction]);

    return (
        <SafeAreaView style={stylesMap.container}>
            <StatusBar
            animated={true}
            backgroundColor="black"
            />
            <View style={stylesMap.bottomContainer}>
                <TouchableOpacity style={stylesMap.backBtn} onPress={() => navigation.navigate(PAINEL_PATHS.login.name)}>
                    <Image
                    source={require('../../assets/images/switch.png')}
                    style={stylesMap.backBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <MapView
            style={stylesMap.map}
            zoomControlEnabled
            region={{
                latitude: coordinates[1],
                longitude: coordinates[0],
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
            >
                 <Circle
                center={{ latitude: coordinates[1], longitude: coordinates[0] }}
                radius = { RADIUS * 1000 }
                strokeColor = "#00000084"
                strokeWidth = { 5 }
                />
                <Marker
                coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
                >
                    <Image
                    source={require('../../assets/images/location.png')}
                    style={{ width: 32, height: 32, resizeMode: 'contain' }}
                    />
                </Marker>

                {
                    locations.map(location => {
                        if (location._id !== locationId) {
                            return <PersonMarker
                            key={location._id}
                            userName={location.userName}
                            lat={location.location.coordinates[1]}
                            long={location.location.coordinates[0]}
                            />;
                        }
                    })
                }
            </MapView>
        </SafeAreaView>
    );
};
