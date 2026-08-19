import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { NavBar } from './components/navigation/NavBar';
import { FilterPanel } from './components/search/FilterPanel';
import { vehicles } from './data/vehicleData';
import { VehicleCard } from './components/catalog/VehicleCard';
import { HeroImage } from './components/images/HeroImage';
import { Footer } from './components/navigation/Footer';
import { ContactPage } from './components/Contact/ContactPage';
import { AboutPage } from './components/about/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      {/* 1. Logo y Barra Superior */}
      <NavBar 
        activePage={currentPage}
        onHomePress={() => setCurrentPage('home')}
        onAboutPress={() => setCurrentPage('about')}
        onContactPress={() => setCurrentPage('contact')}
      />

      {/* 2. Vistas según la página seleccionada */}
      {currentPage === 'contact' ? (
        <ContactPage />
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : (
        <>
          {/* 3. Sección del buscador/filtro */}
          <View style={styles.heroSection}>
            <View style={styles.filterWrapper}>
              <FilterPanel />
            </View>
          </View>

          {/* 4. Carrusel automático de vehículos */}
          <HeroImage />

          {/* 5. Catálogo de Vehículos */}
          <View style={styles.content}>
            <Text style={styles.title}>Catálogo de Vehículos Disponibles</Text>
            
            <View style={styles.catalogContainer}>
              {vehicles.map((vehicle) => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onPress={() => {
                    console.log('Vehículo seleccionado:', vehicle.title);
                  }} 
                />
              ))}
            </View>
          </View>
        </>
      )}

      {/* 6. Footer al final de la página */}
      <Footer 
        onHomePress={() => setCurrentPage('home')}
        onContactPress={() => setCurrentPage('contact')}
        onCatalogPress={() => setCurrentPage('home')}
        onAboutPress={() => setCurrentPage('about')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  filterWrapper: {
    width: '90%',
    maxWidth: 1100,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 20,
  },
  catalogContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1200,
  },
});