import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { supabase } from '../supabaseClient';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PatientFormScreen = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [contato, setContato] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchPatient(id);
      setIsEditMode(true);
    }
  }, [id]);

  const fetchPatient = async (id: string) => {
    const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();
    if (error) console.error(error);
    else {
      setNome(data.nome);
      setIdade(data.idade.toString());
      setContato(data.contato);
    }
  };

  const handleSubmit = async () => {
    const patient = { nome, idade: parseInt(idade), contato };
    let error = null;

    if (isEditMode) {
      ({ error } = await supabase.from('patients').update(patient).eq('id', id));
    } else {
      ({ error } = await supabase.from('patients').insert([patient]));
    }

    if (error) console.error(error);
    else router.push('/');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
        style={styles.input}
      />
      <Button title={isEditMode ? 'Update' : 'Add'} onPress={handleSubmit} />
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

export default PatientFormScreen;
