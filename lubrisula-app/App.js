import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importando Supabase y las pantallas
import { supabase } from './supabase';
import HomeScreen from './screens/HomeScreen';
import VehiculosScreen from './screens/VehiculosScreen';
import OrdenesScreen from './screens/OrdenesScreen';
import ClientesScreen from './screens/ClientesScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecuperarContrasenaScreen from './screens/RecuperarContrasenaScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🏠 Navegación principal con Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000a63',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home-outline';
          else if (route.name === 'Vehículos') iconName = 'car-outline';
          else if (route.name === 'Órdenes') iconName = 'clipboard-outline';
          else if (route.name === 'Clientes') iconName = 'people-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Vehículos" component={VehiculosScreen} />
      <Tab.Screen name="Órdenes" component={OrdenesScreen} />
      <Tab.Screen name="Clientes" component={ClientesScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// 📌 Configuración de la Navegación General
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="RecuperarContraseña" component={RecuperarContrasenaScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
