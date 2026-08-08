import React from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';

// Importación de la imagen del dealer desde la carpeta local de assets
import banner from '../../assets/images/Logo_Dealer.jpg';

export function HeroImage() {
  // Hook para obtener el ancho dinámico de la pantalla del navegador/dispositivo
  const { width } = useWindowDimensions();

  return (
    // Contenedor principal que encapsula el área del banner
    <View style={styles.container}>
      <Image
        source={banner}
        style={styles.image}
        // resizeMode="contain" escala la imagen manteniendo la proporción sin recortar el logo
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250, // Altura fija de 250px para evitar que el logo ocupe toda la pantalla
    backgroundColor: '#ffffff', // Fondo blanco para integrar el logo
    justifyContent: 'center', // Centra la imagen verticalmente
    alignItems: 'center', // Centra la imagen horizontalmente
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    maxWidth: 600, // Ancho máximo de 600px para que el logo no se distorsione en pantallas 4K/Web
  },
});
