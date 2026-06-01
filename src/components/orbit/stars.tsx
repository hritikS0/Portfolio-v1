const stars = Array.from({ length: 60 }, (_, i) => ({
  left: ((i * 137.508) % 100),
  top: ((i * 97.3) % 100),
  size: (i % 3) * 0.5 + 0.5,
  opacity: ((i * 0.673) % 0.35) + 0.08,
}))

const constellations = [
  [0, 5],
  [5, 12],
  [12, 7],
  [7, 0],
  [3, 8],
  [8, 15],
  [15, 22],
  [22, 3],
  [1, 9],
  [9, 17],
  [17, 25],
  [25, 1],
  [2, 6],
  [6, 14],
  [14, 20],
  [4, 11],
  [11, 19],
  [19, 28],
  [10, 18],
  [18, 26],
  [13, 21],
  [21, 29],
]

export function Stars() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]">
        {constellations.map(([a, b], i) => {
          const from = stars[a]
          const to = stars[b]
          return (
            <line
              key={i}
              x1={`${from.left}%`}
              y1={`${from.top}%`}
              x2={`${to.left}%`}
              y2={`${to.top}%`}
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-accent"
            />
          )
        })}
      </svg>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-muted"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
