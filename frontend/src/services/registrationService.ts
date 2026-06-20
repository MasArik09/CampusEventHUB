import { Registration } from '@/context/DemoContext';

const REG_API_URL = 'http://localhost:8003/api/registrations';

export const registrationService = {
  getRegistrations(mode: 'demo' | 'live'): Registration[] {
    const saved = localStorage.getItem('ceh_registrations');
    return saved ? JSON.parse(saved) : [];
  },

  async register(
    eventId: string,
    userId: string,
    userName: string,
    userEmail: string,
    eventTitle: string,
    mode: 'demo' | 'live'
  ): Promise<Registration> {
    const registrations = this.getRegistrations('demo');
    const newReg: Registration = {
      id: 'r_' + Date.now(),
      user_id: userId,
      user_name: userName,
      user_email: userEmail,
      event_id: eventId,
      event_title: eventTitle,
      status: 'registered',
      attendance: 'pending',
      registered_at: new Date().toISOString()
    };

    const updated = [...registrations, newReg];
    localStorage.setItem('ceh_registrations', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(REG_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, event_id: eventId })
        });
      } catch (err) {
        console.error('Failed to register live microservice', err);
      }
    }

    return newReg;
  },

  async cancel(regId: string, mode: 'demo' | 'live'): Promise<void> {
    const registrations = this.getRegistrations('demo');
    const updated = registrations.map(r => r.id === regId ? { ...r, status: 'cancelled' as const } : r);
    localStorage.setItem('ceh_registrations', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(`${REG_API_URL}/${regId}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed to cancel registration live', err);
      }
    }
  },

  async markAttendance(regId: string, status: 'present' | 'absent', mode: 'demo' | 'live'): Promise<void> {
    const registrations = this.getRegistrations('demo');
    const updated = registrations.map(r => r.id === regId ? { ...r, attendance: status } : r);
    localStorage.setItem('ceh_registrations', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(`http://localhost:8003/api/attendances`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            registration_id:   regId,
            attendance_status: status,                    // ✅ nama field sesuai backend
            attendance_time:   new Date().toISOString(),  // ✅ field wajib yang sebelumnya hilang
          })
        });
      } catch (err) {
        console.error('Failed to update attendance live', err);
      }
    }
  }
};
