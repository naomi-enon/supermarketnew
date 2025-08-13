import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { products } from "../../data/products"; // adjust path if needed

type Product = typeof products[number];

export default function AiReviewSummary() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const handleAnalyze = (p?: Product) => {
    const picked = p ?? suggestions[0] ?? null;
    setLoading(true);
    // tiny delay so UI shows a state change; no real API
    setTimeout(() => {
      setSelected(picked);
      setLoading(false);
    }, 200);
  };

  // helpers
  const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0);
  const verdictText = (avg: number, count: number, br: Record<string, number>) => {
    const total = Math.max(count, Object.values(br || {}).reduce((a, b) => a + b, 0));
    const hi = pct((br?.["5"] || 0) + (br?.["4"] || 0), total);
    if (count === 0 && total === 0) return "No reviews yet.";
    if (avg >= 4.3 && count >= 10) return `Shoppers consistently rate this highly — ${hi}% are 4–5★.`;
    if (avg >= 3.6) return "Generally positive with some mixed feedback.";
    if (avg > 0) return "Mixed to negative; consider alternatives if you value consistency.";
    return "No reviews yet.";
  };

  const extractProsCons = (p: Product) => {
    const br = p.ratingBreakdown ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const count = p.ratingCount ?? 0;
    const total = Math.max(count, Object.values(br).reduce((a, b) => a + b, 0));
    const hasWritten = Array.isArray((p as any).reviews) && (p as any).reviews.length > 0;

    const pros: string[] = [];
    const cons: string[] = [];

    if (hasWritten) {
      // very light heuristic over review text
      const POS = ["fresh","tasty","flavor","quality","value","texture","price","color","crisp","moist","thick","clean","convenient","packaging"];
      const NEG = ["bones","salty","soft","sour","stale","thin","pricey","inconsistent","broken","leak","bruised","smelly"];

      const txt = ((p as any).reviews as { text: string; stars: number }[])
        .map(r => r.text.toLowerCase()).join(" ");

      const pickTop = (words: string[], n: number) => {
        const counts: Record<string, number> = {};
        words.forEach(w => {
          const re = new RegExp(`\\b${w}\\b`, "g");
          const m = txt.match(re);
          if (m) counts[w] = m.length;
        });
        return Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, n)
          .map(([w]) => w);
      };

      pros.push(...pickTop(POS, 5));
      cons.push(...pickTop(NEG, 5));
    }

    // fallbacks from star distribution
    const high = pct((br["5"] || 0) + (br["4"] || 0), total);
    const low  = pct((br["1"] || 0) + (br["2"] || 0) + (br["3"] || 0), total);
    if (pros.length === 0 && high >= 60) pros.push("Many 4–5★ ratings");
    if (cons.length === 0 && low >= 40) cons.push("Noticeable 1–3★ feedback");

    return { pros: Array.from(new Set(pros)).slice(0, 5), cons: Array.from(new Set(cons)).slice(0, 5) };
  };

  const renderSummary = () => {
    if (!selected) return null;
    const avg = +(selected.ratingAverage ?? 0).toFixed(1);
    const count = selected.ratingCount ?? 0;
    const br = selected.ratingBreakdown ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const total = Math.max(count, Object.values(br).reduce((a, b) => a + b, 0));
    const { pros, cons } = extractProsCons(selected);

    const reviews = ((selected as any).reviews as { stars: number; text: string }[]) || [];

    return (
      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <div className="flex items-center gap-3">
          <div className="text-amber-500">
            {"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}
          </div>
          <div className="text-lg font-semibold">{avg}/5</div>
          <div className="text-sm text-slate-600">({count} reviews)</div>
        </div>

        <p className="mt-2 text-slate-700">{verdictText(avg, count, br)}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium mb-2">Pros</div>
            {pros.length > 0 ? (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            ) : <div className="text-sm text-slate-500">No clear pros yet.</div>}
          </div>
          <div>
            <div className="font-medium mb-2">Cons</div>
            {cons.length > 0 ? (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            ) : <div className="text-sm text-slate-500">No clear cons yet.</div>}
          </div>
        </div>

        <div className="mt-6">
          <div className="font-medium mb-2">Recent reviews</div>
          {reviews.length > 0 ? (
            <div className="space-y-2">
              {reviews.slice(0,5).map((r, i) => (
                <div key={i} className="text-sm">
                  <span className="text-amber-500 mr-2">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</span>
                  <span className="text-slate-800">{r.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-500">No written reviews available.</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="text-2xl font-bold mb-2">AI Review Summary</h2>
      <p className="text-slate-600 mb-4">
        Type a product name and get a quick AI-style overview of real customer feedback.
      </p>

      {/* Search bar */}
      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleAnalyze(); }}
          placeholder="What product are you looking for? (e.g., King Salmon Fillet)"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          onClick={() => handleAnalyze()}
          disabled={loading}
          className="rounded-lg bg-emerald-600 text-white px-4 py-3 hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Analyzing…" : "Summarize"}
        </button>
      </div>

      {/* Suggestions */}
      {query && suggestions.length > 0 && (
        <div className="mt-2 rounded-lg border border-slate-200 bg-white shadow-sm">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleAnalyze(s)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50"
            >
              {s.name} {s.size ? `— ${s.size}` : ""}
            </button>
          ))}
        </div>
      )}

      {/* Selected product title */}
      {selected && (
        <div className="mt-6">
          <div className="text-lg font-semibold">{selected.name} {selected.size ? `• ${selected.size}` : ""}</div>
        </div>
      )}

      {renderSummary()}
    </div>
  );
}