import React from 'react';
import Link from 'next/link';
import { Event, Registration } from '@/context/DemoContext';

interface RegisteredEventItemProps {
  registration: Registration;
  event: Event | undefined;
}

export default function RegisteredEventItem({ registration, event }: RegisteredEventItemProps) {
  if (!event) return null;

  return (
    <div className="glassmorphism p-5 rounded-xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/20 transition-all">
      <div className="space-y-1">
        <h3 className="font-bold text-white text-sm hover:text-primary transition-colors">
          <Link href={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
          <span>📍 {event.location}</span>
          <span>
            📅 {new Date(event.start_date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white capitalize ${
          registration.status === 'attended' ? 'bg-success' :
          registration.status === 'cancelled' ? 'bg-danger' : 'bg-primary'
        }`}>
          {registration.status === 'registered' ? 'Terdaftar' : registration.status}
        </span>
        <Link
          href={`/events/${event.id}`}
          className="rounded-lg bg-surface hover:bg-surface-hover px-3 py-1.5 text-xs font-bold text-white border border-border transition-colors"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
