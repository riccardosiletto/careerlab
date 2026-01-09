# CareerLab - Frontend Design System & Style Guide

## 📋 Overview

CareerLab è una piattaforma di esplorazione carriere che utilizza un design system moderno, amichevole e professionale. L'interfaccia combina elementi illustrativi (stile Freepik/Storyset) con UI components puliti per creare un'esperienza utente accessibile e coinvolgente.

---





## 🎨 Color Palette

### Colori Primari

| Nome | HEX | CSS Variable | Uso |
|------|-----|--------------|-----|
| **Career Dark** | `#212746` | `--career-dark` | Testo principale, header, CTA primari scuri |
| **Blue 500** | `#6D7BFC` | `--career-blue-500` | Brand color principale, accent, CTA primari |
| **Green 500** | `#D0E957` | `--career-green-500` | Highlight, badge, CTA secondari premium |
| **Green 200** | `#EBFF8C` | `--career-green-200` | CTA hover states, accent luminoso |

### Colori Secondari & Grigi

| Nome | HEX | CSS Variable | Uso |
|------|-----|--------------|-----|
| **Blue 400** | `#9FA9FF` | `--career-blue-400` | Cerchi decorativi, elementi sfumati |
| **Blue 200** | `#DCDFFF` | `--career-blue-200` | Background hero, sfondo lavanda chiaro |
| **Blue 100** | `#F3F4FF` | `--career-blue-100` | Card backgrounds, hover states leggeri |
| **Grey 500** | `#8D96AC` | `--career-grey-500` | Testo secondario, placeholder |
| **Grey 300** | `#C1C8D5` | `--career-grey-300` | Bordi, divider, elementi disabilitati |
| **Grey Dark** | `#5A607F` | `--career-dark-grey` | Testo body, descrizioni |
| **Light BG** | `#F0F3FF` | `--career-light-bg` | Background sezioni alternate |

### Utilizzo Colori Semantici

```css
/* Hero & Header */
.hero-background { background: #DCDFFF; }
.header-nav { background: white; }

/* Text Colors */
.text-primary { color: #212746; }
.text-secondary { color: #5A607F; }
.text-muted { color: #8D96AC; }
.text-accent { color: #6D7BFC; }
.text-highlight { color: #D0E957; }

/* CTA Buttons */
.cta-primary { background: #6D7BFC; color: white; }
.cta-premium { background: #D0E957; color: #212746; }
.cta-dark { background: #212746; color: white; }
```

---

## 🔤 Typography

### Font Family

**Aeonik Pro** - Font primario per tutto il progetto

```css
@font-face {
  font-family: "Aeonik Pro";
  src: url("/fonts/AeonikProTRIAL-Regular.otf") format("opentype");
  font-weight: 400;
}

@font-face {
  font-family: "Aeonik Pro";
  src: url("/fonts/AeonikPro-Medium.otf") format("opentype");
  font-weight: 500;
}

@font-face {
  font-family: "Aeonik Pro";
  src: url("/fonts/AeonikProTRIAL-Bold.otf") format("opentype");
  font-weight: 700;
}
```

### Scale Tipografica

| Nome | Size | Line Height | Weight | Uso |
|------|------|-------------|--------|-----|
| **H1** | 62px | 1.1 | 500 | Hero title |
| **H2** | 48px | 1.15 | 500 | Section titles |
| **H3** | 36px | 40px | 400 | Card titles, pricing |
| **H4** | 26px | 30px | 500 | Subsection titles |
| **Body LG** | 24px | 30px | 400 | Feature descriptions |
| **Body** | 20px | 24px | 400 | Standard body text |
| **Body SM** | 18px | normal | 500 | Button text, CTA |
| **Caption** | 16px | normal | 500 | Labels, links |
| **Caption SM** | 14px | normal | 500 | Small labels, meta |


---

## 🎬 Animations

### Float Animation (Illustrazioni)
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

### Framer Motion Presets

```jsx
/* Fade up on scroll */
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

/* Slide from left */
initial={{ opacity: 0, x: -30 }}
whileInView={{ opacity: 1, x: 0 }}

/* Staggered cards */
transition={{ duration: 0.5, delay: index * 0.1 }}

/* Scale entrance */
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
```

---

## 📱 Layout Structure

### Container Width
```css
.container { 
  width: 1440px; 
  margin: 0 auto; 
}
```

### Common Paddings
```css
/* Hero/Features horizontal padding */
.section-padding { padding: 0 274px; }

/* Standard section vertical */
.section-vertical { padding: 100px 0; }

/* Card internal */
.card-padding { padding: 24px; }
```

---

## 🖼️ Illustrative Style

### Caratteristiche Visive
- **Stile**: Illustrazioni flat 2D stile Freepik/Storyset
- **Personaggi**: Stilizzati, proporzioni esagerate, friendly
- **Colori nelle illustrazioni**: Usa la palette del brand (#6D7BFC, #D0E957, #212746)
- **Elementi decorativi**: Palloncini, cerchi, onde organiche
- **Screenshots prodotto**: In container con bordi arrotondati e shadows

### Asset Illustrativi Principali
- Hero illustration: Personaggio con laptop e razzi/elementi spaziali
- Balloon icon: Palloncino giallo-verde (#D0E957)
- Folder/document icons: Stile flat con accenti colorati
- Floating cards: Per mostrare insights e analytics

---

## ✅ Do's & Don'ts

### ✅ Do's
- Usare sempre Aeonik Pro come font
- Mantenere high contrast per accessibility (testo scuro su sfondo chiaro)
- Usare border-radius generosi (40px per CTA)
- Applicare shadows sottili (rgba con alpha basso)
- Animazioni fluide con easing ease-in-out
- Highlight keywords con il Blue 500 (#6D7BFC)
- Usare Green 500 (#D0E957) per premium/highlight features
- Mantenere gerarchie visive chiare con la scala tipografica

### ❌ Don'ts
- Non usare colori fuori dalla palette definita
- Non usare font diversi da Aeonik Pro
- Non usare angoli sharp (0 border-radius) sui CTA
- Non usare shadows troppo intense/scure
- Non mischiare stili illustrativi diversi
- Non usare il Blue 500 per grandi superfici di sfondo (usare Blue 200/100)
- Non dimenticare gli stati hover sui bottoni

---

## 🔗 Quick Reference - CSS Variables

```css
:root {
  /* Brand Colors */
  --career-dark: #212746;
  --career-blue-500: #6D7BFC;
  --career-blue-400: #9FA9FF;
  --career-blue-200: #DCDFFF;
  --career-blue-100: #F3F4FF;
  --career-green-500: #D0E957;
  --career-green-200: #EBFF8C;
  
  /* Greys */
  --career-grey-500: #8D96AC;
  --career-grey-300: #C1C8D5;
  --career-dark-grey: #5A607F;
  
  /* Backgrounds */
  --career-light-bg: #F0F3FF;
  --career-light-100: #F6F8FF;
  
  /* Font */
  --font-aeonik: "Aeonik Pro", system-ui, sans-serif;
}
```

---

## 📂 File Structure Reference

```
careerlab/
├── app/
│   ├── globals.css         # CSS variables, font-face, animations
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage (attuale monolite)
├── components/
│   ├── Header.tsx          # Navigation + Auth buttons
│   ├── HeroSection.tsx     # Hero + Search box
│   ├── RecentSearches.tsx  # Recent search cards
│   ├── FeatureSections.tsx # Feature 1 & 2
│   ├── PricingSection.tsx  # Pricing cards
│   ├── SkillDevelopment.tsx
│   ├── FooterCTA.tsx
│   └── Footer.tsx
├── public/
│   ├── fonts/              # Aeonik Pro OTF files
│   ├── images/             # Screenshots, illustrations
│   ├── svg/                # Vector decorations
│   └── icons/              # UI icons
└── tailwind.config.ts      # Extended theme with CareerLab tokens
```

---

**Versione:** 1.0  
**Ultimo aggiornamento:** Gennaio 2026  
**Basato su:** Figma design `ikfQMG3SHFSGKPMY1WqMET` - Node `1723:17377`




