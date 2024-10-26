import { StyleSheet } from "react-native";

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
  spriteContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 20,
    marginTop: 10,
    top: 120,
    marginBottom: -40, 
    zIndex: 1,
  },
  leftIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  rightIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  typeBackground: {
    width: 350,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sprite: {
    width: 150,
    height: 150,
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
    borderRadius: 10,
    padding: 2,
    paddingBottom: 4,
    textAlign: 'center',
  },
  evolText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
  }
});

export default styles;
