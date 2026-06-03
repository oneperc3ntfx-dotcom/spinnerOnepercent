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
const [subtitle, setSubtitle] = useState("HADIAH 1 JUTA");

const [rotation, setRotation] = useState(0);
const [spinning, setSpinning] = useState(false);
const [winner, setWinner] = useState("");

const addParticipant = () => {
if (!input.trim()) return;

```
setParticipants([...participants, input.trim()]);
setInput("");
```

};

const removeParticipant = (name) => {
setParticipants(participants.filter((p) => p !== name));
};

const spin = () => {
if (participants.length === 0 || spinning) return;

```
setSpinning(true);

const randomIndex = Math.floor(
  Math.random() * participants.length
);

const sliceAngle = 360 / participants.length;

const stopAngle =
  360 - (randomIndex * sliceAngle + sliceAngle / 2);

const totalRotation =
  360 * 8 + stopAngle;

setRotation((prev) => prev + totalRotation);

setTimeout(() => {
  setWinner(participants[randomIndex]);
  setSpinning(false);
}, 6000);
```

};

const wheelStyle = {
width: 650,
height: 650,
borderRadius: "50%",
position: "relative",
transition:
"transform 6s cubic-bezier(.15,.8,.15,1)",
transform: `rotate(${rotation}deg)`,
overflow: "hidden",
border: "12px solid #D4AF37",
boxShadow: "0 0 60px #D4AF37",
background:
"radial-gradient(circle,#f7d46a,#d4af37)",
};

const sliceAngle = 360 / participants.length;

return (
<main
style={{
minHeight: "100vh",
background:
"radial-gradient(circle,#111,#000)",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
color: "#fff",
overflow: "hidden",
}}
>
<input
value={title}
onChange={(e) =>
setTitle(e.target.value)
}
style={{
background: "transparent",
border: "none",
color: "#D4AF37",
fontSize: 56,
fontWeight: "bold",
textAlign: "center",
marginBottom: 10,
textShadow:
"0 0 20px rgba(212,175,55,.8)",
}}
/>

```
  <input
    value={subtitle}
    onChange={(e) =>
      setSubtitle(e.target.value)
    }
    style={{
      width: 600,
      maxWidth: "90%",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      padding: 14,
      borderRadius: 15,
      border: "2px solid #D4AF37",
      background: "#111",
      color: "#fff",
      marginBottom: 40,
    }}
  />

  <div
    style={{
      position: "relative",
      width: 650,
      height: 650,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -55,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft:
          "28px solid transparent",
        borderRight:
          "28px solid transparent",
        borderTop:
          "70px solid #D4AF37",
        zIndex: 999,
      }}
    />

    <div style={wheelStyle}>
      {participants.map((name, i) => {
        const start = i * sliceAngle;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "50%",
              height: "50%",
              left: "50%",
              top: "50%",
              transformOrigin:
                "0% 0%",
              transform:
                `rotate(${start}deg) skewY(${90 - sliceAngle}deg)`,
              background:
                i % 2 === 0
                  ? "#f7d46a"
                  : "#d4af37",
              border:
                "1px solid rgba(0,0,0,.2)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 120,
                top: "50%",
                transform:
                  `translateY(-50%) skewY(-${90 - sliceAngle}deg)`,
                width: 180,
                color: "#000",
                fontWeight: "bold",
                fontSize: 18,
                whiteSpace:
                  "nowrap",
                overflow:
                  "hidden",
                textOverflow:
                  "ellipsis",
              }}
            >
              {name}
            </div>
          </div>
        );
      })}
    </div>
  </div>

  <button
    onClick={spin}
    disabled={spinning}
    style={{
      marginTop: 35,
      padding:
        "18px 60px",
      background: "#D4AF37",
      border: "none",
      borderRadius: 15,
      fontSize: 24,
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    {spinning
      ? "SPINNING..."
      : "SPIN NOW"}
  </button>

  <div
    style={{
      position: "fixed",
      right: 20,
      bottom: 20,
      width: 260,
      background:
        "rgba(0,0,0,.8)",
      border:
        "1px solid #D4AF37",
      borderRadius: 15,
      padding: 15,
    }}
  >
    <input
      value={input}
      onChange={(e) =>
        setInput(e.target.value)
      }
      placeholder="Tambah peserta"
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
        background:
          "#D4AF37",
        border: "none",
        fontWeight: "bold",
        marginBottom: 15,
      }}
    >
      ADD
    </button>

    {participants.map((p, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: 6,
        }}
      >
        <span>{p}</span>

        <button
          onClick={() =>
            removeParticipant(p)
          }
          style={{
            background:
              "red",
            color: "#fff",
            border: "none",
          }}
        >
          X
        </button>
      </div>
    ))}
  </div>

  {winner && (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,.92)",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          textAlign: "center",
          border:
            "3px solid #D4AF37",
          padding: 60,
          borderRadius: 30,
          background: "#111",
          boxShadow:
            "0 0 120px #D4AF37",
        }}
      >
        <div
          style={{
            fontSize: 90,
          }}
        >
          🏆
        </div>

        <div
          style={{
            color: "#D4AF37",
            fontSize: 42,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          SELAMAT KAMU MEMENANGKAN
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 30,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#D4AF37",
            textShadow:
              "0 0 40px #D4AF37",
          }}
        >
          {winner}
        </div>

        <button
          onClick={() =>
            setWinner("")
          }
          style={{
            marginTop: 40,
            padding:
              "15px 40px",
            background:
              "#D4AF37",
            border: "none",
            borderRadius: 12,
            fontWeight: "bold",
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


