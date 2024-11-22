import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { ChatApiServiceExternalReturn, GetAllChatsChatApiServiceParams, NewChatApiServiceParams } from './interfaces';
import { apiClient } from '../../config/axios';
import { MessageExternalReturn } from '../../interfaces';

export class ChatApiService {
    static async new(params: NewChatApiServiceParams) {
        const path: string = '/chats/new-chat';

        try {
            await apiClient.post(path, params);
        } catch (error: any) {
            const axiosError: AxiosError = error as AxiosError;
            const response: MessageExternalReturn = axiosError.response?.data as MessageExternalReturn;
            Toast.show({
                type: 'error',
                text1: response.message || 'New chat error',
            });
            throw new Error(path);
        }
    }

    static async getAll(params: GetAllChatsChatApiServiceParams): Promise<ChatApiServiceExternalReturn> {
        const path: string = '/chats/chats-by-coordinates';

        try {
            const response: ChatApiServiceExternalReturn = (await apiClient.get(path, { params })).data;
            return response;
        } catch (error: any) {
            throw new Error(path);
        }
    }
}
