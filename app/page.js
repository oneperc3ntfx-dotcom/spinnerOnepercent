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
  const [showWinner, setShowWinner] = useState(false);

  const sliceAngle = 360 / participants.length;

  const addParticipant = () => {
    if (!input.trim()) return;

    setParticipants([
      ...participants,
      input.toUpperCase(),
    ]);

    setInput("");
  };

  const removeParticipant = (name) => {
    setParticipants(
      participants.filter((p) => p !== name)
    );
  };

  const polarToCartesian = (
    centerX,
    centerY,
    radius,
    angleInDegrees
  ) => {
    const angleInRadians =
      ((angleInDegrees - 90) * Math.PI) /
      180;

    return {
      x:
        centerX +
        radius * Math.cos(angleInRadians),
      y:
        centerY +
        radius * Math.sin(angleInRadians),
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
      endAngle - startAngle <= 180
        ? "0"
        : "1";

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

    const winnerName =
      participants[winnerIndex];

    const extraSpins = 360 * 8;

    const targetAngle =
      360 -
      (winnerIndex * sliceAngle +
        sliceAngle / 2);

    setSpinning(true);

    setRotation(
      (prev) =>
        prev +
        extraSpins +
        targetAngle
    );

    setTimeout(() => {
      setWinner(winnerName);
      setShowWinner(true);
      setSpinning(false);
    }, 6000);
  };

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle,#111,#000)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          overflow: "hidden",
        }}
      >
        {/* PANEL PESERTA */}
        <div
          style={{
            width: "280px",
            background:
              "rgba(255,255,255,.05)",
            border:
              "1px solid #D4AF37",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <h2
            style={{
              color: "#D4AF37",
              textAlign: "center",
            }}
          >
            PESERTA
          </h2>

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Nama peserta"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button
            onClick={addParticipant}
            style={{
              width: "100%",
              padding: "10px",
              background: "#D4AF37",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            TAMBAH
          </button>

          <div
            style={{
              marginTop: "15px",
              maxHeight: "400px",
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
                  marginBottom: "8px",
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
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SPINNER */}
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
              fontSize: "52px",
              fontWeight: "bold",
              color: "#D4AF37",
              background:
                "transparent",
              border: "none",
              textAlign: "center",
              textShadow:
                "0 0 20px gold",
            }}
          />

          <input
            value={subtitle}
            onChange={(e) =>
              setSubtitle(e.target.value)
            }
            style={{
              marginBottom: "30px",
              textAlign: "center",
              border:
                "1px solid #D4AF37",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              padding: "8px 15px",
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
              zIndex: 999,
              marginBottom: "-15px",
            }}
          />

          <div
            style={{
              width: "650px",
              height: "650px",
              position: "relative",
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
                  "drop-shadow(0 0 50px gold)",
              }}
            >
              {participants.map(
                (name, index) => {
                  const start =
                    index *
                    sliceAngle;

                  const end =
                    start +
                    sliceAngle;

                  const mid =
                    start +
                    sliceAngle / 2;

                  const textRadius = 190;

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
                    <g key={index}>
                      <path
                        d={describeArc(
                          300,
                          300,
                          290,
                          start,
                          end
                        )}
                        fill={
                          index % 2 ===
                          0
                            ? "#D4AF37"
                            : "#F5D76E"
                        }
                        stroke="#000"
                        strokeWidth="2"
                      />

                      <text
                        x={tx}
                        y={ty}
                        fill="#000"
                        fontWeight="bold"
                        fontSize="24"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${mid} ${tx} ${ty})`}
                      >
                        {name}
                      </text>
                    </g>
                  );
                }
              )}

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
              marginTop: "20px",
              padding:
                "18px 50px",
              fontSize: "22px",
              fontWeight: "bold",
              background:
                "linear-gradient(#FFD700,#D4AF37)",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            {spinning
              ? "SPINNING..."
              : "SPIN NOW"}
          </button>
        </div>
      </main>

      {/* POPUP PEMENANG */}
      {showWinner && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,.85)",
            backdropFilter:
              "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#000",
              border:
                "3px solid #D4AF37",
              borderRadius: "30px",
              padding: "50px",
              textAlign: "center",
              boxShadow:
                "0 0 80px gold",
              animation:
                "winnerZoom .5s ease",
            }}
          >
            <div
              style={{
                fontSize: "80px",
              }}
            >
              🏆
            </div>

            <div
              style={{
                color: "#D4AF37",
                fontSize: "30px",
                marginTop: "10px",
              }}
            >
              PEMENANG
            </div>

            <div
              style={{
                fontSize: "65px",
                fontWeight: "bold",
                color: "#fff",
                marginTop: "10px",
                textShadow:
                  "0 0 30px gold",
              }}
            >
              {winner}
            </div>

            <button
              onClick={() =>
                setShowWinner(false)
              }
              style={{
                marginTop: "25px",
                padding:
                  "15px 40px",
                background:
                  "#D4AF37",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              TUTUP
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes winnerZoom {
          from {
            transform: scale(0.3);
            opacity: 0;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
