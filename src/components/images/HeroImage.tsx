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
    height: 400, // CAMBIO: Aumentado de 250px a 400px para que el logo sea más grande
    backgroundColor: '#ffffff', // Fondo blanco para integrar el logo
    justifyContent: 'center', // Centra la imagen verticalmente
    alignItems: 'center', // Centra la imagen horizontalmente
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    maxWidth: 900, // CAMBIO: Aumentado de 600px a 900px para que el logo sea más grande en pantallas
  },
});
