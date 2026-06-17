import { Event } from '@/context/DemoContext';

const EVENT_API_URL = 'http://localhost:8002/api/events';

export const eventService = {
  getEvents(mode: 'demo' | 'live'): Event[] {
    const saved = localStorage.getItem('ceh_events');
    return saved ? JSON.parse(saved) : [];
  },

  async create(eventData: Omit<Event, 'id' | 'registeredCount' | 'status'>, mode: 'demo' | 'live'): Promise<Event> {
    const events = this.getEvents('demo');
    const newEvent: Event = {
      ...eventData,
      id: 'e' + (events.length + 1),
      registeredCount: 0,
      status: 'draft'
    };

    const updated = [...events, newEvent];
    localStorage.setItem('ceh_events', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(EVENT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        });
      } catch (err) {
        console.error('Failed to create event on live microservice', err);
      }
    }

    return newEvent;
  },

  async update(id: string, eventData: Partial<Event>, mode: 'demo' | 'live'): Promise<void> {
    const events = this.getEvents('demo');
    const updated = events.map(e => e.id === id ? { ...e, ...eventData } : e);
    localStorage.setItem('ceh_events', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(`${EVENT_API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventData)
        });
      } catch (err) {
        console.error('Failed to update event live', err);
      }
    }
  },

  async delete(id: string, mode: 'demo' | 'live'): Promise<void> {
    const events = this.getEvents('demo');
    const updated = events.filter(e => e.id !== id);
    localStorage.setItem('ceh_events', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(`${EVENT_API_URL}/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed to delete event live', err);
      }
    }
  },

  async publish(id: string, mode: 'demo' | 'live'): Promise<void> {
    await this.update(id, { status: 'published' }, mode);

    if (mode === 'live') {
      try {
        await fetch(`${EVENT_API_URL}/${id}/publish`, { method: 'PATCH' });
      } catch (err) {
        console.error('Failed to publish event live', err);
      }
    }
  },

  async finish(id: string, mode: 'demo' | 'live'): Promise<void> {
    await this.update(id, { status: 'finished' }, mode);

    if (mode === 'live') {
      try {
        await fetch(`${EVENT_API_URL}/${id}/finish`, { method: 'POST' }); // Hypothetical finish endpoint
      } catch (err) {
        console.error('Failed to finish event live', err);
      }
    }
  }
};
