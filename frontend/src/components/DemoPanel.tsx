'use client';

import React, { useState, useEffect } from 'react';
import { useDemo } from '@/context/DemoContext';
import { Settings, Shield, RefreshCw, Layers, Check, Database, Wifi, WifiOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DemoPanel() {
  const {
    role,
    setRole,
    mode,
    setMode,
    currentUser,
    setCurrentUser,
    users
  } = useDemo();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [serviceStatus, setServiceStatus] = useState({
    user: 'checking',
    event: 'checking',
    registration: 'checking',
    notification: 'checking'
  });

  // Check backend service connectivity when mode is live or panel is open
  useEffect(() => {
    if (!isOpen) return;

    const checkService = async (url: string, key: 'user' | 'event' | 'registration' | 'notification') => {
      try {
        const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(1500) });
        setServiceStatus(prev => ({ ...prev, [key]: 'online' }));
      } catch (err) {
        setServiceStatus(prev => ({ ...prev, [key]: 'offline' }));
      }
    };

    // Laravel service ports defined in root README.md
    checkService('http://localhost:8001/api/users/profile', 'user'); // User service check endpoint (requires auth but will return 401 or response if online)
    checkService('http://localhost:8002/api/events', 'event');
    checkService('http://localhost:8003/api/registrations', 'registration');
    checkService('http://localhost:8004/api/notifications', 'notification');
  }, [isOpen, mode]);

  const handleRoleChange = (newRole: 'Student' | 'Committee' | 'Admin') => {
    setRole(newRole);
    // Push user to appropriate dashboard to demo the user journey
    if (newRole === 'Student') {
      router.push('/dashboard');
    } else if (newRole === 'Committee') {
      router.push('/committee/events');
    } else {
      router.push('/admin/users');
    }
  };

  const forceSeedReset = () => {
    localStorage.removeItem('ceh_users');
    localStorage.removeItem('ceh_events');
    localStorage.removeItem('ceh_registrations');
    localStorage.removeItem('ceh_notifications');
    localStorage.removeItem('ceh_certificates');
    localStorage.removeItem('ceh_current_user');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
      >
        <Settings className={`h-4 w-4 ${isOpen ? 'animate-spin' : ''}`} />
        <span>DEMO CONTROL PANEL</span>
      </button>

      {/* Main Drawer Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 sm:w-96 rounded-2xl border border-border bg-[#161f30]/95 backdrop-blur-lg p-5 shadow-2xl shadow-black/80 space-y-4 text-xs animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary animate-pulse" />
              CampusEventHUB Demo Console
            </h4>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
              v1.0 (Dark Theme)
            </span>
          </div>

          {/* Mode Selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-muted">MODE INTEGRASI</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('demo')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 border font-medium transition-all ${
                  mode === 'demo'
                    ? 'bg-primary/20 border-primary text-white'
                    : 'border-border bg-transparent text-text-muted hover:border-gray-500'
                }`}
              >
                <Database className="h-3.5 w-3.5" />
                Simulasi Offline
              </button>
              <button
                onClick={() => setMode('live')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 border font-medium transition-all ${
                  mode === 'live'
                    ? 'bg-emerald-500/20 border-emerald-500 text-white'
                    : 'border-border bg-transparent text-text-muted hover:border-gray-500'
                }`}
              >
                <Wifi className="h-3.5 w-3.5" />
                Live Microservices
              </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 leading-normal">
              {mode === 'demo' 
                ? '✔ Menggunakan localStorage & simulasi RabbitMQ. Lancar dijalankan tanpa API Backend.'
                : '⚡ Menghubungkan langsung ke endpoint port service Laravel (8001 - 8004).'}
            </p>
          </div>

          {/* Role Impersonation */}
          <div className="space-y-1.5">
            <label className="font-semibold text-text-muted">SWITCH USER / ROLE SIMULATION</label>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRoleChange('Student')}
                  className={`rounded-lg py-2 font-bold text-center transition-all ${
                    role === 'Student'
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-surface text-text-muted hover:text-white'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => handleRoleChange('Committee')}
                  className={`rounded-lg py-2 font-bold text-center transition-all ${
                    role === 'Committee'
                      ? 'bg-rose-900 text-white shadow-md shadow-rose-900/20'
                      : 'bg-surface text-text-muted hover:text-white'
                  }`}
                >
                  Committee
                </button>
                <button
                  onClick={() => handleRoleChange('Admin')}
                  className={`rounded-lg py-2 font-bold text-center transition-all ${
                    role === 'Admin'
                      ? 'bg-cyan-700 text-white shadow-md shadow-cyan-700/20'
                      : 'bg-surface text-text-muted hover:text-white'
                  }`}
                >
                  Admin
                </button>
              </div>

              {/* Quick Login Info */}
              <div className="rounded-lg bg-surface/50 p-2 border border-border/40 text-text-muted">
                <span className="font-semibold text-white">User Aktif: </span>
                <span className="capitalize">{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Guest'}</span>
                <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500">
                  <span>Email: {currentUser?.email || 'N/A'}</span>
                  <span>Pass: password123</span>
                </div>
              </div>
            </div>
          </div>

          {/* Microservices Health Status */}
          {mode === 'live' && (
            <div className="space-y-2 rounded-xl bg-black/30 p-3 border border-border">
              <label className="font-semibold text-text-muted flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                STATUS BACKEND MICROSERVICES
              </label>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="flex items-center gap-1.5 justify-between bg-surface/40 p-1.5 rounded">
                  <span className="text-gray-400">User Serv (8001)</span>
                  <span className={`h-2 w-2 rounded-full ${serviceStatus.user === 'online' ? 'bg-success' : 'bg-danger'}`} />
                </div>
                <div className="flex items-center gap-1.5 justify-between bg-surface/40 p-1.5 rounded">
                  <span className="text-gray-400">Event Serv (8002)</span>
                  <span className={`h-2 w-2 rounded-full ${serviceStatus.event === 'online' ? 'bg-success' : 'bg-danger'}`} />
                </div>
                <div className="flex items-center gap-1.5 justify-between bg-surface/40 p-1.5 rounded">
                  <span className="text-gray-400">Regis Serv (8003)</span>
                  <span className={`h-2 w-2 rounded-full ${serviceStatus.registration === 'online' ? 'bg-success' : 'bg-danger'}`} />
                </div>
                <div className="flex items-center gap-1.5 justify-between bg-surface/40 p-1.5 rounded">
                  <span className="text-gray-400">Notif Serv (8004)</span>
                  <span className={`h-2 w-2 rounded-full ${serviceStatus.notification === 'online' ? 'bg-success' : 'bg-danger'}`} />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <button
              onClick={forceSeedReset}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-surface py-2 hover:bg-surface-hover hover:text-white text-text-muted transition-colors font-medium border border-border"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Simulasi
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg bg-gradient-to-r from-primary to-orange-600 py-2 hover:opacity-90 text-white font-bold transition-all text-center shadow-lg shadow-primary/10"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
