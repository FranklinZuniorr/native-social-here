import Mapbox from '@rnmapbox/maps';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { stylesPersonMarker } from './styles';

interface PersonMarkerProps {
    id: string;
    lat: number;
    long: number;
    userName: string;
}

export const PersonMarker = ({ lat, long, userName, id }: PersonMarkerProps) => {
    return (
        <Mapbox.MarkerView id={id} coordinate={[long, lat]} allowOverlap>
            <View style={stylesPersonMarker.container}>
                <Image
                style={stylesPersonMarker.image}
                source={require('../../../../assets/images/person1.png')}
                />

                <View >
                    <Text style={stylesPersonMarker.title}>{userName}</Text>
                </View>
            </View>
        </Mapbox.MarkerView>
    );
};
