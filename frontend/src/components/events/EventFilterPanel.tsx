import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '@/context/DemoContext';

interface EventFilterPanelProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  selectedDateFilter: string;
  setSelectedDateFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  uniqueLocations: string[];
}

export default function EventFilterPanel({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedDateFilter,
  setSelectedDateFilter,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  uniqueLocations
}: EventFilterPanelProps) {
  return (
    <div className="space-y-4">
      {/* Search Input & Action buttons */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Cari berdasarkan judul atau konten event..."
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl px-4 py-3 border text-xs font-semibold transition-all ${
              showFilters
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-surface text-white hover:border-gray-500'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-border bg-surface px-4 py-3 text-xs font-semibold text-white focus:border-primary focus:outline-none cursor-pointer"
          >
            <option value="latest">Tanggal Terdekat</option>
            <option value="oldest">Tanggal Terjauh</option>
            <option value="quota_high">Kuota Terbanyak</option>
            <option value="quota_low">Kuota Terkecil</option>
          </select>
        </div>
      </div>

      {/* Advanced Filter Sub-Panel */}
      {showFilters && (
        <div className="rounded-2xl border border-border bg-[#161f30]/40 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-lg border border-border bg-surface py-2.5 px-3 text-xs text-white focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Kategori</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id.toString()}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted">Lokasi</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="block w-full rounded-lg border border-border bg-surface py-2.5 px-3 text-xs text-white focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Lokasi</option>
              {uniqueLocations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted">Waktu Pelaksanaan</label>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="block w-full rounded-lg border border-border bg-surface py-2.5 px-3 text-xs text-white focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Waktu</option>
              <option value="today">Hari Ini</option>
              <option value="week">Seminggu Ke Depan</option>
              <option value="future">Akan Datang</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
