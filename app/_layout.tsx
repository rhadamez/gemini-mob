import { NativeBaseProvider } from 'native-base'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { TasksProvider } from '../context/TasksContext';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

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

  return <RootLayoutNav />;
}

const client = new ApolloClient({
  uri: 'http://192.168.1.70:3333/graphql',
  cache: new InMemoryCache()
})

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <StatusBar barStyle={'light-content'} />
      <ApolloProvider client={client} >
      <TasksProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TasksProvider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
