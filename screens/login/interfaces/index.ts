export interface NewLocationApiRoutesParams {
    userName: string;
    location: {
        coordinates: number[]
    };
}

export interface NewLocationApiRoutesExternalReturn {
    message: string;
    locationId: string;
}
