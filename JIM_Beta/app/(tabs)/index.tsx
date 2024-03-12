import { StyleSheet,Image,Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';

const screenWidth = Dimensions.get('window').width;

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/react native.png')}style={styles.image} />
      <View style={styles.title}>
        <Text style={styles.quote}>We go GYM,</Text>
        <Text style={styles.quote}>We go JIM,</Text>
        <Text style={styles.quote}>JIM</Text>
      </View>
            </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop:60,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20, 
  },
  image:{
    width: screenWidth/2,
    height: screenWidth/2,
  },
  quote:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  }
});
