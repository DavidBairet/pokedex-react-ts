import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTopButton";

type Pokemon = {
  pokedex_id: number;
  name: {
    fr: string;
  };
  sprites?: {
    regular?: string;
  };
  types?: {
    name: string;
  }[];
};

const API_URL = "https://tyradex.vercel.app/api/v1/pokemon";

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Tous");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Erreur API");
        const data = (await res.json()) as Pokemon[];
        setPokemons(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const allTypes = Array.from(
    new Set(pokemons.flatMap((p) => (p.types ?? []).map((t) => t.name)))
  ).sort();

  const filtered = pokemons
    .filter((p) =>
      p.name.fr.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => {
      if (selectedType === "Tous") return true;
      return (p.types ?? []).some((t) => t.name === selectedType);
    })
    .sort((a, b) => a.pokedex_id - b.pokedex_id);

  if (loading) return <p>Chargement du Pokédex...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2 style={{ marginBottom: "1rem" }}>Pokédex</h2>

      {/* Filtres */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.6rem 0.8rem",
            width: "100%",
            maxWidth: "280px",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            padding: "0.6rem 0.8rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            minWidth: "180px",
          }}
        >
          <option value="Tous">Tous les types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Grille des cartes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((pokemon) => (
          <Link
            key={pokemon.pokedex_id}
            to={`/pokemon/${pokemon.pokedex_id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                padding: "1rem",
                background: "white",
                borderRadius: "1.2rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 18px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 10px rgba(0,0,0,0.08)";
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                #{pokemon.pokedex_id.toString().padStart(3, "0")}{" "}
                {pokemon.name.fr}
              </p>

              <img
                src={pokemon.sprites?.regular ?? ""}
                alt={pokemon.name.fr}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "0.5rem",
                }}
              />

              <div>
                {(pokemon.types ?? []).map((t) => (
                  <span
                    key={t.name}
                    style={{
                      display: "inline-block",
                      padding: "0.15rem 0.6rem",
                      borderRadius: "999px",
                      background: "#eef0f4",
                      fontSize: "0.8rem",
                      marginRight: "0.3rem",
                    }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Footer Version */}
      <p
        className="retro-version"
        style={{
          marginTop: "2rem",
          fontSize: "0.75rem",
          opacity: 0.6,
        }}
      >
        Pokédex — Version 1.0 — 2025
      </p>

      <ScrollToTopButton />
    </section>
  );
}
