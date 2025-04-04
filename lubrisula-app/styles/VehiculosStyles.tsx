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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000a63',
    textAlign: 'center',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 5,
  },
  carImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  reception: { color: '#FFA500', fontWeight: 'bold' },
  inspection: { color: '#17a2b8', fontWeight: 'bold' },
  repair: { color: '#FF5733', fontWeight: 'bold' },
  paint: { color: '#6C757D', fontWeight: 'bold' },
  ready: { color: '#28a745', fontWeight: 'bold' },
});
