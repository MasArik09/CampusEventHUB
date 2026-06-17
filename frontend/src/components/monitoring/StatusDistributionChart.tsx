import React from 'react';

interface StatusDistributionChartProps {
  totalEvents: number;
  draftEvents: number;
  activeEvents: number;
  finishedEvents: number;
}

export default function StatusDistributionChart({
  totalEvents,
  draftEvents,
  activeEvents,
  finishedEvents
}: StatusDistributionChartProps) {
  // Prevent division by zero
  const total = totalEvents || 1;

  return (
    <div className="space-y-2 flex flex-col items-center">
      <p className="text-[11px] font-bold text-text-muted text-center">DISTRIBUSI STATUS EVENT</p>
      
      {/* Simple Responsive SVG Chart */}
      <div className="w-full max-w-[200px] aspect-square relative flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Draft slice */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#f59e0b"
            strokeWidth="12"
            strokeDasharray={`${(draftEvents / total) * 251} 251`}
            strokeDashoffset="0"
          />
          {/* Published slice */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#f97316"
            strokeWidth="12"
            strokeDasharray={`${(activeEvents / total) * 251} 251`}
            strokeDashoffset={`-${(draftEvents / total) * 251}`}
          />
          {/* Finished slice */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#10b981"
            strokeWidth="12"
            strokeDasharray={`${(finishedEvents / total) * 251} 251`}
            strokeDashoffset={`-${((draftEvents + activeEvents) / total) * 251}`}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-xl font-bold text-white">{totalEvents}</p>
          <p className="text-[9px] text-text-muted uppercase">Event</p>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex gap-4 text-[10px] justify-center mt-2">
        <span className="flex items-center gap-1 text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-500" /> Draf ({draftEvents})
        </span>
        <span className="flex items-center gap-1 text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" /> Aktif ({activeEvents})
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Selesai ({finishedEvents})
        </span>
      </div>
    </div>
  );
}
