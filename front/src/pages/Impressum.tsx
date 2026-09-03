import SEOHead from '../components/SEOHead'

export default function Impressum() {
  return (
    <>
      <SEOHead 
        title="Impressum | Gulliver" 
        description="Impressum und rechtliche Angaben der Gulliver Travel GmbH." 
        canonical="/legal/impressum"
      />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "60px 20px", lineHeight: 1.6, color: "#374151" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, color: "#111827", marginBottom: 32 }}>Impressum</h1>
        
        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>Angaben gemäß § 5 TMG</h2>
        <p>
          Gulliver Travel GmbH<br />
          Musterstraße 123<br />
          10115 Berlin<br />
          Deutschland
        </p>

        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>Vertreten durch:</h2>
        <p>Geschäftsführer: Max Mustermann</p>

        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>Kontakt:</h2>
        <p>
          Telefon: +49 (0) 30 12345678<br />
          E-Mail: info@gulliver-travel.app
        </p>

        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>Registereintrag:</h2>
        <p>
          Eintragung im Handelsregister.<br />
          Registergericht: Amtsgericht Berlin-Charlottenburg<br />
          Registernummer: HRB 123456 B
        </p>

        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>Umsatzsteuer-ID:</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE 123 456 789
        </p>
      </main>
    </>
  )
}
