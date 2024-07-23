import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabaseClient';

const HomeScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Button title="Profile" onPress={() => router.push('/profile')} />
      <Button title="Patients" onPress={() => router.push('/patients')} />
      <Button title="Consultations" onPress={() => router.push('/consultations')} />
      <Button title="Attendances" onPress={() => router.push('/attendances')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;
