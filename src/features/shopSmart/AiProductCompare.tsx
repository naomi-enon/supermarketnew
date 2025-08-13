import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AiProductCompareProps {
  onBack: () => void;
}

export default function AiProductCompare({ onBack }: AiProductCompareProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shop Smart
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-2">AI Product Compare</h2>
      <p className="text-slate-600 mb-4">
        Compare products intelligently using AI analysis of price, quality, nutrition, and customer reviews.
      </p>
      
      <div className="text-center py-12">
        <p className="text-slate-500">AI Product Compare feature coming soon...</p>
      </div>
    </div>
  );
}