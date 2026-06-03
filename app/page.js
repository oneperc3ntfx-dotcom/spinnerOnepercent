"use client";

import { useState } from "react";

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
  const [title, setTitle] = useState("LUXURY SPINNER");
  const [subtitle, setSubtitle] = useState("Event Lucky Draw 2026");

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const sliceAngle = 360 / participants.length;

  const colors = ["#D4AF37", "#111"];

  // ADD
  const addParticipant = () => {
    if (!input) return;
    setParticipants([...participants, input]);
    setInput("");
  };

  // REMOVE
  const removeParticipant = (name) => {
    setParticipants(participants.filter((p) => p !== name));
  };

  // SPIN
  const spin = () => {
    if (participants.length === 0 || spinning) return;

    setSpinning(true);
    setWinner("");
    setShowConfetti(false);

    const randomIndex = Math.floor(Math.random() * participants.length);

    const extraSpins = 4 * 360; // lebih pelan & smooth
    const finalAngle = randomIndex * sliceAngle;

    const newRotation = extraSpins + (360 - finalAngle);

    setRotation((prev) => prev + newRotation);

    setTimeout(() => {
      const win = participants[randomIndex];
      setWinner(win);
      setSpinning(false);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 4000);
    }, 4500);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #111, #000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* TITLE EDITABLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          fontSize: "40px",
          textAlign: "center",
          background: "transparent",
          border: "none",
          color: "#D4AF37",
          fontWeight: "bold",
          textShadow: "0 0 20px #D4AF37",
        }}
      />

      {/* SUBTITLE EDITABLE */}
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        style={{
          marginTop: "5px",
          marginBottom: "20px",
          background: "transparent",
          border: "1px solid #D4AF37",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      />

      {/* WHEEL WRAPPER */}
      <div
        style={{
          position: "relative",
          width: "420px",
          height: "420px",
        }}
      >
        {/* POINTER (DI DALAM LINGKARAN) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "20px",
            height: "20px",
            background: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            boxShadow: "0 0 10px red",
          }}
        />

        {/* WHEEL */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "10px solid #D4AF37",
            position: "relative",
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4.5s cubic-bezier(0.12, 0.7, 0.1, 1)",
            boxShadow: "0 0 60px #D4AF37",
            background: "radial-gradient(circle, #222, #000)",
          }}
        >
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
                    fontSize: "12px",
                    color: "#fff",
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
          cursor: spinning ? "not-allowed" : "pointer",
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
            textAlign: "center",
          }}
        >
          🏆 WINNER: {winner}
        </div>
      )}

      {/* CONFETTI SIMPLE */}
      {showConfetti && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.2), transparent)",
            animation: "flash 1s ease-in-out infinite",
          }}
        />
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
          padding: "10px",
          borderRadius: "10px",
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
            padding: "6px",
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

      {/* ANIMATION */}
      <style>{`
        @keyframes flash {
          0% { opacity: 0.2; }
          50% { opacity: 0.6; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </main>
  );
}
