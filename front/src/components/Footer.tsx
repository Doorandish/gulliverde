import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "#1E3A2B", color: "#D1D5DB",
      padding: "48px 20px 32px",
      marginTop: 0,
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Brand top */}
        <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid #2d5a40" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{
              width: 28, height: 28, background: "#2ECC71", borderRadius: 7,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>🧭</span>
            <span style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 20, fontWeight: 800, color: "#FFFFFF",
            }}>Gulliver</span>
          </div>
          <p style={{ fontSize: 13, color: "#9CA3AF", maxWidth: 360, lineHeight: 1.6 }}>
            Smarte Wochenendreisen mit Bahn, KI-Routen und nachhaltigen Unterkünften.
            Für Entdecker, die mehr erleben wollen.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32, marginBottom: 40,
        }}>
          {[
            {
              heading: "Entdecken",
              links: [
                { label: "Alle Reiseziele", path: "/" },
                { label: "Zugstrecken", path: "/explore/staedtetrips-unter-100-euro" },
                { label: "Events & Festivals", path: "/events/oktoberfest-2025" },
                { label: "KI-Planer", path: "/plan/featured/zugspitze" },
              ],
            },
            {
              heading: "Unternehmen",
              links: [
                { label: "Über Gulliver", path: "/about" },
                { label: "Presse", path: "/press" },
                { label: "Karriere", path: "/careers" },
                { label: "Partner werden", path: "/partners" },
              ],
            },
            {
              heading: "Rechtliches",
              links: [
                { label: "Impressum", path: "/legal/impressum" },
                { label: "Datenschutzerklärung", path: "/legal/datenschutz" },
                { label: "AGB", path: "/legal/agb" },
              ],
            },
          ].map(col => (
            <div key={col.heading}>
              <div style={{
                fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                color: "#9CA3AF", letterSpacing: "0.8px", marginBottom: 14,
              }}>{col.heading}</div>
              {col.links.map(link => (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    display: "block",
                    fontSize: 13, color: "#D1D5DB",
                    marginBottom: 8, textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#2ECC71")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#D1D5DB")}
                >{link.label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid #374151",
          paddingTop: 20,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            © 2026 Gulliver Travel GmbH · Alle Rechte vorbehalten
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#6B7280" }}>🌱 Klimaneutral seit 2023</span>
            <span style={{
              background: "#2ECC71", color: "#1E3A2B",
              fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 6,
              letterSpacing: "0.5px",
            }}>DSGVO-Konform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
