import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';
import { useRouter } from 'expo-router';

interface Consultation {
  id: string;
  patient_id: string;
  doctor_id: string;
  motivoconsultation: string;
}

const ConsultationListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    const { data, error } = await supabase.from('consultations').select('*');
    if (error) console.error(error);
    else setConsultations(data);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('consultations').delete().eq('id', id);
    if (error) console.error(error);
    else fetchConsultations();
  };

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.item}>
      <Text>Patient ID: {item.patient_id}</Text>
      <Text>Doctor ID: {item.doctor_id}</Text>
      <Text>Motivo: {item.motivoconsultation}</Text>
      <View style={styles.buttons}>
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={consultations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-consultation')}>
        <Text style={styles.addButtonText}>Add Consultation</Text>
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

export default ConsultationListScreen;
