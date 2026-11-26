import { KPIS, META, POPULATION_SERIES, ISLANDS, GDP_SERIES, TRADE_SERIES, POVERTY_SERIES, UNEMPLOYMENT_SERIES, HDI_SERIES, HDI_COMPONENTS, PROVINCES, RELEASES, SOURCES, fmtInt } from './data.js';

export function kpiCards() {
  return '<section class="kpis" aria-label="Key figures">' + KPIS.map((k) =>
    '<div class="kpi"><div class="k-label">' + k.label + '</div><div class="k-value">' + k.value + '</div><div class="k-sub">' + k.sub + '</div><div class="k-detail">' + k.detail + '</div></div>'
  ).join('') + '</section>';
}

export function islandLegend() {
  const colors = ['#0f5b8f', '#12836f', '#c98a1b', '#7a5fb0', '#b4433a', '#4a7fb5'];
  return '<p class="legend">' + ISLANDS.map((d, i) => '<span><i style="background:' + colors[i] + '"></i>' + d.name + ' ' + d.share + '</span>').join('') + '</p>';
}

export function viewHome() {
  return `
  <section class="hero">
    <h1>Indonesia in Numbers</h1>
    <p>One page for the figures that describe a country of 284 million people: how many live here, how the economy is doing, who has work, and how life is improving.</p>
    <div class="hero-facts"><span>Capital: <b>Jakarta</b></span><span>Provinces: <b>38</b></span><span>Land area: <b>1,904,569 km2</b></span><span>Currency: <b>Indonesian rupiah</b></span><span>Updated: <b>26 November 2026</b></span></div>
  </section>
  ${kpiCards()}
  <div class="grid2">
    <section class="card">
      <h3>Population, 2010 to 2025</h3>
      <p>Indonesia added about 47 million people since the 2010 census. Growth has slowed to under 1% a year.</p>
      <canvas class="chart" data-chart="popLine" data-h="240" role="img" aria-label="Line chart of population from 2010 to 2025"></canvas>
      <p class="chart-readout">2010: 237.6 million (census). 2020: 270.2 million (census). 2025: 284.4 million, BPS.</p>
      <p class="src">Source: BPS, Statistics Indonesia, and World Bank World Development Indicators.</p>
    </section>
    <section class="card">
      <h3>Where people live</h3>
      <p>More than half the country lives on Java, an island about the size of England, while Kalimantan is far larger and far emptier.</p>
      <canvas class="chart" data-chart="islandDonut" data-h="240" role="img" aria-label="Donut chart of population share by island group"></canvas>
      ${islandLegend()}
      <p class="chart-readout">Java holds 55.6% of the population on about 7% of the land.</p>
      <p class="src">Source: BPS province totals, mid-2025, grouped by island.</p>
    </section>
  </div>
  <div class="grid2">
    <section class="card">
      <h3>Economy at a glance</h3>
      <p>GDP grew 5.11% in 2025, the fastest since 2022. GDP reached Rp23,821.1 trillion, or US$1,445.6 billion.</p>
      <canvas class="chart" data-chart="gdpLine" data-h="220" role="img" aria-label="Line chart of GDP growth from 2021 to 2025"></canvas>
      <p class="src">Source: BPS national accounts, IMF World Economic Outlook.</p>
      <p><a href="#/ekonomi">Open the Economy page</a></p>
    </section>
    <section class="card">
      <h3>Latest releases</h3>
      <ul class="list">
        ${RELEASES.map((r) => '<li><b>' + r.date + '.</b> ' + r.title + ' <span class="badge">' + r.source + '</span></li>').join('')}
      </ul>
      <p><a href="#/tentang">See every source and method note</a></p>
    </section>
  </div>`;
}

export function viewPopulation() {
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  return `
  <h2>Population</h2>
  <p class="lede">284.4 million people in 2025, the fourth largest population in the world, spread over 38 provinces and more than 17,000 islands.</p>
  <div class="grid2">
    <section class="card">
      <h3>Population growth, 2010 to 2025</h3>
      <canvas class="chart" data-chart="popLine" data-h="260" role="img" aria-label="Line chart of population from 2010 to 2025"></canvas>
      <p class="chart-readout">Census years are 2010 (237.6 million) and 2020 (270.2 million). Later years are mid-year estimates.</p>
      <p class="src">Source: BPS censuses and mid-year estimates, World Bank.</p>
    </section>
    <section class="card">
      <h3>Population by island group, 2025</h3>
      <canvas class="chart" data-chart="islandDonut" data-h="260" role="img" aria-label="Donut chart of population share by island group"></canvas>
      ${islandLegend()}
      <p class="chart-readout">Java 158.1 million, Sumatra 62.3 million, Kalimantan 18.0 million. Shares are rounded.</p>
      <p class="src">Source: BPS province totals, mid-2025, grouped by island.</p>
    </section>
  </div>
  <section class="card" style="margin-top:14px">
    <h3>Largest provinces</h3>
    <p>West Java alone has more people than Spain. The three Java provinces at the top hold 130 million people between them.</p>
    <canvas class="chart" data-chart="topProvinces" data-h="300" role="img" aria-label="Bar chart of the eight largest provinces by population"></canvas>
    <p class="src">Source: BPS province totals, mid-2024. Full table with search and sorting is on the <a href="#/provinsi">Provinces page</a>.</p>
  </section>
  <div class="note">Reading the numbers: a province total is a mid-year estimate, not a census count. The 2020 census counted 270.2 million people, and later figures are BPS projections from that base.</div>`;
}

export function viewEconomy(state) {
  const metric = state.econMetric;
  const chart = metric === 'trade' ? 'tradeBars' : metric === 'inflation' ? 'inflationBars' : 'gdpLine';
  const title = metric === 'trade' ? 'Exports and imports, US$ billion' : metric === 'inflation' ? 'Inflation, CPI average, percent' : 'Real GDP growth, percent per year';
  return `
  <h2>Economy</h2>
  <p class="lede">Growth, prices and trade for the largest economy in Southeast Asia, with every series shown next to its source.</p>
  <div class="controls" role="group" aria-label="Choose a chart">
    <span>Chart:</span>
    <button class="btn ${metric === 'growth' ? 'on' : ''}" data-econ="growth">GDP growth</button>
    <button class="btn ${metric === 'inflation' ? 'on' : ''}" data-econ="inflation">Inflation</button>
    <button class="btn ${metric === 'trade' ? 'on' : ''}" data-econ="trade">Exports and imports</button>
  </div>
  <div class="grid2">
    <section class="card">
      <h3>${title}</h3>
      <canvas class="chart" data-chart="${chart}" data-h="280" role="img" aria-label="${title}"></canvas>
      <p class="chart-readout">${metric === 'trade' ? '2025: exports US$330 billion, imports US$297 billion, a surplus of US$33 billion.' : metric === 'inflation' ? 'Inflation fell from 4.21% in 2022 to 1.91% in 2025.' : 'Growth stayed above 5% in 2022, 2023, 2024 and 2025.'}</p>
      <p class="src">Source: ${metric === 'trade' ? 'World Bank World Development Indicators, goods and services.' : metric === 'inflation' ? 'IMF, CPI period average.' : 'BPS national accounts.'}</p>
    </section>
    <section class="card">
      <h3>GDP, 2021 to 2025</h3>
      <div class="scroll-x"><table>
        <thead><tr><th>Year</th><th class="num">Growth</th><th class="num">GDP, US$ bn</th><th class="num">Inflation</th></tr></thead>
        <tbody>${GDP_SERIES.map((d) => '<tr><td>' + d.year + '</td><td class="num">' + d.growth.toFixed(2) + '%</td><td class="num">' + fmtInt(d.gdpUsd) + '</td><td class="num">' + d.inflation.toFixed(2) + '%</td></tr>').join('')}</tbody>
      </table></div>
      <p class="src">Sources: BPS for growth, IMF for GDP in dollars and CPI. GDP in rupiah for 2025 is Rp23,821.1 trillion, BPS.</p>
      <h3 style="margin-top:16px">Trade, 2021 to 2025</h3>
      <div class="scroll-x"><table>
        <thead><tr><th>Year</th><th class="num">Exports, US$ bn</th><th class="num">Imports, US$ bn</th><th class="num">Balance</th></tr></thead>
        <tbody>${TRADE_SERIES.map((d) => '<tr><td>' + d.year + '</td><td class="num">' + fmtInt(d.exports) + '</td><td class="num">' + fmtInt(d.imports) + '</td><td class="num">' + (d.exports - d.imports >= 0 ? '+' : '') + fmtInt(d.exports - d.imports) + '</td></tr>').join('')}</tbody>
      </table></div>
      <p class="src">Source: World Bank World Development Indicators.</p>
    </section>
  </div>
  <div class="note">Why two GDP numbers? Rupiah GDP is the figure BPS publishes. Dollar GDP moves with the exchange rate as well as with growth, so the two tell different stories in the same year.</div>`;
}

export function viewSocial(state) {
  const ind = state.socialInd;
  const chart = ind === 'poverty' ? 'povertyLine' : ind === 'unemployment' ? 'unempLine' : 'hdiLine';
  const title = ind === 'poverty' ? 'Poverty rate, percent of population' : ind === 'unemployment' ? 'Open unemployment rate, percent of labour force' : 'Human Development Index, 2020 to 2025';
  return `
  <h2>People</h2>
  <p class="lede">Poverty, work and human development: the three series that say most about how life is changing for ordinary Indonesians.</p>
  <div class="controls" role="group" aria-label="Choose an indicator">
    <span>Indicator:</span>
    <button class="btn ${ind === 'hdi' ? 'on' : ''}" data-social="hdi">Human development</button>
    <button class="btn ${ind === 'poverty' ? 'on' : ''}" data-social="poverty">Poverty</button>
    <button class="btn ${ind === 'unemployment' ? 'on' : ''}" data-social="unemployment">Unemployment</button>
  </div>
  <div class="grid2">
    <section class="card">
      <h3>${title}</h3>
      <canvas class="chart" data-chart="${chart}" data-h="280" role="img" aria-label="${title}"></canvas>
      <p class="chart-readout">${ind === 'poverty' ? 'Poverty fell from 9.03% in March 2024 to 8.07% in March 2026.' : ind === 'unemployment' ? 'Unemployment was 4.85% in August 2025 and 4.75% in August 2026.' : 'HDI rose every year from 72.81 in 2020 to 75.90 in 2025.'}</p>
      <p class="src">Source: BPS. Poverty from Susenas, unemployment from Sakernas, HDI from the BPS human development release.</p>
    </section>
    <section class="card">
      <h3>What makes up the HDI</h3>
      <p>Four components, all improving. Life expectancy rose 0.32 years in 2025 alone.</p>
      <div class="scroll-x"><table>
        <thead><tr><th>Component</th><th class="num">2023</th><th class="num">2024</th><th class="num">2025</th></tr></thead>
        <tbody>${HDI_COMPONENTS.map((c) => '<tr><td>' + c.component + ' (' + c.unit + ')</td><td class="num">' + fmtInt(c.y2023) + '</td><td class="num">' + fmtInt(c.y2024) + '</td><td class="num">' + fmtInt(c.y2025) + '</td></tr>').join('')}</tbody>
      </table></div>
      <p class="src">Source: BPS, Human Development Index release No. 104/11/Th. XXVIII, 5 November 2025.</p>
      <h3 style="margin-top:16px">Poverty and work, side by side</h3>
      <p>Poverty in September 2025 was 8.25%, about 23.4 million people. The labour force in August 2026 was 155.37 million people, with 147.99 million employed.</p>
      <p><span class="badge good">Poverty falling</span> <span class="badge good">Unemployment 4.75%</span> <span class="badge">Youth unemployment 16.9% in Aug 2025</span></p>
    </section>
  </div>`;
}

export function viewProvinces(state) {
  const q = (state.query || '').toLowerCase();
  let rows = PROVINCES.filter((p) => (!q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)) && (state.island === 'All' || p.island === state.island));
  const dir = state.sortDir === 'desc' ? -1 : 1;
  rows = [...rows].sort((a, b) => {
    const k = state.sortKey;
    if (k === 'name') return a.name.localeCompare(b.name) * dir;
    return (a[k] - b[k]) * dir;
  });
  const sel = PROVINCES.find((p) => p.name === state.selected);
  const a = PROVINCES.find((p) => p.name === state.compareA);
  const b = PROVINCES.find((p) => p.name === state.compareB);
  const opt = (v) => PROVINCES.map((p) => '<option value="' + p.name + '"' + (p.name === v ? ' selected' : '') + '>' + p.name + '</option>').join('');
  return `
  <h2>Provinces</h2>
  <p class="lede">The largest 11 of Indonesia's 38 provinces, mid-2024. Search by name or capital, filter by island, sort any column, and click a row for its detail.</p>
  <div class="controls">
    <label>Search <input type="search" id="q" placeholder="Province or capital" value="${state.query || ''}" aria-label="Search provinces"></label>
    <label>Island <select id="islandSel">${['All', 'Java', 'Sumatra'].map((i) => '<option' + (state.island === i ? ' selected' : '') + '>' + i + '</option>').join('')}</select></label>
    <button class="btn" id="csvBtn">Download this table as CSV</button>
    <span class="badge">${rows.length} provinces shown</span>
  </div>
  <section class="card">
    <div class="scroll-x"><table id="provTable">
      <thead><tr>
        <th><button data-sort="name">Province ${state.sortKey === 'name' ? (state.sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
        <th>Capital</th><th>Island</th>
        <th class="num"><button data-sort="pop">Population ${state.sortKey === 'pop' ? (state.sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
        <th class="num"><button data-sort="area">Area, km2 ${state.sortKey === 'area' ? (state.sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
        <th class="num"><button data-sort="density">Density /km2 ${state.sortKey === 'density' ? (state.sortKey === 'density' && state.sortDir === 'asc' ? '▲' : '▼') : ''}</button></th>
      </tr></thead>
      <tbody>${rows.map((p) => '<tr data-prov="' + p.name + '"' + (state.selected === p.name ? ' class="selected"' : '') + '><td><b>' + p.name + '</b></td><td>' + p.capital + '</td><td>' + p.island + '</td><td class="num">' + fmtInt(p.pop) + '</td><td class="num">' + fmtInt(p.area) + '</td><td class="num">' + fmtInt(p.density) + '</td></tr>').join('') || '<tr><td colspan="6">No province matches that search. Clear the search to see all 11.</td></tr>'}</tbody>
    </table></div>
    <p class="src">Source: BPS province totals, mid-2024. Jakarta is a special capital region, which is why its density is far above the rest.</p>
  </section>
  ${sel ? `<section class="detail"><h3>${sel.name}</h3><div class="cols"><span>Capital: <b>${sel.capital}</b></span><span>Island: <b>${sel.island}</b></span><span>Population: <b>${fmtInt(sel.pop)}</b></span><span>Area: <b>${fmtInt(sel.area)} km2</b></span><span>Density: <b>${fmtInt(sel.density)} people per km2</b></span><span>Share of Indonesia: <b>${(sel.pop / 284400000 * 100).toFixed(1)}%</b></span></div></section>` : ''}
  <section class="card" style="margin-top:14px">
    <h3>Compare two provinces</h3>
    <div class="controls">
      <label>First <select id="cmpA">${opt(state.compareA)}</select></label>
      <label>Second <select id="cmpB">${opt(state.compareB)}</select></label>
    </div>
    <p>${a.name} has ${fmtInt(a.pop)} people and ${b.name} has ${fmtInt(b.pop)} people. ${a.name} is ${(a.pop / b.pop).toFixed(1)} times as populous as ${b.name}.</p>
    <canvas class="chart" data-chart="compareBars" data-h="200" role="img" aria-label="Bar chart comparing the two chosen provinces"></canvas>
    <p class="src">Population, mid-2024, BPS. Density is population divided by land area.</p>
  </section>`;
}

export function viewAbout() {
  return `
  <h2>Sources and methods</h2>
  <p class="lede">Every figure on this site carries its year and its source. This page lists them all, and what this site is not.</p>
  <section class="card">
    <h3>Sources</h3>
    <div class="scroll-x"><table>
      <thead><tr><th>Figures</th><th>Source</th><th>Note</th></tr></thead>
      <tbody>${SOURCES.map((s) => '<tr><td>' + s.figure + '</td><td>' + s.source + '</td><td>' + s.note + '</td></tr>').join('')}</tbody>
    </table></div>
  </section>
  <div class="grid2">
    <section class="card">
      <h3>Methods</h3>
      <ul class="list">
        <li>Population figures are mid-year estimates unless marked census. The 2010 census counted 237.6 million people and the 2020 census counted 270.2 million.</li>
        <li>Growth rates are year on year. Inflation is the CPI period average from the IMF.</li>
        <li>Density is population divided by land area. Shares are rounded and may not add to exactly 100%.</li>
        <li>All charts are drawn in the browser from the data file in this folder. No figure is fetched from the internet.</li>
      </ul>
    </section>
    <section class="card">
      <h3>What this site is not</h3>
      <ul class="list">
        <li>It is not BPS and not a government site. It is an independent explorer built for the make.fun national statistics bounty.</li>
        <li>It does not copy another site's brand, text or images. The name NusaAngka, the design and the wording are original.</li>
        <li>It does not predict the future. Every number describes a year that has already happened, and the year is shown.</li>
      </ul>
      <p><a href="#/">Back to the Dashboard</a></p>
    </section>
  </div>`;
}
