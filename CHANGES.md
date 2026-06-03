# Aerial Estates — Website-Überarbeitung (Diff zum Brief)

Überarbeitung der `index.html` nach Brief vom 2026-06-03. Design-Sprache, Farb-Tokens,
Schriften und Brand-Name bleiben unangetastet — Marketing, Struktur und Conversion wurden umgebaut.

Datei: `index.html` (1538 → 1990 Zeilen). Sprachen-Dictionary in **allen vier** Sprachen synchron erweitert (EN, DE, TH, AT).

---

## PRIORITÄT 1

### P1.1 — Section-Reihenfolge umgebaut ✅
Neue Reihenfolge (Beweis vor Equipment):

```
hero → portfolio → services → packages → how → about → testimonials → brands → bts → fleet → instagram → contact
```

- Nav und Mobile-Menü an die neue Reihenfolge angepasst (`Portfolio · Services · Packages · About · Get in Touch`).
- Reorder wurde per PowerShell-Skript ausgeführt — keine inhaltlichen Änderungen an den verschobenen Sections (DOM-Inhalte 1:1 erhalten).

### P1.2 — Fleet entschärft ✅
- Titel umgeschrieben: „**The Tools / Womit ich arbeite**" statt „Precision. Control. Every Shot.".
- Drohnen-Marquee leicht verkleinert (Padding, Bildgröße via `scale(.78)`, Gap reduziert).
- Alle 9 Tooltips von Specs auf **Kundennutzen** umgeschrieben:
  - Pavo Pico: „Aufnahmen in engen Räumen, die sonst niemand schafft …"
  - Cinebot 30: „Eine durchgehende Tour durch Ihr Objekt …"
  - Avata 2: „Sicher und leise im Innenraum — perfekt für bewohnte Objekte …"
  - usw. (alle in `replace_all` über beide Marquee-DOM-Kopien synchron)
- Marquee-DOM-Doppelung für die Endlos-Animation bleibt erhalten.

### P1.3 — Begehbare 3D-Tour ✅
- Neue Service-Karte `s7` „Walkable 3D Tours / Begehbare 3D-Touren" im `#services`-Grid (über die ganze Breite, dezent gold-akzentuiert).
- Neuer `<div id="splat-embed">` mit auskommentiertem `<iframe>`-Slot direkt unter den Service-Karten.
- Texte für `about.p1` und `s1.d` von „one continuous FPV tour" auf „immersive, walkable" / „pairs perfectly with a walkable 3D tour" erweitert (alle 4 Sprachen).

---

## PRIORITÄT 2

### P2.1 — Hero-Stats: Vanity → Ergebnis ✅
- „Clients / Kunden" wurde ersetzt durch „**Properties Filmed / Objekte gefilmt**" mit `data-counter="80"`-Platzhalter.
- Doppelte „Drone Certified"-Labels bekommen jetzt einen `data-i18n="stat3.l"`-Key (übersetzbar).
- TODO im Code: Echte Zahl in `data-counter` eintragen.

### P2.2 — Testimonials ✅
- `.tst-coming` („More client voices coming soon") entfernt.
- Klar markierter Slot mit Kommentar `<!-- Weitere Testimonials hier einsetzen -->` + ausgeblendeter Vorlage-Karte (`display:none`).

### P2.3 — Brands als Logo-Slots vorbereitet ✅
- Markup-Kommentar mit Beispiel-Snippet zum Austausch von `.b-tile` gegen `.b-logo` mit `<img>`.
- CSS-Klasse `.b-logo` ist bereits drin: einheitliche Höhe (max-h 38 px), `grayscale(100%)` mit Color-on-Hover.
- Text-Kacheln bleiben als Fallback, solange echte Logos fehlen.

### P2.4 — Pakete-Section neu ✅
- Neue `<section id="packages">` zwischen `#services` und `#how`.
- 3 Karten: **Signature Tour · Listing-Paket (Most popular) · Content-Partner**.
- Jede Karte: Preis-Platzhalter „auf Anfrage / on request", 4–5 Inklusivleistungen, CTA-Button → `#contact`.
- Alle Texte in allen 4 Sprachen im Dictionary (`pk.*`, `pk1.*`, `pk2.*`, `pk3.*`).
- TODO im Code: Echte Preise eintragen.

### P2.5 — Negatives CTA fixed ✅
- HTML- und JS-Texte umgeschrieben:
  - **DE**: „Sehen wir uns Ihr Objekt an?" + „Ein kurzer Anruf — persönlich, ohne Verpflichtung"
  - **AT**: „Schau ma uns dei Objekt o?" + „A kurzer Anruf — persönlich, ohne Verpflichtung"
  - **EN**: „Let's look at your property" (CTA-Block ist jetzt auch in EN sichtbar)

### P2.6 — Lead-Formular ✅
- Vollständiges Formular in `#contact` mit Felder: Name, E-Mail, Objekt-Typ (Dropdown), Nachricht.
- DSGVO-Consent-Checkbox + Link zur Datenschutzerklärung (öffnet das Modal).
- Honeypot-Feld (`_gotcha`) als Spam-Schutz.
- **Backend**: Formspree als Platzhalter. `action="https://formspree.io/f/YOUR_FORM_ID"` — **du musst die ID ersetzen**.
- Solange `YOUR_FORM_ID` drinsteht: Fallback öffnet `mailto:office@aerial-estates.com` mit vor-ausgefüllter Body.
- Bei echtem Formspree: AJAX-Submit, Erfolgsmeldung inline, keine Page-Reloads.
- Mail- und WhatsApp-Karten bleiben als zusätzliche Optionen.

---

## PRIORITÄT 3

### P3.1 — DACH-Locale → Deutsch als Default ✅
- Neue `autoLang()`-Funktion im JS:
  - `?lang=xx` URL-Parameter und `localStorage.ae_lang` haben Vorrang (manuelle Wahl persistiert).
  - Asia/Bangkok oder `navigator.language` `th*` → Thai (wie bisher).
  - Timezones `Europe/Vienna`, `Europe/Berlin`, `Europe/Zurich`, `Europe/Busingen` ODER Sprachen `de`, `de-at`, `de-de`, `de-ch`, `de-li`, `gsw` → **Deutsch**.
  - Sonst → Englisch.
- Bestehender Geo-Bug behoben: alter Selektor `data-lang="th"` (gab's nie) durch direkten `setLang('th')`-Call ersetzt.

### P3.2 — SEO-Meta, OG, Twitter, Schema ✅
- `<link rel="canonical">` + `hreflang` für `en` / `de` / `x-default`.
- Open Graph: `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`, `og:locale` + `og:locale:alternate`.
- Twitter Card: `summary_large_image`.
- JSON-LD `ProfessionalService` mit Adresse, Telefon, E-Mail, `areaServed: AT/DE/CH/TH`, `sameAs: Instagram`.
- TODO: `og-cover.jpg` (1200×630) unter `/public/images/` ablegen.

### P3.3 — Performance ✅
- Hero-Video: Preload-Pfad und `<source>`-Pfad jetzt **konsistent URL-encoded**. Beide `media="(min-width: 901px)"` — auf Mobil wird kein Video geladen, nur das Poster.
- `poster`-Attribut + `preload="metadata"` + `aria-hidden="true"` ergänzt.
- Bild-Dimensionen (`width`/`height`) am Portrait und About-Foto gesetzt → kein Layout-Shift (CLS↓).
- Font-Gewichte reduziert: Montserrat von 5 Schnitten (300/400/500/600/700) auf 3 (500/600/700); Inter von 3 auf 2 (300/400). Spart ca. 30–40 % an Font-Bytes.

### P3.4 — Barrierefreiheit ✅
- **Skip-Link** am Body-Anfang („Skip to content" → `#portfolio`).
- Sichtbarer Tastatur-Fokus via `:focus-visible` (Gold-Outline).
- Klickbare `<div class="pf-yt-item">` bekommen per JS `role="button"`, `tabindex="0"`, `aria-label="Play video: …"` und einen Enter/Space-Keyhandler.
- Hamburger-Button bekommt `aria-expanded` (wird beim Toggle synchron gehalten) und `aria-controls="mobile-menu"`.
- Kontrast: `.brands-cta` und `.ig-profile-link` von `--gold` auf den dunkleren `--gold2` umgestellt (besserer Kontrast auf hellem Hintergrund).
- *(Brief sagt „Kontrast prüfen". Vollständige WCAG-AA-Audit ist nicht im Scope — siehe „Offene Punkte" unten.)*

---

## NEBENBEI BEHOBEN

- **Pre-existing Bug**: `toggleMenu()` und `closeMenu()` waren im HTML referenziert, aber im JS nie definiert → Mobile-Menü war komplett kaputt. Beide Funktionen nachgereicht inkl. ARIA-State.
- **i18n-Engine erweitert**: `data-i18n-html="1"` erlaubt jetzt HTML in Übersetzungen (genutzt für `fleet.title` mit `<strong>`). Optional `data-i18n-attr="placeholder:lf.foo"` für Attribute.

---

## OFFENE PLATZHALTER (DU MUSST NACHTRAGEN)

| Stelle | Platzhalter | Was rein muss |
|---|---|---|
| `<head>` | `og:image` & `twitter:image` URL | OG-Cover-Bild 1200×630 unter `/public/images/og-cover.jpg` ablegen |
| `#splat-embed` | auskommentierter `<iframe>` | Splat-Tour-Link von Luma / Polycam / Postshot einsetzen |
| Hero-Stats | `data-counter="80"` | Echte Anzahl gefilmter Objekte eintragen |
| `#packages` x3 | `pk1.price / pk2.price / pk3.price` = „auf Anfrage" | Echte Einstiegspreise oder dabei lassen |
| `#leadForm` | `action="https://formspree.io/f/YOUR_FORM_ID"` | Formspree-Account → ID eintragen (oder Netlify Forms / eigenes Backend) |
| `#brands` | 14× `.b-tile` | Logo-Dateien unter `/public/images/brands/` ablegen und `.b-tile` durch das `<div class="b-logo"><img …></div>`-Snippet ersetzen (Snippet im HTML-Kommentar) |
| `#testimonials` | 2. Karte mit `display:none` | Zweites/drittes Kunden-Testimonial eintragen, `style="display:none"` entfernen |
| Portfolio-Captions | keiner gesetzt | Optional „verkauft in X Wochen / Y views" als zweite Caption-Zeile ergänzen — Brief erwähnt, ich habe bewusst keinen leeren Platzhalter eingefügt, um die Optik nicht zu verschandeln. Sag Bescheid, wenn du das willst. |

---

## NICHT GEMACHT (mit Begründung)

- **WebP/AVIF-Konvertierung der Bilder**: Setzt Build-Pipeline oder manuelles Re-Encoden voraus — kann ich nicht ohne deine Originale machen. Empfehlung: Bilder einmal durch [Squoosh](https://squoosh.app) jagen, dann als `<picture>`-Source ergänzen.
- **Vollständiger WCAG-AA-Audit**: Brief sagt „prüfen". Die offensichtlichsten Punkte (Gold-Text, Tastatur-Bedienung, Skip-Link, Fokus-Indikator, Hamburger-State) sind gefixt. Für eine zertifizierte AA-Konformität bräuchte es einen Lighthouse/axe-Run.
- **Hero-Video-Komprimierung**: Datei `Falk website 1 mp4.mp4` liegt nicht im Repo-Sichtfeld. Empfehlung: Mit Handbrake auf ≤ 4 MB / 1080p / 24 fps re-encoden.

---

## SCHRITTE ZUM LIVE-GANG

1. `og-cover.jpg` (1200×630) erzeugen und unter `public/images/` ablegen.
2. Formspree-ID besorgen (kostenlos bis 50 Submissions/Monat) und in `#leadForm` einsetzen — vorher testet das Formular nur den Mailto-Fallback.
3. Splat-Tour-Link einsetzen, sobald die erste Tour fertig ist (Luma Labs hat den einfachsten Embed-Workflow).
4. Echte Preise oder „auf Anfrage" final entscheiden.
5. Hero-Video komprimieren, falls > 5 MB.
6. Browser-Test in EN/DE/TH/AT: Sprachumschalter, Mobile-Menü, Lead-Formular, Cookie-Banner.
