import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/AuthStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    Alert.alert("Error", "Correo o contraseña incorrectos.");
  } else {
    navigation.replace("MainTabs"); // Redirige a la pantalla con Tabs
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
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
      <Button title="Ingresar" onPress={handleLogin} color="#000a63" />
      <Text style={styles.link} onPress={() => navigation.navigate("RecuperarContraseña")}>
        ¿Olvidaste tu contraseña?
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate("Registro")}>
        Crear cuenta nueva
      </Text>
    </View>
  );
}
