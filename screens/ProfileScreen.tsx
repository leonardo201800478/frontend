import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';

const ProfileScreen = () => {
  interface Profile {
    nomeUser: string;
    emailUser: string;
    foneUser: string;
  }
  
  const [profile, setProfile] = useState<Profile>({
    nomeUser: '',
    emailUser: '',
    foneUser: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
    } else {
      setProfile({
        nomeUser: data.user.user_metadata.nomeUser,
        emailUser: data.user.user_metadata.emailUser,
        foneUser: data.user.user_metadata.foneUser,
      });
    }
  };

  const handleUpdateProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { nomeUser: profile.nomeUser, emailUser: profile.emailUser, foneUser: profile.foneUser },
    });
    if (error) {
      console.error(error);
    } else {
      alert('Profile updated successfully');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={profile.nomeUser}
        onChangeText={(text) => setProfile({ ...profile, nomeUser: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={profile.emailUser}
        onChangeText={(text) => setProfile({ ...profile, emailUser: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={profile.foneUser}
        onChangeText={(text) => setProfile({ ...profile, foneUser: text })}
        style={styles.input}
      />
      <Button title="Atualizar Perfil" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ProfileScreen;
