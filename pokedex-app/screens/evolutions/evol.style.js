import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center', // Center the contents horizontally
  },
  item: {
    backgroundColor: '#f8f8f8',
    padding: 25,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center', // Centers the sprite and name
    justifyContent: 'center',
    flexDirection: 'column',
  },
  sprite: {
    width: 100, // Increase width for better visibility
    height: 100, // Increase height for better visibility
    marginBottom: 10, // Space between the sprite and name
  },
  pokemonName: {
    fontSize: 20, // Increased font size for better visibility
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Buttons arranged horizontally
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-evenly', // Adjusted to space buttons evenly
  },
  button: {
    backgroundColor: '#007BFF', // Add a background color for visibility
    padding: 10,
    borderRadius: 5,
    marginVertical: 10, // Space between buttons
    width: 50, // Adjusted width for the buttons
    alignItems: 'center',
    justifyContent: 'center', // Center content within buttons
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    width: '100%', // Ensure the text takes up full width
    textAlign: 'center', // Center the text within the button
  },
  chevronIcon: {
    width: 30, 
    height: 30,
    tintColor: 'white', // Change the color to ensure visibility
  },
});

export default styles;
