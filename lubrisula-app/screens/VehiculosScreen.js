import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/VehiculosStyles';

export default function VehiculosScreen() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      const { data, error } = await supabase
        .from('vehiculos')
        .select(`
          id, 
          placa, 
          marca, 
          modelo, 
          color, 
          estado, 
          imagen_url,
          clientes (nombre)
        `);

      if (error) console.error(error);
      else setVehiculos(data);
      setLoading(false);
    };

    fetchVehiculos();
  }, []);

  const getStatusStyle = (estado) => {
    switch (estado) {
      case 'Recepción':
        return styles.reception;
      case 'Inspección':
        return styles.inspection;
      case 'Reparación':
        return styles.repair;
      case 'Pintura':
        return styles.paint;
      case 'Listo para entrega':
        return styles.ready;
      default:
        return styles.defaultStatus;
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000a63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Vehículos en el Taller</Text>
      <FlatList
        data={vehiculos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagen_url || 'https://via.placeholder.com/300x200.png?text=Sin+Imagen' }} style={styles.carImage} />
            <Text style={styles.carTitle}>{item.marca} {item.modelo} ({item.color})</Text>
            <Text style={getStatusStyle(item.estado)}>📌 {item.estado}</Text>
            <Text style={styles.clientName}>👤 Cliente: {item.clientes?.nombre || 'No asignado'}</Text>
          </View>
        )}
      />
    </View>
  );
}
