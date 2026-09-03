import { Link } from "react-router-dom";
import type { Trip } from "../types";
import { getAffiliateUrl } from "../services/api";

interface Props {
  trip?: Trip;
}

export default function Itinerary({ trip }: Props) {
  const title = trip?.seoTitle || `Dein ${trip?.durationDays || 2}-Tage-Wochenendtrip nach ${trip?.destination || "Garmisch-Partenkirchen"}`;
  
  // Safe parsing for cost to avoid negative bug
  const displayCost = trip?.totalBudget ? Math.abs(trip.totalBudget) : (trip?.estimatedCost ? Math.abs(trip.estimatedCost) : 185);
  const co2Saved = trip?.co2SavedPercent || 78;

  const getTimeIcon = (slot: string) => {
    if (slot.toLowerCase().includes('morgen')) return '☕';
    if (slot.toLowerCase().includes('nachmittag')) return '🏛️';
    if (slot.toLowerCase().includes('abend')) return '🍽️';
    return '🚶';
  };

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
            {trip?.destination || "Garmisch-Partenkirchen"} · {trip?.durationDays ? `${trip.durationDays} Tage` : "2 Tage"}
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
          { icon: "🚆", label: trip?.trainLines?.length ? trip.trainLines.join(', ') : "2x Direktzug" },
          { icon: "💶", label: `Gesamt: ~${displayCost} € p.P.` },
          { icon: "🌱", label: `${co2Saved}% CO₂ gespart` },
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
      {trip?.days && trip.days.length > 0 ? (
        trip.days.map((day, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A2B] mb-4">
              Tag {day.dayNumber || idx + 1}: {day.title}
            </h3>
            <div className="space-y-3">
              {day.activities?.map((act, aIdx) => (
                <div key={aIdx} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-sm">{getTimeIcon(act.timeSlot)}</span> {act.timeSlot} {act.weatherNote ? `• ${act.weatherNote}` : ''}
                    </span>
                    {act.estimatedPrice !== undefined && (
                      <span className="text-[#1E3A2B] bg-emerald-100 px-2 py-0.5 rounded">
                        ~{Math.abs(act.estimatedPrice)} €
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mt-1">{act.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{act.description}</p>
                  
                  <a 
                    href={act.bookingUrl || `https://www.getyourguide.com/s/?q=${encodeURIComponent(act.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:underline font-medium mt-1 inline-block"
                  >Aktivität ansehen ↗</a>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-gray-500 bg-white rounded-xl border">
          Kein detaillierter Tagesablauf verfügbar.
        </div>
      )}

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
