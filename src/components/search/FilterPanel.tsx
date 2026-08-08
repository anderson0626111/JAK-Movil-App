import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function FilterPanel() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const handleSearch = () => {
    // Aquí conectaremos la lógica para filtrar los vehículos en la BD
    console.log('Filtrando vehículos por:', { marca, modelo, anio, precioMax });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encuentra tu Vehículo</Text>

      <View style={styles.filterRow}>
        {/* Selector de Marca */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Marca</Text>
          <select 
            value={marca} 
            onChange={(e) => setMarca(e.target.value)} 
            style={webStyles.select}
          >
            <option value="">Todas las marcas</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="hyundai">Hyundai</option>
            <option value="kia">Kia</option>
            <option value="nissan">Nissan</option>
          </select>
        </View>

        {/* Selector de Modelo */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Modelo</Text>
          <select 
            value={modelo} 
            onChange={(e) => setModelo(e.target.value)} 
            style={webStyles.select}
          >
            <option value="">Todos los modelos</option>
            <option value="corolla">Corolla</option>
            <option value="civic">Civic</option>
            <option value="tucson">Tucson</option>
            <option value="k5">K5</option>
          </select>
        </View>

        {/* Selector de Año */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Año Desde</Text>
          <select 
            value={anio} 
            onChange={(e) => setAnio(e.target.value)} 
            style={webStyles.select}
          >
            <option value="">Cualquier año</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </View>

        {/* Botón Buscar */}
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>BUSCAR VEHÍCULOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos web directos para los campos tipo select
const webStyles = {
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: '14px',
    width: '100%',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'flex-end',
  },
  inputGroup: {
    flex: 1,
    minWidth: 150,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
    color: '#666',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#d32f2f', // Rojo similar al branding de dealers
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 160,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});