/* eslint-disable react-native/no-inline-styles */
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BackHandler, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../interfaces';
import { ENUM_SCREENS_NAMES, RADIUS } from '../../constants';
import { RouteProp } from '@react-navigation/native';
import { useGeolocation } from '../../hooks/useGeolocation';
import { MapApiRoutes } from './service';
import { stylesMap } from './styles';
import { LocationExternal } from './interfaces';
import BackgroundTimer from 'react-native-background-timer';
import { PAINEL_PATHS } from '../../helpers';
import { GlobalStateContext } from '../../contexts/global-state';
import Mapbox from '@rnmapbox/maps';
import { PersonMarker } from './components/person-marker';
import { convertKmToPixels } from './helpers';
import { useHasNewMessages } from '../../hooks/useHasNewMessages';
import * as Progress from 'react-native-progress';

Mapbox.setAccessToken('pk.eyJ1IjoicWRmcmFua2xpbiIsImEiOiJjbHMzb3JwdmIwb3g1MmpuNDUyMjByMnRrIn0.DzYyrtgJtNETXiLmg_lD3Q');

interface MapProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.MAP>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.MAP>
}

export const Map = ({ navigation }: MapProps) => {
    const { state: { locationId, isRunningUpdateLocationBackground }, dispatch } = useContext(GlobalStateContext);
    const FIVE_SECONDS = 5000;
    const { coordinates } = useGeolocation();
    const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);
    const [locations, setLocations] = useState<LocationExternal[]>([]);
    const [zoomLevelMap, setZoomLevelMap] = useState<number>(10);
    useHasNewMessages();

    const increaseZoom = () => {
        setZoomLevelMap((prevZoom) => Math.min(prevZoom + 1, 15));
    };

    const decreaseZoom = () => {
        setZoomLevelMap((prevZoom) => Math.max(prevZoom - 1, 0));
    };

    const getLocations = useCallback(async () => {
        try {
            const response = await MapApiRoutes.getLocations({
                radiusInKm: RADIUS,
                long: coordinates[1],
                lat: coordinates[0],
            });
            setLocations(response.locations);

            if (response.locations.length > 0) {
                setIsLoadingMap(false);
            }
        } catch (error) {
            setLocations([]);
        }
    }, [coordinates]);

    /* useEffect(() => {
        const interval = setInterval(() => {
            getLocations();
        }, FIVE_SECONDS);

        return () => clearInterval(interval);
    }, [getLocations]); */

    useEffect(() => {
        console.warn(coordinates);
        if ( isRunningUpdateLocationBackground) {
            console.warn('bateu');
            return;
        }

        BackgroundTimer.runBackgroundTimer(() => {
            console.warn(34234);
            dispatch({ type: 'SET_IS_RUNNING_UPDATE_LOCATION_BACKGROUND', payload: true });
            MapApiRoutes.updateLocation({ locationId, coordinates });
        }, FIVE_SECONDS);
    }, [coordinates, locationId, isRunningUpdateLocationBackground, dispatch]);

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
            {
                isLoadingMap &&
                <View style={stylesMap.loadingMap}>
                    <Progress.Circle size={30} indeterminate={true} borderWidth={5} borderColor="white" />
                </View>
            }
            <View style={stylesMap.qtyLocationsContainer}>
                <Text style={stylesMap.qtyText}>{locations.length}</Text>
                <Image
                source={require('../../assets/images/person1.png')}
                style={stylesMap.qtyImg}
                />
            </View>
            <View style={stylesMap.bottomContainer}>
                <TouchableOpacity style={stylesMap.btn} onPress={() => navigation.navigate(PAINEL_PATHS.login.name)}>
                    <Image
                    source={require('../../assets/images/switch.png')}
                    style={stylesMap.backBtnImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={stylesMap.btn} onPress={increaseZoom}>
                    <Image
                    source={require('../../assets/images/plus.png')}
                    style={stylesMap.backBtnImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={stylesMap.btn} onPress={decreaseZoom}>
                    <Image
                    source={require('../../assets/images/minus.png')}
                    style={stylesMap.backBtnImage}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={stylesMap.btn} onPress={() => navigation.navigate(PAINEL_PATHS.chat.name)}>
                    <Image
                    source={require('../../assets/images/chat.png')}
                    style={stylesMap.backBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <Mapbox.MapView
            style={stylesMap.map}
            logoEnabled={false}
            onCameraChanged={ev => {
                if (ev.gestures.isGestureActive) {
                    setZoomLevelMap(ev.properties.zoom);
                }
            }}
            >
                <Mapbox.Camera centerCoordinate={coordinates} maxZoomLevel={15} zoomLevel={zoomLevelMap} followZoomLevel={zoomLevelMap}/>
                <Mapbox.UserLocation/>
                <Mapbox.ShapeSource
                id="circleSource"
                shape={{
                    type: 'Point',
                    coordinates: coordinates,
                }}
                >
                    <Mapbox.CircleLayer
                        id="circleLayer"
                        style={{
                            circleRadius: convertKmToPixels(RADIUS, zoomLevelMap, coordinates[1]),
                            circleColor: '#ffffff4c',
                            circleStrokeWidth: 3,
                            circleStrokeColor: 'rgba(0, 122, 255, 1)',
                        }}
                    />
                </Mapbox.ShapeSource>

                {
                    locations.map(location => {
                        if (location._id !== locationId) {
                            return <PersonMarker
                            id={location._id}
                            key={location._id}
                            userName={location.userName}
                            lat={location.location.coordinates[1]}
                            long={location.location.coordinates[0]}
                            />;
                        }
                    })
                }
            </Mapbox.MapView>
        </SafeAreaView>
    );
};
