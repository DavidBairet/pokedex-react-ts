import { Routes, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokedexPage from "./pages/PokedexPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";

function App() {
  const location = useLocation();

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1rem 2rem",
          background: "#e3350d",
          color: "white",
        }}
      >
       <div
  style={{
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // important
  }}
>
 <h1
  style={{
    margin: 0,
    fontSize: "2.2rem",
    fontFamily: "'Pokemon Solid', sans-serif",
    letterSpacing: "2px",
    color: "#ffcc03",
    textShadow: "3px 3px 0 #3b4cca, -3px 3px 0 #3b4cca, 3px -3px 0 #3b4cca, -3px -3px 0 #3b4cca"
  }}
>
  <>
    <img 
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
      alt="Pokeball"
      style={{ width: "60px", height: "60px", marginRight: "40px", verticalAlign: "middle" }}
    />
    Mon Pokédex
  </>
</h1>

  

  <nav
    style={{
      position: "absolute",
      right: 0,
      display: "flex",
      gap: "1.5rem",
      fontWeight: 500,
    }}
  >
    {location.pathname !== "/" && (
      <Link to="/" className="retro-gameboy" style={{ color: "white", textDecoration: "none" }}>
  Accueil
</Link>

    )}

   
  </nav>
</div>

      </header>

      {/* Contenu des pages */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: "0 2rem 3rem",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="*" element={<p>Page introuvable 👀</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
