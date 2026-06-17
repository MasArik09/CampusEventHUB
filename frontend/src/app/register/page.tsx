'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/context/DemoContext';
import { Mail, Lock, User, ShieldAlert, Check, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { registerUser } = useDemo();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleSelection, setRoleSelection] = useState<'Student' | 'Committee'>('Student');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email) {
      setError('Semua kolom harus diisi.');
      return;
    }

    const ok = registerUser(name, email, roleSelection);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        if (roleSelection === 'Committee') {
          router.push('/committee/events');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } else {
      setError('Email sudah digunakan. Silakan gunakan email lain.');
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-pulse-slow" />

      <div className="w-full max-w-md space-y-8 glassmorphism p-8 rounded-2xl border border-border">
        {/* Header */}
        <div className="text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-rose-600 font-bold text-white shadow-lg mx-auto text-xl mb-4">
            CE
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Daftar Akun Baru</h2>
          <p className="mt-2 text-xs text-text-muted">
            Buat akun untuk mulai menjelajah dan berpartisipasi dalam event
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-lg bg-danger/10 border border-danger/30 p-3 text-xs text-danger flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-success/10 border border-success/30 p-3 text-xs text-success flex items-start gap-2">
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>Registrasi Berhasil! Mengalihkan ke dashboard...</span>
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
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Nama Lengkap Anda"
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="name@mail.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role-select" className="text-xs font-semibold text-text-muted">
                Daftar Sebagai
              </label>
              <div className="mt-1">
                <select
                  id="role-select"
                  value={roleSelection}
                  onChange={(e) => setRoleSelection(e.target.value as 'Student' | 'Committee')}
                  className="block w-full rounded-xl border border-border bg-surface py-3 px-3 text-sm text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                >
                  <option value="Student">Mahasiswa (Peserta Event)</option>
                  <option value="Committee">Panitia (Pengelola Event)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={success}
            className="glow-button flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            Daftar Sekarang
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-xs text-text-muted mt-4">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
