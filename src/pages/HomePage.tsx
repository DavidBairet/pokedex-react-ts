import { Link } from "react-router-dom";
import logo from "../assets/logo transparent.png";

// Composant qui dessine la Pokéball
function Pokeball() {
  return (
    <div
      style={{
        width: "220px",
        height: "220px",
        borderRadius: "50%",
        background:
          "linear-gradient(to bottom, #f00000 0 50%, #ffffff 50% 100%)",
        border: "10px solid #333",
        position: "relative",
        boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
        marginBottom: "1.5rem",
      }}
    >
      {/* bande noire */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "26px",
          transform: "translateY(-50%)",
          background: "#222",
        }}
      />
      {/* cercle central */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "8px solid #222",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #ffffff, #d0d0d0)",
            border: "4px solid #999",
          }}
        />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1rem",
        marginTop: "1.5rem",
      }}
    >
      <Pokeball />

      {/* Bouton pour entrer dans le Pokédex */}
      <Link
        to="/pokedex"
        style={{
          display: "inline-block",
          marginTop: "0.8rem",
          padding: "0.9rem 2.2rem",
          borderRadius: "999px",
          background: "#e3350d",
          color: "white",
          textDecoration: "none",
          fontWeight: 600,
          fontFamily: "'Bungee', sans-serif",
          boxShadow: "0 6px 16px rgba(227, 53, 13, 0.5)",
        }}
      >
        Ouvrir le Pokédex
      </Link>

      {/* Crédits sous le bouton */}
      <div
        style={{
          marginTop: "0.8rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          fontSize: "0.9rem",
          color: "#555",
        }}
      >
        <img
          src={logo}
          alt="Les Sites de David"
          style={{ width: "110px", opacity: 0.9 }}
        />

        <p style={{ margin: 0 }}>
          Réalisé par <strong>Les Sites de David</strong>
        </p>

        <p style={{ margin: 0, opacity: 0.85 }}>
          Projet React + TypeScript utilisant l’API Tyradex
        </p>
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

    </section>
  );
}
