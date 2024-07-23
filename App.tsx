import { SplashScreen, Stack } from 'expo-router';

export default function App() {
  return (
    <>
      <SplashScreen />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ title: 'App' }} />
      </Stack>
    </>
  );
}
