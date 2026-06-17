'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDemo, CATEGORIES } from '@/context/DemoContext';
import { ArrowLeft, Check, ShieldAlert } from 'lucide-react';

export default function CreateEventPage() {
  const { createEvent, currentUser, role } = useDemo();
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quota, setQuota] = useState(50);
  const [categoryId, setCategoryId] = useState(1);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Guard Clause
  if (!currentUser || (role !== 'Committee' && role !== 'Admin')) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 bg-background">
        <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-border text-center space-y-6">
          <div className="h-14 w-14 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-7 w-7 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-white">Akses Dibatasi</h2>
          <p className="text-xs text-text-muted">
            Anda tidak memiliki hak akses untuk membuat kegiatan baru.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !location || !startDate || !endDate || !quota) {
      setError('Semua kolom formulir wajib diisi.');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Tanggal mulai tidak boleh melebihi tanggal selesai kegiatan.');
      return;
    }

    if (quota <= 0) {
      setError('Kuota peserta harus bernilai positif (minimal 1).');
      return;
    }

    createEvent({
      title,
      description,
      location,
      start_date: startDate,
      end_date: endDate,
      quota,
      category_id: categoryId
    });

    setSuccess(true);
    setTimeout(() => {
      router.push('/committee/events');
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6 flex-1">
      {/* Back Link */}
      <Link
        href="/committee/events"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Kelola Event
      </Link>

      {/* Main card */}
      <div className="glassmorphism rounded-2xl border border-border p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Buat Kegiatan Baru</h2>
          <p className="mt-1 text-xs text-text-muted">
            Isi formulir secara lengkap untuk mendaftarkan draf kegiatan Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/10 border border-danger/30 p-3 text-xs text-danger flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-success/10 border border-success/30 p-3 text-xs text-success flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>Draf kegiatan berhasil dibuat! Mengalihkan ke manajemen event...</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-text-muted">Judul Kegiatan</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="cth: Seminar Nasional Perkembangan Web"
                className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="text-xs font-semibold text-text-muted">Kategori Kegiatan</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value))}
                className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-text-muted">Deskripsi Kegiatan</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tulis detail deskripsi kegiatan, materi, persyaratan, benefit..."
                rows={5}
                className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-text-muted">Lokasi / Media Kegiatan</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="cth: Auditorium Gedung Utama / Online Zoom Link"
                className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Date-time range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-text-muted">Tanggal/Waktu Mulai</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted">Tanggal/Waktu Selesai</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Quota */}
            <div>
              <label className="text-xs font-semibold text-text-muted">Kuota Peserta</label>
              <input
                type="number"
                value={quota}
                onChange={(e) => setQuota(parseInt(e.target.value) || 0)}
                placeholder="cth: 100"
                className="block w-full rounded-xl border border-border bg-surface py-3 px-3 mt-1 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Link
              href="/committee/events"
              className="rounded-xl border border-border bg-transparent hover:border-gray-500 text-xs font-bold text-white px-5 py-3 transition-colors text-center"
            >
              Batalkan
            </Link>
            <button
              type="submit"
              className="glow-button rounded-xl bg-primary hover:bg-primary-hover text-xs font-bold text-white px-5 py-3 shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              Simpan Draf
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
