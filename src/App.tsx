import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

// Importamos los componentes utilizados en la aplicación
import { NavBar } from './components/navigation/NavBar';
import { FilterPanel } from './components/search/FilterPanel';
import { VehicleCard } from './components/catalog/VehicleCard';
import { vehicles } from './data/vehicleData';
import { HeroImage } from './components/images/HeroImage';

export default function App() {
  // Estado que controla qué sección se está mostrando.
  // 'home' = página principal
  // 'used' = vehículos usados
  const [currentPage, setCurrentPage] = useState<'home' | 'used'>('home');

  // Cambia la vista hacia Vehículos Usados
  const handleUsedVehiclesPress = () => {
    setCurrentPage('used');
  };

  // Regresa a la página principal
  const handleHomePress = () => {
    setCurrentPage('home');
  };

  return (
    <View style={styles.container}>

      {/* Barra de navegación.
          Le pasamos las funciones para controlar las secciones */}
      <NavBar
        onUsedVehiclesPress={handleUsedVehiclesPress}
        onHomePress={handleHomePress}
      />

      {/* ScrollView permite desplazarse verticalmente por la página */}
      <ScrollView>

        {/* Si la página seleccionada es "used",
            mostramos solamente los vehículos usados */}
        {currentPage === 'used' ? (

          <View style={styles.content}>

            {/* Título de la sección de vehículos usados */}
            <Text style={styles.title}>
              Vehículos Usados
            </Text>

            <View style={styles.catalogContainer}>

              {/* Filtramos los vehículos cuyo estado sea "Usado".
                  Después creamos una tarjeta para cada vehículo */}
              {vehicles
                .filter((vehicle) => vehicle.mileage === 'Usado')
                .map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onPress={() => {
                      // Acción que se ejecuta al seleccionar un vehículo
                      console.log(
                        'Vehículo usado seleccionado:',
                        vehicle.title
                      );
                    }}
                  />
                ))}
            </View>
          </View>

        ) : (

          /* Página principal */
          <>
            {/* Sección donde se encuentra el panel de búsqueda/filtros */}
            <View style={styles.heroSection}>
              <View style={styles.filterWrapper}>
                <FilterPanel />
              </View>
            </View>

            {/* Imagen principal de la página */}
            <HeroImage />

            {/* Catálogo principal de vehículos */}
            <View style={styles.content}>

              <Text style={styles.title}>
                Catálogo de Vehículos Disponibles
              </Text>

              <View style={styles.catalogContainer}>

                {/* Mostramos todos los vehículos disponibles */}
                {vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onPress={() => {
                      // Acción que se ejecuta al seleccionar un vehículo
                      console.log(
                        'Vehículo seleccionado:',
                        vehicle.title
                      );
                    }}
                  />
                ))}

              </View>
            </View>
          </>
        )}

      </ScrollView>
    </View>
  );
}

// Estilos principales de la aplicación
const styles = StyleSheet.create({

  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Sección principal del encabezado/filtros
  heroSection: {
    width: '100%',
  },

  // Contenedor del panel de filtros
  filterWrapper: {
    width: '100%',
  },

  // Contenido general de las páginas
  content: {
    padding: 20,
  },

  // Título de las secciones
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // Contenedor de las tarjetas de vehículos.
  // flexWrap permite que las tarjetas pasen a otra fila.
  catalogContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
});