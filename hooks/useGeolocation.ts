import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';

interface UseGeolocationProps {
    hasGeolocationAccess: boolean;
    coordinates: number[];
}

export const useGeolocation = (): UseGeolocationProps => {
    const [coordinates, setCoordinates] = useState<number[]>([0, 0]);
    const [hasGeolocationAccess, setHasGeolocationAccess] = useState<boolean>(false);

    Geolocation.requestAuthorization(() => {
        setHasGeolocationAccess(true);
    }, () => {
        setHasGeolocationAccess(false);
    });

    Geolocation.watchPosition(info => {
        setCoordinates([info.coords.latitude, info.coords.longitude]);
    }, () => {
        setCoordinates([0, 0]);
    });

    return { hasGeolocationAccess, coordinates };
};
