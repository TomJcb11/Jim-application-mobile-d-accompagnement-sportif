import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// import { useColorScheme } from '@/components/useColorScheme';

// import { createStackNavigator } from '@react-navigation/stack';

// import ModalScreen from './modal';
import TabLayout from './(tabs)/_layout';
// import WeekPlanForm from './week plan form';
// import { DarkTheme, DefaultTheme, ParamListBase, ThemeProvider } from '@react-navigation/native';





export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <TabLayout />;
}







// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   const Stack = createStackNavigator<ParamListBase>();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack.Navigator>
//         <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
//         <Stack.Screen name="modal" component={ModalScreen} options={{ presentation: 'modal' }} />
//         <Stack.Screen name="Week Plan Form" component={WeekPlanForm} options={{ presentation: 'modal' }}/>
//       </Stack.Navigator>
//     </ThemeProvider>
//   );
// }




