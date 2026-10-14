# BMKG Watch

BMKG Watch is a modern, responsive, and lightweight web portal for monitoring real-time weather, climate, and seismic earthquake activity across Indonesia. The application consumes open data directly from the Indonesian Agency for Meteorology, Climatology, and Geophysics (BMKG) and the Indonesia Tsunami Early Warning System (InaTEWS).

---

## Overview

BMKG Watch provides instant access to authoritative public data without the performance bottlenecks often observed on legacy portals during national emergencies. Built as a client-side Single Page Application (SPA), it emphasizes speed, high readability, and reliable geospatial visualization.

---

## Key Features

- **Integrated Monitoring Dashboard**:
  - Live 3-hour interval weather forecasts for major Indonesian metropolitan centers with dynamic regional timezones.
  - Real-time latest earthquake alert card featuring magnitude severity badges, hypocenter depth, coordinates, clean timestamp, tsunami threat advisories, and an interactive flat Shakemap modal.
- **Unified Interactive GIS Map**:
  - A single Leaflet map canvas rendering all seismic events: latest event, 15 events with Magnitude >= 5.0, and 15 felt tremors reported across Indonesia.
  - Custom flat square markers (`30x30px`, `border-radius: 0px`) and customized zero-radius Leaflet popups with structured metadata.
  - Dynamic filter controls (All Earthquakes, M 5.0+, Felt).
  - Smooth camera transitions (fly-to) triggered directly by clicking any item in the seismic history feed.
- **Detailed Weather Forecast for 140+ Regions**:
  - Direct integration with BMKG's official REST JSON API using 4th-level administrative boundary codes (ADM4).
  - Dynamic 3-zone regional timezone localization (WIB / WITA / WIT) based on BMKG region metadata.
  - 3-day forecasts grouped by date with localized day labels.
  - Comprehensive meteorological readings: ambient temperature (Celsius), relative humidity (%), wind speed (km/h), and cardinal wind directions.
  - Automatic daytime vs. nighttime indicators and flat Lucide vector condition icons.
- **Flat Accent Design System**:
  - High-contrast geometric interface utilizing zero-radius borders (`rounded-none`), flat map controls, native `<select>` form controls, and clean semantic typography for effortless data scanning.

---

## Project Documentation

Detailed project architecture and requirement documents are available in the `docs/` directory:

- [Product Requirements Document (PRD)](./docs/PRD.md): Product vision, user personas, functional specifications, edge cases, and phased roadmap.
- [System Architecture & Technical Design](./docs/ARCHITECTURE.md): High-level system diagrams, API integration layer, component hierarchy, and bundling strategies.
- [Technical Evaluation & Gap Analysis](./docs/EVALUATION.md): Code quality audit, build performance benchmarks, identified gaps, and prioritized action plan.

---

## Tech Stack

- **Frontend Core**: React 18, TypeScript 5, React Router DOM v6
- **Build Tool**: Vite 5 with SWC plugin (@vitejs/plugin-react-swc)
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **UI Components & Icons**: Material Tailwind React, Lucide React Icons (react-icons/lu)
- **Geospatial Mapping**: Leaflet, React Leaflet
- **Carousels & Sliders**: Swiper 11
- **Code Quality**: ESLint, Prettier

---

## Getting Started

### Prerequisites

- Node.js version 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build

Compile TypeScript and generate an optimized production bundle:

```bash
npm run build
```

### Preview

Locally test the production build output:

```bash
npm run preview
```

### Code Quality & Linting

Run ESLint and Prettier to verify code standards:

```bash
npm run lint
```

To automatically fix formatting and lint errors:

```bash
npm run lint:fix
```

---

## Data Attribution

This project is powered by open public data provided by:

1. Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) — https://www.bmkg.go.id/
2. Indonesia Tsunami Early Warning System (InaTEWS) — https://inatews.bmkg.go.id/
3. OpenStreetMap Contributors — https://www.openstreetmap.org/

Notice: BMKG Watch is developed independently to enhance public access to open data and is not officially affiliated with or endorsed by BMKG.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.