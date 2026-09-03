import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [mode, setMode] = useState<"goal" | "inspire">("goal");
  const [destination, setDestination] = useState("");
  const [interests, setInterests] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handlePlan = () => {
    const slug = destination.trim().toLowerCase().replace(/\s+/g, '-') || 'featured-trip';
    navigate(`/plan/new/${slug}`);
  };

  const handleQuickSuggestion = (d: string) => {
    setDestination(d);
    const slug = d.trim().toLowerCase().replace(/\s+/g, '-');
    navigate(`/plan/new/${slug}`);
  };

  return (
    <section style={{ maxWidth: 680, margin: "0 auto", padding: "52px 16px 36px", textAlign: "center" }}>
      {/* Trust badges */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {["🌱 80% CO₂-Ersparnis", "🚆 Live Bahn-Preise", "🔒 100% DSGVO-konform"].map(b => (
          <span key={b} style={{
            background: "#E8F5E9", color: "#1E3A2B",
            fontSize: 12, fontWeight: 600,
            padding: "4px 12px", borderRadius: 9999,
          }}>{b}</span>
        ))}
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "clamp(28px, 5vw, 40px)",
        fontWeight: 800, lineHeight: 1.18,
        color: "#1E3A2B", marginBottom: 12,
        letterSpacing: "-0.5px",
      }}>
        Dein Wochenendtrip in{" "}
        <em style={{ fontStyle: "italic", color: "#2ECC71" }}>30 Sekunden</em>{" "}
        geplant.
      </h1>
      <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 32, lineHeight: 1.6 }}>
        Smarte KI-Routen mit Zugverbindungen, bezahlbaren Unterkünften und Live-Wetter.
      </p>

      {/* Search card */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: 24, border: "1px solid #E5E7EB",
        padding: "24px", textAlign: "left",
        boxShadow: "0 10px 25px -5px rgba(30,58,43,0.07), 0 4px 6px -2px rgba(0,0,0,0.03)",
      }}>
        {/* Mode switcher */}
        <div style={{
          display: "flex", background: "#F3F4F6",
          borderRadius: 14, padding: 4, marginBottom: 22, gap: 4,
        }}>
          {[
            { id: "goal" as const, label: "🎯 Ich habe ein Ziel" },
            { id: "inspire" as const, label: "✨ Lass dich inspirieren" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              style={{
                flex: 1, textAlign: "center",
                padding: "10px 8px",
                borderRadius: 10, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: mode === id ? 700 : 500,
                background: mode === id ? "#1E3A2B" : "transparent",
                color: mode === id ? "#FFFFFF" : "#6B7280",
                transition: "all 0.18s ease",
              }}
            >{label}</button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {mode === "goal" ? (
            <>
              <div>
                <label style={labelStyle}>Wohin soll's gehen?</label>
                <input
                  placeholder="z. B. Salzburg, Zürich…"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Abfahrt</label>
                <input
                  placeholder="z. B. München Hbf"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Wann?</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Bis</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Budget</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} style={inputStyle}>
                  <option value="">Egal</option>
                  <option value="low">Bis 100€</option>
                  <option value="mid">100 – 250€</option>
                  <option value="high">250€+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Reiseart</label>
                <select style={inputStyle}>
                  <option value="solo">🧍 Solo</option>
                  <option value="couple">💑 Pärchen</option>
                  <option value="friends">👯 Freunde</option>
                  <option value="family">👨‍👩‍👧 Familie</option>
                  <option value="group">🎉 Gruppe</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Deine Interessen</label>
                <input
                  placeholder="z. B. Natur, Kultur, Essen, Abenteuer…"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Wann?</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Bis</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Budget</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} style={inputStyle}>
                  <option value="">Egal</option>
                  <option value="low">Bis 100€</option>
                  <option value="mid">100 – 250€</option>
                  <option value="high">250€+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Reiseart</label>
                <select style={inputStyle}>
                  <option value="solo">🧍 Solo</option>
                  <option value="couple">💑 Pärchen</option>
                  <option value="friends">👯 Freunde</option>
                  <option value="family">👨‍👩‍👧 Familie</option>
                  <option value="group">🎉 Gruppe</option>
                </select>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handlePlan}
          style={{
            width: "100%", height: 52,
            background: "#1E3A2B", color: "#FFFFFF",
            borderRadius: 14, border: "none", cursor: "pointer",
            fontSize: 15, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            marginTop: 18,
            transition: "background 0.18s ease, transform 0.1s ease",
            boxShadow: "0 4px 14px rgba(30,58,43,0.25)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#162d20")}
          onMouseLeave={e => (e.currentTarget.style.background = "#1E3A2B")}
        >
          <span>🔍</span>
          <span>Reise planen</span>
        </button>

        {/* Quick links */}
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#9CA3AF", alignSelf: "center" }}>Beliebt:</span>
          {["Salzburg", "Schwarzwald", "Neuschwanstein", "Zürich"].map(d => (
            <button
              key={d}
              onClick={() => handleQuickSuggestion(d)}
              style={{
                fontSize: 12, fontWeight: 500, color: "#1E3A2B",
                background: "#E8F5E9", border: "none", cursor: "pointer",
                padding: "3px 10px", borderRadius: 9999,
                transition: "background 0.15s",
              }}
            >{d}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700,
  letterSpacing: "0.6px", textTransform: "uppercase",
  color: "#6B7280", marginBottom: 6, display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%", height: 46,
  padding: "0 14px",
  border: "1px solid #D1D5DB", borderRadius: 12,
  fontSize: 14, background: "#FFFFFF",
  color: "#111827",
  outline: "none",
  transition: "border-color 0.15s",
  fontFamily: "'Outfit', system-ui, sans-serif",
};
