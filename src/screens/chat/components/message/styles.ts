import { StyleSheet } from 'react-native';

export const stylesMessage = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
    },
    card: {
        width: 'auto',
        padding: 5,
        gap: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0px 0px 10px -5px',
    },
    title: {
        maxWidth: '50%',
        fontWeight: 700,
    },
    message: {
        maxWidth: '50%',
    },
});
