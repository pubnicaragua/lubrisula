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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000a63',
  },
  orderCost: {
    fontSize: 16,
    color: '#333',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  technician: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
  },
  pending: { color: '#FFA500' },
  inProgress: { color: '#17a2b8' },
  completed: { color: '#28a745' },
});
