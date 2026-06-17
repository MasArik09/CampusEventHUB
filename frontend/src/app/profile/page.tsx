'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { User, Mail, ShieldAlert, Check, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, role } = useDemo();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [success, setSuccess] = useState(false);

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
            Anda harus login terlebih dahulu untuk mengakses halaman profil.
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

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    // In demo, we just simulate updating
    setTimeout(() => {
      setSuccess(false);
      alert('Profil Anda berhasil diperbarui!');
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-2xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          Profil Saya
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Kelola informasi detail akun Anda dan periksa status hak akses Anda.
        </p>
      </div>

      {/* Main card */}
      <div className="glassmorphism rounded-2xl border border-border p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-border/60 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 font-extrabold text-white text-2xl shadow-lg">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{currentUser.name}</h3>
            <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary capitalize">
              <ShieldCheck className="h-3.5 w-3.5" />
              Akses: {role}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {success && (
            <div className="rounded-lg bg-success/10 border border-success/30 p-3 text-xs text-success flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>Memperbarui informasi profil...</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="text-xs font-semibold text-text-muted">
                Nama Lengkap
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="full-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email-address" className="text-xs font-semibold text-text-muted">
                Alamat Email
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email-address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="glow-button rounded-xl bg-primary hover:bg-primary-hover text-xs font-bold text-white px-5 py-3 shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
