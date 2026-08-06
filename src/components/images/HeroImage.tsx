import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import banner from '../../../assets/images/banner.png';

export function HeroImage({ cropMode = 'bottom', cropPercent, offsetX = 0, imageScale = 1.2 }: { cropMode?: 'top' | 'bottom'; cropPercent?: number; offsetX?: number; imageScale?: number } = {}) {
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
  // wrapper shows full-width based on viewport; image can be scaled larger so we can shift (cover)
  const wrapperWidth = width;
  const wrapperFullHeight = Math.round(wrapperWidth / bannerAspect);

  // image may be rendered larger than wrapper to allow horizontal offsetting
  const imageWidth = Math.round(width * (imageScale || 1));
  const imageHeight = Math.round(imageWidth / bannerAspect);

  // Determine crop percent: use explicit prop if provided, otherwise
  // keep legacy top-crop default of 0.29, and bottom default of 0.18
  const defaultTop = 0.20;
  const defaultBottom = 0.0;
  const pct = typeof cropPercent === 'number' ? Math.max(0, Math.min(1, cropPercent)) : (cropMode === 'top' ? defaultTop : defaultBottom);
  const cropPx = Math.round(wrapperFullHeight * pct);
  const visibleHeight = Math.max(0, wrapperFullHeight - cropPx);
  const imageTop = cropMode === 'top' ? -cropPx : 0;

  return (
    <View style={[styles.wrapper, { height: visibleHeight }]}> 
      <Image
        source={banner}
        style={[
          styles.bannerImage,
          { left: offsetX, width: imageWidth, height: imageHeight, top: imageTop },
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
