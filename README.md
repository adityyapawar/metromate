# MetroMate
Independent Pune Metro companion (not an official Maha Metro app).
Run: `npm install && npm run dev` · Test: `npm test` · Build: `npm run build` (needs internet for Google Fonts: Inter, Geist).
Structure: app/ routes · components/ UI + Tour · lib/network.ts (all station data, sources, aliases) · lib/route.ts (Dijkstra engine + tests).
Update the network by editing lib/network.ts only. No environment variables needed.
Limits: no fares, timings, coordinates, facilities or live tracking (no verified data). Map is schematic. Logo is a placeholder vector (public/logo.svg); swap in the approved file.
