import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Existing styles...
  
  // Updated Tab Bar Styles
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0f1c3f',
    paddingVertical: 8,
    shadowColor: '#02457A',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    elevation: 100, // For Android shadow
    bottom: 0,
    width: '100%',
    height: 90, // Increased height for better visual balance
  },
  navItem: {
    alignItems: 'center',
    flex: 1, // Make nav items flex to evenly distribute space
  },
  label: {
    fontSize: 12, // Slightly larger font for better readability
    marginTop: 4, // Increased margin for better spacing
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45, // Adjust to make sure the button overlaps correctly over the navigation bar
    left: '50%', // Center horizontally
    transform: [{ translateX: -35 }], // Adjust for half the size of the QR button to center it
    zIndex: 10, // Ensures the button stays above the other elements
  },
  qrCircle: {
    backgroundColor: '#02457A',
    width: 70,
    height: 70,
    borderRadius: 35, // Make it a circle (half of width/height)
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'white',
    elevation: 10, // For Android shadow
    shadowColor: '#000', // Added shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default styles;
