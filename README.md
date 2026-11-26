# NusaAngka, Indonesia in Numbers

[![make.fun bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sendycrypto67-lgtm/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sendycrypto67-lgtm/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A working national statistics site for Indonesia, built for the make.fun bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539). It runs fully offline, with no framework and no build step: static files in `app/` that open in desktop Chrome and on a phone.

## What the site does

- **Dashboard** (`#/`): eight key figures for 2025, population growth 2010 to 2025, population by island group, GDP growth, and the latest releases.
- **Population** (`#/penduduk`): growth chart, island donut, and a bar chart of the eight largest provinces.
- **Economy** (`#/ekonomi`): a working chart switcher for GDP growth, inflation and exports plus imports, with full 2021 to 2025 tables.
- **People** (`#/sosial`): a working indicator switcher for the Human Development Index, poverty and unemployment, plus the four HDI components.
- **Provinces** (`#/provinsi`): the largest 11 provinces with working search, island filter, column sorting, click for detail, a two-province comparison, and a CSV download of the filtered table.
- **Sources** (`#/tentang`): every source, the methods, and what the site is not.

Every figure is real and dated: population 284.4 million in 2025, GDP Rp23,821.1 trillion in 2025, growth 5.11%, inflation 1.91%, poverty 8.25% in September 2025, unemployment 4.85% in August 2025, HDI 75.90 in 2025. Sources are BPS (Statistics Indonesia), the World Bank and the IMF, listed on the Sources page. NusaAngka is an independent explorer and is not affiliated with BPS, the World Bank or the IMF.

## Structure

- `app/index.html`: page shell and navigation
- `app/style.css`: all styling, including the phone layout
- `app/data.js`: every figure, with year and source notes
- `app/charts.js`: canvas bar, line, donut and horizontal bar charts
- `app/views.js`: the HTML of each page
- `app/main.js`: hash router, state, and every control
- `main.ts`: the hand-in program (copies `app/` and `screenshots/` to `/output`, writes `dossier.json`)
- `serve.ts`: a small static server for local development
- `screenshots/`: 4 screenshots, real renders of this site

## Run locally

```sh
node serve.ts
```

Then open http://localhost:8080 in a browser.

## License

MIT, see `LICENSE`.
