# Reports Folder

Questa cartella contiene i file CSV con i dati per la dashboard CareerLab.

## Struttura dei file attesi

### `dashboard_overview.csv`
Contiene i dati generali della ricerca:
- `role` - Nome del ruolo cercato
- `company_name` - Nome dell'azienda
- `company_location` - Sede dell'azienda
- `country` - Paese di riferimento
- `profiles_analyzed` - Numero totale di profili analizzati
- `data_quality` - Percentuale qualità dati (0-100)
- `total_employees` - Numero di dipendenti nel ruolo
- `new_hires_12m` - Nuove assunzioni ultimi 12 mesi
- `average_age` - Età media

### `education_levels.csv`
Distribuzione per livello di formazione:
- `level` - Nome del livello (Scuola Superiore, Laurea Triennale, Laurea Magistrale, Master, Altro)
- `count` - Numero di profili
- `percentage` - Percentuale sul totale

### `languages.csv`
Distribuzione per lingue parlate:
- `language` - Nome della lingua
- `count` - Numero di profili
- `percentage` - Percentuale sul totale

---

## Esempio di utilizzo

I dati verranno caricati dinamicamente dalla dashboard usando un loader che legge questi file CSV.

```typescript
// Esempio di loader
async function loadDashboardData() {
  const overview = await parseCSV('reports/dashboard_overview.csv');
  const education = await parseCSV('reports/education_levels.csv');
  const languages = await parseCSV('reports/languages.csv');
  
  return { overview, education, languages };
}
```




