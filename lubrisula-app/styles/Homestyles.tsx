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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000a63',
    marginBottom: 5,
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
  pending: {
    fontSize: 16,
    color: '#FFA500',
  },
  inProgress: {
    fontSize: 16,
    color: '#17a2b8',
  },
  completed: {
    fontSize: 16,
    color: '#28a745',
  },
});
