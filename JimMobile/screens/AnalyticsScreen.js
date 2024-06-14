import React from 'react';
import { View, Image } from 'react-native';
import comingSoon from '../assets/images/coming-soon.png';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <View>
      <LineChart
        data={{
          labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
            },
            {
              data: [30, 79, 43, 56, 87],
              color: (opacity = 1) => `rgba(244, 70, 66, ${opacity})`, // optional
              strokeWidth: 2 // optional
            },
            {
              data: [60, 91, 60, 72, 109],
              color: (opacity = 1) => `rgba(72, 191, 112, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ]
        }}
        width={Dimensions.get("window").width * 0.8} // from react-native
        height={Dimensions.get("window").height * 0.8}
        yAxisLabel=""
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8
        }}
      />
    </View>
  );
}