function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function InfoPanel({ planet }) {
  return (
    <div
      className="absolute top-6 right-6 z-10 w-80 rounded-2xl border p-6 pointer-events-none"
      style={{
        background: "rgba(10, 10, 20, 0.85)",
        borderColor: planet
          ? `rgba(${hexToRgb(planet.color)}, 0.4)`
          : "rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
        boxShadow: planet
          ? `0 0 40px rgba(${hexToRgb(planet.color)}, 0.15), 0 20px 40px rgba(0,0,0,0.6)`
          : "0 20px 40px rgba(0,0,0,0.4)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {planet ? (
        <div
          key={planet.id}
          className="text-gray-200 text-sm leading-relaxed"
          style={{ animation: "panelFadeIn 0.3s ease-out" }}
          dangerouslySetInnerHTML={{ __html: planet.content }}
        />
      ) : (
        <div className="text-center py-4" style={{ animation: "panelFadeIn 0.3s ease-out" }}>
          <div className="text-gray-500 text-3xl mb-3">🪐</div>
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            Click a planet
          </p>
          <p className="text-gray-600 text-xs mt-1">to view information</p>
        </div>
      )}

      <style>{`
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
