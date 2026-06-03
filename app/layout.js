export const metadata = {
  title: "Luxury Spinner",
  description: "Luxury Spinner Website"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#080808",
          color: "#ffffff"
        }}
      >
        {children}
      </body>
    </html>
  );
}
