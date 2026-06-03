export const metadata = {
  title: "Luxury Spinner",
  description: "Luxury Spinner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          background: "#050505",
          color: "#fff",
          fontFamily: "Arial",
        }}
      >
        {children}
      </body>
    </html>
  );
}
