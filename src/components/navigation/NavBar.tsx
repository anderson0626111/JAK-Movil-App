import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Importamos el logo de Rosybel Auto Sales
import logo from '../../assets/images/Logo_Dealer.jpg';

export function NavBar() {
  const menuItems = [
    { title: 'INICIO', active: true },
    { title: 'VEHÍCULOS NUEVOS', active: false },
    { title: 'VEHÍCULOS USADOS', active: false },
    { title: 'FINANCIAMIENTOS Y SEGUROS', active: false },
    { title: 'CALCULAR PRESTAMO', active: false },
    { title: 'NOSOTROS', active: false },
    { title: 'CONTACTO', active: false },
  ];

  return (
    <View style={styles.headerContainer}>
      {/* 1. Cabecera superior con fondo blanco */}
      <View style={styles.topHeader}>
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        </View>
        <View style={styles.emptySpace} />
      </View>

      {/* 2. Barra de navegación horizontal */}
      <View style={styles.navBar}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.navItem, item.active && styles.navItemActive]}
            >
              <Text style={[styles.navText, item.active && styles.navTextActive]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0, // Eliminamos el espacio lateral del contenedor padre
    paddingVertical: 0,
  },
 logoWrapper: {
    height: 100,
    width: 320,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -90, // Margen negativo para pegar la imagen al borde izquierdo
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  emptySpace: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#262626',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    width: '100%',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1200,
    width: '100%',
  },
  navItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemActive: {
    backgroundColor: '#d32f2f',
  },
  navText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  navTextActive: {
    color: '#ffffff',
  },
});