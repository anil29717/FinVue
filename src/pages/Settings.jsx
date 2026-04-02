import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  ChevronRight, 
  Moon, 
  Globe, 
  Mail, 
  Camera,
  Trash2
} from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

const SettingHeader = ({ icon: Icon, title, description }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-400 font-medium">{description}</p>
    </div>
  </div>
);

const SettingRow = ({ label, value, icon: Icon, toggle, danger }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer">
    <div className="flex items-center gap-3">
      {Icon && <Icon size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />}
      <span className={`text-sm font-bold ${danger ? 'text-rose-500' : 'text-gray-700'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {value && <span className="text-xs font-bold text-gray-400">{value}</span>}
      {toggle ? (
        <div className="w-10 h-6 bg-blue-600 rounded-full p-1 flex justify-end">
          <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      ) : (
        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
      )}
    </div>
  </div>
);

const Section = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    {children}
  </div>
);

export default function Settings() {
  const { state } = useTransactions();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 text-sm">Manage your profile, security, and notification preferences.</p>
      </header>

      {/* Profile Section */}
      <Section>
        <SettingHeader icon={User} title="Personal Information" description="Update your profile photo and personal details." />
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border-4 border-white shadow-xl overflow-hidden">
               {/* Profile Image Placeholder */}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full border-2 border-white shadow-lg hover:bg-blue-700 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-lg font-bold text-gray-900">Alex Sterling</h4>
            <p className="text-sm text-gray-500 flex items-center gap-1"><Mail size={14} /> alex.sterling@finvue.io</p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase tracking-widest">{state.role}</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg uppercase tracking-widest text-[10px]">Verified</span>
            </div>
          </div>
          <button className="btn-primary text-sm">Edit Profile</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingRow label="Full Name" value="Alex Sterling" />
          <SettingRow label="Email Address" value="alex.sterling@finvue.io" />
        </div>
      </Section>

      {/* App Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section>
          <SettingHeader icon={Bell} title="Notifications" description="Keep up to date with your financial activity." />
          <div className="space-y-4">
            <SettingRow label="Push Notifications" toggle />
            <SettingRow label="Email Summary" value="Weekly" />
            <SettingRow label="SMS Alerts" value="Disabled" />
          </div>
        </Section>

        <Section>
          <SettingHeader icon={Globe} title="General" description="Basic app preferences and language." />
          <div className="space-y-4">
            <SettingRow label="Currency" value="USD ($)" />
            <SettingRow label="Language" value="English" />
            <SettingRow label="Dark Mode" value="Auto" />
          </div>
        </Section>
      </div>

      {/* Security & Danger Zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section>
          <SettingHeader icon={Shield} title="Security" description="Passwords and two-factor authentication." />
          <div className="space-y-4">
            <SettingRow label="Two-Factor Auth" value="Enabled" />
            <SettingRow label="Change Password" />
            <SettingRow label="Active Sessions" value="2 Devices" />
          </div>
        </Section>

        <Section>
          <SettingHeader icon={Trash2} title="Danger Zone" description="Irreversible account actions." />
          <div className="space-y-4">
            <SettingRow label="Export Data" value="JSON" />
            <SettingRow label="Clear All History" danger />
            <SettingRow label="Deactivate Account" danger />
          </div>
        </Section>
      </div>
    </div>
  );
}
