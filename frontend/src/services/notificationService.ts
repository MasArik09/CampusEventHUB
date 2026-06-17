import { Notification, Certificate } from '@/context/DemoContext';

const NOTIF_API_URL = 'http://localhost:8004/api';

export const notificationService = {
  getNotifications(mode: 'demo' | 'live'): Notification[] {
    const saved = localStorage.getItem('ceh_notifications');
    return saved ? JSON.parse(saved) : [];
  },

  getCertificates(mode: 'demo' | 'live'): Certificate[] {
    const saved = localStorage.getItem('ceh_certificates');
    return saved ? JSON.parse(saved) : [];
  },

  async markAsRead(id: string, mode: 'demo' | 'live'): Promise<void> {
    const notifications = this.getNotifications('demo');
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem('ceh_notifications', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(`${NOTIF_API_URL}/notifications/${id}/read`, { method: 'PATCH' });
      } catch (err) {
        console.error('Failed to mark notification as read live', err);
      }
    }
  },

  async clearNotifications(userId: string, mode: 'demo' | 'live'): Promise<void> {
    const notifications = this.getNotifications('demo');
    const updated = notifications.filter(n => n.user_id !== userId);
    localStorage.setItem('ceh_notifications', JSON.stringify(updated));

    if (mode === 'live') {
      try {
        await fetch(`${NOTIF_API_URL}/notifications/clear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        });
      } catch (err) {
        console.error('Failed to clear notifications live', err);
      }
    }
  }
};
