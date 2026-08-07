// Este componente se usa para mostrar el banner principal de la página.
// Está diseñado para renderizar la imagen de cabecera con un ancho completo
// y una altura proporcional, mientras mantiene los laterales cubiertos.
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import banner from '../../../assets/images/banner.png';

export function HeroImage({ cropMode = 'bottom', cropPercent, offsetX = 0, imageScale = 1.2 }: { cropMode?: 'top' | 'bottom'; cropPercent?: number; offsetX?: number; imageScale?: number } = {}) {
  // Se obtiene el ancho de la ventana para calcular el tamaño del banner.
  const { width } = useWindowDimensions();

  // Guardamos el tamaño natural de la imagen para preservar su proporción.
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    try {
      // Image.getSize funciona en React Native y en web cuando la imagen se importa como URI.
      // @ts-ignore
      Image.getSize(banner, (w: number, h: number) => {
        if (w && h) setNaturalSize({ width: w, height: h });
      }, () => {
        // Ignorar si falla la obtención del tamaño natural.
      });
    } catch (e) {
      // Ignorar cualquier excepción en tiempo de ejecución.
    }
  }, []);

  // Si ya conocemos el tamaño natural, usamos esa proporción, sino usamos 4:1 por defecto.
  const bannerAspect = naturalSize ? naturalSize.width / naturalSize.height : 4;

  // El ancho del banner se ajusta al ancho completo de la pantalla.
  const imageWidth = width;

  // La altura se calcula según la proporción de la imagen.
  const imageHeight = Math.round(width / bannerAspect);

  // Se reduce un poco la altura del contenedor para que el banner no quede demasiado alto.
  const wrapperHeight = Math.round(imageHeight * 0.75);

  return (
    <View style={[styles.wrapper, { height: wrapperHeight, width }]}> 
      <Image
        source={banner}
        style={[
          styles.bannerImage,
          { left: 0, width: imageWidth, height: imageHeight, top: 0 },
        ]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 300,
  },
  bannerImage: {
    position: 'absolute',
  },
});
