'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDemo, CATEGORIES } from '@/context/DemoContext';
import { Calendar, MapPin, Users, ArrowLeft, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { events, currentUser, registrations, registerForEvent } = useDemo();

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Event Tidak Ditemukan</h2>
        <p className="text-text-muted text-xs">Kegiatan yang Anda cari tidak ada atau telah dihapus.</p>
        <Link href="/events" className="inline-block rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white">
          Kembali ke Daftar Event
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === event.category_id);
  const remainingQuota = event.quota - event.registeredCount;
  const isFull = remainingQuota <= 0;

  // Check registration status if logged in
  const myReg = currentUser
    ? registrations.find(r => r.event_id === event.id && r.user_id === currentUser.id && r.status !== 'cancelled')
    : null;

  const handleRegister = async () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setMessage(null);

    // Simulate Network Request Delay
    setTimeout(() => {
      const res = registerForEvent(event.id);
      if (res.success) {
        setMessage({ type: 'success', text: res.message });
      } else {
        setMessage({ type: 'error', text: res.message });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 flex-1">
      {/* Back Button */}
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar Event
      </Link>

      {/* Main Detail Card */}
      <div className="glassmorphism rounded-2xl border border-border overflow-hidden">
        {/* Banner Decoration */}
        <div className="h-48 sm:h-64 w-full bg-gradient-to-br from-[#161f30] to-[#0b0f19] relative flex items-center justify-center border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_70%)]" />
          <span
            className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
            style={{ backgroundColor: category?.color || '#f97316' }}
          >
            {category?.name || 'Kegiatan'}
          </span>
          <div className="text-center p-6 space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border bg-[#161f30]/20">
          <div className="p-5 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-border">
            <Calendar className="h-5 w-5 text-primary" />
            <div className="text-xs">
              <p className="font-semibold text-white">Waktu Pelaksanaan</p>
              <p className="text-text-muted mt-0.5">
                {new Date(event.start_date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-[10px] text-gray-500">
                {new Date(event.start_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
              </p>
            </div>
          </div>
          <div className="p-5 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-border">
            <MapPin className="h-5 w-5 text-rose-500" />
            <div className="text-xs">
              <p className="font-semibold text-white">Lokasi/Platform</p>
              <p className="text-text-muted mt-0.5 truncate max-w-[200px]" title={event.location}>
                {event.location}
              </p>
            </div>
          </div>
          <div className="p-5 flex items-center gap-3">
            <Users className="h-5 w-5 text-emerald-500" />
            <div className="text-xs">
              <p className="font-semibold text-white">Kuota Peserta</p>
              <p className="text-text-muted mt-0.5">
                {event.registeredCount} / {event.quota} Orang
              </p>
              <p className="text-[10px] text-gray-500">
                Sisa Slot: {remainingQuota > 0 ? remainingQuota : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base">Deskripsi Kegiatan</h3>
            <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          <div className="border-t border-border/60 pt-6">
            {/* Feedback Message */}
            {message && (
              <div className={`rounded-xl border p-4 mb-4 flex items-start gap-2 text-xs ${
                message.type === 'success'
                  ? 'bg-success/10 border-success/30 text-success'
                  : 'bg-danger/10 border-danger/30 text-danger'
              }`}>
                {message.type === 'success' ? <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" /> : <ShieldAlert className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                <div>
                  <p className="font-semibold">{message.type === 'success' ? 'Berhasil!' : 'Gagal!'}</p>
                  <p className="mt-0.5">{message.text}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-text-muted flex items-center gap-1.5">
                <Info className="h-4 w-4 text-primary" />
                <span>Setelah terdaftar, pantau email/notifikasi Anda untuk info link absensi.</span>
              </div>

              {myReg ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <span className="rounded-xl bg-success/15 border border-success/30 text-success text-xs font-bold px-4 py-3 text-center flex items-center gap-1.5 justify-center">
                    <CheckCircle className="h-4 w-4" />
                    Anda Sudah Terdaftar
                  </span>
                  <Link
                    href="/registrations"
                    className="rounded-xl bg-surface hover:bg-surface-hover border border-border text-xs font-bold text-white px-4 py-3 text-center transition-colors"
                  >
                    Lihat Pendaftaran
                  </Link>
                </div>
              ) : isFull ? (
                <button
                  disabled
                  className="rounded-xl bg-gray-800 text-gray-500 border border-gray-700 text-xs font-bold px-6 py-3 cursor-not-allowed text-center"
                >
                  Kuota Pendaftaran Penuh
                </button>
              ) : event.status === 'finished' ? (
                <button
                  disabled
                  className="rounded-xl bg-gray-800 text-gray-500 border border-gray-700 text-xs font-bold px-6 py-3 cursor-not-allowed text-center"
                >
                  Kegiatan Telah Selesai
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="glow-button rounded-xl bg-primary hover:bg-primary-hover text-xs font-bold text-white px-6 py-3.5 shadow-lg shadow-primary/20 text-center cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Mendaftarkan...' : currentUser ? 'Daftar Event Sekarang' : 'Login untuk Mendaftar'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
