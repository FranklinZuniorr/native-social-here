export interface GetLocationsApiRoutesParams {
    lat: number;
    long: number;
    radiusInKm: number;
}

export interface LocationExternal {
    location: {
        coordinates: number[]
    },
    _id: string,
    userName: string,
    createdAt: string,
    updatedAt: string,
}

export interface GetLocationsApiRoutesExternalReturn {
    locations: LocationExternal[];
}
