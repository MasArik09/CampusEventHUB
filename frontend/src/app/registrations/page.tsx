'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { Calendar, Trash2, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

export default function RegistrationsPage() {
  const { currentUser, registrations, cancelRegistration } = useDemo();
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);

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
            Anda harus login sebagai Mahasiswa untuk melihat riwayat pendaftaran Anda.
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

  // Filter registrations for current student
  const myRegs = registrations.filter(r => r.user_id === currentUser.id);

  const handleCancelClick = (regId: string) => {
    setConfirmCancel(regId);
  };

  const handleConfirmCancel = (regId: string) => {
    cancelRegistration(regId);
    setConfirmCancel(null);
  };

  return (
    <div className="mx-auto max-w-5xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Riwayat Pendaftaran
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Pantau status pendaftaran, kehadiran, dan pembatalan kegiatan Anda di bawah ini.
        </p>
      </div>

      {/* Main Table/List */}
      {myRegs.length === 0 ? (
        <div className="rounded-2xl border border-border bg-[#161f30]/20 p-16 text-center text-text-muted space-y-4">
          <p className="text-sm">Anda belum mendaftar kegiatan apapun.</p>
          <Link
            href="/events"
            className="inline-block rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
          >
            Mulai Cari Event
          </Link>
        </div>
      ) : (
        <div className="glassmorphism rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-[#161f30]/50 text-white font-bold">
                  <th className="p-4 sm:p-5">Nama Kegiatan</th>
                  <th className="p-4 sm:p-5">Tanggal Registrasi</th>
                  <th className="p-4 sm:p-5">Status Registrasi</th>
                  <th className="p-4 sm:p-5">Status Kehadiran</th>
                  <th className="p-4 sm:p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-text-muted">
                {myRegs.map((reg) => (
                  <tr key={reg.id} className="hover:bg-surface/25 transition-colors">
                    {/* Event Title */}
                    <td className="p-4 sm:p-5">
                      <Link
                        href={`/events/${reg.event_id}`}
                        className="font-bold text-white hover:text-primary hover:underline text-[13px] block leading-tight"
                      >
                        {reg.event_title}
                      </Link>
                    </td>

                    {/* Reg Date */}
                    <td className="p-4 sm:p-5 whitespace-nowrap">
                      {new Date(reg.registered_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Reg Status */}
                    <td className="p-4 sm:p-5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white capitalize ${
                        reg.status === 'registered' ? 'bg-primary/20 text-primary border border-primary/20' :
                        reg.status === 'attended' ? 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/20' :
                        'bg-red-500/20 text-red-400 border border-red-500/10'
                      }`}>
                        {reg.status === 'registered' ? 'Terdaftar' :
                         reg.status === 'attended' ? 'Diikuti' : 'Dibatalkan'}
                      </span>
                    </td>

                    {/* Attendance Status */}
                    <td className="p-4 sm:p-5">
                      {reg.status === 'cancelled' ? (
                        <span className="text-gray-600">-</span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 font-semibold ${
                          reg.attendance === 'present' ? 'text-success' :
                          reg.attendance === 'absent' ? 'text-danger' : 'text-amber-500'
                        }`}>
                          {reg.attendance === 'present' && <CheckCircle className="h-3.5 w-3.5" />}
                          {reg.attendance === 'absent' && <ShieldAlert className="h-3.5 w-3.5" />}
                          {reg.attendance === 'pending' && <Clock className="h-3.5 w-3.5" />}
                          {reg.attendance === 'present' ? 'Hadir' :
                           reg.attendance === 'absent' ? 'Absen' : 'Belum Presensi'}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                      {reg.status === 'registered' ? (
                        confirmCancel === reg.id ? (
                          <div className="flex items-center justify-end gap-1.5 animate-in fade-in duration-200">
                            <button
                              onClick={() => handleConfirmCancel(reg.id)}
                              className="rounded bg-danger px-2.5 py-1 text-[10px] font-bold text-white hover:bg-red-700"
                            >
                              Ya
                            </button>
                            <button
                              onClick={() => setConfirmCancel(null)}
                              className="rounded bg-surface px-2.5 py-1 text-[10px] font-bold text-white border border-border hover:border-gray-500"
                            >
                              Tidak
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleCancelClick(reg.id)}
                            className="rounded-lg bg-red-950/40 hover:bg-red-950/70 border border-red-900/40 text-danger hover:text-red-400 px-3 py-1.5 font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Batalkan
                          </button>
                        )
                      ) : (
                        <span className="text-[11px] text-gray-600">Tidak ada aksi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
