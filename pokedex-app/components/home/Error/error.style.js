import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',  // Light background to highlight images
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,  // Space between image row and text
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unownImage: {
    width: 50,  // Adjust size as needed for the Unown images
    height: 50,
    margin: 5,  // Space between each Unown image
  },
  electrodeImage: {
    width: 40,  // Adjust size for Electrode image
    height: 40,
    marginHorizontal: 5,  // Space between the numbers and the Electrode
  },
  errorText: {
    fontSize: 40,  // Larger font size for "404"
    fontWeight: 'bold',
    color: '#333',  // Darker text color for visibility
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4757',  // Red color to highlight the "Not found" text
    marginTop: 10,
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347', // Tomato color
    borderRadius: 5,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;

