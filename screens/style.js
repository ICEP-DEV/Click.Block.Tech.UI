import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Existing styles for MainScreen and others
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#002f66',
    paddingVertical: 104,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  accountIcon: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  greeting: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  accountContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  accountBox: {
    backgroundColor: '#004080',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountImage: {
    width: 30,
    height: 30,
  },
  accountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  servicesSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  servicesTitle: {
    fontSize: 18,
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  horizontalServiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceBox: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  serviceIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  serviceText: {
    color: '#003366',
    fontSize: 14,
    textAlign: 'center',
  },

  // New Tab Bar Styles
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
    position: 'absolute', // Allow centering over the bottom bar
    top: -25, // Adjust this value to overlap the container height properly
    left: '50%', // Center horizontally
    transform: [{ translateX: -35 }], // Adjust for half the size of the QR button
  },
  qrCircle: {
    backgroundColor: '#02457A',
    borderRadius: 120, // Adjusted for a more prominent circle
    padding: 20, // Increased padding for better icon visibility
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: 'white', // Added shadow for a more 3D effect
    shadowOffset: { width: 88, height: 78 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
});

export default styles;


