import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Logo principal de Rosybel Auto Sales
import logo from '../../assets/images/Logo_Dealer.jpg';

// Propiedades que recibe la barra de navegación desde App.tsx
interface NavBarProps {
  // Función para Financiamiento
  onFinancingPress?: () => void;

  // Función para mostrar los vehículos usados
  onUsedVehiclesPress?: () => void;

  // Función para regresar a la página principal
  onHomePress?: () => void;
}

// Componente de la barra de navegación
export function NavBar({
  onFinancingPress,
  onUsedVehiclesPress,
  onHomePress,
}: NavBarProps) {

  // Guarda el índice del botón sobre el que está el mouse.
  // Se utiliza para aplicar el efecto hover en la versión web.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Elementos que aparecen en la barra de navegación
  const menuItems = [
    {
      // Regresa al catálogo principal
      title: 'INICIO',
      active: true,
      onPress: onHomePress,
    },

    {
      // Sección de vehículos nuevos
      title: 'VEHÍCULOS NUEVOS',
      active: false,
      onPress: () => {},
    },

    {
      // Sección de vehículos usados.
      // La función viene desde App.tsx.
      title: 'VEHÍCULOS USADOS',
      active: false,
      onPress: onUsedVehiclesPress,
    },

    {
      // Sección para calcular préstamo
      title: 'CALCULAR PRÉSTAMO',
      active: false,
      onPress: onFinancingPress,
    },

    {
      // Sección informativa de la empresa
      title: 'NOSOTROS',
      active: false,
      onPress: () => {},
    },

    {
      // Sección de contacto
      title: 'CONTACTO',
      active: false,
      onPress: () => {},
    },
  ];

  // Al presionar el logo regresamos al inicio
  const handleLogoPress = () => {
    onHomePress?.();
  };

  return (
    <View style={styles.headerContainer}>

      {/* Cabecera superior que contiene el logo */}
      <View style={styles.topHeader}>

        {/* Logo de la empresa.
            También funciona como botón para regresar al inicio */}
        <TouchableOpacity
          style={styles.logoWrapper}
          onPress={handleLogoPress}
          activeOpacity={0.8}
        >
          <Image
            source={logo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>

      {/* Barra horizontal de navegación */}
      <View style={styles.navBar}>

        <View style={styles.menuContainer}>

          {/* Recorremos todos los elementos del menú */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}

              // Aplicamos los estilos dependiendo
              // de si el botón está activo o tiene hover
              style={[
                styles.navItem,

                // Estilo del botón activo
                item.active && styles.navItemActive,

                // Estilo cuando el mouse pasa por encima
                hoveredIndex === index &&
                  !item.active &&
                  styles.navItemHover,
              ]}

              // Ejecuta la función correspondiente al botón
              onPress={item.onPress}

              // Detecta cuando el mouse entra al botón
              // @ts-ignore
              onMouseEnter={() => setHoveredIndex(index)}

              // Detecta cuando el mouse sale del botón
              // @ts-ignore
              onMouseLeave={() => setHoveredIndex(null)}
            >

              {/* Texto del botón */}
              <Text
                style={[
                  styles.navText,
                  item.active && styles.navTextActive,
                ]}
              >
                {item.title}
              </Text>

            </TouchableOpacity>
          ))}

        </View>
      </View>
    </View>
  );
}

// Estilos de la barra de navegación
const styles = StyleSheet.create({

  // Contenedor general del encabezado
  headerContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
  },

  // Área donde se encuentra el logo
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  // Contenedor del logo
  logoWrapper: {
    height: 100,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,

    // Cursor de mano en la versión web
    cursor: 'pointer',
  },

  // Imagen del logo
  logoImage: {
    width: '100%',
    height: '100%',
  },

  // Barra de navegación
  navBar: {
    backgroundColor: '#262626',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    width: '100%',
    alignItems: 'center',
  },

  // Contenedor de los botones
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1200,
    width: '100%',
  },

  // Estilo individual de cada botón
  navItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',

    // Transición del borde para el hover
    // @ts-ignore
    transition: 'border-color 0.3s ease',

    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },

  // Estilo del botón activo
  navItemActive: {
    backgroundColor: '#d32f2f',
  },

  // Estilo cuando el mouse pasa sobre el botón
  navItemHover: {
    borderBottomColor: '#d32f2f',
  },

  // Texto de los botones
  navText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,

    // Transición del color del texto
    transition: 'color 0.3s ease',
  },

  // Texto del botón activo
  navTextActive: {
    color: '#ffffff',
  },
});