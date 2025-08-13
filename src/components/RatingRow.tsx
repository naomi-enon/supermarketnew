import React from "react";

type Props = {
  average?: number | null;
  count?: number | null;
  onClick?: () => void;
};

// Always renders 5 symbols, supports 0.5 rounding. Shows "No reviews yet" when count is 0/null.
export default function RatingRow({ average = 0, count = 0, onClick }: Props) {
  const rounded = Math.round((average || 0) * 2) / 2;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const pos = i + 1;
    const isFull = rounded >= pos;
    const isHalf = !isFull && rounded + 0.5 >= pos;
    return (
      <span key={i} aria-hidden="true" className="text-amber-500 text-lg leading-none">
        {isFull ? "★" : isHalf ? "⯨" : "☆"}
      </span>
    );
  });

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Average rating ${average || 0} out of 5`}
      aria-haspopup="dialog"
      className="mt-2 w-full text-left flex items-center gap-2 text-slate-700 hover:text-slate-900"
    >
      <span>{stars}</span>
      {count && count > 0 ? (
        <span className="text-sm">{(average || 0).toFixed(1)} ({count})</span>
      ) : (
        <span className="text-sm text-slate-500">No reviews yet</span>
      )}
    </button>
  );
}