// shared/sharedStyles.js
import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth:1,
    borderBottomColor:'#000',
  },
  container: {
    flex: 1,
    padding: 20,
  },

});