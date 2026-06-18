import { User } from '@/context/DemoContext';

const USER_API_URL = 'http://localhost:8001/api/users';

export const userService = {
  getUsers(mode: 'demo' | 'live'): User[] {
    if (mode === 'demo') {
      const saved = localStorage.getItem('ceh_users');
      return saved ? JSON.parse(saved) : [];
    }
    // In Live Mode: In a real app we would query the backend.
    // For demo stability, we read local list but ping backend for actions.
    const saved = localStorage.getItem('ceh_users');
    return saved ? JSON.parse(saved) : [];
  },

  async login(email: string, mode: 'demo' | 'live'): Promise<User | null> {
    if (mode === 'demo') {
      const users = this.getUsers('demo');
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      return found || null;
    }

    try {
      const res = await fetch(`${USER_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      if (res.ok) {
        const body = await res.json();
        // Return matching user or construct from response
        const users = this.getUsers('demo');
        return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
          id: 'u_live',
          name: email.split('@')[0],
          email: email,
          role: 'Student'
        };
      }
    } catch (err) {
      console.error('Failed to login live service, falling back to mock.', err);
    }
    // Fallback
    const users = this.getUsers('demo');
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async register(name: string, email: string, role: 'Student' | 'Committee', mode: 'demo' | 'live'): Promise<User | null> {
    const users = this.getUsers('demo');
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return null; // Duplicate
    }

    const newUser: User = {
      id: 'u' + (users.length + 1),
      name,
      email,
      role
    };

    if (mode === 'demo') {
      const updated = [...users, newUser];
      localStorage.setItem('ceh_users', JSON.stringify(updated));
      return newUser;
    }

    try {
      const res = await fetch(`${USER_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: 'password123' })
      });
      if (res.ok) {
        const updated = [...users, newUser];
        localStorage.setItem('ceh_users', JSON.stringify(updated));
        return newUser;
      }
    } catch (err) {
      console.error('Failed to register live service', err);
    }
    
    // Fallback to demo mode mutation
    const updated = [...users, newUser];
    localStorage.setItem('ceh_users', JSON.stringify(updated));
    return newUser;
  },

  delete(id: string, mode: 'demo' | 'live') {
    const users = this.getUsers('demo');
    const updated = users.filter(u => u.id !== id);
    localStorage.setItem('ceh_users', JSON.stringify(updated));
    // In live mode, send DELETE request
    if (mode === 'live') {
      fetch(`${USER_API_URL}/${id}`, { method: 'DELETE' }).catch(err => console.error(err));
    }
  }
};
