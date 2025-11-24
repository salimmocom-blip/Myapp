
import React from 'react';
import { Home, PlusCircle, Package, Users, BarChart2, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasPermission } = useStore();

  // Check permissions
  const canViewReports = hasPermission('REPORTS');
  const canAddAnything = 
    hasPermission('SALES') || 
    hasPermission('PURCHASES') || 
    hasPermission('EXPENSES');

  const navItems = [
    { icon: Home, label: 'الرئيسية', path: '/', permission: 'ALWAYS_ALLOW' },
    { icon: Package, label: 'المخزون', path: '/inventory', permission: 'INVENTORY' },
    { icon: PlusCircle, label: 'إضافة', path: '/add', isMain: true, permission: 'ANY_ADD' },
    { icon: Users, label: 'العملاء', path: '/contacts', permission: 'CONTACTS' },
    // Dynamic Item: Shows 'Reports' if allowed, otherwise 'Settings' (always allowed)
    { 
        icon: canViewReports ? BarChart2 : Settings, 
        label: canViewReports ? 'تقارير' : 'إعدادات', 
        path: '/reports', 
        permission: 'ALWAYS_ALLOW' 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 dark:border-slate-700 border-t border-gray-200 pb-safe z-50 transition-colors">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          // Hide Main Add button if no add permissions
          if (item.isMain && !canAddAnything) return null;
          
          // Hide standard items if no permission (skip check for ALWAYS_ALLOW)
          if (!item.isMain && item.permission !== 'ALWAYS_ALLOW' && item.permission && !hasPermission(item.permission as any)) return null;

          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          if (item.isMain) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative -top-5 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all border-4 border-gray-50 dark:border-slate-900"
              >
                <Icon size={28} />
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-primary' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'
              }`}
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
