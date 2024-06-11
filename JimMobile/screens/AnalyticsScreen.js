import React from 'react';
import { View, Image } from 'react-native';
import comingSoon from '../assets/images/coming-soon.png';

export default function AnalyticsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        source={comingSoon} 
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
}