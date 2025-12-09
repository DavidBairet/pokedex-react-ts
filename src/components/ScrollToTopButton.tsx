// src/ScrollToTopButton.tsx
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // si on a scrollé de plus de 300px, on affiche le bouton
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        right: "1.5rem",
        bottom: "1.5rem",
        padding: "0.7rem 1rem",
        borderRadius: "999px",
        border: "none",
        background: "#e3350d",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
        zIndex: 1000,
      }}
    >
      ↑ Haut
    </button>
  );
}
