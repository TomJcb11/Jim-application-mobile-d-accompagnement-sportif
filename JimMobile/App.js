import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import AuthContext from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';


import { Button, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WeekPlanScreen from './screens/WeekPlanScreen';
import WeekPlanFormScreen from './screens/WeekPlanFormScreen';
import NewSessionScreen from './screens/NewSessionScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SignInScreen from './screens/SignInscreen';
import SignUpScreen from './screens/SignUpScreen';
import FormScreen1 from './screens/FormScreen1';
import FormScreen2 from './screens/FormScreen2';
import FormScreen3 from './screens/FormScreen3';


import Header from './component/header';
import { WeekPlanProvider } from './contexts/weekPlanContext';

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
      <RootStack.Screen name="FormScreen1" component={FormScreen1} />
      <RootStack.Screen name="FormScreen2" component={FormScreen2} />
      <RootStack.Screen name="FormScreen3" component={FormScreen3} />
      <RootStack.Screen name="WeekPlanForm" component={WeekPlanFormScreen} />


    </RootStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <UserProvider>
        <WeekPlanProvider>
          <ApolloProvider client={client}>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
          </ApolloProvider>
        </WeekPlanProvider>
      </UserProvider>
    </AuthContext.Provider>
  );
}