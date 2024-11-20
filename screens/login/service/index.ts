import { apiClient } from '../../../config/axios';
import { NewLocationApiRoutesExternalReturn, NewLocationApiRoutesParams } from '../interfaces';

export class LoginApiRoutes {
    static async newLocation(params: NewLocationApiRoutesParams): Promise<NewLocationApiRoutesExternalReturn> {
        const path: string = 'locations/new-location';

        try {
            const response: NewLocationApiRoutesExternalReturn = (await apiClient.post(path, params)).data;
            return response;
        } catch (error: any) {
            throw new Error(path);
        }
    }
}
