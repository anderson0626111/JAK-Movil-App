import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const navItems = [
  'INICIO',
  'VEHÍCULOS NUEVOS',
  'VEHÍCULOS USADOS',
  'FINANCIAMIENTOS Y SEGUROS',
  'CALCULAR PRESTAMO',
  'NOSOTROS',
  'CONTACTO',
];

const brands = [
  'Audi',
  'BMW',
  'Bugatti',
  'Chevrolet',
  'Dodge',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Jeep',
  'Kia',
  'Mazda',
  'Mercedes-Benz',
  'Nissan',
  'Peugeot',
  'Renault',
  'Suzuki',
  'Toyota',
  'Volkswagen',
];

export function NavBar({ overlay }: { overlay?: boolean }) {
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const previousQueryRef = useRef('');
  const deletingRef = useRef(false);

  const handleKeyPress = ({ nativeEvent }: { nativeEvent: { key: string } }) => {
    if (nativeEvent.key === 'Backspace' || nativeEvent.key === 'Delete') {
      deletingRef.current = true;
    }
  };

  const handleTextChange = (text: string) => {
    const typed = text;
    const isDeleting = deletingRef.current || typed.length < previousQueryRef.current.length;
    deletingRef.current = false;
    previousQueryRef.current = typed;

    if (!isDeleting) {
      const match = brands.find((brand) => brand.toLowerCase().startsWith(typed.toLowerCase()));
      if (typed.length > 0 && match) {
        setQuery(match);
        setSelection({ start: typed.length, end: match.length });
        return;
      }
    }

    setQuery(typed);
    setSelection({ start: typed.length, end: typed.length });
  };

  const handleSelectionChange = ({ nativeEvent }: { nativeEvent: { selection: { start: number; end: number } } }) => {
    setSelection(nativeEvent.selection);
  };

  // overlay: when true, render a compact dark nav bar suitable to overlay the hero image
  if (overlay) {
    return (
      <View style={styles.navbarOverlay}>
        <View style={styles.overlayInner}>
          <View style={styles.overlaySearchWrapper}>
            <View style={styles.searchRow}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Busca marcas"
                placeholderTextColor="#cbd5e1"
                value={query}
                onChangeText={handleTextChange}
                onSelectionChange={handleSelectionChange}
                onKeyPress={handleKeyPress}
                selection={selection}
                selectionColor="#f8fafc"
              />
            </View>
          </View>

          <View style={styles.overlayNavList}>
            {navItems.map((item) => (
              <Pressable
                key={item}
                style={({ hovered }) => [
                  styles.overlayNavButton,
                  hovered && styles.overlayNavButtonHover,
                ]}
              >
                <Text style={styles.overlayNavButtonText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.navbar}>
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vehículos, servicios o financiamiento"
          placeholderTextColor="#94a3b8"
          value={query}
          onChangeText={handleTextChange}
          onSelectionChange={handleSelectionChange}
          onKeyPress={handleKeyPress}
          selection={selection}
          selectionColor="#2563eb"
        />
      </View>

      <View style={styles.navList}>
        {navItems.map((item) => (
          <Pressable
            key={item}
            style={({ hovered }) => [
              styles.navButton,
              hovered && styles.navButtonHover,
            ]}
          >
            <Text style={styles.navButtonText}>{item}</Text>
          </Pressable>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  searchWrapper: {
    width: 325,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 999,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
    color: '#94a3b8',
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#0f172a',
    fontSize: 14,
    paddingVertical: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
    outlineStyle: 'none',
    // remove any web box shadow focus ring
    boxShadow: 'none',
    WebkitBoxShadow: 'none',
  },
  navList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#1f2937',
  },
  navButtonHover: {
    backgroundColor: '#374151',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  navbarOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    backgroundColor: 'rgba(18, 24, 32, 0.85)',
    paddingVertical: 10,
    paddingHorizontal: 0,
    zIndex: 60,
    alignItems: 'flex-start',
  },
  overlayInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
  },
  overlayNavList: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
  overlaySearchWrapper: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: 340,
    marginLeft: 0,
    overflow: 'hidden',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
    color: '#94a3b8',
  },
  searchInput: {
    flex: 1,
    height: 38,
    color: '#fff',
    fontSize: 14,
    paddingVertical: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
    outlineStyle: 'none',
    boxShadow: 'none',
    WebkitBoxShadow: 'none',
    zIndex: 10,
  },
  searchBorderButton: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  searchIconText: {
    color: '#fff',
    fontSize: 16,
  },
  overlayNavButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#c0392b',
  },
  overlayNavButtonHover: {
    backgroundColor: '#d94b45',
  },
  overlayNavButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  overlayActive: {
    backgroundColor: '#c0392b',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#b33e36',
  },
});
