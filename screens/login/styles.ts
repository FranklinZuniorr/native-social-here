import { StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    text: {
        fontFamily: 'Archivo Black',
        textAlign: 'center',
        fontSize: 25,
    },
    textInfoPermissionGeolocation: {
        fontFamily: 'Archivo Black',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
    input: {
        height: 50,
        width: '100%',
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    textInputError: {
        fontFamily: 'Archivo Black',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
    },
    appButtonContainer: {
        width: '100%',
        marginTop: 20,
        elevation: 8,
        backgroundColor: '#009688',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    appButtonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
  });
