import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#FFFFFF",
      borderBottom: "1px solid #E5E7EB",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        height: 68, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 20px",
      }}>
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer", padding: 0,
            textDecoration: "none"
          }}
        >
          <span style={{
            width: 32, height: 32, background: "#1E3A2B", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>🧭</span>
          <span style={{
            fontSize: 22, fontWeight: 800, color: "#1E3A2B",
            fontFamily: "'Fraunces', Georgia, serif", letterSpacing: "-0.5px",
          }}>Gulliver</span>
        </Link>

        {/* Middle nav — desktop */}
        <nav style={{ display: "flex", gap: 32 }} className="hidden md:flex">
          {[
            { label: t('nav.discover') || "Entdecken", path: "/" },
            { label: t('nav.routes') || "Zugstrecken", path: "/explore/staedtetrips-unter-100-euro" },
            { label: t('nav.events') || "Events", path: "/events/oktoberfest-2025" },
            { label: t('nav.planner') || "KI-Planer", path: "/plan/featured/zugspitze" },
          ].map(({ label, path }) => {
            const isActive = location.pathname === path && path !== "/";
            return (
              <Link
                key={label}
                to={path}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 500,
                  color: isActive ? "#1E3A2B" : "#4B5563",
                  padding: "4px 0",
                  borderBottom: isActive ? "2px solid #2ECC71" : "2px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                  textDecoration: "none"
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right — Language switcher & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            display: "flex", background: "#F3F4F6", borderRadius: 9999,
            padding: 3, gap: 2,
          }}>
            <button 
              onClick={() => setLang('de')}
              style={{
                background: lang === 'de' ? "#1E3A2B" : "transparent", 
                color: lang === 'de' ? "#FFFFFF" : "#6B7280",
                fontSize: 11, fontWeight: lang === 'de' ? 700 : 600,
                padding: "4px 10px", borderRadius: 9999,
                border: "none", cursor: "pointer",
            }}>DE</button>
            <button 
              onClick={() => setLang('en')}
              style={{
                background: lang === 'en' ? "#1E3A2B" : "transparent", 
                color: lang === 'en' ? "#FFFFFF" : "#6B7280",
                fontSize: 11, fontWeight: lang === 'en' ? 700 : 600,
                padding: "4px 10px", borderRadius: 9999,
                border: "none", cursor: "pointer",
            }}>EN</button>
          </div>
          
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden" style={{ padding: "10px 20px", background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link to="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", color: "#4B5563" }}>Entdecken</Link>
            <Link to="/explore/staedtetrips-unter-100-euro" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", color: "#4B5563" }}>Zugstrecken</Link>
            <Link to="/events/oktoberfest-2025" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", color: "#4B5563" }}>Events</Link>
            <Link to="/plan/featured/zugspitze" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", color: "#4B5563" }}>KI-Planer</Link>
          </div>
        </div>
      )}
    </header>
  );
}
