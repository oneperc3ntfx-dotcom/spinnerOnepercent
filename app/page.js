"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState([
    "Andi",
    "Budi",
    "Siti",
    "Rina",
    "Joko",
    "Dewi",
  ]);

  const [input, setInput] = useState("");
  const [subtitle, setSubtitle] = useState("Event Lucky Draw 2026");

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState("");

  const sliceAngle = 360 / participants.length;

  const colors = ["#D4AF37", "#111"];

  const wheelStyle = {
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    position: "relative",
    transition: "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)",
    transform: `rotate(${rotation}deg)`,
    border: "8px solid #D4AF37",
    boxShadow: "0 0 40px #D4AF37",
  };

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

  // SPIN LOGIC
  const spin = () => {
    if (participants.length === 0) return;

    setSpinning(true);
    setWinner("");

    const randomIndex = Math.floor(Math.random() * participants.length);

    const extraSpins = 5 * 360;
    const finalAngle = randomIndex * sliceAngle;

    const newRotation = extraSpins + (360 - finalAngle);

    setRotation(newRotation);

    setTimeout(() => {
      setWinner(participants[randomIndex]);
      setSpinning(false);
    }, 4200);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle, #111, #000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* TITLE */}
      <h1 style={{ color: "#D4AF37", fontSize: "50px" }}>
        LUXURY SPINNER
      </h1>

      <p style={{ color: "#aaa" }}>{subtitle}</p>

      {/* POINTER / JARUM */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderBottom: "40px solid red",
          position: "absolute",
          top: "170px",
          zIndex: 10,
        }}
      />

      {/* WHEEL */}
      <div style={wheelStyle}>
        {participants.map((p, i) => {
          const angle = i * sliceAngle;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "50%",
                height: "50%",
                top: "50%",
                left: "50%",
                transformOrigin: "0% 0%",
                transform: `rotate(${angle}deg) skewY(-${90 - sliceAngle}deg)`,
                background: colors[i % 2],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  transform: `skewY(${90 - sliceAngle}deg) rotate(${sliceAngle / 2}deg)`,
                  color: "#fff",
                  fontSize: "14px",
                  position: "absolute",
                  left: "60px",
                }}
              >
                {p}
              </span>
            </div>
          );
        })}
      </div>

      {/* BUTTON */}
      <button
        onClick={spin}
        disabled={spinning}
        style={{
          marginTop: "25px",
          padding: "15px 40px",
          background: "#D4AF37",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {spinning ? "SPINNING..." : "SPIN NOW"}
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
            fontSize: "30px",
            color: "#D4AF37",
          }}
        >
          🏆 WINNER: {winner}
        </div>
      )}

      {/* PARTICIPANT CONTROL */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          width: "220px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid #D4AF37",
          padding: "10px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah peserta"
          style={{ width: "100%", marginBottom: "5px" }}
        />

        <button
          onClick={addParticipant}
          style={{
            width: "100%",
            background: "#D4AF37",
            border: "none",
            padding: "5px",
            marginBottom: "10px",
          }}
        >
          ADD
        </button>

        {participants.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              marginBottom: "4px",
            }}
          >
            <span>{p}</span>
            <button
              onClick={() => removeParticipant(p)}
              style={{
                background: "red",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
