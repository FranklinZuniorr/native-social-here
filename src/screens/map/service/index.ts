import { AxiosError } from 'axios';
import { GetLocationsApiRoutesExternalReturn, GetLocationsApiRoutesParams, UpdateLocationApiRoutesParams } from '../interfaces';
import { MessageExternalReturn } from '../../../interfaces';
import Toast from 'react-native-toast-message';
import { apiClient } from '../../../config/axios';

export class MapApiRoutes {
    static async getLocations(params: GetLocationsApiRoutesParams): Promise<GetLocationsApiRoutesExternalReturn> {
        const path: string = 'locations/locations-by-coordinates';

        try {
            const response: GetLocationsApiRoutesExternalReturn = (await apiClient.get(path, { params })).data;
            return response;
        } catch (error: any) {
            throw new Error(path);
        }
    }

    static async updateLocation(params: UpdateLocationApiRoutesParams) {
        const path: string = 'locations/location';

        try {
            await apiClient.put(path, params);
        } catch (error: any) {
            const axiosError: AxiosError = error as AxiosError;
            const response: MessageExternalReturn = axiosError.response?.data as MessageExternalReturn;
            Toast.show({
                type: 'error',
                text1: response.message || 'Locations error',
            });
            throw new Error(path);
        }
    }
}
