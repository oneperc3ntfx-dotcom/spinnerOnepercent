export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#080808"
      }}
    >
      <h1
        style={{
          color: "#D4AF37",
          fontSize: "64px",
          fontWeight: "bold"
        }}
      >
        LUXURY SPINNER
      </h1>

      <p
        style={{
          color: "#ffffff",
          fontSize: "20px"
        }}
      >
        Website berhasil deploy di Railway
      </p>
    </main>
  );
}
