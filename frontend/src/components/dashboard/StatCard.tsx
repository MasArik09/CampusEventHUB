import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export default function StatCard({ label, value, icon: Icon, iconColor, bgColor }: StatCardProps) {
  return (
    <div className="glassmorphism p-5 rounded-2xl flex items-center gap-4 border border-border/60">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${bgColor}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}
