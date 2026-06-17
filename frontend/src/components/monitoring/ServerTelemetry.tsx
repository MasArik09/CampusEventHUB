import React from 'react';
import { Activity, Cpu, HardDrive } from 'lucide-react';

interface ServerTelemetryProps {
  cpu: number;
  memory: number;
}

export default function ServerTelemetry({ cpu, memory }: ServerTelemetryProps) {
  return (
    <div className="glassmorphism rounded-2xl border border-border p-6 space-y-6">
      <h3 className="font-bold text-white text-base flex items-center gap-1.5">
        <Activity className="h-5 w-5 text-primary" />
        Telemetri Server Utama
      </h3>

      <div className="space-y-4">
        {/* CPU */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-text-muted flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              Beban CPU
            </span>
            <span className="text-white font-bold">{cpu}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${cpu}%` }}
            />
          </div>
        </div>

        {/* RAM */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-text-muted flex items-center gap-1">
              <HardDrive className="h-4 w-4" />
              Penggunaan RAM
            </span>
            <span className="text-white font-bold">{memory}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${memory}%` }}
            />
          </div>
        </div>

        {/* Info DB */}
        <div className="border-t border-border/60 pt-4 text-xs space-y-2">
          <div className="flex justify-between text-[11px] text-text-muted">
            <span>Database Engine:</span>
            <span className="text-white font-bold">SQLite v3.x (Development)</span>
          </div>
          <div className="flex justify-between text-[11px] text-text-muted">
            <span>Active RabbitMQ Queues:</span>
            <span className="text-emerald-400 font-bold">4 Queues (Connected)</span>
          </div>
          <div className="flex justify-between text-[11px] text-text-muted">
            <span>GraphQL Gateway:</span>
            <span className="text-primary font-bold">Hasura GraphQL Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
