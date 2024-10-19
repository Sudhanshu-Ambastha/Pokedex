import { StyleSheet } from "react-native";

// import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  sidebar: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerLabel: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  spriteContainer: {
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pokemonID: {
    fontSize: 18,
    color: '#777',
  },
  sprite: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  typeIconsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  typeIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  textDataContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 5, 
  },
  dataLabel: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginRight: 150,
  },
  dataValue: {
    alignSelf: 'flex-end', 
    textAlign: 'center',
    marginLeft: 200,
    marginTop: -20,
  },
  evolBtn:{
    backgroundColor: 'orange',
    marginTop: 20,
  },
  evolText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
  }
});

export default styles;
