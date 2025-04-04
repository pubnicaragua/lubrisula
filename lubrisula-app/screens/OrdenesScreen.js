import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';
import styles from '../styles/OrdenesStyles';

export default function OrdenesScreen() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdenes = async () => {
      const { data, error } = await supabase
        .from('ordenes_trabajo')
        .select(`
          id, 
          descripcion, 
          estado, 
          fecha_creacion,
          costo,
          clientes (nombre),
          usuarios (nombre)
        `);

      if (error) console.error(error);
      else setOrdenes(data);
      setLoading(false);
    };

    fetchOrdenes();
  }, []);

  const getStatusStyle = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return styles.pending;
      case 'En Proceso':
        return styles.inProgress;
      case 'Finalizado':
        return styles.completed;
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
      <Text style={styles.title}>📋 Órdenes de Trabajo</Text>
      <FlatList
        data={ordenes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.orderTitle}>{item.descripcion}</Text>
            <Text style={getStatusStyle(item.estado)}>🔹 {item.estado}</Text>
            <Text style={styles.orderCost}>💵 Costo: ${item.costo}</Text>
            <Text style={styles.clientName}>👤 Cliente: {item.clientes?.nombre || 'No asignado'}</Text>
            <Text style={styles.technician}>🔧 Técnico: {item.usuarios?.nombre || 'No asignado'}</Text>
            <Text style={styles.orderDate}>📅 Fecha: {new Date(item.fecha_creacion).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
