'use client';

import React, { useState, useMemo } from 'react';
import { useDemo, CATEGORIES } from '@/context/DemoContext';
import EventFilterPanel from '@/components/events/EventFilterPanel';
import EventCard from '@/components/events/EventCard';

export default function EventsPage() {
  const { events } = useDemo();

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique locations from published events
  const uniqueLocations = useMemo(() => {
    const published = events.filter(e => e.status === 'published');
    const locations = published.map(e => e.location);
    return Array.from(new Set(locations));
  }, [events]);

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    let list = events.filter(e => e.status === 'published');

    // Search Filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      const catId = parseInt(selectedCategory);
      list = list.filter(e => e.category_id === catId);
    }

    // Location Filter
    if (selectedLocation !== 'all') {
      list = list.filter(e => e.location === selectedLocation);
    }

    // Date Filter
    if (selectedDateFilter !== 'all') {
      const now = new Date();
      list = list.filter(e => {
        const evDate = new Date(e.start_date);
        if (selectedDateFilter === 'today') {
          return evDate.toDateString() === now.toDateString();
        } else if (selectedDateFilter === 'week') {
          const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          return evDate >= now && evDate <= nextWeek;
        } else if (selectedDateFilter === 'future') {
          return evDate >= now;
        }
        return true;
      });
    }

    // Sorting Logic
    list = [...list].sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      } else if (sortBy === 'quota_high') {
        return (b.quota - b.registeredCount) - (a.quota - a.registeredCount);
      } else if (sortBy === 'quota_low') {
        return (a.quota - a.registeredCount) - (b.quota - b.registeredCount);
      }
      return 0;
    });

    return list;
  }, [events, search, selectedCategory, selectedLocation, selectedDateFilter, sortBy]);

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8 flex-1">
      {/* Header Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Direktori Kegiatan Kampus
        </h1>
        <p className="text-sm text-text-muted mt-2">
          Cari dan daftarkan diri Anda pada berbagai webinar, seminar, pelatihan, dan lomba resmi.
        </p>
      </div>

      {/* Filter panel */}
      <EventFilterPanel
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedDateFilter={selectedDateFilter}
        setSelectedDateFilter={setSelectedDateFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        uniqueLocations={uniqueLocations}
      />

      {/* Events Card Grid */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-border p-16 text-center text-text-muted">
          <p className="text-sm font-semibold">Tidak ada event yang cocok dengan kriteria pencarian Anda.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedLocation('all');
              setSelectedDateFilter('all');
            }}
            className="mt-4 text-xs font-bold text-primary hover:underline"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => {
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
  );
}
