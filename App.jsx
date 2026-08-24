function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#273c75" }}>
          Land Registry
        </h1>

        <p>Frontend is working successfully.</p>

        <div
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#eaf8ef",
            color: "#21834b",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          ● Application Online
        </div>
      </div>
    </div>
  );
}

export default App;