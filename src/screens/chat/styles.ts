import { StyleSheet } from 'react-native';

export const stylesChat = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        backgroundColor: 'white',
        marginBottom: -5,
        height: 50,
        paddingLeft: 10,
        paddingTop: 10,
    },
    btnExitChat: {
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        height: '100%',
        width: 40,
        padding: 10,
    },
    messages: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
    },
    messagesScroll: {
        maxHeight: '100%',
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
    },
    infoFeedbackText: {
        fontFamily: 'Archivo Black',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    },
    actionsArea: {
        flex: 1,
        maxHeight: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    inputMessage: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 5,
    },
    btn: {
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        height: '100%',
        width: 50,
        padding: 10,
    },
    btnImage: {
        width: '100%',
        height: '100%',
    },
});
