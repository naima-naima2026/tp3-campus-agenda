import { View, Text ,FlatList} from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};
const evenements: Evenement[] = [
  {
    id: "E01",
    titre: "Atelier React",
    categorie: "Atelier",
    capacite: 25,
    inscrits: 25,
  },
  {
    id: "E02",
    titre: "Conférence IA",
    categorie: "Conférence",
    capacite: 70,
    inscrits: 52,
  },
  {
    id: "E03",
    titre: "Sécurité mobile",
    categorie: "Atelier",
    capacite: 20,
    inscrits: 17,
  },
  {
    id: "E04",
    titre: "Design UI",
    categorie: "Atelier",
    capacite: 18,
    inscrits: 9,
  },
  {
    id: "E05",
    titre: "Forum projets",
    categorie: "Rencontre",
    capacite: 50,
    inscrits: 49,
  },
  {
    id: "E06",
    titre: "Découverte Git",
    categorie: "Atelier",
    capacite: 24,
    inscrits: 24,
  },
];
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}
function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return "Complet";
  } else if (places <= 3) {
    return "Presque complet";
  } else {
    return "Ouvert";
  }
}
const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const evenementsDisponibles = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  (e) => e.categorie === "Atelier" && placesRestantes(e) > 0
);
type BadgeEtatProps = {
  statut: string;
};
function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = "#D1FAE5";

  if (statut === "Complet") {
    couleur = "#FECACA";
  } else if (statut === "Presque complet") {
    couleur = "#FED7AA";
  }

  return (
    <View
      style={{
        backgroundColor: couleur,
        padding: 6,
        borderRadius: 8,
      }}
    >
      <Text>{statut}</Text>
    </View>
  );
}
type CarteEvenementProps = {
  evenement: Evenement;
};
function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        padding: 15,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DDDDDD",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {evenement.titre}
      </Text>

      <Text>{evenement.categorie}</Text>

      <Text>
        {placesRestantes(evenement)} places libres
      </Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}
type BlocStatistiqueProps = {
  libelle: string;
  valeur: number;
};

function BlocStatistique({ libelle, valeur }: BlocStatistiqueProps) {
  return (
    <View
      style={{
        backgroundColor: "#E0F2FE",
        padding: 15,
        margin: 5,
        borderRadius: 10,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 14, color: "#444444" }}>
        {libelle}
      </Text>

      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {valeur}
      </Text>
    </View>
  );
}
const mode = "tous";

export default function App() {
  const listeAffichee =
    mode === "tous"
      ? evenements
      : ateliersDisponibles;

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 35 }}>
        CampusAgenda
      </Text>

      <Text style={{ fontSize: 16, color: "#666", marginBottom: 20 }}>
        Événements du campus
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <BlocStatistique
          libelle="Total événements"
          valeur={totalEvenements}
        />

        <BlocStatistique
          libelle="Événements complets"
          valeur={evenementsComplets}
        />

        <BlocStatistique
          libelle="Événements disponibles"
          valeur={evenementsDisponibles}
        />

        <BlocStatistique
          libelle="Places restantes"
          valeur={totalPlacesRestantes}
        />
      </View>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 15 }}>
        Mode : {mode}
      </Text>

      <FlatList
        data={listeAffichee}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Aucun événement disponible.
          </Text>
        }
      />
    </View>
  );
}
