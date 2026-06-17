import React from 'react';

interface ServiceStatusGridProps {
  latencies: {
    user: number;
    event: number;
    registration: number;
    notification: number;
  };
}

export default function ServiceStatusGrid({ latencies }: ServiceStatusGridProps) {
  const services = [
    { name: 'USER SERVICE', port: 8001, db: 'SQLite', latency: latencies.user },
    { name: 'EVENT SERVICE', port: 8002, db: 'SQLite', latency: latencies.event },
    { name: 'REGISTRATION SERVICE', port: 8003, db: 'SQLite', latency: latencies.registration },
    { name: 'NOTIFICATION SERVICE', port: 8004, db: 'SQLite', latency: latencies.notification }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {services.map((srv, idx) => (
        <div key={idx} className="glassmorphism p-5 rounded-2xl space-y-3 border border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">{srv.name}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">
              {srv.latency} <span className="text-xs text-text-muted">ms</span>
            </p>
            <span className="text-[10px] text-text-muted">Port {srv.port} ({srv.db})</span>
          </div>
          <div className="w-full bg-border rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (srv.latency / 150) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
