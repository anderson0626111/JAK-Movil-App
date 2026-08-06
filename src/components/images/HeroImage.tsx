import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import banner from '../../../assets/images/banner.png';

export function HeroImage() {
  const { width } = useWindowDimensions();
  const [aspect, setAspect] = useState<number | null>(null);

  useEffect(() => {
    // get natural image size to compute aspect ratio so we can show full image
    try {
      // Image.getSize works on RN and web (with a URI) — the imported image should resolve
      // @ts-ignore
      Image.getSize(banner, (w: number, h: number) => {
        if (w && h) setAspect(w / h);
      }, () => {
        // ignore failure
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const bannerAspect = aspect || 4;
  const bannerHeight = Math.round(width / bannerAspect);

  return (
    <View style={[styles.wrapper, { height: bannerHeight }]}> 
      <Image
        source={banner}
        style={[
          styles.bannerImage,
          { left: 0, top: 0, width: width, height: bannerHeight },
        ]}
        resizeMode="contain"
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
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 300,
  },
  bannerImage: {
    position: 'absolute',
  },
});
