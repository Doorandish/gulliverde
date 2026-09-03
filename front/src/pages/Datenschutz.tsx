import SEOHead from '../components/SEOHead'

export default function Datenschutz() {
  return (
    <>
      <SEOHead 
        title="Datenschutzerklärung | Gulliver" 
        description="Datenschutzerklärung der Gulliver Travel GmbH." 
        canonical="/legal/datenschutz"
      />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "60px 20px", lineHeight: 1.6, color: "#374151" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, color: "#111827", marginBottom: 32 }}>Datenschutzerklärung</h1>
        
        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>1. Datenschutz auf einen Blick</h2>
        <h3 style={{ fontSize: 16, fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        </p>

        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3 style={{ fontSize: 16, fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
        </p>

        <h2 style={{ fontSize: 20, color: "#1E3A2B", marginTop: 24, marginBottom: 12 }}>3. Datenerfassung auf dieser Website</h2>
        <h3 style={{ fontSize: 16, fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>Cookies</h3>
        <p>
          Unsere Internetseiten verwenden teilweise sogenannte "Cookies". Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
        </p>
      </main>
    </>
  )
}
