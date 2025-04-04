import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/AuthStyles';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Error", "No se pudo registrar la cuenta.");
    } else {
      Alert.alert("Éxito", "Cuenta creada. Verifica tu correo.");
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Confirmar contraseña" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      <Button title="Registrarse" onPress={handleRegister} color="#000a63" />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Ya tengo una cuenta
      </Text>
    </View>
  );
}
