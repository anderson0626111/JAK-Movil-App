import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  // overlay: when true, render a compact dark nav bar suitable to overlay the hero image
  if (overlay) {
    return (
      <View style={styles.navbarOverlay}>
        <View style={styles.overlayInner}>
          <View style={styles.overlayNavList}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.overlayNavButton,
                  item === 'INICIO' && styles.overlayActive,
                ]}
              >
                <Text style={styles.overlayNavButtonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.searchBorderButton}>
            <Text style={styles.searchIconText}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return [];
    }
    return brands.filter((brand) => brand.toLowerCase().startsWith(term));
  }, [query]);

  return (
    <View style={styles.navbar}>
      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar vehículos, servicios o financiamiento"
          placeholderTextColor="#94a3b8"
          value={query}
          onChangeText={setQuery}
          selectionColor="#2563eb"
        />
      </View>

      <View style={styles.navList}>
        {navItems.map((item) => (
          <View key={item} style={styles.navButton}>
            <Text style={styles.navButtonText}>{item}</Text>
          </View>
        ))}
      </View>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => setQuery(item)}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
    paddingHorizontal: 8,
    zIndex: 60,
    alignItems: 'center',
  },
  overlayInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 12,
  },
  overlayNavList: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    alignItems: 'center',
    flex: 1,
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
    borderRadius: 6,
    backgroundColor: 'transparent',
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
  suggestionsBox: {
    position: 'absolute',
    top: 70,
    left: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  suggestionItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  suggestionText: {
    color: '#0f172a',
    fontSize: 14,
  },
});
