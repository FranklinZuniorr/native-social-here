import { StyleSheet } from 'react-native';

export const stylesMap = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      position: 'relative',
      height: '100%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    bottomContainer: {
        position: 'absolute',
        backgroundColor: 'red',
        width: '100%',
        height: 50,
        zIndex: 999,
        bottom: 0,
    },
   });
