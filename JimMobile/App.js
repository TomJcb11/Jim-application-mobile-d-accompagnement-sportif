import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import AuthContext from './contexts/AuthContext';

import { Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WeekPlanScreen from './screens/WeekPlanScreen';
import NewSessionScreen from './screens/NewSessionScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SignInScreen from './screens/SignInscreen';
import SignUpScreen from './screens/SignUpScreen'

import Header from './component/header';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WeekPlan" component={WeekPlanScreen} />
      <Tab.Screen name="NewSession" component={NewSessionScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={TabNavigator} options={{ header: () => <Header /> }} />
      <RootStack.Screen name="UserProfile" component={UserProfileScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />

    </RootStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}