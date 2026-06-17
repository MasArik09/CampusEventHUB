'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { Users, CheckCircle, XCircle, Clock, ShieldAlert, Filter } from 'lucide-react';

export default function CommitteeParticipantsPage() {
  const { currentUser, role, registrations, events, markAttendance } = useDemo();
  const [selectedEventId, setSelectedEventId] = useState<string>('all');

  // Filter events to only active/published or finished ones that have registrations
  const relevantEvents = useMemo(() => {
    return events.filter(e => e.status !== 'draft');
  }, [events]);

  // Filter registrations by selected event
  const filteredRegs = useMemo(() => {
    let list = registrations.filter(r => r.status !== 'cancelled');
    if (selectedEventId !== 'all') {
      list = list.filter(r => r.event_id === selectedEventId);
    }
    return list;
  }, [registrations, selectedEventId]);

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
            Anda harus login sebagai Panitia atau Admin untuk mengelola kehadiran peserta.
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

  return (
    <div className="mx-auto max-w-6xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Users className="h-8 w-8 text-primary animate-pulse-slow" />
          Kelola Peserta & Kehadiran
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Tandai kehadiran (presensi) mahasiswa pada kegiatan aktif. Data kehadiran digunakan untuk menerbitkan sertifikat digital.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-surface/30 p-4 rounded-xl border border-border">
        <label className="text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap">
          <Filter className="h-4 w-4 text-primary" />
          Saring Kegiatan:
        </label>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-white focus:border-primary focus:outline-none cursor-pointer"
        >
          <option value="all">Semua Kegiatan Aktif</option>
          {relevantEvents.map(e => (
            <option key={e.id} value={e.id}>{e.title}</option>
          ))}
        </select>
      </div>

      {/* Participants Table */}
      {filteredRegs.length === 0 ? (
        <div className="rounded-2xl border border-border bg-[#161f30]/20 p-16 text-center text-text-muted">
          Tidak ada peserta terdaftar untuk kriteria penyaringan ini.
        </div>
      ) : (
        <div className="glassmorphism rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-[#161f30]/50 text-white font-bold">
                  <th className="p-4 sm:p-5">Nama Peserta</th>
                  <th className="p-4 sm:p-5">Email</th>
                  <th className="p-4 sm:p-5">Nama Kegiatan</th>
                  <th className="p-4 sm:p-5">Waktu Registrasi</th>
                  <th className="p-4 sm:p-5">Status Kehadiran</th>
                  <th className="p-4 sm:p-5 text-right">Aksi Kehadiran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-text-muted">
                {filteredRegs.map((reg) => {
                  const ev = events.find(e => e.id === reg.event_id);
                  const isFinished = ev?.status === 'finished';
                  return (
                    <tr key={reg.id} className="hover:bg-surface/25 transition-colors">
                      {/* Name */}
                      <td className="p-4 sm:p-5 font-bold text-white">
                        {reg.user_name}
                      </td>

                      {/* Email */}
                      <td className="p-4 sm:p-5 text-text-muted">
                        {reg.user_email}
                      </td>

                      {/* Event Title */}
                      <td className="p-4 sm:p-5 font-semibold text-white">
                        {reg.event_title}
                      </td>

                      {/* Date */}
                      <td className="p-4 sm:p-5 whitespace-nowrap">
                        {new Date(reg.registered_at).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Status */}
                      <td className="p-4 sm:p-5">
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          reg.attendance === 'present' ? 'text-success' :
                          reg.attendance === 'absent' ? 'text-danger' : 'text-amber-500'
                        }`}>
                          {reg.attendance === 'present' && <CheckCircle className="h-3.5 w-3.5" />}
                          {reg.attendance === 'absent' && <XCircle className="h-3.5 w-3.5" />}
                          {reg.attendance === 'pending' && <Clock className="h-3.5 w-3.5" />}
                          {reg.attendance === 'present' ? 'Hadir' :
                           reg.attendance === 'absent' ? 'Absen' : 'Belum Absen'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                        {isFinished ? (
                          <span className="text-[10px] text-gray-600 italic">Sertifikat Telah Terbit</span>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => markAttendance(reg.id, 'present')}
                              className={`rounded-lg px-2.5 py-1.5 font-bold border transition-all cursor-pointer ${
                                reg.attendance === 'present'
                                  ? 'bg-success border-success text-white'
                                  : 'bg-transparent border-success/30 text-success hover:bg-success/10'
                              }`}
                            >
                              Hadir
                            </button>
                            <button
                              onClick={() => markAttendance(reg.id, 'absent')}
                              className={`rounded-lg px-2.5 py-1.5 font-bold border transition-all cursor-pointer ${
                                reg.attendance === 'absent'
                                  ? 'bg-danger border-danger text-white'
                                  : 'bg-transparent border-danger/30 text-danger hover:bg-danger/10'
                              }`}
                            >
                              Absen
                            </button>
                          </div>
                        )}
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
