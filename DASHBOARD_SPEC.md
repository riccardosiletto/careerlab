# CareerLab Dashboard – Technical Specification

**Version**: 2.0
**Last Updated**: 2026-01-08
**Status**: Design Complete / Implementation Pending

---

## 1. Overview

La **Dashboard Dinamica CareerLab** è la UI principale per visualizzare l'analisi workforce di un ruolo specifico in un'azienda. Ogni dashboard è accessibile tramite URL dinamico e popolata da CSV/JSON contenenti dati analitici.

### 1.1 Obiettivi
- Fornire insight actionable su demographics, education, career path
- Visualizzare dati complessi con grafici chiari e immediati
- Scalare senza code changes (nuovo report = nuova cartella)
- Mantenere consistency con design system CareerLab esistente

---

## 2. URL Architecture

### 2.1 Dynamic Route Pattern

```
/dashboard/[folderName]
```

**Esempi**:
```
/dashboard/junior-pm-intesa-sanpaolo-italy
/dashboard/software-engineer-google-usa
/dashboard/data-analyst-amazon-uk
```

### 2.2 Folder Structure

Ogni `folderName` corrisponde a una cartella in `/public/reports/`:

```
/public/reports/
  ├─ junior-pm-intesa-sanpaolo-italy/
  │  ├─ metadata.json          # Role, company, country, description
  │  ├─ demographics.csv        # Age distribution, gender, gender trend
  │  ├─ education.csv           # Degrees, courses, school types, MBA types
  │  └─ career.csv              # Salary range, promotion timeline, mobility
  │
  ├─ software-engineer-google-usa/
  │  ├─ metadata.json
  │  ├─ demographics.csv
  │  ├─ education.csv
  │  └─ career.csv
  │
  └─ [altri reports...]
```

---

## 3. Data Schema

### 3.1 metadata.json

```json
{
  "role": "Junior Project Manager",
  "company": {
    "name": "Intesa Sanpaolo",
    "location": "Milano, Italia",
    "logo": "/company%20icons/logo%20intesa%20san%20paolo.jpg"
  },
  "country": "Italia",
  "profilesAnalyzed": 312,
  "dataQuality": 84,
  "lastUpdate": "2024-12-15",
  "roleDescription": "Un Junior Project Manager supporta la gestione dei progetti, aiutando nella pianificazione, nel monitoraggio e nella comunicazione. È un ruolo formativo che prevede l'affiancamento a manager esperti per migliorare le proprie competenze professionali."
}
```

### 3.2 demographics.csv

**Schema**:
```csv
metric,value,additional
averageAge,27,
ageDistribution,18-24,45
ageDistribution,25-29,120
ageDistribution,30-34,98
ageDistribution,35-39,35
ageDistribution,40+,14
gender,Male,188
gender,Female,119
gender,Other,5
genderTrend,2022-Male,62
genderTrend,2022-Female,35
genderTrend,2022-Other,2
genderTrend,2023-Male,60
genderTrend,2023-Female,39
genderTrend,2023-Other,1
genderTrend,2024-Male,58
genderTrend,2024-Female,40
genderTrend,2024-Other,2
```

**Campi**:
- `metric`: Tipo di metrica (averageAge, ageDistribution, gender, genderTrend)
- `value`: Valore primario (numero per averageAge, categoria per altri)
- `additional`: Valore secondario (count/percentage, anno per trend)

### 3.3 education.csv

**Schema**:
```csv
category,name,count,percentage
degree,Ingegneria Gestionale,131,42
degree,Economia,87,28
degree,Informatica,59,19
degree,Scienze della Comunicazione,25,8
degree,Psicologia,10,3
course,Project Management,156,50
course,Data Analysis,98,31
course,Marketing,67,21
course,Accounting,41,13
course,Leadership,28,9
schoolType,Università Pubblica,212,68
schoolType,Università Privata,69,22
schoolType,Online,22,7
schoolType,Estero,9,3
mbaType,Full-Time,45,58
mbaType,Part-Time,23,29
mbaType,Executive,7,9
mbaType,Online,3,4
```

**Campi**:
- `category`: Tipo di dato (degree, course, schoolType, mbaType)
- `name`: Nome specifico (es. "Ingegneria Gestionale")
- `count`: Numero assoluto di profili
- `percentage`: Percentuale sul totale

**Note**:
- Top 5 per `degree` e `course`
- Tutte le categorie per `schoolType` e `mbaType`

### 3.4 career.csv

**Schema**:
```csv
metric,value,additional
salaryMin,28000,
salaryMedian,35000,
salaryP75,45000,
salaryMax,60000,
promotionTimeline,<1 year,23
promotionTimeline,1-2 years,112
promotionTimeline,2-3 years,89
promotionTimeline,3+ years,28
promotionLocation,Same Company,189
promotionLocation,New Company,126
promotionType,Same Role,205
promotionType,Different Role,110
promotionMatrix,Same Co. Same Role,126
promotionMatrix,Same Co. Diff Role,63
promotionMatrix,New Co. Same Role,79
promotionMatrix,New Co. Diff Role,47
```

**Campi**:
- `metric`: Tipo di metrica (salary*, promotion*)
- `value`: Valore primario (numero per salary, categoria per promotion)
- `additional`: Valore secondario (count per promotion)

---

## 4. Dashboard Sections

### 4.1 Section Overview

La dashboard è composta da **6 sezioni verticali** (NO Welcome Screen):

```
┌─────────────────────────────────────────┐
│  1. DEMOGRAPHICS SECTION                │
│     - Age Distribution (Histogram + KPI)│
│     - Gender + Trend (Donut + Line)     │
├─────────────────────────────────────────┤
│  2. EDUCATION SECTION                   │
│     - Top 5 Degrees (H-Bars)            │
│     - Top 5 Courses (H-Bars)            │
│     - School Types (Donut)              │
│     - MBA Types (V-Bars)                │
├─────────────────────────────────────────┤
│  3. ADV BANNER – ORIENTEERING           │
├─────────────────────────────────────────┤
│  4. CAREER SECTION                      │
│     - Salary Range (Range Bar + KPIs)   │
│     - Promo Timeline (Histogram)        │
│     - Promo Location (Donut)            │
│     - Promo Type (Donut)                │
│     - Promo Breakdown (Sankey/Matrix)   │
├─────────────────────────────────────────┤
│  5. ADV BANNER – JOB CONSULTANCY        │
├─────────────────────────────────────────┤
│  6. PREMIUM UPGRADE (existing)          │
└─────────────────────────────────────────┘
```

---

### 4.2 Section Details & Data Visualization

#### **SECTION 1: DEMOGRAPHICS**

##### **1A. Age Distribution**

**Grafico**: Histogram (barre verticali) + KPI card integrata

**Data Source**: `demographics.csv`
- `averageAge`: Per KPI
- `ageDistribution`: Per histogram

**Layout**:
```
┌────────────────────────────────────────────┐
│  Età Media e Distribuzione                 │
├──────────────┬─────────────────────────────┤
│              │       ███                   │
│   27 anni    │  ██   ███  ██   █          │
│   (KPI big)  │  ██   ███  ██   █   █      │
│              │ ──────────────────────────  │
│              │ 18-24 25-29 30-34 35-39 40+ │
└──────────────┴─────────────────────────────┘
```

**Component**: `AgeDistributionChart.tsx`

**Props**:
```typescript
interface AgeDistributionChartProps {
  averageAge: number;
  distribution: Array<{ range: string; count: number; percentage: number }>;
}
```

**Design Notes**:
- KPI card background: #F3F4FF
- Histogram bars: #6D7BFC
- Grid lines: #E8EAF8
- Y-axis: count (0-150 con step 50)
- X-axis: age ranges

---

##### **1B. Gender + Trend**

**Grafico**: Donut Chart (composizione) + Line Chart (trend temporale)

**Data Source**: `demographics.csv`
- `gender`: Per donut
- `genderTrend`: Per line chart

**Layout**:
```
┌────────────────────────────────────────────┐
│  Gender Balance                             │
├──────────────┬─────────────────────────────┤
│   Donut      │  Trend (2022-2024)          │
│   Chart      │       ╱────  Male           │
│   60% M      │   ───╱       Female         │
│   38% F      │  ──           Other         │
│   2% Other   │                             │
└──────────────┴─────────────────────────────┘
```

**Components**:
- `GenderDonutChart.tsx`
- `GenderTrendChart.tsx`

**Props**:
```typescript
interface GenderDonutChartProps {
  data: Array<{ type: string; count: number; percentage: number }>;
}

interface GenderTrendChartProps {
  data: Array<{ year: number; male: number; female: number; other: number }>;
}
```

**Design Notes**:
- Donut colors: Male=#6D7BFC, Female=#B6DC00, Other=#8D96AC
- Line chart colors: stesso schema
- Center donut: total count
- Trend: percentages (0-100%)

---

#### **SECTION 2: EDUCATION**

##### **2A. University Degree (Top 5)**

**Grafico**: Horizontal Bar Chart

**Data Source**: `education.csv` → `category=degree` (first 5 rows)

**Layout**:
```
┌─────────────────────────────────────────────┐
│  Top 5 University Degrees                   │
├─────────────────────────────────────────────┤
│  Ingegneria Gestionale  ████████████ 42%    │
│  Economia               ██████████   28%    │
│  Informatica            ████████     19%    │
│  Scienze della Comm.    ████         8%     │
│  Psicologia             ██           3%     │
└─────────────────────────────────────────────┘
```

**Component**: `HorizontalBarChart.tsx` (riusabile)

**Props**:
```typescript
interface HorizontalBarChartProps {
  title: string;
  data: Array<{ name: string; count: number; percentage: number }>;
  barColor?: string; // default: #6D7BFC
  maxBarWidth?: number; // default: 450px
}
```

**Design Notes**:
- Bar color: #9FA9FF (variazione più chiara del blu)
- Background: white card
- Percentage label: end of bar
- Count label: opzionale (sotto name)

---

##### **2B. University Courses (Top 5)**

**Grafico**: Horizontal Bar Chart (stesso componente di 2A)

**Data Source**: `education.csv` → `category=course` (first 5 rows)

**Layout**: Identico a 3A, diverso titolo + dati

**Component**: `HorizontalBarChart.tsx` (reuse)

---

##### **2C. School Type Distribution**

**Grafico**: Donut Chart

**Data Source**: `education.csv` → `category=schoolType`

**Layout**:
```
┌──────────────────────────────┐
│  School Type Distribution    │
├──────────────────────────────┤
│         ◯                    │
│     68% Pubblica             │
│     22% Privata              │
│     7% Online                │
│     3% Estero                │
└──────────────────────────────┘
```

**Component**: `DonutChart.tsx` (riusabile)

**Props**:
```typescript
interface DonutChartProps {
  title: string;
  data: Array<{ type: string; count: number; percentage: number; color?: string }>;
  centerLabel?: string; // es. "Total: 312"
}
```

**Design Notes**:
- Colors: Auto-assign da palette (#6D7BFC, #B6DC00, #8D96AC, #FEC800)
- Legend: sotto il donut
- Center: total count (opzionale)

---

##### **2D. MBA Type (Top 5)**

**Grafico**: Vertical Bar Chart

**Data Source**: `education.csv` → `category=mbaType`

**Layout**:
```
┌────────────────────────────┐
│  MBA Type Distribution     │
├────────────────────────────┤
│     ███                    │
│     ███  ██                │
│     ███  ██  █   █         │
│  ───────────────────────── │
│   F-T  P-T Exe Onl         │
│   58%  29%  9%  4%         │
└────────────────────────────┘
```

**Component**: `VerticalBarChart.tsx`

**Props**:
```typescript
interface VerticalBarChartProps {
  title: string;
  data: Array<{ type: string; count: number; percentage: number }>;
  barColor?: string; // default: #B6DC00
  maxBarHeight?: number; // default: 220px
}
```

**Design Notes**:
- Bar color: #B6DC00 (lime green, differente da altre sections)
- Y-axis: percentages (0-100%)
- X-axis: type labels + percentage sotto

---

#### **SECTION 3: ADVERTISING BANNER – ORIENTEERING**

**Tipo**: Full-width promotional card

**Layout**:
```
┌──────────────────────────────────────────────────┐
│ [Icon] Vuoi capire quale percorso universitario  │
│        scegliere? Scopri il nostro servizio      │
│        Orienteering                  [Scopri →]  │
└──────────────────────────────────────────────────┘
```

**Component**: `AdvertisingBanner.tsx`

**Props**:
```typescript
interface AdvertisingBannerProps {
  type: 'orienteering' | 'job-consultancy';
  title: string;
  description?: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  iconSrc?: string;
}
```

**Design Notes**:
- Background: #E5F984 (lime/yellow)
- Icon: Illustration orientamento (left aligned, 100x100px)
- Text: Center aligned, font-medium 20px
- CTA: Button #6D7BFC, rounded, hover effect

---

#### **SECTION 4: CAREER**

##### **4A. Expected Salary Range**

**Grafico**: Range Bar + KPI Cards

**Data Source**: `career.csv` → `salaryMin`, `salaryMedian`, `salaryP75`, `salaryMax`

**Layout**:
```
┌────────────────────────────────────────────────┐
│  Expected Salary Range                         │
├──────────┬─────────┬──────────┬────────────────┤
│ €28,000  │ €35,000 │ €45,000  │ €60,000        │
│  Min     │ Median  │  P75     │  Max           │
└──────────┴─────────┴──────────┴────────────────┘
│        [████████████████████████]               │
│        Min    Median     P75        Max         │
└────────────────────────────────────────────────┘
```

**Component**: `SalaryRangeChart.tsx`

**Props**:
```typescript
interface SalaryRangeChartProps {
  min: number;
  median: number;
  p75: number;
  max: number;
  currency?: string; // default: '€'
}
```

**Design Notes**:
- KPI cards: white background, border #DCDFFF
- Range bar: gradient #6D7BFC → #B6DC00
- Markers: vertical lines at each value point
- Bar height: 40px

---

##### **4B. First Promotion Timeline**

**Grafico**: Histogram (barre verticali)

**Data Source**: `career.csv` → `promotionTimeline`

**Layout**:
```
┌────────────────────────────────────┐
│  First Promotion Timeline          │
├────────────────────────────────────┤
│         ███                        │
│         ███  ██                    │
│    ██   ███  ██  █                 │
│  ──────────────────────────────    │
│   <1y  1-2y 2-3y 3y+               │
│   23   112   89  28                │
└────────────────────────────────────┘
```

**Component**: `PromotionHistogram.tsx`

**Props**:
```typescript
interface PromotionHistogramProps {
  data: Array<{ years: string; count: number; percentage: number }>;
}
```

**Design Notes**:
- Bar color: #6D7BFC
- Y-axis: count (0-150 con step 50)
- X-axis: time ranges + count sotto
- Percentage label: sopra barre

---

##### **4C. Promotion Location**

**Grafico**: Donut Chart

**Data Source**: `career.csv` → `promotionLocation`

**Layout**:
```
┌─────────────────────────────┐
│  Promotion Location         │
├─────────────────────────────┤
│       ◯                     │
│   60% Same Company          │
│   40% New Company           │
└─────────────────────────────┘
```

**Component**: `DonutChart.tsx` (reuse)

**Design Notes**:
- Colors: Same Co.=#6D7BFC, New Co.=#B6DC00

---

##### **4D. Promotion Type**

**Grafico**: Donut Chart

**Data Source**: `career.csv` → `promotionType`

**Layout**: Identico a 4C, diversi dati

**Component**: `DonutChart.tsx` (reuse)

**Design Notes**:
- Colors: Same Role=#9FA9FF, Diff Role=#D0E957

---

##### **4E. Promotion Breakdown (Matrix 2x2)**

**Grafico Primario**: **Sankey Diagram** (premium visual)

**Data Source**: `career.csv` → `promotionMatrix`

**Layout (Sankey)**:
```
┌─────────────────────────────────────────────────┐
│  Career Mobility Breakdown                      │
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

**Grafico Fallback**: **Heatmap Matrix 2x2**

**Layout (Matrix)**:
```
┌─────────────────────────────────────────┐
│  Career Mobility Matrix                 │
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

**Components**:
- `SankeyDiagram.tsx` (premium, usa react-flow o recharts custom)
- `PromotionMatrix.tsx` (fallback, CSS grid + heatmap coloring)

**Props**:
```typescript
interface SankeyDiagramProps {
  sameCompanySameRole: number;
  sameCompanyDiffRole: number;
  newCompanySameRole: number;
  newCompanyDiffRole: number;
}

interface PromotionMatrixProps {
  data: {
    sameCompanySameRole: number;
    sameCompanyDiffRole: number;
    newCompanySameRole: number;
    newCompanyDiffRole: number;
  };
}
```

**Design Notes**:
- Sankey: Flow width proporzionale a percentuale, colors gradient
- Matrix: Heatmap coloring (verde chiaro → verde scuro per intensity)
- Mostrare sia % che count assoluto

---

#### **SECTION 5: ADVERTISING BANNER – JOB CONSULTANCY**

**Tipo**: Full-width promotional card (identico a Section 4)

**Layout**: Stesso di Orienteering, diverso content

**Component**: `AdvertisingBanner.tsx` (reuse)

**Design Notes**:
- Background: #F3F4FF (blu chiaro, diverso da Orienteering)
- Icon: Illustration consulenza lavoro
- Text: "Stai cercando lavoro o vuoi cambiare azienda? I nostri consulenti possono aiutarti"
- CTA: "Contattaci"

---

#### **SECTION 6: PREMIUM UPGRADE**

**Existing component**: `PremiumBanner.tsx` (già implementato)

No changes needed.

---

## 5. Component Architecture

### 5.1 Component Tree

```
app/dashboard/[folderName]/page.tsx
├─ DashboardHeader (existing)
├─ DashboardSidebar (existing)
└─ MainContent
   ├─ NavigationTabs (existing)
   ├─ sections/
   │  ├─ WelcomeSection
   │  ├─ DemographicsSection
   │  │  ├─ charts/AgeDistributionChart
   │  │  ├─ charts/GenderDonutChart
   │  │  └─ charts/GenderTrendChart
   │  ├─ EducationSection
   │  │  ├─ charts/HorizontalBarChart (x2)
   │  │  ├─ charts/DonutChart (school types)
   │  │  └─ charts/VerticalBarChart (MBA)
   │  ├─ AdvertisingBanner (orienteering)
   │  ├─ CareerSection
   │  │  ├─ charts/SalaryRangeChart
   │  │  ├─ charts/PromotionHistogram
   │  │  ├─ charts/DonutChart (x2)
   │  │  └─ charts/SankeyDiagram | PromotionMatrix
   │  ├─ AdvertisingBanner (job consultancy)
   │  └─ PremiumBanner (existing)
```

### 5.2 New Files to Create

```
careerlab/
├─ app/
│  └─ dashboard/
│     └─ [folderName]/
│        └─ page.tsx               # NEW: Dynamic dashboard page
│
├─ components/
│  └─ dashboard/
│     ├─ sections/
│     │  ├─ DemographicsSection.tsx         # NEW
│     │  ├─ EducationSection.tsx            # NEW
│     │  ├─ CareerSection.tsx               # NEW
│     │  └─ AdvertisingBanner.tsx           # NEW
│     │
│     └─ charts/
│        ├─ AgeDistributionChart.tsx        # NEW
│        ├─ GenderDonutChart.tsx            # NEW
│        ├─ GenderTrendChart.tsx            # NEW
│        ├─ HorizontalBarChart.tsx          # NEW (riusabile)
│        ├─ VerticalBarChart.tsx            # NEW
│        ├─ DonutChart.tsx                  # NEW (riusabile)
│        ├─ SalaryRangeChart.tsx            # NEW
│        ├─ PromotionHistogram.tsx          # NEW
│        ├─ SankeyDiagram.tsx               # NEW (premium)
│        └─ PromotionMatrix.tsx             # NEW (fallback)
│
├─ lib/
│  └─ csvParser.ts                          # NEW: CSV parsing utilities
│
└─ public/
   └─ reports/
      └─ [folderName]/                      # NEW: Data folders
         ├─ metadata.json
         ├─ demographics.csv
         ├─ education.csv
         └─ career.csv
```

### 5.3 Shared Component Props Pattern

Tutti i chart components seguono questo pattern:

```typescript
interface BaseChartProps {
  title?: string;           // Card title (opzionale, può essere nel section)
  className?: string;       // Custom styling
  loading?: boolean;        // Loading state
  error?: string;          // Error message
}

// Ogni chart extends BaseChartProps + specific data props
```

---

## 6. Technical Implementation

### 6.1 Data Loading Flow

```typescript
// app/dashboard/[folderName]/page.tsx

export default function DynamicDashboardPage() {
  const params = useParams();
  const folderName = params.folderName as string;

  const { data, loading, error } = useDashboardData(folderName);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="Dashboard not found" />;

  return (
    <div className="min-h-screen bg-[#E8EAF8]">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar {...data.metadata} />
        <main className="flex-1 flex flex-col">
          <NavigationTabs activeTab="panoramica" />

          <div className="px-10 py-8 flex flex-col gap-8">
            <DemographicsSection demographics={data.demographics} />
            <EducationSection education={data.education} />
            <AdvertisingBanner type="orienteering" />
            <CareerSection career={data.career} />
            <AdvertisingBanner type="job-consultancy" />
            <PremiumBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
```

### 6.2 Custom Hook: useDashboardData

```typescript
// hooks/useDashboardData.ts

import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export function useDashboardData(folderName: string) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Load metadata
        const metadataRes = await fetch(`/reports/${folderName}/metadata.json`);
        if (!metadataRes.ok) throw new Error('Metadata not found');
        const metadata = await metadataRes.json();

        // Load CSVs in parallel
        const [demographics, education, career] = await Promise.all([
          loadAndParseCSV(`/reports/${folderName}/demographics.csv`, 'demographics'),
          loadAndParseCSV(`/reports/${folderName}/education.csv`, 'education'),
          loadAndParseCSV(`/reports/${folderName}/career.csv`, 'career'),
        ]);

        setData({ metadata, demographics, education, career });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [folderName]);

  return { data, loading, error };
}

async function loadAndParseCSV(url: string, type: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${type} data`);

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = parseCSVByType(results.data, type);
        resolve(parsed);
      },
      error: (error) => reject(error),
    });
  });
}

function parseCSVByType(rows: any[], type: string) {
  switch (type) {
    case 'demographics':
      return parseDemographicsCSV(rows);
    case 'education':
      return parseEducationCSV(rows);
    case 'career':
      return parseCareerCSV(rows);
    default:
      return rows;
  }
}
```

### 6.3 CSV Parsing Logic

```typescript
// lib/csvParser.ts

export function parseDemographicsCSV(rows: any[]) {
  const averageAge = parseInt(rows.find(r => r.metric === 'averageAge')?.value || '0');

  const ageDistribution = rows
    .filter(r => r.metric === 'ageDistribution')
    .map(r => ({
      range: r.value,
      count: parseInt(r.additional),
      percentage: 0, // Calculate based on count
    }));

  const gender = rows
    .filter(r => r.metric === 'gender')
    .map(r => ({
      type: r.value,
      count: parseInt(r.additional),
      percentage: 0, // Calculate
    }));

  const genderTrend = parseGenderTrend(rows.filter(r => r.metric === 'genderTrend'));

  return { averageAge, ageDistribution, gender, genderTrend };
}

export function parseEducationCSV(rows: any[]) {
  return {
    topDegrees: rows.filter(r => r.category === 'degree').slice(0, 5),
    topCourses: rows.filter(r => r.category === 'course').slice(0, 5),
    schoolTypes: rows.filter(r => r.category === 'schoolType'),
    mbaTypes: rows.filter(r => r.category === 'mbaType'),
  };
}

export function parseCareerCSV(rows: any[]) {
  const salaryRange = {
    min: parseInt(rows.find(r => r.metric === 'salaryMin')?.value || '0'),
    median: parseInt(rows.find(r => r.metric === 'salaryMedian')?.value || '0'),
    p75: parseInt(rows.find(r => r.metric === 'salaryP75')?.value || '0'),
    max: parseInt(rows.find(r => r.metric === 'salaryMax')?.value || '0'),
  };

  const promotionTimeline = rows
    .filter(r => r.metric === 'promotionTimeline')
    .map(r => ({
      years: r.value,
      count: parseInt(r.additional),
      percentage: 0, // Calculate
    }));

  // ... similar for other career metrics

  return { salaryRange, promotionTimeline, promotionLocation, promotionType, promotionMatrix };
}
```

---

## 7. Styling Guidelines

### 7.1 Color Palette

```css
/* Primary Colors */
--career-blue-500: #6D7BFC;      /* Primary action, charts */
--career-blue-400: #9FA9FF;      /* Lighter variant */
--career-blue-100: #F3F4FF;      /* Card backgrounds */

--career-green-500: #B6DC00;     /* Positive, highlights */
--career-green-400: #D0E957;     /* Lighter variant */
--career-green-100: #F1FDD1;     /* Light backgrounds */

--career-lime: #E5F984;          /* ADV banners, accents */

/* Neutral Colors */
--career-dark: #212746;          /* Text primary */
--career-gray-700: #5A607F;      /* Text secondary */
--career-gray-400: #8D96AC;      /* Text tertiary, borders */
--career-gray-100: #E8EAF8;      /* Background */
--career-gray-200: #DCDFFF;      /* Borders, dividers */

/* Accent Colors */
--career-yellow: #FEC800;        /* Warnings, highlights */
--career-purple: #9D52FF;        /* Special metrics */
```

### 7.2 Typography Scale

```css
/* Headings */
.text-heading-1 { font-size: 82px; line-height: 72px; font-weight: 500; }  /* Big KPIs */
.text-heading-2 { font-size: 30px; line-height: 1.2; font-weight: 500; }   /* Section titles */
.text-heading-3 { font-size: 26px; line-height: 30px; font-weight: 500; }  /* Card titles */
.text-heading-4 { font-size: 20px; line-height: 1.2; font-weight: 500; }   /* Subsection titles */

/* Body */
.text-body-lg { font-size: 18px; line-height: 1.4; font-weight: 400; }
.text-body { font-size: 16px; line-height: 1.25; font-weight: 400; }
.text-body-sm { font-size: 14px; line-height: 1.3; font-weight: 400; }

/* Labels */
.text-label { font-size: 12px; line-height: 1.2; font-weight: 400; text-transform: uppercase; }
```

### 7.3 Spacing System

```css
/* Consistent spacing (Tailwind scale) */
gap-2  /* 8px  - between chart elements */
gap-3  /* 12px - card internal padding */
gap-4  /* 16px - between cards in row */
gap-5  /* 20px - between elements */
gap-6  /* 24px - between rows */
gap-8  /* 32px - between sections */
```

### 7.4 Card Styling

```css
.dashboard-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dashboard-card-title {
  font-size: 20px;
  font-weight: 500;
  color: #212746;
  padding: 20px;
  border-bottom: 1px solid #E8EAF8;
}
```

---

## 8. Chart Library Integration

### 8.1 Recommended: Recharts

**Why Recharts**:
- React-native, composable API
- Buona documentazione
- Supporta tutti i chart types necessari (bar, line, pie/donut)
- Customizzabile con Tailwind
- Bundle size ragionevole (~100KB)

**Installation**:
```bash
npm install recharts
```

**Example (Donut Chart)**:
```typescript
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function DonutChart({ data, title }: DonutChartProps) {
  const COLORS = ['#6D7BFC', '#B6DC00', '#8D96AC', '#FEC800'];

  return (
    <div className="dashboard-card">
      <h3 className="dashboard-card-title">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### 8.2 Sankey Diagram: react-flow

Per il Sankey diagram (promotion breakdown), usare **react-flow**:

```bash
npm install reactflow
```

Alternativa: Custom implementation con SVG + D3 calculations (più complesso ma più controllo).

---

## 9. Performance Considerations

### 9.1 Data Loading Optimization

- **CSV parsing lato client**: Riduce API calls, ma aumenta initial load
- **Caching**: Usare SWR o React Query per cache dei CSV
- **Lazy loading**: Sezioni below-fold caricano on-scroll (IntersectionObserver)

### 9.2 Chart Rendering

- **Debounce resize**: Recharts re-render on window resize → debounce a 300ms
- **Virtualization**: Per liste lunghe (non applicabile qui)
- **Memoization**: Usare `useMemo` per data transformations costose

---

## 10. Testing Strategy

### 10.1 Unit Tests

- CSV parser functions (`lib/csvParser.ts`)
- Data transformation logic
- Individual chart components (snapshot tests)

### 10.2 Integration Tests

- Full dashboard page load con mock data
- Dynamic route `/dashboard/[folderName]` con diversi folderName
- Error states (missing CSV, malformed data)

### 10.3 Visual Regression

- Percy/Chromatic per screenshot comparison
- Test su diversi breakpoints (mobile, tablet, desktop)

---

## 11. Deployment & Rollout

### 11.1 Migration Plan

**Phase 1: Create Template Data**
- [ ] Create 3 example report folders in `/public/reports/`
- [ ] Populate with realistic mock data
- [ ] Validate CSV schemas

**Phase 2: Implement Core Components**
- [ ] Setup dynamic route `[folderName]/page.tsx`
- [ ] Implement CSV parsing utilities
- [ ] Create base chart components (Donut, Bars, Histogram)

**Phase 3: Build Sections**
- [ ] Demographics section (week 1)
- [ ] Education section (week 1)
- [ ] Career section (week 2)
- [ ] ADV banners + polish (week 2)

**Phase 4: Testing & Polish**
- [ ] Unit tests for parsers
- [ ] Integration tests
- [ ] Mobile responsive testing
- [ ] Performance audit

**Phase 5: Production**
- [ ] Deploy to staging
- [ ] UAT con stakeholders
- [ ] Production deployment
- [ ] Monitor analytics

### 11.2 Success Metrics

- **Performance**: LCP < 2.5s, FID < 100ms
- **Engagement**: Avg time on page > 2min
- **Conversions**: ADV banner CTR > 5%
- **Data Quality**: < 1% error rate on CSV parsing

---

## 12. Future Enhancements

### 12.1 V2 Features

- **Interactive filters**: Filter charts by date range, seniority, location
- **Comparison mode**: Side-by-side comparison di 2 dashboard (target vs competitor)
- **Export**: Download charts as PNG/SVG, export data as Excel
- **Annotations**: User-generated notes on specific data points
- **Real-time updates**: WebSocket per live data refresh

### 12.2 Advanced Analytics

- **Predictive models**: ML-powered predictions su attrition, hiring needs
- **Anomaly detection**: Alert automatici su pattern anomali
- **Natural language insights**: AI-generated summaries "In plain English"
- **Benchmarking**: Integrazione con SkillSherpa Intelligence Platform per competitor data

---

## Appendix A: TypeScript Interfaces

```typescript
// types/dashboard.ts

export interface DashboardData {
  metadata: DashboardMetadata;
  demographics: Demographics;
  education: Education;
  career: Career;
}

export interface DashboardMetadata {
  role: string;
  company: {
    name: string;
    location: string;
    logo: string;
  };
  country: string;
  profilesAnalyzed: number;
  dataQuality: number;
  lastUpdate: string;
  roleDescription: string;
}

export interface Demographics {
  averageAge: number;
  ageDistribution: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
  gender: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  genderTrend: Array<{
    year: number;
    male: number;
    female: number;
    other: number;
  }>;
}

export interface Education {
  topDegrees: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  topCourses: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  schoolTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  mbaTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

export interface Career {
  salaryRange: {
    min: number;
    median: number;
    p75: number;
    max: number;
  };
  promotionTimeline: Array<{
    years: string;
    count: number;
    percentage: number;
  }>;
  promotionLocation: {
    sameCompany: number;
    newCompany: number;
  };
  promotionType: {
    sameRole: number;
    differentRole: number;
  };
  promotionMatrix: {
    sameCompanySameRole: number;
    sameCompanyDiffRole: number;
    newCompanySameRole: number;
    newCompanyDiffRole: number;
  };
}
```

---

## Appendix B: CSV Templates

### B.1 demographics.csv Template

```csv
metric,value,additional
averageAge,27,
ageDistribution,18-24,45
ageDistribution,25-29,120
ageDistribution,30-34,98
ageDistribution,35-39,35
ageDistribution,40+,14
gender,Male,188
gender,Female,119
gender,Other,5
genderTrend,2022-Male,62
genderTrend,2022-Female,35
genderTrend,2022-Other,2
genderTrend,2023-Male,60
genderTrend,2023-Female,39
genderTrend,2023-Other,1
genderTrend,2024-Male,58
genderTrend,2024-Female,40
genderTrend,2024-Other,2
```

### B.2 education.csv Template

```csv
category,name,count,percentage
degree,Ingegneria Gestionale,131,42
degree,Economia,87,28
degree,Informatica,59,19
degree,Scienze della Comunicazione,25,8
degree,Psicologia,10,3
course,Project Management,156,50
course,Data Analysis,98,31
course,Marketing,67,21
course,Accounting,41,13
course,Leadership,28,9
schoolType,Università Pubblica,212,68
schoolType,Università Privata,69,22
schoolType,Online,22,7
schoolType,Estero,9,3
mbaType,Full-Time,45,58
mbaType,Part-Time,23,29
mbaType,Executive,7,9
mbaType,Online,3,4
```

### B.3 career.csv Template

```csv
metric,value,additional
salaryMin,28000,
salaryMedian,35000,
salaryP75,45000,
salaryMax,60000,
promotionTimeline,<1 year,23
promotionTimeline,1-2 years,112
promotionTimeline,2-3 years,89
promotionTimeline,3+ years,28
promotionLocation,Same Company,189
promotionLocation,New Company,126
promotionType,Same Role,205
promotionType,Different Role,110
promotionMatrix,Same Co. Same Role,126
promotionMatrix,Same Co. Diff Role,63
promotionMatrix,New Co. Same Role,79
promotionMatrix,New Co. Diff Role,47
```

---

**End of Specification**
