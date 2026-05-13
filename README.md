# Cloth & Crown — MVP Prototype

A turn-based historical strategy game set in 13th-century Bruges. This is the **MVP prototype** (Phase 1): one playable city, seasonal turn loop, six buildings, resource chains, event log, LocalStorage persistence. No dynasty, diplomacy, or warfare yet — those come in later phases.

## Stack

- React 18 + TypeScript
- Vite (build tool, dev server)
- Zustand + `persist` middleware (state + LocalStorage)
- Tailwind CSS

Browser-only. No backend, no auth, no cloud DB.

## Project structure

```
cloth-and-crown/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx                  # React entry
    ├── App.tsx                   # Top-level layout
    ├── components/
    │   ├── TopBar.tsx            # Resource readout + season/year
    │   ├── CityGrid.tsx          # 4×4 grid host
    │   ├── Tile.tsx              # Individual grid cell
    │   ├── BuildingPicker.tsx    # Sidebar building menu
    │   ├── EventLog.tsx          # Chronicle / event log
    │   ├── Sidebar.tsx           # Wraps picker + log
    │   └── EndTurnButton.tsx     # Bottom action bar
    ├── systems/
    │   ├── seasonSystem.ts       # Season order, winter detection
    │   ├── productionSystem.ts   # Per-building production / consumption
    │   ├── consumptionSystem.ts  # Per-capita food, winter doubling
    │   └── turnSystem.ts         # Orchestrates the turn
    ├── store/
    │   └── gameStore.ts          # Zustand store + LocalStorage persist
    ├── data/
    │   ├── buildings.ts          # Building definitions (costs, output)
    │   └── initialState.ts       # Starting state (Spring 1200, Bruges)
    ├── types/
    │   └── index.ts              # All TypeScript interfaces
    └── styles/
        └── index.css             # Tailwind + custom layers
```

## Architecture notes

**Single Zustand store.** Resources, grid, log, and current selection all live in one normalized store. `persist` middleware writes to LocalStorage under the key `cloth-and-crown-save`.

**Systems are pure functions.** `runProduction`, `runConsumption`, `processTurn`, `nextSeason` all take state and return new state. The store calls them; they don't touch the store. This makes the turn flow trivially testable and easy to extend.

**Turn pipeline** (in `turnSystem.ts`):
1. `runProduction` — every placed building produces or converts; outdoor buildings (farm, woodcutter, quarry) idle in winter
2. `runConsumption` — per-capita food (population ÷ 20 normal, ÷ 10 winter); empty granary triggers famine, population −5
3. Log entries from both phases are time-stamped and prepended to the chronicle
4. Season advances; if winter rolls over, year increments and a banner entry is added

**Building costs.** Every building costs gold; weavery, market, and quarry also consume wood and/or stone at construction. This was a small extension to the spec to give the opening turns economic decisions instead of free placement.

**Per-capita food.** At 100 population, normal seasons consume 5 food and winter consumes 10 — matching the spec exactly. Population growth or decline now scales food pressure.

## Setup — Firebase Studio

Firebase Studio is a cloud IDE; treat it like any Node.js workspace.

1. Create a new workspace (blank or Node template)
2. Drop the contents of the zip in at the project root
3. Open a terminal in the workspace
4. Run:

```bash
npm install
npm run dev
```

5. Firebase Studio will surface a preview URL — open it. The game lives there.

To build for production:

```bash
npm run build
npm run preview
```

## Setup — local

```bash
git init  # optional
npm install
npm run dev
```

Vite defaults to `http://localhost:5173`.

## Save / load

State auto-saves to LocalStorage on every change. Refresh the tab and your city is intact. *Begin Anew* in the footer clears the save and resets to Spring 1200.

## Known shape of the next phase

The store interface, types, and folder structure are deliberately set up so the next phase additions slot in cleanly:

- A second city is one more entry in a `cities` map and a small UI toggle
- Dynasty characters get their own slice in the store and their own systems folder
- Scripted historical events plug into the `processTurn` pipeline after consumption

No phase-2 code is included in this build.
