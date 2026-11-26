import { POPULATION_SERIES, ISLANDS, GDP_SERIES, TRADE_SERIES, POVERTY_SERIES, UNEMPLOYMENT_SERIES, HDI_SERIES, PROVINCES } from './data.js';
import { drawBars, drawLine, drawDonut, drawHbars } from './charts.js';
import { viewHome, viewPopulation, viewEconomy, viewSocial, viewProvinces, viewAbout } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');

const state = {
  route: 'home',
  econMetric: 'growth',
  socialInd: 'hdi',
  query: '', island: 'All', sortKey: 'pop', sortDir: 'desc',
  selected: 'West Java', compareA: 'West Java', compareB: 'East Java',
};

const CHARTS = {
  popLine: (c) => drawLine(c, POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.pop })), { format: (v) => v.toFixed(1) + ' jt' }),
  islandDonut: (c) => drawDonut(c, ISLANDS.map((d) => ({ label: d.name, value: d.pop })), { center: '284.4 jt', centerSub: 'people, 2025', format: (v) => v.toFixed(1) + ' jt' }),
  gdpLine: (c) => drawLine(c, GDP_SERIES.map((d) => ({ label: String(d.year), value: d.growth })), { format: (v) => v.toFixed(2) + '%' }),
  inflationBars: (c) => drawBars(c, GDP_SERIES.map((d) => ({ label: String(d.year), value: d.inflation })), { format: (v) => v.toFixed(2) + '%' }),
  tradeBars: (c) => drawBars(c, TRADE_SERIES.flatMap((d) => [{ label: d.year + ' exp', value: d.exports }, { label: d.year + ' imp', value: d.imports }]), { format: (v) => '$' + v + ' bn', color: '#12836f' }),
  povertyLine: (c) => drawLine(c, POVERTY_SERIES.map((d) => ({ label: d.label, value: d.value })), { format: (v) => v.toFixed(2) + '%' }),
  unempLine: (c) => drawLine(c, UNEMPLOYMENT_SERIES.map((d) => ({ label: d.label, value: d.value })), { format: (v) => v.toFixed(2) + '%' }),
  hdiLine: (c) => drawLine(c, HDI_SERIES.map((d) => ({ label: String(d.year), value: d.hdi })), { format: (v) => v.toFixed(2) }),
  topProvinces: (c) => drawHbars(c, [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8).map((p) => ({ label: p.name, value: p.pop / 1000000 })), { format: (v) => v.toFixed(1) + ' jt' }),
  compareBars: (c) => {
    const a = PROVINCES.find((p) => p.name === state.compareA);
    const b = PROVINCES.find((p) => p.name === state.compareB);
    drawHbars(c, [{ label: a.name, value: a.pop / 1000000 }, { label: b.name, value: b.pop / 1000000 }], { format: (v) => v.toFixed(1) + ' jt people' });
  },
};

function drawAll() {
  document.querySelectorAll('canvas[data-chart]').forEach((c) => {
    const fn = CHARTS[c.getAttribute('data-chart')];
    if (fn) fn(c);
  });
}

function routeFromHash() {
  const h = (location.hash || '#/').replace(/^#\/?/, '');
  return ['penduduk', 'ekonomi', 'sosial', 'provinsi', 'tentang'].includes(h) ? h : 'home';
}

function render() {
  state.route = routeFromHash();
  let html = '';
  if (state.route === 'penduduk') html = viewPopulation();
  else if (state.route === 'ekonomi') html = viewEconomy(state);
  else if (state.route === 'sosial') html = viewSocial(state);
  else if (state.route === 'provinsi') html = viewProvinces(state);
  else if (state.route === 'tentang') html = viewAbout();
  else html = viewHome();
  app.innerHTML = html;
  document.querySelectorAll('#nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-nav') === state.route);
  });
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  drawAll();
  wire();
  window.scrollTo(0, 0);
}

function toCsv(rows) {
  const head = 'Province,Capital,Island,Population,Area km2,Density per km2';
  const lines = rows.map((p) => [p.name, p.capital, p.island, p.pop, p.area, p.density].join(','));
  return head + '\n' + lines.join('\n') + '\n';
}

function wire() {
  document.querySelectorAll('[data-econ]').forEach((b) => {
    b.addEventListener('click', () => { state.econMetric = b.getAttribute('data-econ'); render(); });
  });
  document.querySelectorAll('[data-social]').forEach((b) => {
    b.addEventListener('click', () => { state.socialInd = b.getAttribute('data-social'); render(); });
  });
  const q = document.getElementById('q');
  if (q) {
    q.addEventListener('input', () => { state.query = q.value; render(); const nq = document.getElementById('q'); nq.focus(); nq.setSelectionRange(nq.value.length, nq.value.length); });
  }
  const islandSel = document.getElementById('islandSel');
  if (islandSel) islandSel.addEventListener('change', () => { state.island = islandSel.value; render(); });
  document.querySelectorAll('[data-sort]').forEach((b) => {
    b.addEventListener('click', () => {
      const k = b.getAttribute('data-sort');
      if (state.sortKey === k) state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else { state.sortKey = k; state.sortDir = k === 'name' ? 'asc' : 'desc'; }
      render();
    });
  });
  document.querySelectorAll('#provTable tr[data-prov]').forEach((tr) => {
    tr.addEventListener('click', () => { state.selected = tr.getAttribute('data-prov'); render(); });
  });
  const cmpA = document.getElementById('cmpA');
  if (cmpA) cmpA.addEventListener('change', () => { state.compareA = cmpA.value; render(); });
  const cmpB = document.getElementById('cmpB');
  if (cmpB) cmpB.addEventListener('change', () => { state.compareB = cmpB.value; render(); });
  const csvBtn = document.getElementById('csvBtn');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      const qq = (state.query || '').toLowerCase();
      const rows = PROVINCES.filter((p) => (!qq || p.name.toLowerCase().includes(qq) || p.capital.toLowerCase().includes(qq)) && (state.island === 'All' || p.island === state.island));
      const blob = new Blob([toCsv(rows)], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'nusaangka-provinces.csv';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
}

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', render);
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawAll, 150);
});
render();
