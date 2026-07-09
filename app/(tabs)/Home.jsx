import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.container}>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200",
        }}
        style={styles.imagen}
      />

      <View style={styles.overlay}>
        <Text style={styles.titulo}>
          LA LUCHA CONTRA EL MALTRATO ANIMAL
        </Text>

        <Text style={styles.descripcion}>
          Anímate a denunciar, adoptar y proteger a quienes no tienen voz.
        </Text>

        <TouchableOpacity style={styles.boton}>
          <Text style={styles.textoBoton}>🚨 Denunciar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>❤️ Adopta una mascota</Text>

        <Text style={styles.cardTexto}>
          Encuentra perros y gatos que esperan un nuevo hogar.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>🐾 ¿Qué puedes hacer?</Text>

        <Text style={styles.cardTexto}>
          • Adoptar{"\n"}
          • Reportar maltrato{"\n"}
          • Buscar mascotas perdidas
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141824",
  },

  imagen: {
    width: "100%",
    height: 300,
  },

  overlay: {
    padding: 20,
  },

  titulo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  descripcion: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 20,
  },

  boton: {
    backgroundColor: "#0D6EFD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  textoBoton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#1D2433",
    margin: 15,
    padding: 18,
    borderRadius: 15,
  },

  cardTitulo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardTexto: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 24,
  },
});