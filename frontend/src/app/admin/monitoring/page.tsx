'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { ShieldAlert, Server, RefreshCw } from 'lucide-react';
import ServiceStatusGrid from '@/components/monitoring/ServiceStatusGrid';
import ServerTelemetry from '@/components/monitoring/ServerTelemetry';
import StatusDistributionChart from '@/components/monitoring/StatusDistributionChart';

export default function AdminMonitoringPage() {
  const { currentUser, role, events, registrations, users } = useDemo();
  const [refreshing, setRefreshing] = useState(false);

  // Simulated metrics
  const [metrics, setMetrics] = useState({
    cpu: 24,
    memory: 58,
    latencies: { user: 45, event: 65, registration: 85, notification: 72 }
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMetrics({
        cpu: Math.floor(15 + Math.random() * 40),
        memory: Math.floor(50 + Math.random() * 15),
        latencies: {
          user: Math.floor(30 + Math.random() * 50),
          event: Math.floor(40 + Math.random() * 70),
          registration: Math.floor(50 + Math.random() * 80),
          notification: Math.floor(35 + Math.random() * 90)
        }
      });
      setRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(15 + Math.random() * 45),
        latencies: {
          user: Math.max(15, prev.latencies.user + Math.floor(Math.random() * 20 - 10)),
          event: Math.max(15, prev.latencies.event + Math.floor(Math.random() * 20 - 10)),
          registration: Math.max(15, prev.latencies.registration + Math.floor(Math.random() * 20 - 10)),
          notification: Math.max(15, prev.latencies.notification + Math.floor(Math.random() * 20 - 10))
        }
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Guard Clause
  if (!currentUser || role !== 'Admin') {
    return (
      <div className="flex flex-1 items-center justify-center p-8 bg-background">
        <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-border text-center space-y-6">
          <div className="h-14 w-14 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-7 w-7 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-white">Akses Dibatasi</h2>
          <p className="text-xs text-text-muted">
            Anda harus login sebagai Admin untuk mengakses halaman pemantauan sistem.
          </p>
          <Link
            href="/login"
            className="block w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all text-center"
          >
            Log In Sekarang
          </Link>
        </div>
      </div>
    );
  }

  // Calculate stats
  const activeEvents = events.filter(e => e.status === 'published').length;
  const finishedEvents = events.filter(e => e.status === 'finished').length;
  const draftEvents = events.filter(e => e.status === 'draft').length;

  return (
    <div className="mx-auto max-w-6xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Server className="h-8 w-8 text-primary" />
            Pemantauan Sistem & Layanan (System Monitoring)
          </h1>
          <p className="text-sm text-text-muted mt-2">
            Pantau status operasional kontainer microservice, telemetri server, latency API, dan tren data secara real-time.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-white hover:border-gray-500 flex items-center gap-1.5 transition-all self-start sm:self-auto disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Metrik
        </button>
      </div>

      {/* Latency / Service health widgets */}
      <ServiceStatusGrid latencies={metrics.latencies} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Telemetry metrics */}
        <ServerTelemetry cpu={metrics.cpu} memory={metrics.memory} />

        {/* Analytics & Data Distribution */}
        <div className="lg:col-span-2 glassmorphism rounded-2xl border border-border p-6 space-y-6">
          <h3 className="font-bold text-white text-base">Statistik Data Platform</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Numeric Indicators */}
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-surface/30 p-3 rounded-lg border border-border">
                <span className="text-xs text-text-muted">Total Pengguna Terdaftar</span>
                <span className="text-lg font-bold text-white">{users.length}</span>
              </div>
              <div className="flex justify-between items-center bg-surface/30 p-3 rounded-lg border border-border">
                <span className="text-xs text-text-muted">Total Kegiatan</span>
                <span className="text-lg font-bold text-white">{events.length}</span>
              </div>
              <div className="flex justify-between items-center bg-surface/30 p-3 rounded-lg border border-border">
                <span className="text-xs text-text-muted">Pendaftaran Aktif</span>
                <span className="text-lg font-bold text-white">{registrations.filter(r => r.status === 'registered').length}</span>
              </div>
            </div>

            {/* SVG Visual Chart */}
            <StatusDistributionChart
              totalEvents={events.length}
              draftEvents={draftEvents}
              activeEvents={activeEvents}
              finishedEvents={finishedEvents}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
