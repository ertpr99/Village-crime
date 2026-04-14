export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: "linear-gradient(180deg, #1a2a4a 0%, #0f172a 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "min(92vw, 420px)",
          padding: "28px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ margin: "0 0 10px", fontSize: "30px" }}>Village Game</h1>
        <p style={{ margin: "0 0 22px", color: "rgba(255,255,255,0.8)" }}>
          Proje düzgün çalışıyor. Şimdi menü ekranını bunun üstüne kurabiliriz.
        </p>

        <div style={{ display: "grid", gap: "12px" }}>
          <button style={btnStyle}>Oda Kur</button>
          <button style={btnStyle}>Oda Listeleri</button>
          <button style={btnStyle}>Roller Hakkında</button>
          <button style={btnStyle}>Ayarlar</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
};
