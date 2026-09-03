import { Link } from "react-router-dom";
import type { EventData } from "../types";

interface Props {
  event?: EventData;
}

const fallbackPriceGuide = [
  { item: "Masskrug Bier (1L)", price: "14,50€" },
  { item: "Hendl (½ Hähnchen)", price: "13,90€" },
  { item: "Brezn", price: "3,50€" },
  { item: "Obatzter mit Brot", price: "7,80€" },
  { item: "Schweinebraten", price: "16,50€" },
  { item: "Fischer-Vroni Steckerlfisch", price: "12,00€" },
  { item: "Weisswurst (2 Stück)", price: "5,90€" },
  { item: "Alkoholfreies Bier", price: "9,80€" },
];

export default function EventDetail({ event }: Props) {
  const title = event?.title || "Oktoberfest München 2025 — Der ultimative Reiseguide";
  const desc = event?.description || "Das größte Volksfest der Welt findet vom 20. September bis 5. Oktober 2025 auf der Theresienwiese statt. Über 6 Millionen Besucher aus aller Welt kommen jährlich. Unser Guide zeigt dir, wie du stressfrei anreist, die besten Zelte findest und dabei noch Geld sparst.";
  const image = event?.imageUrl || "https://images.unsplash.com/photo-1760822399066-029921fe429c?w=840&h=320&fit=crop&auto=format";
  const cat = event?.category || "Festival";
  const priceGuide = event?.budgetPriceTable || fallbackPriceGuide;
  const slug = event?.slug || "oktoberfest-2025";

  return (
    <main style={{ maxWidth: 840, margin: "0 auto", padding: "32px 16px 80px" }}>
      {/* Breadcrumb */}
      <nav style={{ display: "flex", gap: 8, fontSize: 12, color: "#9CA3AF", marginBottom: 16, alignItems: "center" }}>
        <Link
          to="/"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 12, padding: 0, textDecoration: "none" }}
        >Entdecken</Link>
        <span>›</span>
        <span style={{ color: "#9CA3AF" }}>Festivals</span>
        <span>›</span>
        <span style={{ color: "#4B5563" }}>{title}</span>
      </nav>

      {/* Hero image */}
      <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 28, height: 320, background: "#E5E7EB" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Header */}
      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{
          background: "#E8F5E9", color: "#1E3A2B",
          padding: "4px 12px", borderRadius: 9999,
          fontSize: 12, fontWeight: 600,
        }}>🎡 {cat}</span>
        <span style={{
          background: "#FEF9C3", color: "#92400E",
          padding: "4px 12px", borderRadius: 9999,
          fontSize: 12, fontWeight: 600,
        }}>⚡ Nur noch 14 Tage</span>
      </div>

      <h1 style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "clamp(24px, 4vw, 34px)",
        fontWeight: 800, color: "#111827",
        marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.4px",
      }}>
        {title}
      </h1>

      <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginBottom: 28 }}>
        {desc}
      </p>

      {/* Logistics card */}
      <div style={{
        background: "#FFFFFF", border: "1px solid #E5E7EB",
        borderRadius: 16, padding: 20, marginBottom: 24,
      }}>
        <h2 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 17, fontWeight: 700, color: "#1E3A2B", marginBottom: 16,
        }}>⚡ Schnell-Info</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}>
          {[
            { label: "Datum", value: event?.startDate ? `${event.startDate} - ${event.endDate}` : "20. Sep – 5. Okt 2025" },
            { label: "Ort", value: event?.city || "Theresienwiese, München" },
            { label: "Eintritt", value: "Kostenlos (Zelte kostenpflichtig)" },
            { label: "Anreise", value: "U4/U5 Theresienwiese" },
            { label: "Beste Ankunft", value: "Vor 10 Uhr (Wochentage)" },
            { label: "Bahn ab", value: event?.trainDistanceFromHbf || "München Hbf, ab 0h 15m" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#6B7280", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing guide */}
      <div style={{
        background: "#FFFFFF", border: "1px solid #E5E7EB",
        borderRadius: 16, padding: 20, marginBottom: 24,
      }}>
        <h2 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 17, fontWeight: 700, color: "#1E3A2B", marginBottom: 16,
        }}>🍺 Essen & Trinken: Preisguide 2025</h2>
        {priceGuide.map((row, i) => (
          <div key={row.item} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0",
            borderBottom: i < priceGuide.length - 1 ? "1px solid #F3F4F6" : "none",
          }}>
            <span style={{ fontSize: 14, color: "#374151" }}>{row.item}</span>
            <span style={{
              background: "#E8F5E9", color: "#1E3A2B",
              fontWeight: 700, fontSize: 13,
              padding: "4px 10px", borderRadius: 6,
            }}>{row.price}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        display: "flex", gap: 12, flexWrap: "wrap",
      }}>
        <Link
          to={`/plan/new/${slug}`}
          style={{
            background: "#1E3A2B", color: "#FFFFFF",
            border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 700,
            padding: "14px 28px", borderRadius: 12,
            boxShadow: "0 4px 14px rgba(30,58,43,0.25)",
            textDecoration: "none",
            display: "inline-block"
          }}
        >🗓 Reise jetzt planen</Link>
        <button style={{
          background: "#FFFFFF", color: "#1E3A2B",
          border: "1px solid #E5E7EB", cursor: "pointer",
          fontSize: 14, fontWeight: 600,
          padding: "14px 28px", borderRadius: 12,
        }}>🔗 Guide teilen</button>
      </div>
    </main>
  );
}
