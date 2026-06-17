'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo, CATEGORIES } from '@/context/DemoContext';
import { Calendar, Users, Award, ChevronDown, ArrowRight } from 'lucide-react';
import EventCard from '@/components/events/EventCard';

export default function LandingPage() {
  const { events } = useDemo();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Filter events to only show published ones up to 6
  const featuredEvents = events
    .filter(e => e.status === 'published')
    .slice(0, 6);

  const stats = [
    { label: 'Total Event', value: events.length.toString(), icon: Calendar, color: 'text-primary' },
    { label: 'Peserta Terdaftar', value: '450+', icon: Users, color: 'text-rose-500' },
    { label: 'Sertifikat Terbit', value: '180+', icon: Award, color: 'text-emerald-500' }
  ];

  const faqs = [
    {
      q: 'Apa itu CampusEventHUB?',
      a: 'CampusEventHUB adalah platform terintegrasi yang memudahkan mahasiswa mencari dan mendaftar berbagai kegiatan kampus (seminar, workshop, lomba, sertifikasi) secara digital dan otomatis.'
    },
    {
      q: 'Bagaimana cara mendaftar kegiatan?',
      a: 'Anda perlu masuk ke akun Mahasiswa Anda terlebih dahulu. Cari kegiatan yang Anda minati di halaman Jelajahi Event, buka halaman detail kegiatan tersebut, dan klik tombol "Daftar Event Sekarang".'
    },
    {
      q: 'Bagaimana cara mendapatkan sertifikat digital?',
      a: 'Sertifikat digital akan otomatis diterbitkan oleh sistem jika Anda terdaftar pada event tersebut, ditandai kehadirannya (Present) oleh panitia, dan event telah diselesaikan oleh panitia.'
    },
    {
      q: 'Apakah panitia bisa membuat event sendiri?',
      a: 'Ya, panitia memiliki hak akses khusus untuk membuat event baru, mengunggah deskripsi & kuota, mempublikasikan event, melakukan presensi peserta, hingga menyelesaikan event untuk menerbitkan sertifikat.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background glow effects */}
      <div className="relative isolate overflow-hidden bg-background">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#7f1d1d] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem] animate-pulse-slow" />
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              🚀 Platform Kegiatan Kampus No. 1
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
              Temukan & Ikuti Berbagai <br />
              <span className="gradient-text">Kegiatan Kampus Terbaik</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Mulai dari Seminar Nasional, Workshop Hands-on, Lomba Kreatif, hingga Sertifikasi Industri. Semuanya terintegrasi dalam satu platform mandiri.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="/events"
                className="glow-button flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all"
              >
                Jelajahi Event
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-bold text-white hover:border-gray-500 transition-colors"
              >
                Daftar Akun
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-border bg-[#161f30]/30 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface border border-border mb-3">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <dt className="text-sm font-medium text-text-muted">{stat.label}</dt>
                  <dd className="text-3xl font-bold tracking-tight text-white mt-1">{stat.value}</dd>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Rekomendasi Kegiatan</h2>
            <p className="text-sm text-text-muted mt-2">Daftar kegiatan kampus terpopuler yang masih membuka kuota pendaftaran.</p>
          </div>
          <Link
            href="/events"
            className="mt-4 md:mt-0 flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Lihat Semua Event
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featuredEvents.length === 0 ? (
          <div className="rounded-2xl border border-border p-12 text-center text-text-muted">
            Belum ada kegiatan yang tersedia saat ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => {
              const category = CATEGORIES.find(c => c.id === event.category_id);
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  category={category}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* FAQ Accordion Section */}
      <div className="border-t border-border bg-[#161f30]/20 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-sm text-text-muted mt-2">Segala hal yang perlu Anda ketahui tentang sistem CampusEventHUB.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-[#161f30]/50 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-white hover:bg-surface/30 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-text-muted transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-primary' : ''}`} />
                </button>
                <div
                  className={`transition-all duration-300 ${
                    activeFaq === i ? 'max-h-40 border-t border-border p-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-xs text-text-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-auto border-t border-border bg-[#0b0f19] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-muted">
          <div>
            <span className="font-bold text-white">CampusEvent<span className="text-primary">HUB</span></span>
            <p className="mt-1">© 2026 CampusEventHUB. Hak Cipta Dilindungi.</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-white transition-colors">Panduan Sistem</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
