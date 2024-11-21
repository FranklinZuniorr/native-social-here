import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';

interface PersonMarkerProps {
    lat: number;
    long: number;
    userName: string;
}

export const PersonMarker = ({ lat, long, userName }: PersonMarkerProps) => {
    return (
        <Marker
            coordinate={{ latitude: lat, longitude: long }}
            title={userName}
        >
            <Image
            source={require('../../../../assets/images/person.png')}
            style={{ width: 35, height: 35, resizeMode: 'contain' }}
            />
        </Marker>
    );
};
