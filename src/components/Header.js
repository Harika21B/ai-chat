function Header() {
  return (
    <div
      style={{
        height: "60px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        background: "white",
      }}
    >
      <div
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "10px",
          background: "linear-gradient(90deg, #a855f7, #f97316)",
        }}
      ></div>

      <h3
        style={{
          marginLeft: "10px",
          background: "linear-gradient(90deg, #a855f7, #f97316)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        AI Chat
      </h3>
    </div>
  );
}

export default Header;
