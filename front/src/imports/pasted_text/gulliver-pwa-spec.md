SYSTEM DIRECTIVE:
You are an expert Frontend Systems Architect. Build a production-grade, highly polished Responsive Web App (PWA) called "Gulliver" using inline styles and Tailwind CSS. Avoid unstyled raw HTML. Every single component MUST have explicit padding, border-radius, background colors, and flexbox alignments. Do not attach elements without spacing.

---

### DESIGN TOKENS & SYSTEM
- Background: #F8FAF8 (canvas)
- Primary Brand / Headings: #1E3A2B (Deep Forest Green)
- Primary Button / CTAs: #2ECC71 (Mint Green) or #1E3A2B (Forest Green) with white text
- Surface / Cards: #FFFFFF with 1px solid #E5E7EB border and shadow-sm
- Text Primary: #111827 | Text Muted: #6B7280
- Max Content Width: 1180px for desktop feeds, 640px for hero search.

---

### SCREEN ARCHITECTURE & ROUTES

#### 1. NAVIGATION HEADER (Component: `Nav.tsx`)
- Container: Full width, background #FFFFFF, border-bottom 1px solid #E5E7EB, sticky top-0, z-index 50.
- Inner wrapper: Max-width 1180px, auto-margins, height 68px, display flex, align-items center, justify-content space-between, padding 0 20px.
- Left Section:
  * Brand wordmark "Gulliver" (font-size 22px, font-weight 800, color #1E3A2B, display flex, gap 8px, align-items center).
- Middle Section (Desktop only, display flex, gap 32px):
  * Links: "Entdecken", "Zugstrecken", "Events", "KI-Planer" (font-size 14px, font-weight 500, color #4B5563).
- Right Section:
  * Language Switcher: Container with display flex, background #F3F4F6, border-radius 9999px, padding 3px, gap 2px.
  * Button "DE": background #1E3A2B, color #FFFFFF, font-size 11px, font-weight 700, padding 4px 10px, border-radius 9999px.
  * Button "EN": background transparent, color #6B7280, font-size 11px, font-weight 600, padding 4px 10px.

---

#### 2. HOMEPAGE HERO & DUAL-SEARCH (Route: `/`)
- Outer Container: Max-width 680px, auto-margins, padding 48px 16px 32px 16px, text-align center.
- Trust Indicators: Display flex, justify-content center, gap 12px, margin-bottom 16px.
  * 3 Badge Pills: background #E8F5E9, color #1E3A2B, font-size 12px, font-weight 600, padding 4px 12px, border-radius 9999px. ("🌱 80% CO2-Ersparnis", "🚆 Live Bahn-Preise", "🔒 100% DSGVO-konform").
- Headline H1: "Dein Wochenendtrip in 30 Sekunden geplant." (font-size 36px, font-weight 800, line-height 1.2, color #1E3A2B, margin-bottom 8px).
- Subtitle: "Smarte KI-Routen mit Zugverbindungen, bezahlbaren Unterkünften und Live-Wetter." (font-size 15px, color #6B7280, margin-bottom 28px).

- Search Engine Card:
  * Container: background #FFFFFF, border-radius 24px, border 1px solid #E5E7EB, padding 24px, box-shadow 0 10px 25px -5px rgba(0,0,0,0.05), text-align left.
  * Segmented Mode Switcher: Display flex, background #F3F4F6, border-radius 14px, padding 4px, margin-bottom 20px, gap 4px.
    - Tab 1 ("🎯 Ich habe ein Ziel"): Width 50%, text-align center, padding 10px, border-radius 10px, font-size 13px, font-weight 700, background #1E3A2B, color #FFFFFF.
    - Tab 2 ("✨ Lass dich inspirieren"): Width 50%, text-align center, padding 10px, font-size 13px, font-weight 500, color #6B7280.
  * Form Fields (Vertical flow, margin-bottom 14px each):
    - Labels: font-size 11px, font-weight 700, letter-spacing 0.5px, text-transform uppercase, color #6B7280, margin-bottom 6px, display block.
    - Inputs/Selects: width 100%, height 46px, padding 0 14px, border 1px solid #D1D5DB, border-radius 12px, font-size 14px, background #FFFFFF, box-sizing border-box.
  * Submit Button:
    - Width 100%, height 50px, background #1E3A2B, color #FFFFFF, border-radius 14px, font-size 15px, font-weight 700, display flex, align-items center, justify-content center, gap 8px, border none, cursor pointer, margin-top 10px.

---

#### 3. DISCOVERY & EVENT FEED (Route: `/`)
- Outer Container: Max-width 1180px, auto-margins, padding 40px 20px 80px 20px.
- Section Header: font-size 24px, font-weight 800, color #111827, margin-bottom 16px.
- Filter Pills: Display flex, gap 8px, overflow-x auto, margin-bottom 24px.
  * Active pill: background #1E3A2B, color #FFFFFF, padding 6px 16px, border-radius 9999px, font-size 13px, font-weight 600.
  * Inactive pills: background #FFFFFF, border 1px solid #E5E7EB, color #4B5563, padding 6px 16px, border-radius 9999px, font-size 13px.
- Grid:
  * Strict Responsive Rules: Mobile (<768px) = 1 column (`grid-cols-1`). Desktop (>=1024px) = exactly 3 columns (`grid grid-cols-3 gap-6`).
- Card Component (`<article>`):
  * Container: background #FFFFFF, border-radius 18px, border 1px solid #E5E7EB, overflow hidden, display flex, flex-direction column.
  * Image Box: Height 190px, width 100%, position relative, background #E5E7EB. Include an image with `object-fit: cover`.
    - Category Tag (Absolute top 12px, left 12px): background rgba(0,0,0,0.65), color #FFFFFF, padding 4px 10px, border-radius 9999px, font-size 11px, font-weight 600.
  * Content Box: Padding 18px, display flex, flex-direction column, flex 1.
    - Title: font-size 16px, font-weight 700, line-height 1.4, color #111827, margin-bottom 12px.
    - Metadata Bar: Display flex, gap 12px, margin-bottom 16px, font-size 12px, color #6B7280.
      * Train time chip: "🚆 2h 10m ab München"
      * Cost chip: "💶 Ab 79€"
    - Card Action: Margin-top auto, display flex, justify-content space-between, align-items center, border-top 1px solid #F3F4F6, padding-top 12px.
      * Link: `<a target="_blank">` "Guide lesen ↗" (font-size 13px, font-weight 700, color #1E3A2B).

---

#### 4. DEDICATED EVENT / SEO ROUTE (Route: `/events/:slug`)
- Container: Max-width 840px, auto-margins, padding 32px 16px.
- Breadcrumb: Display flex, gap 8px, font-size 12px, color #9CA3AF, margin-bottom 16px.
- Event Header: font-size 32px, font-weight 800, color #111827, margin-bottom 16px.
- Logistics Card ("Schnell-Info"):
  * background #FFFFFF, border 1px solid #E5E7EB, border-radius 16px, padding 20px, margin-bottom 24px.
  * Grid: 3 columns on desktop, 1 column on mobile, gap 16px.
  * Each item: Label (11px, muted, uppercase) and Value (14px, bold, #111827).
- Pricing Guide Box ("Essen & Trinken: Preisguide"):
  * background #FFFFFF, border 1px solid #E5E7EB, border-radius 16px, padding 20px.
  * Rows: Display flex, justify-content space-between, align-items center, padding 10px 0, border-bottom 1px solid #F3F4F6.
  * Item title: font-size 14px, color #374151.
  * Price tag: background #E8F5E9, color #1E3A2B, font-weight 700, font-size 13px, padding 4px 10px, border-radius 6px.

---

#### 5. ITINERARY ROUTE (Route: `/plan/:slug`)
- Container: Max-width 780px, auto-margins, padding 32px 16px.
- Viral Sticky Bar: background #1E3A2B, color #FFFFFF, padding 12px 18px, border-radius 14px, display flex, justify-content space-between, align-items center, margin-bottom 24px.
  * CTA Button: background #2ECC71, color #1E3A2B, font-size 12px, font-weight 800, padding 6px 14px, border-radius 8px, border none. ("Plan teilen")
- Day Container: background #FFFFFF, border 1px solid #E5E7EB, border-radius 18px, padding 22px, margin-bottom 20px.
  * Day Heading: font-size 18px, font-weight 800, color #1E3A2B, margin-bottom 16px.
  * Time Slot Cards (Morgen, Nachmittag, Abend):
    - background #F9FAFB, border 1px solid #F3F4F6, border-radius 12px, padding 14px, margin-bottom 10px.
    - Top line: Slot name ("Morgen") + Weather chip ("9°C, Bewölkt") on left; Price badge on right.
    - Body: Activity Title bold (14px) + Description (13px, text-gray-600).
    - Outbound Affiliate CTA: Small rounded button with Omio/Booking label.

---

#### 6. LEGAL COMPLIANCE FOOTER
- Full-width background #1E3A2B, color #D1D5DB, padding 48px 20px, margin-top 60px.
- Max-width 1180px, auto-margins, display grid, grid-template-columns: repeat(4, 1fr) on desktop, 2 columns on mobile, gap 32px.
- Column headers: font-size 12px, font-weight 700, text-transform uppercase, color #9CA3AF, margin-bottom 12px.
- Explicit links included: "Impressum", "Datenschutzerklärung", "Cookie-Einstellungen".
- Copyright Notice: Centered at bottom, font-size 12px, color #6B7280, margin-top 32px, padding-top 16px, border-top 1px solid #374151.