/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { stylesMessage } from './styles';
import { ChatExternal } from '../../../../services/chat/interfaces';

interface MessageProps {
    loggedUserName: string;
    chat: ChatExternal;
}

export const Message = ({ chat, loggedUserName }: MessageProps) => {
    const isLoggedUserName = chat.userName.toLowerCase() === loggedUserName.toLowerCase();
    return (
        <View style={{ ...stylesMessage.container, alignItems: isLoggedUserName ? 'flex-end' : 'flex-start' }}>
            <View style={stylesMessage.card}>
                <Text style={stylesMessage.title}>{chat.userName}</Text>
                <Text style={stylesMessage.message}>{chat.message}</Text>
            </View>
        </View>
    );
};
