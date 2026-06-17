'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo, CATEGORIES } from '@/context/DemoContext';
import { Calendar, Plus, Edit, Trash2, Eye, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function CommitteeEventsPage() {
  const { currentUser, role, events, publishEvent, finishEvent, deleteEvent } = useDemo();

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
            Anda harus login sebagai Panitia atau Admin untuk mengakses halaman manajemen kegiatan ini.
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

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="mx-auto max-w-6xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Kelola Kegiatan Kampus
          </h1>
          <p className="text-sm text-text-muted mt-2">
            Sebagai Panitia, Anda dapat membuat kegiatan baru, mengedit draf, mempublikasikan, dan menandai kegiatan selesai.
          </p>
        </div>
        <Link
          href="/committee/events/create"
          className="glow-button flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all text-center self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Buat Event Baru
        </Link>
      </div>

      {/* Events Table List */}
      {events.length === 0 ? (
        <div className="rounded-2xl border border-border bg-[#161f30]/20 p-16 text-center text-text-muted">
          Belum ada kegiatan yang dibuat. Klik tombol &ldquo;Buat Event Baru&rdquo; untuk memulai.
        </div>
      ) : (
        <div className="glassmorphism rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-[#161f30]/50 text-white font-bold">
                  <th className="p-4 sm:p-5">Judul Kegiatan</th>
                  <th className="p-4 sm:p-5">Kategori</th>
                  <th className="p-4 sm:p-5">Waktu Mulai</th>
                  <th className="p-4 sm:p-5">Peserta Terdaftar</th>
                  <th className="p-4 sm:p-5">Status</th>
                  <th className="p-4 sm:p-5 text-right">Aksi Manajemen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-text-muted">
                {events.map((event) => {
                  const category = CATEGORIES.find(c => c.id === event.category_id);
                  return (
                    <tr key={event.id} className="hover:bg-surface/25 transition-colors">
                      {/* Title */}
                      <td className="p-4 sm:p-5 font-semibold text-white">
                        <Link href={`/events/${event.id}`} className="hover:underline hover:text-primary">
                          {event.title}
                        </Link>
                        <p className="text-[10px] text-gray-500 mt-1">📍 {event.location}</p>
                      </td>

                      {/* Category */}
                      <td className="p-4 sm:p-5">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[9px] font-bold text-white"
                          style={{ backgroundColor: category?.color || '#f97316' }}
                        >
                          {category?.name || 'Event'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        {new Date(event.start_date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Participant Count */}
                      <td className="p-4 sm:p-5 font-semibold text-white">
                        {event.registeredCount} / {event.quota} Orang
                      </td>

                      {/* Status */}
                      <td className="p-4 sm:p-5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white capitalize ${
                          event.status === 'draft' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                          event.status === 'published' ? 'bg-primary/20 text-primary border border-primary/20' :
                          'bg-emerald-500/25 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {event.status === 'draft' ? 'Draft' :
                           event.status === 'published' ? 'Aktif (Published)' : 'Selesai'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Publish Action */}
                          {event.status === 'draft' && (
                            <button
                              onClick={() => publishEvent(event.id)}
                              className="rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white text-primary px-2.5 py-1.5 font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                              title="Publikasikan kegiatan"
                            >
                              <Send className="h-3 w-3" />
                              Publish
                            </button>
                          )}

                          {/* Finish Action */}
                          {event.status === 'published' && (
                            <button
                              onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menyelesaikan event ini? Hal ini akan otomatis menerbitkan sertifikat digital untuk semua peserta yang hadir.')) {
                                  finishEvent(event.id);
                                }
                              }}
                              className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 px-2.5 py-1.5 font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                              title="Tandai kegiatan selesai & terbitkan sertifikat"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              Selesaikan
                            </button>
                          )}

                          {/* Edit Action */}
                          {event.status !== 'finished' && (
                            <Link
                              href={`/committee/events/${event.id}/edit`}
                              className="rounded-lg bg-surface hover:bg-surface-hover border border-border text-white px-2.5 py-1.5 font-bold transition-colors inline-flex items-center gap-1"
                              title="Edit kegiatan"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Link>
                          )}

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="rounded-lg bg-danger/10 border border-danger/20 hover:bg-danger hover:text-white text-danger px-2.5 py-1.5 font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                            title="Hapus kegiatan"
                          >
                            <Trash2 className="h-3 w-3" />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
