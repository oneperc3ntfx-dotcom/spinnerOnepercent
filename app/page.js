"use client";

import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState([
    "Andi",
    "Budi",
    "Siti",
    "Rina",
  ]);

  const [input, setInput] = useState("");
  const [subtitle, setSubtitle] = useState("Event Lucky Draw 2026");

  const [winner, setWinner] = useState("");
  const [spinning, setSpinning] = useState(false);

  // TAMBAH PESERTA
  const addParticipant = () => {
    if (!input) return;
    setParticipants([...participants, input]);
    setInput("");
  };

  // HAPUS PESERTA
  const removeParticipant = (name) => {
    setParticipants(participants.filter((p) => p !== name));
  };

  // SPIN
  const spin = () => {
    if (participants.length === 0) return;

    setSpinning(true);
    setWinner("");

    setTimeout(() => {
      const random =
        participants[Math.floor(Math.random() * participants.length)];
      setWinner(random);
      setSpinning(false);
    }, 2500);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #111, #000)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          fontSize: "60px",
          color: "#D4AF37",
          textShadow: "0 0 20px #D4AF37",
          marginBottom: "10px",
        }}
      >
        LUXURY SPINNER
      </h1>

      {/* SUBTITLE EDITABLE */}
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        style={{
          background: "transparent",
          border: "1px solid #D4AF37",
          color: "#fff",
          padding: "8px 15px",
          borderRadius: "8px",
          marginBottom: "25px",
          textAlign: "center",
        }}
      />

      <p style={{ color: "#aaa", marginBottom: "20px" }}>{subtitle}</p>

      {/* SPINNER */}
      <div
        style={{
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          border: "14px solid #D4AF37",
          background:
            "conic-gradient(#D4AF37, #111, #D4AF37, #111, #D4AF37, #111)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "60px",
          boxShadow: "0 0 60px #D4AF37",
          animation: spinning ? "spin 0.3s linear infinite" : "none",
        }}
      >
        🎡
      </div>

      {/* BUTTON */}
      <button
        onClick={spin}
        style={{
          marginTop: "25px",
          padding: "15px 40px",
          background: "#D4AF37",
          border: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        SPIN NOW
      </button>

      {/* WINNER */}
      {winner && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0,0,0,0.9)",
            border: "2px solid #D4AF37",
            padding: "30px",
            borderRadius: "20px",
            fontSize: "28px",
            color: "#D4AF37",
            textAlign: "center",
          }}
        >
          🏆 WINNER: {winner}
        </div>
      )}

      {/* PARTICIPANT PANEL */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          width: "220px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid #D4AF37",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h3 style={{ color: "#D4AF37" }}>Participants</h3>

        {/* INPUT */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah nama"
          style={{
            width: "100%",
            padding: "6px",
            marginBottom: "5px",
          }}
        />

        <button
          onClick={addParticipant}
          style={{
            width: "100%",
            marginBottom: "10px",
            background: "#D4AF37",
            border: "none",
            padding: "6px",
            cursor: "pointer",
          }}
        >
          ADD
        </button>

        {/* LIST */}
        {participants.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span>{p}</span>
            <button
              onClick={() => removeParticipant(p)}
              style={{
                background: "red",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
