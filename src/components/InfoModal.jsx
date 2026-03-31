export default function InfoModal({ planet, onClose }) {
  if (!planet) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ pointerEvents: "none" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        style={{ pointerEvents: "auto" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 rounded-2xl border shadow-2xl p-6 max-w-md w-full mx-4"
        style={{
          pointerEvents: "auto",
          background: "rgba(10, 10, 20, 0.92)",
          borderColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(16px)",
          boxShadow: `0 0 60px rgba(${hexToRgb(planet.color)}, 0.25), 0 25px 50px rgba(0,0,0,0.8)`,
          animation: "modalIn 0.25s ease-out",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl leading-none"
        >
          ✕
        </button>

        {/* Planet color indicator */}
        <div
          className="w-4 h-4 rounded-full mb-4 inline-block"
          style={{
            background: planet.color,
            boxShadow: `0 0 12px ${planet.color}`,
          }}
        />

        {/* HTML content */}
        <div
          className="text-gray-200 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: planet.content }}
        />
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
