'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo, CATEGORIES } from '@/context/DemoContext';
import { Bell, User, LogOut, Calendar, Award, ClipboardList, Settings, Menu, X, Check, Trash2 } from 'lucide-react';

export default function Navbar() {
  const {
    currentUser,
    role,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    logout
  } = useDemo();

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => n.user_id === currentUser?.id && !n.read);
  const myNotifications = notifications.filter(n => n.user_id === currentUser?.id);

  // Dynamic Navigation Links
  const getNavLinks = () => {
    if (!currentUser) {
      return [{ href: '/events', label: 'Jelajahi Event', icon: Calendar }];
    }

    switch (role) {
      case 'Student':
        return [
          { href: '/dashboard', label: 'Dashboard', icon: ClipboardList },
          { href: '/events', label: 'Daftar Event', icon: Calendar },
          { href: '/registrations', label: 'Riwayat Pendaftaran', icon: ClipboardList },
          { href: '/certificates', label: 'Sertifikat Saya', icon: Award },
          { href: '/profile', label: 'Profil', icon: User }
        ];
      case 'Committee':
        return [
          { href: '/committee/events', label: 'Kelola Event', icon: Calendar },
          { href: '/committee/participants', label: 'Kelola Peserta', icon: ClipboardList }
        ];
      case 'Admin':
        return [
          { href: '/admin/users', label: 'Kelola User', icon: User },
          { href: '/admin/monitoring', label: 'System Monitoring', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const handleNotifClick = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-[#0b0f19]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-rose-600 font-bold text-white shadow-lg shadow-primary/20">
                CE
              </span>
              <span className="text-xl font-bold tracking-tight text-white sm:block">
                CampusEvent<span className="text-primary">HUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-muted hover:bg-surface hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Nav Right Utilities */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsNotifOpen(!isNotifOpen);
                      setIsProfileOpen(false);
                    }}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted hover:text-white transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-pulse">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-[#161f30] p-4 shadow-2xl shadow-black/50 z-50">
                      <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                        <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                          <Bell className="h-4 w-4 text-primary" />
                          Notifikasi ({unreadNotifications.length})
                        </h3>
                        {myNotifications.length > 0 && (
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs text-danger hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Hapus Semua
                          </button>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                        {myNotifications.length === 0 ? (
                          <div className="py-8 text-center text-sm text-text-muted">
                            Tidak ada notifikasi.
                          </div>
                        ) : (
                          myNotifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => handleNotifClick(n.id)}
                              className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                                n.read
                                  ? 'border-border bg-transparent text-text-muted'
                                  : 'border-primary/20 bg-primary/5 text-white'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <span className={`font-semibold ${
                                  n.type === 'success' ? 'text-success' :
                                  n.type === 'warning' ? 'text-warning' :
                                  n.type === 'danger' ? 'text-danger' : 'text-primary'
                                }`}>
                                  {n.title}
                                </span>
                                {!n.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                )}
                              </div>
                              <p className="mt-1 leading-relaxed text-text-muted">{n.message}</p>
                              <span className="mt-2 block text-[10px] text-gray-500">
                                {new Date(n.date).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsProfileOpen(!isProfileOpen);
                      setIsNotifOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-full border border-border bg-surface p-1 pr-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-primary to-orange-400 font-bold text-white">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="hidden lg:block text-left text-xs">
                      <p className="font-semibold text-white">{currentUser.name}</p>
                      <p className="text-[10px] text-text-muted capitalize">{role}</p>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-[#161f30] p-2 shadow-2xl shadow-black/50 z-50">
                      <div className="border-b border-border px-3 py-2 mb-2 text-xs">
                        <p className="font-semibold text-white">{currentUser.name}</p>
                        <p className="text-text-muted">{currentUser.email}</p>
                        <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold text-white ${
                          role === 'Admin' ? 'bg-cyan-600' :
                          role === 'Committee' ? 'bg-secondary' : 'bg-primary'
                        }`}>
                          {role}
                        </span>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-text-muted hover:bg-surface hover:text-white transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profil Saya
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-danger hover:bg-danger/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-text-muted hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted md:hidden hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="border-t border-border bg-[#0b0f19] md:hidden p-4 space-y-2 z-50 relative">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:bg-surface hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
