import Toast from 'react-native-toast-message';
import { apiClient } from '../../../config/axios';
import { NewLocationApiRoutesExternalReturn, NewLocationApiRoutesParams } from '../interfaces';
import { AxiosError } from 'axios';
import { MessageExternalReturn } from '../../../interfaces';

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
                text1: response.message,
            });
            throw new Error(path);
        }
    }
}
