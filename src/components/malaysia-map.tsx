import map from "@/data/malaysia-map.json";
import {
  projectLocations,
  projectsSince,
  stateNames,
  type StateCode,
} from "@/data/project-locations";

type MapData = {
  W: number;
  H: number;
  paths: Record<string, string>;
  cent: Record<string, number[] | string>;
};
const m = map as MapData;

/** Malaysia map with an orange bubble per state sized by project count, plus a per-state list. */
export function MalaysiaMap() {
  const rows = (Object.entries(projectLocations) as [StateCode, number][])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  if (rows.length === 0) return null;
  const total = rows.reduce((t, [, n]) => t + n, 0);

  return (
    <section className="mt-8 grid gap-6 rounded-3xl bg-surface p-5 ring-1 ring-line md:p-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Where we&apos;ve worked
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
          Projects across Malaysia since {projectsSince}
        </h2>
        <svg
          viewBox={`-10 -40 ${m.W + 20} ${m.H + 60}`}
          className="mt-4 w-full"
          role="img"
          aria-label="Map of Malaysia showing projects by state"
        >
          {Object.entries(m.paths).map(([code, d]) => (
            <path
              key={code}
              d={d}
              fill={code in projectLocations ? "#c9c5ef" : "#e9e7f3"}
              stroke="#fff"
              strokeWidth={1.2}
            />
          ))}
          {rows.map(([code, n]) => {
            const [x, y] = m.cent[code] as number[];
            const r = 14 + Math.sqrt(n) * 3.2;
            return (
              <g key={code}>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="#ea580c"
                  fillOpacity={0.92}
                  stroke="#fff"
                  strokeWidth={3}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fontSize={18}
                  fontWeight={700}
                  fill="#fff"
                >
                  {n}
                </text>
                <text
                  x={x}
                  y={y - r - 10}
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight={700}
                  fill="#1c1a3a"
                  stroke="#fff"
                  strokeWidth={5}
                  paintOrder="stroke"
                >
                  {stateNames[code]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <div className="rounded-2xl bg-brand-ink p-6 text-white">
          <p className="text-sm text-white/70">
            Total projects since {projectsSince}
          </p>
          <p className="tabular mt-1 text-5xl font-semibold">{total}</p>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {rows.map(([code, n]) => (
            <li key={code} className="flex items-center justify-between py-3">
              <span className="flex items-center gap-2.5 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                {stateNames[code]}
              </span>
              <span className="tabular text-lg font-semibold">
                {n}{" "}
                <span className="text-sm font-normal text-muted">
                  project{n > 1 ? "s" : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
