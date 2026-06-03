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

  const slice = 360 / participants.length;

  const addParticipant = () => {
    if (!input.trim()) return;

    setParticipants([...participants, input.toUpperCase()]);
    setInput("");
  };

  const removeParticipant = (name) => {
    setParticipants(participants.filter((p) => p !== name));
  };

  const polarToCartesian = (
    centerX,
    centerY,
    radius,
    angleInDegrees
  ) => {
    const angleInRadians =
      ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x,
    y,
    radius,
    startAngle,
    endAngle
  ) => {
    const start = polarToCartesian(
      x,
      y,
      radius,
      endAngle
    );

    const end = polarToCartesian(
      x,
      y,
      radius,
      startAngle
    );

    const largeArcFlag =
      endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      x,
      y,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
  };

  const spin = () => {
    if (spinning) return;

    const winnerIndex = Math.floor(
      Math.random() * participants.length
    );

    const extra = 360 * 8;

    const target =
      360 -
      (winnerIndex * slice + slice / 2);

    setSpinning(true);

    setRotation((prev) => prev + extra + target);

    setTimeout(() => {
      setSpinning(false);
    }, 6000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle,#111,#000)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
      }}
    >
      {/* PANEL */}
      <div
        style={{
          width: 280,
          background: "#111",
          border: "1px solid #D4AF37",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <h2 style={{ color: "#D4AF37" }}>
          Peserta
        </h2>

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Nama peserta"
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
          }}
        />

        <button
          onClick={addParticipant}
          style={{
            width: "100%",
            padding: 10,
            background: "#D4AF37",
            border: 0,
            fontWeight: "bold",
          }}
        >
          TAMBAH
        </button>

        <div
          style={{
            marginTop: 15,
            maxHeight: 350,
            overflowY: "auto",
          }}
        >
          {participants.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: 8,
              }}
            >
              <span>{p}</span>

              <button
                onClick={() =>
                  removeParticipant(p)
                }
                style={{
                  background: "red",
                  color: "#fff",
                  border: 0,
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WHEEL */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            fontSize: 50,
            fontWeight: "bold",
            color: "#D4AF37",
            textAlign: "center",
            background: "transparent",
            border: 0,
            textShadow:
              "0 0 20px rgba(212,175,55,.8)",
          }}
        />

        <input
          value={subtitle}
          onChange={(e) =>
            setSubtitle(e.target.value)
          }
          style={{
            textAlign: "center",
            color: "#fff",
            marginBottom: 30,
            background: "#111",
            border:
              "1px solid #D4AF37",
            borderRadius: 10,
          }}
        />

        {/* JARUM */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft:
              "25px solid transparent",
            borderRight:
              "25px solid transparent",
            borderTop:
              "60px solid #D4AF37",
            zIndex: 20,
            marginBottom: -20,
          }}
        />

        <div
          style={{
            position: "relative",
            width: 650,
            height: 650,
          }}
        >
          <svg
            viewBox="0 0 600 600"
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${rotation}deg)`,
              transition:
                "transform 6s cubic-bezier(.15,.85,.12,1)",
              filter:
                "drop-shadow(0 0 35px gold)",
            }}
          >
            {participants.map((name, i) => {
              const start =
                i * slice;
              const end =
                start + slice;

              const mid =
                start + slice / 2;

              const textRadius = 200;

              const tx =
                300 +
                textRadius *
                  Math.cos(
                    ((mid - 90) *
                      Math.PI) /
                      180
                  );

              const ty =
                300 +
                textRadius *
                  Math.sin(
                    ((mid - 90) *
                      Math.PI) /
                      180
                  );

              return (
                <g key={i}>
                  <path
                    d={describeArc(
                      300,
                      300,
                      290,
                      start,
                      end
                    )}
                    fill={
                      i % 2 === 0
                        ? "#D4AF37"
                        : "#F0D36B"
                    }
                    stroke="#000"
                    strokeWidth="2"
                  />

                  <text
                    x={tx}
                    y={ty}
                    fill="#000"
                    fontSize="24"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${mid} ${tx} ${ty})`}
                  >
                    {name}
                  </text>
                </g>
              );
            })}

            <circle
              cx="300"
              cy="300"
              r="35"
              fill="red"
            />
          </svg>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          style={{
            marginTop: 25,
            padding:
              "18px 50px",
            fontSize: 20,
            fontWeight: "bold",
            background:
              "linear-gradient(#F5D76E,#D4AF37)",
            border: 0,
            borderRadius: 15,
            cursor: "pointer",
          }}
        >
          {spinning
            ? "SPINNING..."
            : "SPIN NOW"}
        </button>
      </div>
    </main>
  );
}
