export const PLANETS = [
  {
    id: 1,
    name: "Mercury",
    color: "#b5b5b5",
    emissive: "#555555",
    size: 1.2,
    orbitRadius: 5,
    orbitSpeed: 1.6,
    initialAngle: 0,
    content: `
      <h2 style="color:#b5b5b5;font-size:1.4rem;margin-bottom:12px;">☿ Mercury</h2>
      <p style="margin-bottom:8px;">The smallest planet in our solar system and closest to the Sun.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>57.9 million km</strong></li>
        <li>Diameter: <strong>4,879 km</strong></li>
        <li>Orbital period: <strong>88 days</strong></li>
        <li>Surface temp: <strong>-180°C to 430°C</strong></li>
        <li>Moons: <strong>0</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">Mercury has no atmosphere to retain heat, causing extreme temperature swings.</p>
    `,
  },
  {
    id: 2,
    name: "Venus",
    color: "#e8cda0",
    emissive: "#8a5c20",
    size: 0.9,
    orbitRadius: 8,
    orbitSpeed: 1.2,
    initialAngle: 1.0,
    content: `
      <h2 style="color:#e8cda0;font-size:1.4rem;margin-bottom:12px;">♀ Venus</h2>
      <p style="margin-bottom:8px;">The hottest planet in our solar system, shrouded in thick clouds.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>108.2 million km</strong></li>
        <li>Diameter: <strong>12,104 km</strong></li>
        <li>Orbital period: <strong>225 days</strong></li>
        <li>Surface temp: <strong>465°C</strong></li>
        <li>Moons: <strong>0</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">Venus rotates backwards compared to most planets — the Sun rises in the west.</p>
    `,
  },
  {
    id: 3,
    name: "Earth",
    color: "#4fa3e0",
    emissive: "#1a4a6e",
    size: 1.0,
    orbitRadius: 12,
    orbitSpeed: 1.0,
    initialAngle: 2.1,
    content: `
      <h2 style="color:#4fa3e0;font-size:1.4rem;margin-bottom:12px;">🌍 Earth</h2>
      <p style="margin-bottom:8px;">Our home — the only known planet to harbor life.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>149.6 million km</strong></li>
        <li>Diameter: <strong>12,756 km</strong></li>
        <li>Orbital period: <strong>365.25 days</strong></li>
        <li>Surface temp: <strong>-88°C to 58°C</strong></li>
        <li>Moons: <strong>1</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">71% of Earth's surface is covered by water — making it the "Blue Planet".</p>
    `,
  },
  {
    id: 4,
    name: "Mars",
    color: "#c1440e",
    emissive: "#5a1a05",
    size: 0.6,
    orbitRadius: 16,
    orbitSpeed: 0.8,
    initialAngle: 3.5,
    content: `
      <h2 style="color:#c1440e;font-size:1.4rem;margin-bottom:12px;">♂ Mars</h2>
      <p style="margin-bottom:8px;">The Red Planet — humanity's next frontier for exploration.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>227.9 million km</strong></li>
        <li>Diameter: <strong>6,792 km</strong></li>
        <li>Orbital period: <strong>687 days</strong></li>
        <li>Surface temp: <strong>-125°C to 20°C</strong></li>
        <li>Moons: <strong>2 (Phobos & Deimos)</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">Mars has the tallest volcano in the solar system — Olympus Mons at 21 km high.</p>
    `,
  },
  {
    id: 5,
    name: "Jupiter",
    color: "#c88b3a",
    emissive: "#5c3510",
    size: 2.2,
    orbitRadius: 22,
    orbitSpeed: 0.5,
    initialAngle: 0.8,
    content: `
      <h2 style="color:#c88b3a;font-size:1.4rem;margin-bottom:12px;">♃ Jupiter</h2>
      <p style="margin-bottom:8px;">The largest planet — a gas giant with a storm larger than Earth.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>778.5 million km</strong></li>
        <li>Diameter: <strong>139,820 km</strong></li>
        <li>Orbital period: <strong>11.9 years</strong></li>
        <li>Cloud temp: <strong>-145°C</strong></li>
        <li>Moons: <strong>95 known</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">The Great Red Spot is a storm that has lasted for over 350 years.</p>
    `,
  },
  {
    id: 6,
    name: "Saturn",
    color: "#e8d5a3",
    emissive: "#7a6030",
    size: 1.8,
    orbitRadius: 29,
    orbitSpeed: 0.35,
    initialAngle: 4.2,
    content: `
      <h2 style="color:#e8d5a3;font-size:1.4rem;margin-bottom:12px;">♄ Saturn</h2>
      <p style="margin-bottom:8px;">Famous for its stunning ring system made of ice and rock.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>1.43 billion km</strong></li>
        <li>Diameter: <strong>116,460 km</strong></li>
        <li>Orbital period: <strong>29.5 years</strong></li>
        <li>Cloud temp: <strong>-178°C</strong></li>
        <li>Moons: <strong>146 known</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">Saturn is the least dense planet — it would float on water!</p>
    `,
  },
  {
    id: 7,
    name: "Neptune",
    color: "#4b70dd",
    emissive: "#1a2d7a",
    size: 1.3,
    orbitRadius: 36,
    orbitSpeed: 0.2,
    initialAngle: 5.8,
    content: `
      <h2 style="color:#4b70dd;font-size:1.4rem;margin-bottom:12px;">♆ Neptune</h2>
      <p style="margin-bottom:8px;">The windiest planet — the most distant from the Sun.</p>
      <ul style="list-style:disc;padding-left:20px;line-height:1.8">
        <li>Distance from Sun: <strong>4.5 billion km</strong></li>
        <li>Diameter: <strong>49,528 km</strong></li>
        <li>Orbital period: <strong>165 years</strong></li>
        <li>Cloud temp: <strong>-218°C</strong></li>
        <li>Moons: <strong>16 known</strong></li>
      </ul>
      <p style="margin-top:12px;color:#999;">Winds on Neptune reach speeds of 2,100 km/h — the fastest in the solar system.</p>
    `,
  },
];
