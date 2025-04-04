import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/ClientesStyles';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      const { data, error } = await supabase
        .from('clientes')
        .select(`
          id, 
          nombre, 
          telefono, 
          correo,
          vehiculos (placa, marca, modelo)
        `);

      if (error) console.error(error);
      else setClientes(data);
      setLoading(false);
    };

    fetchClientes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000a63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.clientName}>{item.nombre}</Text>
            <Text style={styles.clientContact}>{item.telefono} - {item.correo}</Text>
            <Text style={styles.clientVehicles}>🚗 Vehículos Asociados:</Text>
            {item.vehiculos.length > 0 ? (
              item.vehiculos.map((vehiculo, index) => (
                <Text key={index} style={styles.vehicleInfo}>
                  🔹 {vehiculo.marca} {vehiculo.modelo} ({vehiculo.placa})
                </Text>
              ))
            ) : (
              <Text style={styles.noVehicles}>⚠️ No tiene vehículos registrados.</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
