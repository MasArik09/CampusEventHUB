'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { Calendar, Award, Bell, ClipboardCheck, ArrowRight, ShieldAlert } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RegisteredEventItem from '@/components/dashboard/RegisteredEventItem';

export default function StudentDashboard() {
  const { currentUser, registrations, certificates, notifications, events } = useDemo();

  // Guard Clause
  if (!currentUser) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 bg-background">
        <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-border text-center space-y-6">
          <div className="h-14 w-14 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-7 w-7 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-white">Akses Dibatasi</h2>
          <p className="text-xs text-text-muted">
            Anda harus login sebagai Mahasiswa untuk melihat halaman dashboard ini.
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

  // User Stats
  const myRegistrations = registrations.filter(r => r.user_id === currentUser.id && r.status !== 'cancelled');
  const myCertificates = certificates.filter(c => c.user_id === currentUser.id);
  const myNotifications = notifications.filter(n => n.user_id === currentUser.id);
  const unreadNotifs = myNotifications.filter(n => !n.read);

  const upcomingRegistered = myRegistrations.filter(r => {
    const ev = events.find(e => e.id === r.event_id);
    return ev && ev.status === 'published';
  });

  const stats = [
    { label: 'Event Terdaftar', value: myRegistrations.length.toString(), icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Sertifikat Diperoleh', value: myCertificates.length.toString(), icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Notifikasi Baru', value: unreadNotifs.length.toString(), icon: Bell, color: 'text-rose-500', bg: 'bg-rose-500/10' }
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#161f30] to-[#0b0f19] p-6 rounded-2xl border border-border shadow-xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Selamat Datang, {currentUser.name}! 👋
          </h1>
          <p className="text-xs text-text-muted">
            Berikut ringkasan pendaftaran kegiatan dan sertifikat digital Anda di CampusEventHUB.
          </p>
        </div>
        <Link
          href="/events"
          className="glow-button inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-hover transition-all text-center self-start md:self-auto"
        >
          Cari Event Baru
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.color}
            bgColor={stat.bg}
          />
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Registered Events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Event Terdaftar Anda
            </h2>
            <Link href="/registrations" className="text-xs text-primary hover:underline">
              Lihat Riwayat
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingRegistered.length === 0 ? (
              <div className="rounded-2xl border border-border bg-surface/20 p-12 text-center text-xs text-text-muted">
                Anda belum terdaftar di kegiatan apa pun. Mulai jelajahi event kampus!
              </div>
            ) : (
              upcomingRegistered.map((reg) => {
                const event = events.find(e => e.id === reg.event_id);
                return (
                  <RegisteredEventItem
                    key={reg.id}
                    registration={reg}
                    event={event}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Recent Notifications */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary animate-bounce-slow" />
            Notifikasi Terbaru
          </h2>

          <div className="glassmorphism rounded-2xl border border-border p-4 space-y-3">
            {myNotifications.length === 0 ? (
              <div className="py-12 text-center text-xs text-text-muted">
                Tidak ada notifikasi baru.
              </div>
            ) : (
              myNotifications.slice(0, 4).map((n) => (
                <div key={n.id} className="p-3 border-b border-border/40 last:border-0 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${
                      n.type === 'success' ? 'text-success' :
                      n.type === 'warning' ? 'text-warning' : 'text-primary'
                    }`}>
                      {n.title}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {new Date(n.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
