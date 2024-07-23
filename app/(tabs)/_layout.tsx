import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="patients" options={{ title: 'Patients' }} />
      <Tabs.Screen name="consultations" options={{ title: 'Consultations' }} />
      <Tabs.Screen name="attendances" options={{ title: 'Attendances' }} />
    </Tabs>
  );
}
