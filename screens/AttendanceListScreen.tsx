import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';
import { useRouter } from 'expo-router';

interface Attendance {
  id: string;
  doctor_id: string;
  patient_id: string;
  consultation_id: string;
  hist: string;
  tipo: string;
}

const AttendanceListScreen = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    const { data, error } = await supabase.from('attendances').select('*');
    if (error) console.error(error);
    else setAttendances(data);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('attendances').delete().eq('id', id);
    if (error) console.error(error);
    else fetchAttendances();
  };

  const renderItem = ({ item }: { item: Attendance }) => (
    <View style={styles.item}>
      <Text>Doctor ID: {item.doctor_id}</Text>
      <Text>Patient ID: {item.patient_id}</Text>
      <Text>Consultation ID: {item.consultation_id}</Text>
      <Text>Hist: {item.hist}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => router.push(`/edit-attendance/${item.id}`)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={attendances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-attendance')}>
        <Text style={styles.addButtonText}>Add Attendance</Text>
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

export default AttendanceListScreen;
