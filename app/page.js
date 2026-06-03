"use client";

import { useState } from "react";

export default function Home() {
  const participants = [
    "Andi",
    "Budi",
    "Siti",
    "Rina",
    "Joko",
    "Dewi",
  ];

  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState("");

  const spin = () => {
    setSpinning(true);
    setWinner("");

    setTimeout(() => {
      const random =
        participants[Math.floor(Math.random() * participants.length)];
      setWinner(random);
      setSpinning(false);
    }, 3000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle, #111, #000)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* HEADER */}
      <h1
        style={{
          fontSize: "60px",
          color: "#D4AF37",
          letterSpacing: "4px",
          textShadow: "0 0 20px #D4AF37",
          marginBottom: "20px",
        }}
      >
        LUXURY SPINNER
      </h1>

      {/* SPINNER */}
      <div
        style={{
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: "10px solid #D4AF37",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: spinning ? "spin 0.6s linear infinite" : "none",
          boxShadow: "0 0 30px #D4AF37",
        }}
      >
        🎡
      </div>

      {/* BUTTON */}
      <button
        onClick={spin}
        style={{
          marginTop: "30px",
          padding: "15px 40px",
          fontSize: "18px",
          background: "#D4AF37",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        SPIN NOW
      </button>

      {/* WINNER */}
      {winner && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0,0,0,0.8)",
            padding: "40px",
            border: "2px solid #D4AF37",
            borderRadius: "20px",
            fontSize: "30px",
            color: "#D4AF37",
            textAlign: "center",
          }}
        >
          🏆 WINNER: {winner}
        </div>
      )}

      {/* PARTICIPANTS */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          background: "rgba(255,255,255,0.05)",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #D4AF37",
        }}
      >
        <h3 style={{ color: "#D4AF37" }}>Participants</h3>
        {participants.map((p, i) => (
          <div key={i}>{p}</div>
        ))}
      </div>

      {/* ANIMATION STYLE */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
