import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../interfaces';
import { ENUM_SCREENS_NAMES, FIVE_SECONDS } from '../../constants';
import { RouteProp } from '@react-navigation/native';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { stylesChat } from './styles';
import { Message } from './components/message';
import { GlobalStateContext } from '../../contexts/global-state';
import { useGeolocation } from '../../hooks/useGeolocation';
import * as Progress from 'react-native-progress';
import { PAINEL_PATHS } from '../../helpers';
import { ChatApiServiceExternalReturn, ChatExternal } from '../../services/chat/interfaces';
import { ChatApiService } from '../../services/chat';

interface ChatProps {
    navigation: NativeStackNavigationProp<RootStackParamList, ENUM_SCREENS_NAMES.CHAT>,
    route: RouteProp<RootStackParamList, ENUM_SCREENS_NAMES.CHAT>
}

export const Chat = ({ navigation }: ChatProps) => {
    const RADIUS = 10;
    const { state: { userName } } = useContext(GlobalStateContext);
    const { coordinates } = useGeolocation();
    const [chats, setChats] = useState<ChatExternal[]>([]);
    const [inputMessageText, setInputMessageText] = useState<string>('');
    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState<boolean>(false);
    const [isLoadingChats, setIsLoadingChats] = useState<boolean>(true);

    const getAllChats = useCallback(async () => {
        try {
            const response: ChatApiServiceExternalReturn =
            await ChatApiService.getAll({ lat: coordinates[0], long: coordinates[1], radiusInKm: RADIUS });
            setChats(response.chats);

            if (response.chats.length > 0) {
                setIsLoadingChats(false);
            }
        } catch (error) {
            setIsLoadingChats(true);
        }
    }, [coordinates]);

    const sendMessage = useCallback(async () => {
        try {
            setIsLoadingSendMessage(true);
            await ChatApiService.new({ userName, location: { coordinates }, message: inputMessageText });
            await getAllChats();
            setInputMessageText('');
        } catch (error) {
            throw new Error('Not was possible send message!');
        } finally {
            setIsLoadingSendMessage(false);
        }
    }, [coordinates, inputMessageText, userName, getAllChats]);

    useEffect(() => {
        getAllChats();
        const interval = setInterval(() => {
            getAllChats();
        }, FIVE_SECONDS);

        return () => clearInterval(interval);
    }, [getAllChats]);

    return (
        <SafeAreaView style={stylesChat.container}>
            <View style={stylesChat.header}>
                <TouchableOpacity
                style={stylesChat.btnExitChat}
                onPress={() => navigation.navigate(PAINEL_PATHS.map.name)}
                >
                    <Image
                    source={require('../../assets/images/sign-out-option.png')}
                    style={stylesChat.btnImage}
                    />
                </TouchableOpacity>
                <Text>Exit chat</Text>
            </View>
            <View style={stylesChat.messages}>
                {
                    isLoadingChats ?
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                        <Progress.Circle size={30} indeterminate={true} borderWidth={5} borderColor="black" />
                    </View> :
                    <ScrollView style={stylesChat.messagesScroll}>
                        {
                            chats.map(chat => (
                                <Message key={chat._id} chat={chat} loggedUserName={userName} />
                            ))
                        }
                    </ScrollView>
                }
            </View>
            <View style={stylesChat.actionsArea}>
                <TextInput
                style={stylesChat.inputMessage}
                onChangeText={setInputMessageText}
                value={inputMessageText}
                placeholder="Message..."
                />
                <TouchableOpacity
                style={stylesChat.btn}
                disabled={inputMessageText.length === 0 || isLoadingSendMessage}
                onPress={() => sendMessage()}
                >
                    {
                        isLoadingSendMessage ?
                        <Progress.Circle size={30} indeterminate={true} borderWidth={5} borderColor="white" /> :
                        <Image
                        source={require('../../assets/images/send.png')}
                        style={stylesChat.btnImage}
                        />

                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
