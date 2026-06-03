"use client";

import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState([
    "ANDI",
    "BUDI",
    "SITI",
    "RINA",
    "JOKO",
    "DEWI",
  ]);

  const [input, setInput] = useState("");
  const [title, setTitle] = useState("LUXURY SPINNER");
  const [subtitle, setSubtitle] = useState("HADIAH 1 JUTA");

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState("");

  const sliceAngle = 360 / participants.length;

  const addParticipant = () => {
    if (!input.trim()) return;
    setParticipants([...participants, input.trim().toUpperCase()]);
    setInput("");
  };

  const removeParticipant = (name) => {
    setParticipants(participants.filter((p) => p !== name));
  };

  const spin = () => {
    if (participants.length === 0 || spinning) return;

    setWinner("");
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * participants.length);

    const anglePerSlice = 360 / participants.length;

    const stopAngle =
      360 - (randomIndex * anglePerSlice + anglePerSlice / 2);

    const totalRotation = rotation + 360 * 8 + stopAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setWinner(participants[randomIndex]);
      setSpinning(false);
    }, 6000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center,#141414,#000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          background: "transparent",
          border: "none",
          color: "#D4AF37",
          fontSize: 60,
          fontWeight: 900,
          textAlign: "center",
          textShadow: "0 0 25px #D4AF37",
          outline: "none",
        }}
      />

      {/* SUBTITLE */}
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        style={{
          width: 900,
          maxWidth: "90%",
          marginTop: 10,
          marginBottom: 30,
          textAlign: "center",
          fontSize: 42,
          fontWeight: 900,
          borderRadius: 20,
          border: "2px solid #D4AF37",
          background: "#111",
          color: "#fff",
          padding: 15,
          outline: "none",
        }}
      />

      {/* WHEEL CONTAINER */}
      <div
        style={{
          position: "relative",
          width: 750,
          height: 750,
        }}
      >
        {/* POINTER (RED + CLEAN) */}
        <div
          style={{
            position: "absolute",
            top: -55,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "22px solid transparent",
            borderRight: "22px solid transparent",
            borderTop: "70px solid #ff2d2d",
            zIndex: 999,
            filter: "drop-shadow(0 0 10px red)",
          }}
        />

        {/* CENTER DOT (SMALL & PERFECT CENTER) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 45,
            height: 45,
            borderRadius: "50%",
            background: "#111",
            border: "5px solid #D4AF37",
            zIndex: 999,
            boxShadow: "0 0 20px rgba(212,175,55,.6)",
          }}
        />

        {/* WHEEL */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            transform: `rotate(${rotation}deg)`,
            transition: "transform 6s cubic-bezier(.12,.8,.12,1)",
            border: "12px solid #D4AF37",
            boxShadow: "0 0 70px rgba(212,175,55,.6)",
            background: "radial-gradient(circle,#f7d46a,#d4af37)",
          }}
        >
          {participants.map((name, i) => {
            const angle = i * sliceAngle;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "50%",
                  height: "50%",
                  left: "50%",
                  top: "50%",
                  transformOrigin: "0% 0%",
                  transform: `rotate(${angle}deg)`,
                }}
              >
                {/* SEGMENT */}
                <div
                  style={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    background: i % 2 === 0 ? "#f7d46a" : "#d4af37",
                    clipPath: "polygon(0 0, 50% 0, 50% 50%)",
                    border: "1px solid rgba(0,0,0,.15)",
                  }}
                />

                {/* TEXT FOLLOW ARC */}
                <div
                  style={{
                    position: "absolute",
                    left: 120,
                    top: 120,
                    transform: `
                      rotate(${sliceAngle / 2}deg)
                      translateY(-220px)
                      rotate(90deg)
                    `,
                    transformOrigin: "center",
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#111",
                    whiteSpace: "nowrap",
                    textShadow: "0 1px 2px rgba(255,255,255,.3)",
                  }}
                >
                  {name}
                </div>
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
          marginTop: 35,
          padding: "18px 65px",
          fontSize: 26,
          fontWeight: 900,
          border: "none",
          borderRadius: 14,
          background: "#D4AF37",
          cursor: "pointer",
          boxShadow: "0 0 30px rgba(212,175,55,.5)",
        }}
      >
        {spinning ? "SPINNING..." : "SPIN NOW"}
      </button>

      {/* PANEL PESERTA (UNCHANGED STYLE) */}
      <div
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          width: 280,
          background: "#111",
          border: "2px solid #D4AF37",
          borderRadius: 15,
          padding: 15,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah peserta"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
          }}
        />

        <button
          onClick={addParticipant}
          style={{
            width: "100%",
            padding: 12,
            background: "#D4AF37",
            border: "none",
            fontWeight: 900,
            marginBottom: 15,
            cursor: "pointer",
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
              marginBottom: 6,
            }}
          >
            <span>{p}</span>
            <button
              onClick={() => removeParticipant(p)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 🎉 WINNER POPUP (TIDAK DIUBAH SAMA SEKALI) */}
      {winner && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.94)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: 70,
              borderRadius: 30,
              background: "#111",
              border: "3px solid #D4AF37",
              boxShadow: "0 0 120px #D4AF37",
            }}
          >
            <div style={{ fontSize: 90, marginBottom: 10 }}>🏆</div>

            <div
              style={{
                color: "#D4AF37",
                fontSize: 44,
                fontWeight: 900,
              }}
            >
              SELAMAT KAMU MEMENANGKAN
            </div>

            <div
              style={{
                color: "#fff",
                fontSize: 56,
                fontWeight: 900,
                marginTop: 20,
              }}
            >
              {subtitle}
            </div>

            <div
              style={{
                marginTop: 35,
                fontSize: 130,
                fontWeight: 900,
                color: "#D4AF37",
                textShadow: "0 0 40px #D4AF37",
              }}
            >
              {winner}
            </div>

            <div style={{ marginTop: 30, fontSize: 60 }}>
              🎉 🎊 🎉
            </div>

            <button
              onClick={() => setWinner("")}
              style={{
                marginTop: 30,
                padding: "15px 45px",
                border: "none",
                borderRadius: 12,
                background: "#D4AF37",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              TUTUP
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
