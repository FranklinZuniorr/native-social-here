import { StyleSheet } from 'react-native';

export const stylesMap = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      position: 'relative',
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bottomContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px -5px',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        width: 'auto',
        height: 50,
        zIndex: 999,
        bottom: 10,
    },
    btn: {
        backgroundColor: '#e3e3e3',
        height: '100%',
        borderRadius: '30%',
        width: 40,
        padding: 5,
    },
    backBtnImage: {
        width: '100%',
        height: '100%',
    },
    personName: {
        position: 'absolute',
        zIndex: 9999,
        width: 100,
        top: -10,
    },
   });
