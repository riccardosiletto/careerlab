# CareerLab Dashboard – Visual Guide

Quick reference per la nuova dashboard dinamica.

---

## 📊 Data Visualization Summary

### Demographics Section

| Metric | Chart Type | Rationale |
|--------|-----------|-----------|
| **Age Distribution** | Histogram + KPI | KPI per età media (grande), histogram per vedere distribuzione fasce |
| **Gender Balance** | Donut Chart | Composizione % immediate (M/F/Other) |
| **Gender Trend** | Line Chart | Evoluzione temporale 2022-2024 |

**Visual**:
```
┌────────────────────────────────────────┐
│  AGE DISTRIBUTION                      │
├──────────────┬─────────────────────────┤
│              │       ███               │
│   27 anni    │  ██   ███  ██   █      │
│   (big KPI)  │ ──────────────────────  │
│              │ 18-24 25-29 30-34 35-39 │
└──────────────┴─────────────────────────┘

┌────────────────────────────────────────┐
│  GENDER BALANCE + TREND                │
├──────────────┬─────────────────────────┤
│   ◯ Donut    │  Line chart             │
│   60% M      │  2022 ───→ 2024         │
│   38% F      │    ╱────  Male          │
│   2% Other   │  ──╯      Female        │
└──────────────┴─────────────────────────┘
```

---

### Education Section

| Metric | Chart Type | Rationale |
|--------|-----------|-----------|
| **Top 5 Degrees** | Horizontal Bars | Ranking leggibile, nomi lunghi (es. "Ingegneria Gestionale") |
| **Top 5 Courses** | Horizontal Bars | Consistency con degrees |
| **School Type** | Donut Chart | Composizione 4-6 categorie (Pubblica/Privata/Online/Estero) |
| **MBA Type** | Vertical Bars | Cambio orientamento visivo, nomi brevi (Full-Time, Part-Time) |

**Visual**:
```
┌─────────────────────────────────────────┐
│  TOP 5 DEGREES                          │
├─────────────────────────────────────────┤
│  Ingegneria Gestionale  ████████████ 42%│
│  Economia               ██████████   28%│
│  Informatica            ████████     19%│
│  Scienze della Comm.    ████         8% │
│  Psicologia             ██           3% │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  MBA TYPE                               │
├─────────────────────────────────────────┤
│     ███                                 │
│     ███  ██                             │
│     ███  ██  █   █                      │
│  ───────────────────────────────────── │
│   F-T  P-T Exe Onl                      │
│   58%  29%  9%  4%                      │
└─────────────────────────────────────────┘
```

---

### Career Section

| Metric | Chart Type | Rationale |
|--------|-----------|-----------|
| **Salary Range** | Range Bar + KPIs | 4 KPI (min/med/p75/max) + barra gradient per visualizzare range |
| **Promotion Timeline** | Histogram | Distribuzione temporale (<1y, 1-2y, 2-3y, 3y+) |
| **Promotion Location** | Donut Chart | % Same Company vs New Company |
| **Promotion Type** | Donut Chart | % Same Role vs Different Role |
| **Promotion Breakdown** | Sankey Diagram (premium)<br/>Heatmap Matrix (fallback) | Flussi di transizione completi (4 combinazioni) |

**Visual (Sankey - Premium)**:
```
┌─────────────────────────────────────────────────┐
│  CAREER MOBILITY BREAKDOWN                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  Initial ──┬─60%──> Same ──┬─40%──> Same Role  │
│   Role     │      Company  │                    │
│            │               └─20%──> Diff Role   │
│            │                                     │
│            └─40%──> New ───┬─25%──> Same Role   │
│                   Company  └─15%──> Diff Role   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Visual (Matrix - Fallback)**:
```
┌─────────────────────────────────────────┐
│  CAREER MOBILITY MATRIX                 │
├─────────────┬──────────┬────────────────┤
│             │ Same Role│ Different Role │
├─────────────┼──────────┼────────────────┤
│ Same Company│   40%    │      20%       │
│             │   126    │      63        │
├─────────────┼──────────┼────────────────┤
│ New Company │   25%    │      15%       │
│             │   79     │      47        │
└─────────────┴──────────┴────────────────┘
```

---

## 🗂️ Data Structure Quick Reference

### File Organization
```
/public/reports/[folderName]/
  ├─ metadata.json          # Company/role info
  ├─ demographics.csv       # Age, gender data
  ├─ education.csv          # Degrees, courses, school types, MBA
  └─ career.csv             # Salary, promotion data
```

### URL Pattern
```
/dashboard/junior-pm-intesa-sanpaolo-italy
/dashboard/software-engineer-google-usa
/dashboard/data-analyst-amazon-uk
```

---

## 🎨 Color Palette

### Primary Colors
- **#6D7BFC** (career-blue-500) → Primary charts, actions
- **#B6DC00** (career-green-500) → Positive signals, highlights
- **#E5F984** (career-lime) → ADV banners (Orienteering)

### Background Colors
- **#FFFFFF** → Card backgrounds
- **#F3F4FF** (career-blue-100) → Light card backgrounds, ADV (Job Consultancy)
- **#E8EAF8** (career-gray-100) → Page background

### Text Colors
- **#212746** (career-dark) → Primary text
- **#5A607F** (career-gray-700) → Secondary text
- **#8D96AC** (career-gray-400) → Tertiary text, axis labels

### Accent Colors
- **#9FA9FF** (career-blue-400) → Light blue variant
- **#D0E957** (career-green-400) → Light green variant
- **#FEC800** (career-yellow) → Warnings, highlights
- **#9D52FF** (career-purple) → Special metrics (es. età in purple)

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (DashboardHeader)                               │
├──────────────┬──────────────────────────────────────────┤
│              │  NAVIGATION TABS                         │
│              ├──────────────────────────────────────────┤
│  SIDEBAR     │  1. WELCOME SECTION                      │
│  (280px)     │     [KPI cards inline]                   │
│              ├──────────────────────────────────────────┤
│  - Role      │  2. DEMOGRAPHICS                         │
│  - Company   │     [Age chart] [Gender charts]          │
│  - Country   ├──────────────────────────────────────────┤
│  - Desc.     │  3. EDUCATION                            │
│              │     [Degrees] [Courses] [School] [MBA]   │
│              ├──────────────────────────────────────────┤
│              │  4. ADV BANNER – ORIENTEERING            │
│              ├──────────────────────────────────────────┤
│              │  5. CAREER                               │
│              │     [Salary] [Timeline] [Location]       │
│              │     [Type] [Breakdown Sankey/Matrix]     │
│              ├──────────────────────────────────────────┤
│              │  6. ADV BANNER – JOB CONSULTANCY         │
│              ├──────────────────────────────────────────┤
│              │  7. PREMIUM UPGRADE                      │
└──────────────┴──────────────────────────────────────────┘
```

---

## 🔧 Component Checklist

### New Components to Create

**Charts** (`/components/dashboard/charts/`):
- [ ] `AgeDistributionChart.tsx` (Histogram + KPI)
- [ ] `GenderDonutChart.tsx` (Donut)
- [ ] `GenderTrendChart.tsx` (Line chart)
- [ ] `HorizontalBarChart.tsx` (Riusabile per degrees/courses)
- [ ] `VerticalBarChart.tsx` (MBA types)
- [ ] `DonutChart.tsx` (Riusabile per school types, promo location/type)
- [ ] `SalaryRangeChart.tsx` (Range bar + KPIs)
- [ ] `PromotionHistogram.tsx` (Timeline)
- [ ] `SankeyDiagram.tsx` (Premium breakdown)
- [ ] `PromotionMatrix.tsx` (Fallback heatmap)

**Sections** (`/components/dashboard/sections/`):
- [ ] `WelcomeSection.tsx`
- [ ] `DemographicsSection.tsx`
- [ ] `EducationSection.tsx`
- [ ] `CareerSection.tsx`
- [ ] `AdvertisingBanner.tsx`

**Page**:
- [ ] `app/dashboard/[folderName]/page.tsx` (Dynamic route)

**Utilities**:
- [ ] `lib/csvParser.ts` (CSV parsing logic)
- [ ] `hooks/useDashboardData.ts` (Data loading hook)

---

## 📦 Dependencies to Install

```bash
npm install recharts papaparse
npm install -D @types/papaparse
```

**Optional (for Sankey)**:
```bash
npm install reactflow
```

---

## 🚀 Implementation Sprint Plan

### Sprint 1: Infrastructure (1-2 weeks)
- [ ] Setup dynamic route
- [ ] Implement CSV parsing
- [ ] Create TypeScript interfaces
- [ ] Loading/error states

### Sprint 2: Demographics (1 week)
- [ ] AgeDistributionChart
- [ ] GenderDonutChart
- [ ] GenderTrendChart
- [ ] DemographicsSection container

### Sprint 3: Education (1 week)
- [ ] HorizontalBarChart (riusabile)
- [ ] VerticalBarChart
- [ ] DonutChart (riusabile)
- [ ] EducationSection container

### Sprint 4: Career (1.5 weeks)
- [ ] SalaryRangeChart
- [ ] PromotionHistogram
- [ ] SankeyDiagram (premium)
- [ ] PromotionMatrix (fallback)
- [ ] CareerSection container

### Sprint 5: Polish (1 week)
- [ ] WelcomeSection
- [ ] AdvertisingBanner (2x)
- [ ] Animations (Framer Motion)
- [ ] Mobile responsive
- [ ] Testing

---

## 💡 Key Design Decisions

### Why These Charts?

| Decision | Rationale |
|----------|-----------|
| **Histogram per Age** | Mostra distribuzione + outliers, più informativo di media alone |
| **Donut > Pie** | Più moderno, spazio centrale per total count |
| **Sankey per Breakdown** | WOW factor, trasforma 4 numeri in narrazione visuale |
| **Horizontal Bars per Top N** | Leggibilità nomi lunghi, pattern familiare |
| **Range Bar per Salary** | Visualizza spread + percentili, non solo media |

### Why CSV + JSON?

- **Scalabilità**: Nuovo report = nuova cartella, zero code changes
- **Semplicità**: Data team può generare CSV senza conoscere codebase
- **Performance**: Parsing lato client riduce API calls iniziali
- **Versionabilità**: CSV in git = easy audit trail

### Why Recharts?

- React-native (no DOM manipulation diretta)
- Composable API (facile customizzazione)
- Supporta tutti chart types necessari
- Bundle size ragionevole (~100KB)
- Buona documentazione

---

## 🎯 Success Metrics

### Performance
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### Engagement
- Avg time on page > 2min
- Scroll depth > 70%
- Chart interaction rate > 30%

### Business
- ADV banner CTR > 5%
- Premium upgrade rate > 10%
- Data quality error rate < 1%

---

## 📝 Notes for Data Team

### CSV Generation Guidelines

1. **Consistent Naming**: Usa esattamente i nomi di colonne specificati (metric, value, additional / category, name, count, percentage)

2. **Data Quality**:
   - No missing values (usa "0" o "N/A" se necessario)
   - Percentages devono sommare a 100 (o vicino, con rounding)
   - Counts devono essere interi positivi

3. **Top N Ordering**: Pre-ordina i dati (es. top 5 degrees già ordinati per count DESC)

4. **Date Format**: YYYY-MM-DD per `lastUpdate` in metadata.json

5. **Validation**: Prima di deploy, valida CSV con tool (es. csvlint)

### Example CSV Generation Script

```python
import pandas as pd

# Example: Generate demographics.csv from SkillSherpa data
df = skillsherpa_api.get_demographics(role="Junior PM", company="Intesa")

# Age distribution
age_dist = df.groupby('age_range')['count'].sum()
age_rows = [
    {'metric': 'averageAge', 'value': df['age'].mean(), 'additional': ''},
    *[{'metric': 'ageDistribution', 'value': range, 'additional': count}
      for range, count in age_dist.items()]
]

# Gender
gender_rows = [
    {'metric': 'gender', 'value': gender, 'additional': count}
    for gender, count in df['gender'].value_counts().items()
]

# Combine and export
demographics_df = pd.DataFrame(age_rows + gender_rows)
demographics_df.to_csv('demographics.csv', index=False)
```

---

**Quick Reference Complete** ✅

Per la spec tecnica completa, vedi [DASHBOARD_SPEC.md](./DASHBOARD_SPEC.md)
