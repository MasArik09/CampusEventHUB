'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { Award, Download, ShieldAlert, CheckCircle, ExternalLink } from 'lucide-react';

export default function CertificatesPage() {
  const { currentUser, certificates } = useDemo();
  const [downloading, setDownloading] = useState<string | null>(null);

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
            Anda harus login sebagai Mahasiswa untuk mengakses sertifikat digital Anda.
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

  // Filter certificates for current student
  const myCerts = certificates.filter(c => c.user_id === currentUser.id);

  const handleDownload = (certId: string) => {
    setDownloading(certId);
    setTimeout(() => {
      setDownloading(null);
      // Simulate download alert
      alert('Sertifikat Digital berhasil diunduh sebagai PDF!');
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Award className="h-8 w-8 text-primary" />
          Sertifikat Saya
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Sertifikat digital diterbitkan secara otomatis setelah kegiatan yang Anda ikuti selesai dilaksanakan.
        </p>
      </div>

      {/* Main Grid */}
      {myCerts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-[#161f30]/20 p-16 text-center text-text-muted space-y-4">
          <p className="text-sm">Belum ada sertifikat digital yang diterbitkan untuk Anda.</p>
          <p className="text-[11px] text-gray-500">Sertifikat hanya tersedia jika status absensi Anda ditandai &ldquo;Hadir&rdquo; oleh panitia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myCerts.map((cert) => (
            <div
              key={cert.id}
              className="glassmorphism rounded-2xl border border-border overflow-hidden flex flex-col justify-between"
            >
              {/* Visual Cert Design Preview */}
              <div className="bg-gradient-to-br from-[#1b253b] to-[#121a2c] p-6 text-center relative border-b border-border min-h-[160px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_70%)]" />
                <Award className="h-10 w-10 text-primary mb-2 opacity-80" />
                <h3 className="font-extrabold text-white text-sm tracking-tight px-4 line-clamp-2">
                  {cert.event_title}
                </h3>
                <span className="text-[9px] text-gray-500 mt-1 uppercase font-mono tracking-wider">
                  No: {cert.certificate_number}
                </span>
              </div>

              {/* Cert Details Footer */}
              <div className="p-4 bg-surface/30 flex items-center justify-between">
                <div className="text-[10px] text-text-muted">
                  <p className="font-semibold text-white">Nama Penerima</p>
                  <p>{cert.student_name}</p>
                  <p className="text-[9px] text-gray-500 mt-1">Terbit: {cert.issue_date}</p>
                </div>
                <button
                  onClick={() => handleDownload(cert.id)}
                  disabled={downloading !== null}
                  className="rounded-lg bg-primary hover:bg-primary-hover text-[11px] font-bold text-white px-3.5 py-2 flex items-center gap-1.5 shadow-md shadow-primary/10 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  {downloading === cert.id ? 'Mengunduh...' : 'Unduh PDF'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
