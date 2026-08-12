import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Importamos el logo de Rosybel Auto Sales
import logo from '../../assets/images/Logo_Dealer.jpg';

interface NavBarProps {
  onFinancingPress?: () => void;
}

export function NavBar({ onFinancingPress }: NavBarProps) {
  // CAMBIO: Estado para rastrear el hover de los botones de navegación
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { title: 'INICIO', active: true, onPress: () => window.location.href = '/' },
    { title: 'VEHÍCULOS NUEVOS', active: false, onPress: () => {} },
    { title: 'VEHÍCULOS USADOS', active: false, onPress: () => {} },
    { title: 'FINANCIAMIENTOS Y SEGUROS', active: false, onPress: onFinancingPress }, // CAMBIO: Conectado con la navegación
    { title: 'CALCULAR PRESTAMO', active: false, onPress: () => {} },
    { title: 'NOSOTROS', active: false, onPress: () => {} },
    { title: 'CONTACTO', active: false, onPress: () => {} },
  ];

  // CAMBIO: Función para redirigir al inicio cuando se presione el logo del dealer
  // Al hacer clic en el logo, se redirige a la página principal
  const handleLogoPress = () => {
    window.location.href = '/'; // Redirige a la página de inicio
  };

  return (
    <View style={styles.headerContainer}>
      {/* 1. Cabecera superior con fondo blanco */}
      <View style={styles.topHeader}>
        {/* CAMBIO: Logo ahora es clickeable con TouchableOpacity */}
        <TouchableOpacity 
          style={styles.logoWrapper}
          onPress={handleLogoPress} // Ejecuta handleLogoPress al hacer clic
          activeOpacity={0.8} // Efecto visual de opacidad al presionar
        >
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        </TouchableOpacity>

      </View>

      {/* 2. Barra de navegación horizontal */}
      <View style={styles.navBar}>
        {/* CAMBIO: Botones de navegación con efecto hover - cambian de color al pasar el mouse */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.navItem,
                item.active && styles.navItemActive,
                hoveredIndex === index && !item.active && styles.navItemHover, // CAMBIO: Borde rojo solo en hover de botones que NO son INICIO
              ]}
              onPress={item.onPress} // CAMBIO: Ejecuta la función onPress del item
              // @ts-ignore
              onMouseEnter={() => setHoveredIndex(index)}
              // @ts-ignore
              onMouseLeave={() => setHoveredIndex(null)}
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

// CAMBIO: Estilos con soporte para hover en botones de navegación
// El efecto hover se logra con onMouseEnter/onMouseLeave y la propiedad hoveredIndex
// Cuando se pasa el mouse sobre un botón, el fondo cambia a gris (#4a4a4a)
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'center', // CAMBIO: Centrado del logo en el medio de la página
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
 logoWrapper: {
    height: 100,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center', // CAMBIO: Centrado horizontal del logo
    marginLeft: 0, // CAMBIO: Removido margen negativo para centralizar
    cursor: 'pointer', // CAMBIO: Indicar que el logo es clickeable - muestra mano al pasar sobre él
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
    // @ts-ignore
    transition: 'border-color 0.3s ease', // CAMBIO: Transición suave para el borde
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: '#d32f2f',
  },
  navItemHover: {
    // CAMBIO: Contorno rojo en hover para botones que NO son INICIO
    borderBottomColor: '#d32f2f', // Borde rojo en hover
  },
  navText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    transition: 'color 0.3s ease', // CAMBIO: Transición suave para el color en hover
  },
  navTextActive: {
    color: '#ffffff',
  },
});