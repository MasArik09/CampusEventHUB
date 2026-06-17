'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { UserPlus, Trash2, Mail, ShieldAlert, Check, Users } from 'lucide-react';

export default function AdminUsersPage() {
  const { currentUser, role, users, registerUser, deleteUser } = useDemo();

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState<'Student' | 'Committee'>('Student');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Guard Clause
  if (!currentUser || role !== 'Admin') {
    return (
      <div className="flex flex-1 items-center justify-center p-8 bg-background">
        <div className="max-w-md w-full glassmorphism p-8 rounded-2xl border border-border text-center space-y-6">
          <div className="h-14 w-14 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="h-7 w-7 text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-white">Akses Dibatasi</h2>
          <p className="text-xs text-text-muted">
            Anda harus login sebagai Admin untuk mengakses halaman manajemen pengguna ini.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email) {
      setError('Semua kolom formulir wajib diisi.');
      return;
    }

    const ok = registerUser(name, email, userRole);
    if (ok) {
      setSuccess(true);
      setName('');
      setEmail('');
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    } else {
      setError('Email sudah terdaftar. Gunakan email lain.');
    }
  };

  const handleDelete = (id: string) => {
    if (id === currentUser.id) {
      alert('Anda tidak dapat menghapus akun Anda sendiri.');
      return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
      deleteUser(id);
    }
  };

  return (
    <div className="mx-auto max-w-6xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          Manajemen Pengguna (User Management)
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Sebagai Administrator, Anda memiliki akses penuh untuk menambah, memantau, dan menghapus akun pengguna sistem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Form to Add User */}
        <div className="glassmorphism rounded-2xl border border-border p-6 space-y-6">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-1.5">
              <UserPlus className="h-5 w-5 text-primary" />
              Daftarkan User Baru
            </h3>
            <p className="text-[11px] text-text-muted mt-1">
              Tambahkan akun Mahasiswa atau Panitia ke dalam sistem.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-danger/10 border border-danger/30 p-2.5 text-xs text-danger flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="rounded-lg bg-success/10 border border-success/30 p-2.5 text-xs text-success flex items-start gap-2">
                <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>User berhasil ditambahkan!</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-text-muted">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="block w-full rounded-lg border border-border bg-surface py-2.5 px-3 mt-1 text-xs text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-text-muted">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@mail.com"
                  className="block w-full rounded-lg border border-border bg-surface py-2.5 px-3 mt-1 text-xs text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-text-muted">Hak Akses Role</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as 'Student' | 'Committee')}
                  className="block w-full rounded-lg border border-border bg-surface py-2.5 px-3 mt-1 text-xs text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="Student">Mahasiswa</option>
                  <option value="Committee">Panitia</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="glow-button w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold text-white hover:bg-primary-hover shadow-lg transition-all cursor-pointer"
            >
              Tambah Pengguna
            </button>
          </form>
        </div>

        {/* Right Column: Users List Table */}
        <div className="lg:col-span-2 glassmorphism rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-[#161f30]/50 text-white font-bold">
                  <th className="p-4 sm:p-5">Nama Lengkap</th>
                  <th className="p-4 sm:p-5">Email</th>
                  <th className="p-4 sm:p-5">Role</th>
                  <th className="p-4 sm:p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-text-muted">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface/25 transition-colors">
                    {/* Name */}
                    <td className="p-4 sm:p-5 font-bold text-white">
                      {user.name}
                      {user.id === currentUser.id && (
                        <span className="ml-1.5 rounded bg-surface border border-border px-1.5 py-0.5 text-[9px] text-primary">Anda</span>
                      )}
                    </td>

                    {/* Email */}
                    <td className="p-4 sm:p-5">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="p-4 sm:p-5">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold text-white capitalize ${
                        user.role === 'Admin' ? 'bg-cyan-700' :
                        user.role === 'Committee' ? 'bg-rose-900' : 'bg-primary'
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Delete Action */}
                    <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                      {user.id !== currentUser.id ? (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="rounded-lg bg-danger/10 border border-danger/20 hover:bg-danger hover:text-white text-danger px-2.5 py-1.5 font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Hapus
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-600 italic">Terkunci</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
