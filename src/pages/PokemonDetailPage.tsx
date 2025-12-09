import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type PokemonDetail = {
  pokedex_id: number;
  name: { fr: string };
  sprites?: { regular?: string; shiny?: string };
  types?: { name: string }[];
  height?: number;
  weight?: number;
  stats?: {
    hp?: number;
    atk?: number;
    def?: number;
    spe_atk?: number;
    spe_def?: number;
    vit?: number;
  };
  evolution?: {
    pre?: {
      pokedex_id: number;
      name: string;
    }[];
    next?: {
      pokedex_id: number;
      name: string;
      condition?: string;
    }[];
  };
};


const API_BASE = "https://tyradex.vercel.app/api/v1/pokemon";

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Aucun Pokémon spécifié");
      setLoading(false);
      return;
    }

    const fetchPokemon = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) {
          throw new Error("Pokémon introuvable");
        }
        const data = (await res.json()) as PokemonDetail;
        setPokemon(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger ce Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <p>Chargement du Pokémon...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemon) return <p>Pokémon introuvable.</p>;

  return (
    <section>
      <Link
        to="/pokedex"
        style={{
          display: "inline-block",
          marginBottom: "1rem",
          textDecoration: "none",
          color: "#e3350d",
          fontWeight: 500,
        }}
      >
        ← Retour au Pokédex
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* Colonne image */}
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    alignItems: "center",
    marginBottom: "0.5rem",
    flexWrap: "wrap",
  }}
>
  {/* Normal */}
  <div>
    <p style={{ marginBottom: "0.25rem", fontSize: "0.85rem" }}>Normal</p>
    <img
      src={pokemon.sprites?.regular ?? ""}
      alt={pokemon.name.fr}
      style={{
        width: "140px",
        height: "140px",
        objectFit: "contain",
      }}
    />
  </div>

  {/* Shiny */}
  {pokemon.sprites?.shiny && (
    <div>
      <p style={{ marginBottom: "0.25rem", fontSize: "0.85rem" }}>Shiny</p>
      <img
        src={pokemon.sprites.shiny}
        alt={`${pokemon.name.fr} shiny`}
        style={{
          width: "140px",
          height: "140px",
          objectFit: "contain",
        }}
      />
    </div>
  )}
</div>


        {/* Colonne infos */}
        <div>
          <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>{pokemon.name.fr}</h2>

          <p style={{ marginBottom: "0.75rem" }}>
            <strong>Taille :</strong> {pokemon.height ?? "?"} m
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <strong>Poids :</strong> {pokemon.weight ?? "?"} kg
          </p>

          <h3 style={{ marginBottom: "0.75rem" }}>Statistiques de base</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0, lineHeight: 1.6 }}>
            <li>
              <strong>PV :</strong> {pokemon.stats?.hp ?? "?"}
            </li>
            <li>
              <strong>Attaque :</strong> {pokemon.stats?.atk ?? "?"}
            </li>
            <li>
              <strong>Défense :</strong> {pokemon.stats?.def ?? "?"}
            </li>
            <li>
              <strong>Att. Spéciale :</strong> {pokemon.stats?.spe_atk ?? "?"}
            </li>
            <li>
              <strong>Déf. Spéciale :</strong> {pokemon.stats?.spe_def ?? "?"}
            </li>
            <li>
              <strong>Vitesse :</strong> {pokemon.stats?.vit ?? "?"}
            </li>
          </ul>
                    <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem" }}>Évolutions</h3>

          {/* Pré-évolutions */}
          {pokemon.evolution?.pre && pokemon.evolution.pre.length > 0 && (
            <div style={{ marginBottom: "0.75rem" }}>
              <p style={{ marginBottom: "0.25rem", fontWeight: 500 }}>Pré-évolutions :</p>
              <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                {pokemon.evolution.pre.map((ev) => (
                  <li key={ev.pokedex_id}>
                    <Link to={`/pokemon/${ev.pokedex_id}`} style={{ color: "#e3350d" }}>
                      #{ev.pokedex_id.toString().padStart(3, "0")} {ev.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Évolutions suivantes */}
          {pokemon.evolution?.next && pokemon.evolution.next.length > 0 && (
            <div>
              <p style={{ marginBottom: "0.25rem", fontWeight: 500 }}>Évolutions suivantes :</p>
              <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                {pokemon.evolution.next.map((ev) => (
                  <li key={ev.pokedex_id}>
                    <Link to={`/pokemon/${ev.pokedex_id}`} style={{ color: "#e3350d" }}>
                      #{ev.pokedex_id.toString().padStart(3, "0")} {ev.name}
                    </Link>
                    {ev.condition && (
                      <span style={{ fontSize: "0.85rem", color: "#555" }}>
                        {" "}
                        — {ev.condition}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!pokemon.evolution?.pre &&
            !pokemon.evolution?.next && (
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                Ce Pokémon n&apos;a pas d&apos;évolution répertoriée.
              </p>
            )}

        </div>
      </div>
    </section>
  );
}
