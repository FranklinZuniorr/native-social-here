import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Importar o hook
import { useGeolocation } from './useGeolocation';
import { FIVE_SECONDS, RADIUS } from '../constants';
import { ChatApiServiceExternalReturn, ChatExternal } from '../services/chat/interfaces';
import { ChatApiService } from '../services/chat';
import Toast from 'react-native-toast-message';

interface UseHasNewMessagesReturn {
    chats: ChatExternal[];
}

export const useHasNewMessages = (): UseHasNewMessagesReturn => {
    const { coordinates } = useGeolocation();
    const [chats, setChats] = useState<ChatExternal[]>([]);

    const getAllChats = useCallback(async () => {
        try {
            const response: ChatApiServiceExternalReturn =
                await ChatApiService.getAll({ lat: coordinates[0], long: coordinates[1], radiusInKm: RADIUS });
            setChats(response.chats);

            if (response.chats.length > chats.length && chats.length > 0) {
                const lastMessage = response.chats[response.chats.length - 1];
                Toast.show({
                    type: 'success',
                    text1: lastMessage.userName,
                    text2: lastMessage.message,
                });
            }
        } catch (error) {
            setChats([]);
        }
    }, [coordinates, chats]);

    useFocusEffect(
        useCallback(() => {
            const interval = setInterval(() => {
                getAllChats();
            }, FIVE_SECONDS);
            return () => clearInterval(interval);
        }, [getAllChats])
    );

    return { chats };
};
