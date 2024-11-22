import Toast from 'react-native-toast-message';
import { NewLocationApiRoutesExternalReturn, NewLocationApiRoutesParams } from '../interfaces';
import { AxiosError } from 'axios';
import { MessageExternalReturn } from '../../../interfaces';
import { apiClient } from '../../../config/axios';

export class LoginApiRoutes {
    static async newLocation(params: NewLocationApiRoutesParams): Promise<NewLocationApiRoutesExternalReturn> {
        const path: string = 'locations/new-location';

        try {
            const response: NewLocationApiRoutesExternalReturn = (await apiClient.post(path, params)).data;
            return response;
        } catch (error: any) {
            const axiosError: AxiosError = error as AxiosError;
            const response: MessageExternalReturn = axiosError.response?.data as MessageExternalReturn;
            Toast.show({
                type: 'error',
                text1: response.message || 'Login error',
            });
            throw new Error(path);
        }
    }
}
