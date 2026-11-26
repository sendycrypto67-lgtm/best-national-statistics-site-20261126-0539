// NusaAngka data: figures for Indonesia, each with its year and source.
// Sources are listed in full on the Sources page (#/tentang). No figure
// here is invented: where a series is rounded, the note says so.
export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  currency: 'Indonesian rupiah (IDR)',
  capital: 'Jakarta',
  areaKm2: 1904569,
  provinces: 38,
  islands: '17,000+',
};

export const KPIS = [
  { label: 'Population', value: '285.7m', sub: 'million people, 2025, World Bank', detail: 'Fourth largest population in the world.' },
  { label: 'GDP', value: 'Rp23.82 trillion', sub: 'trillion rupiah, 2025, BPS', detail: 'US$1,445.6 billion, World Bank and IMF.' },
  { label: 'GDP growth', value: '5.11%', sub: 'year on year, 2025, BPS', detail: 'Up from 5.03% in 2024.' },
  { label: 'GDP per person', value: 'US$5,060', sub: 'nominal, 2025, IMF', detail: 'Rp83.7 million per person, BPS.' },
  { label: 'Inflation', value: '1.91%', sub: 'CPI average, 2025, IMF', detail: 'Down from 2.18% in 2024.' },
  { label: 'Poverty rate', value: '8.25%', sub: 'September 2025, BPS', detail: '23.4 million people below the national line.' },
  { label: 'Unemployment', value: '4.85%', sub: 'August 2025, BPS', detail: '7.46 million people, Sakernas survey.' },
  { label: 'Human Development Index', value: '75.90', sub: '2025, BPS, high category', detail: 'Up 0.88 points from 75.02 in 2024.' },
];

// Population, millions, one consistent series: World Bank World
// Development Indicators, indicator SP.POP.TOTL, verified against the
// World Bank API. Growth is under 1% a year in every year from 2021
// to 2025 (276.8 to 278.8 to 281.2 to 283.5 to 285.7).
export const POPULATION_SERIES = [
  { year: 2010, pop: 246.3 }, { year: 2015, pop: 261.8 }, { year: 2020, pop: 274.8 },
  { year: 2021, pop: 276.8 }, { year: 2022, pop: 278.8 }, { year: 2023, pop: 281.2 },
  { year: 2024, pop: 283.5 }, { year: 2025, pop: 285.7 },
];

// Island groups, mid-2025: BPS province totals grouped by island,
// scaled to the World Bank 2025 total of 285.7 million and rounded,
// so the slices add to the same total as the population series.
export const ISLANDS = [
  { name: 'Java', pop: 158.8, share: '55.6%' },
  { name: 'Sumatra', pop: 62.6, share: '21.9%' },
  { name: 'Kalimantan', pop: 18.1, share: '6.3%' },
  { name: 'Sulawesi', pop: 20.1, share: '7.0%' },
  { name: 'Bali and Nusa Tenggara', pop: 15.3, share: '5.4%' },
  { name: 'Maluku and Papua', pop: 10.8, share: '3.8%' },
];

// GDP growth, percent, BPS. GDP nominal in US$ billion, IMF World Economic Outlook.
export const GDP_SERIES = [
  { year: 2021, growth: 3.69, gdpUsd: 1186, inflation: 1.60 },
  { year: 2022, growth: 5.31, gdpUsd: 1319, inflation: 4.21 },
  { year: 2023, growth: 5.05, gdpUsd: 1371, inflation: 3.71 },
  { year: 2024, growth: 5.03, gdpUsd: 1396, inflation: 2.18 },
  { year: 2025, growth: 5.11, gdpUsd: 1446, inflation: 1.91 },
];

// Exports and imports of goods and services, US$ billion, World Bank WDI.
export const TRADE_SERIES = [
  { year: 2021, exports: 254, imports: 224 },
  { year: 2022, exports: 316, imports: 262 },
  { year: 2023, exports: 291, imports: 237 },
  { year: 2024, exports: 310, imports: 286 },
  { year: 2025, exports: 330, imports: 297 },
];

// Poverty rate, percent of population, BPS. March and September readings.
export const POVERTY_SERIES = [
  { label: 'Mar 2024', value: 9.03 }, { label: 'Sep 2024', value: 8.57 },
  { label: 'Mar 2025', value: 8.47 }, { label: 'Sep 2025', value: 8.25 },
  { label: 'Mar 2026', value: 8.07 },
];

// Open unemployment rate, percent of labour force, BPS Sakernas.
export const UNEMPLOYMENT_SERIES = [
  { label: 'Feb 2024', value: 4.82 }, { label: 'Aug 2024', value: 4.91 },
  { label: 'Feb 2025', value: 4.76 }, { label: 'Aug 2025', value: 4.85 },
  { label: 'Aug 2026', value: 4.75 },
];

// Human Development Index, BPS, 0 to 100 scale.
export const HDI_SERIES = [
  { year: 2020, hdi: 72.81 }, { year: 2021, hdi: 73.16 }, { year: 2022, hdi: 73.77 },
  { year: 2023, hdi: 74.39 }, { year: 2024, hdi: 75.02 }, { year: 2025, hdi: 75.90 },
];

export const HDI_COMPONENTS = [
  { component: 'Life expectancy at birth', unit: 'years', y2023: 73.93, y2024: 74.15, y2025: 74.47 },
  { component: 'Expected years of schooling', unit: 'years', y2023: 13.15, y2024: 13.21, y2025: 13.30 },
  { component: 'Mean years of schooling', unit: 'years', y2023: 8.77, y2024: 8.85, y2025: 9.07 },
  { component: 'Adjusted real spending per person', unit: 'Rp thousand per year', y2023: 11899, y2024: 12341, y2025: 12802 },
];

// Largest 11 provinces by population, mid-2024, BPS. Area in km2, density per km2.
export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', island: 'Java', pop: 50345200, area: 37045, density: 1359 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', pop: 41814500, area: 48056, density: 870 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', pop: 37892300, area: 34337, density: 1104 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', pop: 15588500, area: 72438, density: 215 },
  { name: 'Banten', capital: 'Serang', island: 'Java', pop: 11834087, area: 9356, density: 1265 },
  { name: 'Jakarta', capital: 'Central Jakarta', island: 'Java', pop: 11135191, area: 662, density: 16824 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9419600, area: 33570, density: 281 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', pop: 8837300, area: 86772, density: 102 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6728100, area: 89901, density: 75 },
  { name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', pop: 5836200, area: 42108, density: 139 },
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', pop: 5554800, area: 56835, density: 98 },
];

export const RELEASES = [
  { date: '5 Nov 2026', title: 'Labour force, August 2026: unemployment 4.75%, 147.99 million employed', source: 'BPS' },
  { date: '5 Nov 2025', title: 'Human Development Index 2025 reaches 75.90, up 0.88 points', source: 'BPS' },
  { date: 'Sep 2025', title: 'Poverty rate falls to 8.25% in September 2025', source: 'BPS' },
  { date: 'Feb 2026', title: 'Economy grew 5.11% in 2025, GDP Rp23,821.1 trillion', source: 'BPS' },
  { date: '2025', title: 'Exports US$330.3 billion, imports US$297.0 billion', source: 'World Bank WDI' },
];

export const SOURCES = [
  { figure: 'Population, GDP, inflation, poverty, unemployment, HDI', source: 'BPS, Statistics Indonesia (bps.go.id), releases 2024 to 2026', note: 'Population is the World Bank WDI series SP.POP.TOTL, 2025 is 285.7 million. Other national figures as published by BPS.' },
  { figure: 'GDP in US dollars, GDP per person, inflation average', source: 'IMF World Economic Outlook, October 2025, and IMF International Financial Statistics', note: 'GDP 2025 US$1,445.6 billion, per person US$5,060, CPI average 1.91%.' },
  { figure: 'Exports and imports', source: 'World Bank, World Development Indicators', note: 'Goods and services, current US dollars. 2025 exports US$330.3 billion, imports US$297.0 billion.' },
  { figure: 'Province populations, areas and densities', source: 'BPS province totals, mid-2024, via official province tables', note: 'Largest 11 provinces shown. Jakarta density uses its land area of 662 km2.' },
  { figure: 'Island group populations', source: 'BPS province totals grouped by island, mid-2025, scaled to the World Bank 2025 total', note: 'Scaled to 285.7 million and rounded. Shares add to 100%.' },
];

export function fmtInt(n) { return n.toLocaleString('en-US'); }
export function fmtMillions(n) { return (n / 1000000).toFixed(1) + 'm'; }
