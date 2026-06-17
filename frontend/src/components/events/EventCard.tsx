import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Event } from '@/context/DemoContext';

interface EventCardProps {
  event: Event;
  category: { id: number; name: string; color: string } | undefined;
}

export default function EventCard({ event, category }: EventCardProps) {
  const remaining = event.quota - event.registeredCount;
  const isFull = remaining <= 0;

  return (
    <div className="glassmorphism glassmorphism-hover flex flex-col justify-between rounded-2xl p-6 border border-border/80">
      <div>
        {/* Category Badge & Slots */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
            style={{ backgroundColor: category?.color || '#f97316' }}
          >
            {category?.name || 'Event'}
          </span>
          <span className={`text-[10px] font-semibold flex items-center gap-1 ${isFull ? 'text-danger' : 'text-text-muted'}`}>
            {isFull ? 'Kuota Penuh' : `Sisa kuota: ${remaining}`}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        
        {/* Description */}
        <p className="text-xs text-text-muted mt-2 line-clamp-3 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Date & Locations */}
      <div className="mt-6 pt-4 border-t border-border/40 space-y-3">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Calendar className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
          <span>
            {new Date(event.start_date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        
        {/* Footer info & button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-text-muted flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {event.registeredCount} / {event.quota} Terdaftar
          </span>
          <Link
            href={`/events/${event.id}`}
            className="rounded-lg bg-surface hover:bg-surface-hover hover:border-primary/40 border border-border px-3.5 py-1.5 text-xs font-bold text-white transition-all"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
