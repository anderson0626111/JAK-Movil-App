import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // O el selector que estés usando (select de React Native Web / Picker)

export function FilterPanel() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  // Generamos un arreglo de años (por ejemplo desde 2000 hasta el año actual)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

  const handleSearch = () => {
    console.log('Filtros aplicados:', { brand, model, yearFrom, yearTo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Encuentra tu Vehículo</Text>

      <View style={styles.filterRow}>
        {/* Marca */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>MARCA</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={brand}
              onValueChange={(itemValue) => setBrand(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Todas las marcas" value="" />
              <Picker.Item label="Toyota" value="toyota" />
              <Picker.Item label="Honda" value="honda" />
              <Picker.Item label="Hyundai" value="hyundai" />
              <Picker.Item label="Kia" value="kia" />
            </Picker>
          </View>
        </View>

        {/* Modelo */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>MODELO</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={model}
              onValueChange={(itemValue) => setModel(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Todos los modelos" value="" />
            </Picker>
          </View>
        </View>

        {/* Año Desde */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>AÑO DESDE</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={yearFrom}
              onValueChange={(itemValue) => setYearFrom(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Cualquier año" value="" />
              {years.map((yr) => (
                <Picker.Item key={`from-${yr}`} label={yr.toString()} value={yr.toString()} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Año Hasta (NUEVO) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>AÑO HASTA</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={yearTo}
              onValueChange={(itemValue) => setYearTo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Cualquier año" value="" />
              {years.map((yr) => (
                <Picker.Item key={`to-${yr}`} label={yr.toString()} value={yr.toString()} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Botón Buscar */}
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>BUSCAR VEHÍCULOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)', // Para web / iOS
    elevation: 3, // Para Android
    width: '100%',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
    minWidth: 160,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  picker: {
    height: 42,
    width: '100%',
    color: '#1f2937',
    borderWidth: 0,
  },
  button: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 180,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});