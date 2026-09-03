import { Link } from "react-router-dom";
import type { Trip } from "../types";
import { getAffiliateUrl } from "../services/api";

interface Props {
  trip?: Trip;
}

const fallbackItinerary = [
  {
    day: "Tag 1 — Samstag, 20. Sep",
    slots: [
      {
        time: "Morgen",
        weather: "☀️ 18°C, Sonnig",
        price: "Ab 39€",
        title: "Anreise München → Garmisch-Partenkirchen",
        desc: "Direktzug ab München Hbf um 07:42 Uhr. Ankunft 09:14 Uhr. Frühstück im Bahnhofsbistro, dann Gepäck im Hotel ablegen.",
        cta: { label: "Zugticket bei Omio", color: "#1E3A2B", url: getAffiliateUrl('omio', 'garmisch') },
      },
      {
        time: "Nachmittag",
        weather: "⛅ 16°C, Bewölkt",
        price: "Kostenlos",
        title: "Wanderung Philosophenweg & Eibsee",
        desc: "3,5 km gemütliche Route am Seeufer entlang. Einkehr bei Eibsee-Hotel-Strandrestaurant empfohlen.",
        cta: { label: "Karte öffnen", color: "#374151", url: "https://maps.google.com" },
      },
      {
        time: "Abend",
        weather: "🌙 12°C, Klar",
        price: "45–65€ p.P.",
        title: "Abendessen: Gasthof Fraundorfer",
        desc: "Bayerische Livemusik und Schmankerl. Tischreservierung dringend empfohlen. Stammtisch-Atmosphäre pur.",
        cta: { label: "Bei Booking reservieren", color: "#003580", url: getAffiliateUrl('booking', 'gasthof-fraundorfer') },
      },
    ],
  },
  {
    day: "Tag 2 — Sonntag, 21. Sep",
    slots: [
      {
        time: "Morgen",
        weather: "☀️ 14°C, Frisch",
        price: "63€ Kombi",
        title: "Zugspitze mit der Zahnradbahn",
        desc: "Abfahrt 08:30 Uhr ab Garmisch Zugspitzbahnhof. Gipfel auf 2.962m — atemberaubendes Bergpanorama auf drei Länder.",
        cta: { label: "Ticket kaufen", color: "#1E3A2B", url: getAffiliateUrl('gyg', 'zugspitze') },
      },
      {
        time: "Nachmittag",
        weather: "🌤 17°C, Leicht windig",
        price: "Frei",
        title: "Bummel durch Garmisch & Bauernmarkt",
        desc: "Lokale Erzeuger, Alpenkäse, Honig und handgemachte Holzarbeiten. Samstags findet der Wochenmarkt am Marienplatz statt.",
        cta: { label: "Marktzeiten", color: "#374151", url: "#" },
      },
      {
        time: "Abend",
        weather: "🌙 10°C, Klar",
        price: "Ab 79€",
        title: "Rückfahrt Garmisch → München Hbf",
        desc: "Letzter Direktzug 19:52 Uhr. Ankunft München 21:28 Uhr. Optional: Weiterfahrt zum Flughafen möglich.",
        cta: { label: "Rückfahrt bei DB", color: "#CC0000", url: getAffiliateUrl('db', 'muenchen') },
      },
    ],
  },
];

export default function Itinerary({ trip }: Props) {
  const itinerary = trip?.dayByDay.map(d => ({
    day: `Tag ${d.day} — ${d.date || d.title}`,
    slots: d.stops.map(s => ({
      time: s.time,
      weather: s.weather,
      price: `${s.cost}€`,
      title: s.title,
      desc: s.description,
      cta: { label: s.ctaLabel || "Mehr", color: s.ctaColor || "#1E3A2B", url: s.ctaUrl || "#" }
    }))
  })) || fallbackItinerary;

  const title = trip?.seoTitle || "Dein 2-Tage-Wochenendtrip nach Garmisch-Partenkirchen";

  return (
    <main style={{ maxWidth: 780, margin: "0 auto", padding: "32px 16px 80px" }}>
      {/* Sticky viral bar */}
      <div style={{
        background: "#1E3A2B", color: "#FFFFFF",
        padding: "12px 18px", borderRadius: 14,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 24, gap: 12, flexWrap: "wrap",
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2ECC71", marginBottom: 2 }}>
            KI-generiertes Reiseprogramm
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            {trip?.destination || "Garmisch-Partenkirchen"} · {trip?.duration || "2 Tage"}
          </div>
        </div>
        <button style={{
          background: "#2ECC71", color: "#1E3A2B",
          fontSize: 12, fontWeight: 800,
          padding: "6px 14px", borderRadius: 8,
          border: "none", cursor: "pointer", flexShrink: 0,
        }}>📤 Plan teilen</button>
      </div>

      {/* Breadcrumb */}
      <nav style={{ display: "flex", gap: 8, fontSize: 12, color: "#9CA3AF", marginBottom: 20, alignItems: "center" }}>
        <Link
          to="/"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 12, padding: 0, textDecoration: "none" }}
        >Entdecken</Link>
        <span>›</span>
        <span style={{ color: "#4B5563" }}>Reiseplan: {trip?.destination || "Garmisch"}</span>
      </nav>

      <h1 style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "clamp(22px, 4vw, 30px)",
        fontWeight: 800, color: "#111827",
        marginBottom: 24, letterSpacing: "-0.3px",
      }}>
        {title}
      </h1>

      {/* Summary chips */}
      <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
        {[
          { icon: "🚆", label: trip?.trainLines ? trip.trainLines.join(', ') : "2x Direktzug" },
          { icon: "💶", label: `Gesamt: ~${trip?.estimatedCost || 185}€ p.P.` },
          { icon: "🌱", label: "78% CO₂ gespart" },
          { icon: "⭐", label: "KI-Score: 9.2/10" },
        ].map(({ icon, label }) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "#FFFFFF", border: "1px solid #E5E7EB",
            borderRadius: 10, padding: "8px 14px",
            fontSize: 13, fontWeight: 600, color: "#374151",
          }}>
            <span>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Day blocks */}
      {itinerary.map(day => (
        <div key={day.day} style={{
          background: "#FFFFFF", border: "1px solid #E5E7EB",
          borderRadius: 18, padding: 22, marginBottom: 20,
        }}>
          <h2 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 18, fontWeight: 800, color: "#1E3A2B",
            marginBottom: 18,
          }}>{day.day}</h2>

          {day.slots.map((slot, i) => (
            <div key={slot.time + i} style={{
              background: "#F9FAFB",
              border: "1px solid #F3F4F6",
              borderRadius: 12, padding: 14,
              marginBottom: i < day.slots.length - 1 ? 10 : 0,
            }}>
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
                    color: "#6B7280",
                  }}>{slot.time}</span>
                  <span style={{
                    background: "#E8F5E9", color: "#1E3A2B",
                    fontSize: 11, fontWeight: 600,
                    padding: "2px 8px", borderRadius: 9999,
                  }}>{slot.weather}</span>
                </div>
                <span style={{
                  background: "#FFFBEB", color: "#92400E",
                  fontSize: 11, fontWeight: 700,
                  padding: "2px 8px", borderRadius: 6,
                }}>{slot.price}</span>
              </div>

              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{slot.title}</div>
              <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 10 }}>{slot.desc}</div>

              {slot.cta.url && (
                <a 
                  href={slot.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: slot.cta.color,
                    color: "#FFFFFF",
                    border: "none", cursor: "pointer",
                    fontSize: 11, fontWeight: 700,
                    padding: "5px 12px", borderRadius: 8,
                    opacity: 0.92,
                    textDecoration: "none",
                    display: "inline-block"
                  }}
                >{slot.cta.label} ↗</a>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A2B 0%, #2d5a40 100%)",
        borderRadius: 16, padding: "24px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 13, color: "#2ECC71", fontWeight: 700, marginBottom: 4 }}>Alle Züge buchen</div>
          <div style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 700 }}>Hin- und Rückfahrt ab 38€ p.P.</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Verfügbar: 20. Sep 2025 · Sparpreis</div>
        </div>
        <a 
          href={getAffiliateUrl('omio', trip?.destination || 'garmisch')}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#2ECC71", color: "#1E3A2B",
            border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 800,
            padding: "12px 24px", borderRadius: 12,
            textDecoration: "none",
            display: "inline-block"
          }}
        >Jetzt bei Omio buchen ↗</a>
      </div>
    </main>
  );
}
