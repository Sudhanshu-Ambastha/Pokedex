import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  searchIconContainer: {
    padding: 10,
    backgroundColor: '#05d9fa',
    borderRadius: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  filterButton: {
    marginRight: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  item: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sprite: {
    width: 50,
    height: 50,
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default styles;
