import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';
import { useRouter } from 'expo-router';

const ConsultationFormScreen = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [motivo, setMotivo] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const consultation = { patient_id: patientId, doctor_id: doctorId, motivoconsultation: motivo };
    const { error } = await supabase.from('consultations').insert([consultation]);
    if (error) console.error(error);
    else router.push('/');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Patient ID"
        value={patientId}
        onChangeText={setPatientId}
        style={styles.input}
      />
      <TextInput
        placeholder="Doctor ID"
        value={doctorId}
        onChangeText={setDoctorId}
        style={styles.input}
      />
      <TextInput
        placeholder="Motivo da Consulta"
        value={motivo}
        onChangeText={setMotivo}
        style={styles.input}
      />
      <Button title="Add Consultation" onPress={handleSubmit} />
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

export default ConsultationFormScreen;
