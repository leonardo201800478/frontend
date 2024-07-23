import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';
import { useRouter } from 'expo-router';

interface Patient {
  id: string;
  nome: string;
  idade: number;
  contato: string;
}

const PatientListScreen = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) console.error(error);
    else setPatients(data);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('patients').delete().eq('id', id);
    if (error) console.error(error);
    else fetchPatients();
  };

  const renderItem = ({ item }: { item: Patient }) => (
    <View style={styles.item}>
      <Text>{item.nome}</Text>
      <Text>{item.idade} anos</Text>
      <Text>{item.contato}</Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => router.push(`/edit-patient/${item.id}`)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-patient')}>
        <Text style={styles.addButtonText}>Add Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    padding: 15,
    backgroundColor: 'blue',
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PatientListScreen;
