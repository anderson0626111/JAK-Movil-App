import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { NavBar } from './components/navigation/NavBar';
import { FilterPanel } from './components/search/FilterPanel';
import { FinancingPage } from './components/financing';
import { vehicles } from './data/vehicleData';
import { VehicleCard } from './components/catalog/VehicleCard';
import { HeroImage } from './components/images/HeroImage';
import { Footer } from './components/navigation/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'financing'>('home');

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      {/* 1. Logo y Barra Superior */}
      <NavBar onFinancingPress={() => setCurrentPage('financing')} />

      {currentPage === 'financing' ? (
        <FinancingPage />
      ) : (
        <>
          {/* 2. Sección del buscador/filtro */}
          <View style={styles.heroSection}>
            <View style={styles.filterWrapper}>
              <FilterPanel />
            </View>
          </View>

          {/* 3. Carrusel automático de vehículos (después del filtro) */}
          <HeroImage />

          {/* 4. Catálogo de Vehículos */}
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

      {/* 5. Footer al final de la página */}
      <Footer />
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