import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/PerfilStyles';

export default function PerfilScreen({ navigation }) {
  const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo.");
  } else {
    navigation.replace("Login"); // Redirige al Login después de cerrar sesión
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <Button title="Cerrar Sesión" onPress={handleSignOut} color="#000a63" />
    </View>
  );
}
