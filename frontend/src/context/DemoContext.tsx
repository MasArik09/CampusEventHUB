'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types definition
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Committee' | 'Admin';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  quota: number;
  registeredCount: number;
  category_id: number;
  status: 'draft' | 'published' | 'finished';
}

export interface Registration {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  event_id: string;
  event_title: string;
  status: 'registered' | 'attended' | 'cancelled';
  attendance: 'pending' | 'present' | 'absent';
  registered_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
}

export interface Certificate {
  id: string;
  certificate_number: string;
  event_id: string;
  event_title: string;
  student_name: string;
  issue_date: string;
  user_id: string;
  download_url: string;
}

interface DemoContextType {
  role: 'Student' | 'Committee' | 'Admin';
  setRole: (role: 'Student' | 'Committee' | 'Admin') => void;
  mode: 'demo' | 'live';
  setMode: (mode: 'demo' | 'live') => void;
  
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  users: User[];
  events: Event[];
  registrations: Registration[];
  notifications: Notification[];
  certificates: Certificate[];
  
  // Actions
  login: (email: string) => boolean;
  logout: () => void;
  registerUser: (name: string, email: string, role: 'Student' | 'Committee') => boolean;
  deleteUser: (id: string) => void;
  
  createEvent: (eventData: Omit<Event, 'id' | 'registeredCount' | 'status'>) => void;
  updateEvent: (id: string, eventData: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  publishEvent: (id: string) => void;
  finishEvent: (id: string) => void;
  
  registerForEvent: (eventId: string) => { success: boolean; message: string };
  cancelRegistration: (regId: string) => void;
  markAttendance: (regId: string, status: 'present' | 'absent') => void;
  
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

// Categories Mapping
export const CATEGORIES = [
  { id: 1, name: 'Seminar', color: '#f97316' },
  { id: 2, name: 'Workshop', color: '#a855f7' },
  { id: 3, name: 'Webinar', color: '#06b6d4' },
  { id: 4, name: 'Lomba', color: '#ef4444' },
  { id: 5, name: 'Pelatihan', color: '#10b981' },
  { id: 6, name: 'Sertifikasi', color: '#3b82f6' }
];

export function DemoProvider({ children }: { children: React.ReactNode }) {
  // Global States
  const [role, setRoleState] = useState<'Student' | 'Committee' | 'Admin'>('Student');
  const [mode, setMode] = useState<'demo' | 'live'>('demo');
  const [currentUser, setCurrentUserState] = useState<User | null>(null);

  // Entities
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Seed Data Trigger
  useEffect(() => {
    // 1. Initial Users
    const savedUsers = localStorage.getItem('ceh_users');
    let userList: User[] = [];
    if (savedUsers) {
      userList = JSON.parse(savedUsers);
    } else {
      userList = [
        { id: 'u1', name: 'Arik Mahasiswa', email: 'arik@mail.com', role: 'Student' },
        { id: 'u2', name: 'Dodi Panitia', email: 'dodi@mail.com', role: 'Committee' },
        { id: 'u3', name: 'Siti Admin', email: 'admin@mail.com', role: 'Admin' },
        { id: 'u4', name: 'Budi Raharjo', email: 'budi@mail.com', role: 'Student' },
        { id: 'u5', name: 'Fitriani Lestari', email: 'fitri@mail.com', role: 'Student' }
      ];
      localStorage.setItem('ceh_users', JSON.stringify(userList));
    }
    setUsers(userList);

    // Auto login first user in the list as default demo user
    const savedCurrentUser = localStorage.getItem('ceh_current_user');
    if (savedCurrentUser) {
      const parsed = JSON.parse(savedCurrentUser);
      setCurrentUserState(parsed);
      setRoleState(parsed.role);
    } else {
      setCurrentUserState(userList[0]);
      setRoleState(userList[0].role);
      localStorage.setItem('ceh_current_user', JSON.stringify(userList[0]));
    }

    // 2. Initial Events
    const savedEvents = localStorage.getItem('ceh_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const initialEvents: Event[] = [
        {
          id: 'e1',
          title: 'Workshop Modern Web Development Laravel 12 & React',
          description: 'Pelajari cara membuat aplikasi web modern menggunakan Laravel 12 sebagai Backend API dan React / Next.js sebagai Frontend. Workshop ini mencakup REST API, autentikasi Sanctum, dan integrasi Tailwind CSS.',
          location: 'Auditorium Gedung D Lantai 3',
          start_date: '2026-07-05T09:00',
          end_date: '2026-07-05T15:00',
          quota: 50,
          registeredCount: 42,
          category_id: 2, // Workshop
          status: 'published'
        },
        {
          id: 'e2',
          title: 'Seminar Nasional AI: Masa Depan Agentic AI dan Otomasi Kerja',
          description: 'Membahas perkembangan teknologi AI terbarukan khususnya Agentic Workflow. Menghadirkan narasumber ahli dari industri AI global dan peneliti terkemuka.',
          location: 'Aula Utama Kampus Merdeka',
          start_date: '2026-07-12T08:30',
          end_date: '2026-07-12T12:00',
          quota: 200,
          registeredCount: 185,
          category_id: 1, // Seminar
          status: 'published'
        },
        {
          id: 'e3',
          title: 'Lomba UI/UX Design CampusEventHUB Competition',
          description: 'Tunjukkan bakat desain antarmuka terbaikmu! Kompetisi desain tingkat mahasiswa nasional dengan tema "Peningkatan Aksesibilitas Pendidikan". Hadiah total puluhan juta rupiah.',
          location: 'Online via Zoom',
          start_date: '2026-07-15T09:00',
          end_date: '2026-07-18T17:00',
          quota: 100,
          registeredCount: 65,
          category_id: 4, // Lomba
          status: 'published'
        },
        {
          id: 'e4',
          title: 'Webinar Sukses Membangun Startup Digital dari Kampus',
          description: 'Bagaimana mengubah ide tugas kuliah menjadi startup berkelas dunia? Ikuti webinar interaktif bersama para founder muda sukses binaan inkubator bisnis kampus.',
          location: 'Online via Zoom',
          start_date: '2026-06-25T13:00',
          end_date: '2026-06-25T15:00',
          quota: 500,
          registeredCount: 320,
          category_id: 3, // Webinar
          status: 'published'
        },
        {
          id: 'e5',
          title: 'Sertifikasi Keahlian Cloud Computing (AWS Practitioner)',
          description: 'Program persiapan ujian dan sertifikasi resmi AWS Certified Cloud Practitioner. Sangat direkomendasikan bagi mahasiswa program studi Teknik Informatika dan Sistem Informasi.',
          location: 'Laboratorium Komputer Terpadu',
          start_date: '2026-08-01T08:00',
          end_date: '2026-08-03T16:00',
          quota: 30,
          registeredCount: 30, // Full quota
          category_id: 6, // Sertifikasi
          status: 'published'
        },
        {
          id: 'e6',
          title: 'Bimbingan Karir & CV Review Panitia Event',
          description: 'Sesi konsultasi karir tertutup untuk panitia. Belajar membuat resume professional dan latihan wawancara kerja.',
          location: 'Ruang Rapat LKM Lantai 2',
          start_date: '2026-06-20T10:00',
          end_date: '2026-06-20T12:00',
          quota: 15,
          registeredCount: 5,
          category_id: 5, // Pelatihan
          status: 'draft'
        }
      ];
      localStorage.setItem('ceh_events', JSON.stringify(initialEvents));
      setEvents(initialEvents);
    }

    // 3. Initial Registrations
    const savedRegistrations = localStorage.getItem('ceh_registrations');
    if (savedRegistrations) {
      setRegistrations(JSON.parse(savedRegistrations));
    } else {
      const initialRegistrations: Registration[] = [
        {
          id: 'r1',
          user_id: 'u1',
          user_name: 'Arik Mahasiswa',
          user_email: 'arik@mail.com',
          event_id: 'e1',
          event_title: 'Workshop Modern Web Development Laravel 12 & React',
          status: 'registered',
          attendance: 'pending',
          registered_at: '2026-06-15T10:30'
        },
        {
          id: 'r2',
          user_id: 'u1',
          user_name: 'Arik Mahasiswa',
          user_email: 'arik@mail.com',
          event_id: 'e4',
          event_title: 'Webinar Sukses Membangun Startup Digital dari Kampus',
          status: 'attended',
          attendance: 'present',
          registered_at: '2026-06-10T14:00'
        },
        {
          id: 'r3',
          user_id: 'u4',
          user_name: 'Budi Raharjo',
          user_email: 'budi@mail.com',
          event_id: 'e1',
          event_title: 'Workshop Modern Web Development Laravel 12 & React',
          status: 'registered',
          attendance: 'pending',
          registered_at: '2026-06-16T09:15'
        }
      ];
      localStorage.setItem('ceh_registrations', JSON.stringify(initialRegistrations));
      setRegistrations(initialRegistrations);
    }

    // 4. Initial Certificates
    const savedCertificates = localStorage.getItem('ceh_certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    } else {
      const initialCertificates: Certificate[] = [
        {
          id: 'c1',
          certificate_number: 'CERT-2026-WEBINAR-0921',
          event_id: 'e4',
          event_title: 'Webinar Sukses Membangun Startup Digital dari Kampus',
          student_name: 'Arik Mahasiswa',
          issue_date: '2026-06-12',
          user_id: 'u1',
          download_url: '#'
        }
      ];
      localStorage.setItem('ceh_certificates', JSON.stringify(initialCertificates));
      setCertificates(initialCertificates);
    }

    // 5. Initial Notifications
    const savedNotifications = localStorage.getItem('ceh_notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      const initialNotifications: Notification[] = [
        {
          id: 'n1',
          user_id: 'u1',
          title: 'Pendaftaran Berhasil!',
          message: 'Anda telah berhasil mendaftar untuk event: Workshop Modern Web Development Laravel 12 & React.',
          date: '2026-06-15T10:30',
          type: 'success',
          read: false
        },
        {
          id: 'n2',
          user_id: 'u1',
          title: 'Sertifikat Tersedia',
          message: 'Sertifikat digital untuk Webinar Sukses Membangun Startup Digital dari Kampus telah diterbitkan. Silakan unduh di tab Sertifikat.',
          date: '2026-06-12T16:00',
          type: 'info',
          read: true
        }
      ];
      localStorage.setItem('ceh_notifications', JSON.stringify(initialNotifications));
      setNotifications(initialNotifications);
    }
  }, []);

  // Update current user details and sync to role state
  const setRole = (newRole: 'Student' | 'Committee' | 'Admin') => {
    setRoleState(newRole);
    // Switch active simulated user
    const matchingUser = users.find(u => u.role === newRole);
    if (matchingUser) {
      setCurrentUserState(matchingUser);
      localStorage.setItem('ceh_current_user', JSON.stringify(matchingUser));
    }
  };

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      setRoleState(user.role);
      localStorage.setItem('ceh_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ceh_current_user');
    }
  };

  // Helper sync functions
  const saveAndSetEvents = (newEvents: Event[]) => {
    localStorage.setItem('ceh_events', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  const saveAndSetRegistrations = (newRegs: Registration[]) => {
    localStorage.setItem('ceh_registrations', JSON.stringify(newRegs));
    setRegistrations(newRegs);
  };

  const saveAndSetNotifications = (newNotifs: Notification[]) => {
    localStorage.setItem('ceh_notifications', JSON.stringify(newNotifs));
    setNotifications(newNotifs);
  };

  const saveAndSetCertificates = (newCerts: Certificate[]) => {
    localStorage.setItem('ceh_certificates', JSON.stringify(newCerts));
    setCertificates(newCerts);
  };

  const saveAndSetUsers = (newUsers: User[]) => {
    localStorage.setItem('ceh_users', JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  // Auth Operations
  const login = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (name: string, email: string, userRole: 'Student' | 'Committee'): boolean => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false; // Email exists
    }
    const newUser: User = {
      id: 'u' + (users.length + 1),
      name,
      email,
      role: userRole
    };
    const updated = [...users, newUser];
    saveAndSetUsers(updated);
    setCurrentUser(newUser);
    return true;
  };

  const deleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    saveAndSetUsers(updated);
  };

  // Event Operations (Committee)
  const createEvent = (eventData: Omit<Event, 'id' | 'registeredCount' | 'status'>) => {
    const newEvent: Event = {
      ...eventData,
      id: 'e' + (events.length + 1),
      registeredCount: 0,
      status: 'draft'
    };
    const updated = [...events, newEvent];
    saveAndSetEvents(updated);

    // RabbitMQ Simulation: Send notification to all students about a new draft or publish event
    // Send info about draft/created event to Admin/System
  };

  const updateEvent = (id: string, eventData: Partial<Event>) => {
    const updated = events.map(e => e.id === id ? { ...e, ...eventData } : e);
    saveAndSetEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    saveAndSetEvents(updated);
    // Clean up registrations as well
    const updatedRegs = registrations.filter(r => r.event_id !== id);
    saveAndSetRegistrations(updatedRegs);
  };

  const publishEvent = (id: string) => {
    const updated = events.map(e => e.id === id ? { ...e, status: 'published' as const } : e);
    saveAndSetEvents(updated);
    
    // RabbitMQ Simulation: Send notification to all Student users
    const eventDetails = events.find(e => e.id === id);
    if (eventDetails) {
      const studentUsers = users.filter(u => u.role === 'Student');
      const newNotifs = [...notifications];
      studentUsers.forEach(student => {
        newNotifs.unshift({
          id: 'n_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          user_id: student.id,
          title: 'Event Baru Tersedia!',
          message: `Event baru "${eventDetails.title}" telah dipublikasikan. Kuota: ${eventDetails.quota} orang. Segera daftar!`,
          date: new Date().toISOString(),
          type: 'info',
          read: false
        });
      });
      saveAndSetNotifications(newNotifs);
    }
  };

  const finishEvent = (id: string) => {
    const updated = events.map(e => e.id === id ? { ...e, status: 'finished' as const } : e);
    saveAndSetEvents(updated);

    const eventDetails = events.find(e => e.id === id);
    if (!eventDetails) return;

    const updatedRegs = registrations.map(r => {
      if (r.event_id === id && r.status === 'registered') {
        // Assume present by default if not marked, or keep as is
        const finalAttendance = r.attendance === 'pending' ? 'present' : r.attendance;
        return {
          ...r,
          status: (finalAttendance === 'present' ? 'attended' : 'cancelled') as 'registered' | 'attended' | 'cancelled',
          attendance: finalAttendance
        };
      }
      return r;
    });
    saveAndSetRegistrations(updatedRegs);

    // Generate certificates for present students
    const newCertificates = [...certificates];
    const newNotifs = [...notifications];
    
    updatedRegs.forEach(r => {
      if (r.event_id === id && r.attendance === 'present') {
        const certId = 'c_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        const certNum = `CERT-2026-${eventDetails.title.toUpperCase().split(' ').slice(0, 2).join('-')}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        newCertificates.unshift({
          id: certId,
          certificate_number: certNum,
          event_id: id,
          event_title: eventDetails.title,
          student_name: r.user_name,
          issue_date: new Date().toISOString().split('T')[0],
          user_id: r.user_id,
          download_url: '#'
        });

        newNotifs.unshift({
          id: 'n_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          user_id: r.user_id,
          title: 'Sertifikat Diterbitkan!',
          message: `Selamat! Sertifikat Anda untuk event "${eventDetails.title}" telah diterbitkan.`,
          date: new Date().toISOString(),
          type: 'success',
          read: false
        });
      }
    });

    saveAndSetCertificates(newCertificates);
    saveAndSetNotifications(newNotifs);
  };

  // Event Operations (Student)
  const registerForEvent = (eventId: string): { success: boolean; message: string } => {
    if (!currentUser) {
      return { success: false, message: 'Anda harus login terlebih dahulu.' };
    }

    const event = events.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event tidak ditemukan.' };
    }

    if (event.status !== 'published') {
      return { success: false, message: 'Event belum dipublikasikan.' };
    }

    // Check if already registered
    const isAlreadyReg = registrations.some(r => r.event_id === eventId && r.user_id === currentUser.id && r.status !== 'cancelled');
    if (isAlreadyReg) {
      return { success: false, message: 'Anda sudah terdaftar di event ini.' };
    }

    if (event.registeredCount >= event.quota) {
      return { success: false, message: 'Kuota pendaftaran event sudah penuh.' };
    }

    // Register
    const newReg: Registration = {
      id: 'r_' + Date.now(),
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_email: currentUser.email,
      event_id: eventId,
      event_title: event.title,
      status: 'registered',
      attendance: 'pending',
      registered_at: new Date().toISOString()
    };

    saveAndSetRegistrations([...registrations, newReg]);

    // Increase registration count
    const updatedEvents = events.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e);
    saveAndSetEvents(updatedEvents);

    // Send success notification
    const newNotif: Notification = {
      id: 'n_' + Date.now(),
      user_id: currentUser.id,
      title: 'Pendaftaran Berhasil!',
      message: `Anda telah berhasil mendaftar untuk event: ${event.title}. Silakan cek riwayat pendaftaran Anda.`,
      date: new Date().toISOString(),
      type: 'success',
      read: false
    };
    saveAndSetNotifications([newNotif, ...notifications]);

    return { success: true, message: 'Pendaftaran berhasil!' };
  };

  const cancelRegistration = (regId: string) => {
    const reg = registrations.find(r => r.id === regId);
    if (!reg) return;

    // Decrease registered count
    const updatedEvents = events.map(e => e.id === reg.event_id ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e);
    saveAndSetEvents(updatedEvents);

    // Cancel registration
    const updatedRegs = registrations.map(r => r.id === regId ? { ...r, status: 'cancelled' as const } : r);
    saveAndSetRegistrations(updatedRegs);

    // Notify user
    const newNotif: Notification = {
      id: 'n_' + Date.now(),
      user_id: reg.user_id,
      title: 'Pendaftaran Dibatalkan',
      message: `Pendaftaran Anda untuk event: ${reg.event_title} telah dibatalkan.`,
      date: new Date().toISOString(),
      type: 'warning',
      read: false
    };
    saveAndSetNotifications([newNotif, ...notifications]);
  };

  const markAttendance = (regId: string, status: 'present' | 'absent') => {
    const updatedRegs = registrations.map(r => r.id === regId ? { ...r, attendance: status } : r);
    saveAndSetRegistrations(updatedRegs);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    saveAndSetNotifications(updated);
  };

  const clearAllNotifications = () => {
    if (!currentUser) return;
    const updated = notifications.filter(n => n.user_id !== currentUser.id);
    saveAndSetNotifications(updated);
  };

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole,
        mode,
        setMode,
        currentUser,
        setCurrentUser,
        users,
        events,
        registrations,
        notifications,
        certificates,
        
        login,
        logout,
        registerUser,
        deleteUser,
        
        createEvent,
        updateEvent,
        deleteEvent,
        publishEvent,
        finishEvent,
        
        registerForEvent,
        cancelRegistration,
        markAttendance,
        
        markNotificationAsRead,
        clearAllNotifications
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
