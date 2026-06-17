'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/context/DemoContext';
import { Mail, Lock, ArrowRight, ShieldAlert, Check } from 'lucide-react';

export default function LoginPage() {
  const { login, users } = useDemo();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    const ok = login(email);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        // Redirection depending on the user role loaded
        const loggedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (loggedUser?.role === 'Committee') {
          router.push('/committee/events');
        } else if (loggedUser?.role === 'Admin') {
          router.push('/admin/users');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } else {
      setError('Email tidak terdaftar atau password salah. Coba tombol autofill di bawah.');
    }
  };

  const handleAutofill = (type: 'Student' | 'Committee' | 'Admin') => {
    setError('');
    if (type === 'Student') {
      setEmail('arik@mail.com');
      setPassword('password123');
    } else if (type === 'Committee') {
      setEmail('dodi@mail.com');
      setPassword('password123');
    } else if (type === 'Admin') {
      setEmail('admin@mail.com');
      setPassword('password123');
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl animate-pulse-slow" />

      <div className="w-full max-w-md space-y-8 glassmorphism p-8 rounded-2xl border border-border">
        {/* Header */}
        <div className="text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-rose-600 font-bold text-white shadow-lg mx-auto text-xl mb-4">
            CE
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Selamat Datang Kembali</h2>
          <p className="mt-2 text-xs text-text-muted">
            Masuk ke akun CampusEventHUB Anda untuk melanjutkan kegiatan
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
              <span>Login Berhasil! Mengalihkan ke dashboard...</span>
            </div>
          )}

          <div className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="name@mail.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-text-muted">
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={success}
            className="glow-button flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            Masuk Sekarang
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Demo Impersonators Quick Tools */}
        <div className="border-t border-border/60 pt-6 space-y-3">
          <p className="text-[10px] font-bold text-text-muted tracking-wider text-center uppercase">
            ⚡ QUICK DEMO AUTO-FILL LOGIN
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleAutofill('Student')}
              className="rounded-lg bg-surface hover:bg-surface-hover hover:text-primary py-2 text-[10px] font-bold text-white border border-border transition-colors"
            >
              Arik (Student)
            </button>
            <button
              onClick={() => handleAutofill('Committee')}
              className="rounded-lg bg-surface hover:bg-surface-hover hover:text-rose-500 py-2 text-[10px] font-bold text-white border border-border transition-colors"
            >
              Dodi (Committee)
            </button>
            <button
              onClick={() => handleAutofill('Admin')}
              className="rounded-lg bg-surface hover:bg-surface-hover hover:text-cyan-400 py-2 text-[10px] font-bold text-white border border-border transition-colors"
            >
              Admin (Admin)
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-xs text-text-muted mt-4">
          Belum punya akun?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
