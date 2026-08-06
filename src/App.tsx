import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavBar } from './components/navigation/NavBar';
import { HeroImage } from './components/images/HeroImage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <HeroImage offsetX={-80} imageScale={1.25} />
        <NavBar overlay />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Open up App.tsx to start working on your app!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0,
  },
  headerContainer: {
    position: 'relative',
    width: '100%',
    // allow hero to determine its own height (can be full viewport)
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
  },
});
