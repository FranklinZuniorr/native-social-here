import { apiClient } from '../../../config/axios';
import { GetLocationsApiRoutesExternalReturn, GetLocationsApiRoutesParams } from '../interfaces';

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
}
