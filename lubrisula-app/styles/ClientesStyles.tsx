import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000a63',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000a63',
  },
  clientContact: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  clientVehicles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#444',
  },
  noVehicles: {
    fontSize: 14,
    color: '#d9534f',
  },
});
