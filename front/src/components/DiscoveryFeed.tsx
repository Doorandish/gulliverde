import { useState } from "react";
import { Link } from "react-router-dom";

const filters = ["Alle", "Natur", "Kultur", "Festivals", "Städte", "Winter"];

const cards = [
  {
    id: 1,
    title: "Salzburg im Herbst: Mozart, Märkte & Bergpanorama",
    category: "Städte",
    image: "https://images.unsplash.com/photo-1535653831895-6eeaaa50953c?w=600&h=380&fit=crop&auto=format",
    train: "🚆 2h 10m ab München",
    cost: "💶 Ab 79€",
    tag: "🏔 Städtetrip",
    eventSlug: "salzburg-herbst",
    tripSlug: "muenchen-salzburg",
  },
  {
    id: 2,
    title: "Schwarzwald Wanderwochenende: Tiefenwanderung & Bauernhöfe",
    category: "Natur",
    image: "https://images.unsplash.com/photo-1601222642645-53cb0e155179?w=600&h=380&fit=crop&auto=format",
    train: "🚆 3h 40m ab Frankfurt",
    cost: "💶 Ab 55€",
    tag: "🌲 Natur",
    eventSlug: "schwarzwald-wanderung",
    tripSlug: "frankfurt-schwarzwald",
  },
  {
    id: 3,
    title: "Gartenlaube & Seen: Das Chiemgau-Wochenende",
    category: "Natur",
    image: "https://images.unsplash.com/photo-1695738863579-b33c9b33506f?w=600&h=380&fit=crop&auto=format",
    train: "🚆 1h 20m ab München",
    cost: "💶 Ab 39€",
    tag: "🏞 Seen",
    eventSlug: "chiemgau-seen",
    tripSlug: "muenchen-chiemgau",
  },
  {
    id: 4,
    title: "Frühlings-Volksfest Augsburg: Bier, Brezeln & Blasmusik",
    category: "Festivals",
    image: "https://images.unsplash.com/photo-1760822399066-029921fe429c?w=600&h=380&fit=crop&auto=format",
    train: "🚆 0h 37m ab München",
    cost: "💶 Ab 22€",
    tag: "🎡 Festival",
    eventSlug: "oktoberfest-2025",
    tripSlug: "muenchen-augsburg",
  },
  {
    id: 5,
    title: "Alpenpanorama-Bahnfahrt: Berchtesgaden & Königssee",
    category: "Natur",
    image: "https://images.unsplash.com/photo-1781192577434-c1790dc3179c?w=600&h=380&fit=crop&auto=format",
    train: "🚆 2h 35m ab München",
    cost: "💶 Ab 49€",
    tag: "🏔 Berge",
    eventSlug: "berchtesgaden-panorama",
    tripSlug: "muenchen-berchtesgaden",
  },
  {
    id: 6,
    title: "Zürich Kulturwochenende: Museen, Fondue & Limmat",
    category: "Kultur",
    image: "https://images.unsplash.com/photo-1667896803625-047231b544df?w=600&h=380&fit=crop&auto=format",
    train: "🚆 3h 55m ab Stuttgart",
    cost: "💶 Ab 89€",
    tag: "🎨 Kultur",
    eventSlug: "zuerich-kultur",
    tripSlug: "stuttgart-zuerich",
  },
];

export default function DiscoveryFeed() {
  const [active, setActive] = useState("Alle");

  const displayed = active === "Alle" ? cards : cards.filter(c => c.category === active);

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 26, fontWeight: 800, color: "#111827",
          letterSpacing: "-0.3px",
        }}>
          Reiseziele entdecken
        </h2>
        <Link to="/explore/staedtetrips-unter-100-euro" style={{ fontSize: 13, color: "#2ECC71", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
          Alle ansehen →
        </Link>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 28 }} className="scrollbar-hide">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              flexShrink: 0,
              padding: "6px 16px", borderRadius: 9999,
              fontSize: 13, fontWeight: active === f ? 600 : 500,
              background: active === f ? "#1E3A2B" : "#FFFFFF",
              color: active === f ? "#FFFFFF" : "#4B5563",
              border: active === f ? "none" : "1px solid #E5E7EB",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 24,
      }}>
        {displayed.map(card => (
          <article
            key={card.id}
            className="card-hover"
            style={{
              background: "#FFFFFF",
              borderRadius: 18,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image */}
            <div style={{ height: 190, position: "relative", background: "#E5E7EB", overflow: "hidden" }}>
              <img
                src={card.image}
                alt={card.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
              <span style={{
                position: "absolute", top: 12, left: 12,
                background: "rgba(0,0,0,0.65)", color: "#FFFFFF",
                padding: "4px 10px", borderRadius: 9999,
                fontSize: 11, fontWeight: 600,
              }}>{card.tag}</span>
            </div>

            {/* Content */}
            <div style={{
              padding: 18,
              display: "flex", flexDirection: "column", flex: 1,
            }}>
              <h3 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 16, fontWeight: 700,
                lineHeight: 1.4, color: "#111827",
                marginBottom: 12,
              }}>{card.title}</h3>

              <div style={{ display: "flex", gap: 12, marginBottom: 16, fontSize: 12, color: "#6B7280" }}>
                <span>{card.train}</span>
                <span>{card.cost}</span>
              </div>

              <div style={{
                marginTop: "auto",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderTop: "1px solid #F3F4F6", paddingTop: 12,
              }}>
                <Link
                  to={`/events/${card.eventSlug}`}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: 700, color: "#1E3A2B",
                    padding: 0, textDecoration: "none"
                  }}
                >Guide lesen ↗</Link>
                <Link
                  to={`/trips/${card.tripSlug}`}
                  style={{
                    background: "#E8F5E9", color: "#1E3A2B",
                    border: "none", cursor: "pointer",
                    fontSize: 12, fontWeight: 700,
                    padding: "6px 14px", borderRadius: 8,
                    transition: "background 0.15s",
                    textDecoration: "none"
                  }}
                >Trip planen</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Trending banner */}
      <div style={{
        marginTop: 48,
        background: "linear-gradient(135deg, #1E3A2B 0%, #2d5a40 100%)",
        borderRadius: 20, padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2ECC71", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
            KI-Empfehlung der Woche
          </div>
          <h3 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 20, fontWeight: 700, color: "#FFFFFF",
            marginBottom: 4,
          }}>Zugspitze & Eibsee: Das perfekte Herbstwochenende</h3>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>Ab 68€ · 1h 20m ab München · Bahn-Kombi verfügbar</p>
        </div>
        <Link
          to="/plan/featured/zugspitze-eibsee-herbstwochenende"
          style={{
            background: "#2ECC71", color: "#1E3A2B",
            border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 800,
            padding: "12px 24px", borderRadius: 12,
            flexShrink: 0,
            textDecoration: "none",
            display: "inline-block"
          }}
        >Itinerary anzeigen →</Link>
      </div>
    </section>
  );
}
