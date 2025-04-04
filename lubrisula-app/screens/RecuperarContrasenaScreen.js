import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/AuthStyles';

export default function RecuperarContrasenaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      Alert.alert("Error", "No se pudo enviar el correo de recuperación.");
    } else {
      Alert.alert("Éxito", "Correo enviado. Revisa tu bandeja de entrada.");
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Button title="Recuperar" onPress={handlePasswordReset} color="#000a63" />
    </View>
  );
}
