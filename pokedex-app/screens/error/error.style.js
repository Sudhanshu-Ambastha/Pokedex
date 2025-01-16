import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: -20,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    marginTop: 200,
    paddingBottom: 300,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,  
    marginTop: -48,
  },
  error:{
    fontSize: 35,
    fontWeight: "bold",
    // marginTop: -70,
    color: '#c2c2c2',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unownImage: {
    width: 50,  
    height: 50,
    margin: 5,  
  },
  electrodeImage: {
    width: 40,  
    height: 40,
    marginHorizontal: 5,  
  },
  errorText: {
    fontSize: 40,  
    fontWeight: 'bold',
    color: '#333',  
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4757',  
    marginTop: 10,
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347', 
    borderRadius: 5,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;

