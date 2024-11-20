/* import { NativeStackNavigationProp } from '@react-navigation/native-stack'; */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
/* import { RootStackParamList } from '../../interfaces';
import { ENUM_SCREENS_NAMES } from '../../constants';
import { RouteProp } from '@react-navigation/native'; */
import { useGeolocation } from '../../hooks/useGeolocation';
import { MapApiRoutes } from './service';
import MapView, { Circle, Marker } from 'react-native-maps';
import { stylesMap } from './styles';
import { LocationExternal } from './interfaces';

/* interface MapProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.MAP>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.MAP>
} */

export const Map = () => {
    /* const { id: locationId } = useContext(LocationIdContext); */
    const RADIUS = 1000;
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

    return (
        <SafeAreaView style={stylesMap.container}>
            <View style={stylesMap.bottomContainer}><Text>OI</Text></View>
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
                    locations.map(location => (
                        <Marker
                        key={location._id}
                        coordinate={{ latitude: location.location.coordinates[1], longitude: location.location.coordinates[0] }}
                        >
                            <Image
                            source={require('../../assets/images/person.png')}
                            style={{ width: 35, height: 35, resizeMode: 'contain' }}
                            />
                        </Marker>
                    ))
                }
            </MapView>
        </SafeAreaView>
    );
};
