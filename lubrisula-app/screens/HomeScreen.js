import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import { supabase } from '../supabase';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);

  useEffect(() => {
    fetchOrdenes();
  }, []);

  // Función para obtener órdenes desde Supabase
  const fetchOrdenes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ordenes_trabajo')
      .select('id, descripcion, estado, vehiculo_id, cliente_id, fecha_creacion')
      .order('fecha_creacion', { ascending: false });

    if (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar las órdenes.');
    } else {
      setOrdenes(data);
      setFilteredOrdenes(data);
    }
    setLoading(false);
  };

  // Función para refrescar la lista
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrdenes();
    setRefreshing(false);
  };

  // Filtrado de órdenes según búsqueda
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredOrdenes(ordenes);
    } else {
      const filtered = ordenes.filter((item) =>
        item.descripcion.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOrdenes(filtered);
    }
  }, [search, ordenes]);

  // Renderizado de cada orden
  const renderOrden = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('OrdenDetalle', { ordenId: item.id })}
    >
      <View style={styles.row}>
        <Ionicons name="car-outline" size={24} color="#000a63" />
        <View style={styles.cardContent}>
          <Text style={styles.orderTitle}>{item.descripcion}</Text>
          <Text style={styles.orderState}>
            Estado: <Text style={styles.boldText}>{item.estado}</Text>
          </Text>
          <Text style={styles.date}>📅 {new Date(item.fecha_creacion).toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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

      {/* Input de búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar orden por descripción..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista de órdenes */}
      <FlatList
        data={filteredOrdenes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrden}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No hay órdenes disponibles.</Text>}
      />
    </View>
  );
}