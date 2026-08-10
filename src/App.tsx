import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { NavBar } from './components/navigation/NavBar';
import { FilterPanel } from './components/search/FilterPanel';
import { FinancingPage } from './components/financing';

export default function App() {
  // Estado para controlar la navegación entre páginas
  const [currentPage, setCurrentPage] = useState<'home' | 'financing'>('home');

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      {/* 1. Cabecera completa (Logo a la derecha + Menú horizontal) */}
      <NavBar onFinancingPress={() => setCurrentPage('financing')} />

      {/* Mostrar página de Financiamientos o página principal */}
      {currentPage === 'financing' ? (
        <FinancingPage />
      ) : (
        <>
          {/* 2. Sección del buscador/filtro principal */}
          <View style={styles.heroSection}>
            <View style={styles.filterWrapper}>
              <FilterPanel />
            </View>
          </View>

          {/* 3. Contenido principal */}
          <View style={styles.content}>
            <Text style={styles.title}>Catálogo de Vehículos Disponibles</Text>
          </View>
        </>
      )}
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
  },
});