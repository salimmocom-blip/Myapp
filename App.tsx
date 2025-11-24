
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider, useStore, FREE_LIMITS } from './context/StoreContext';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Inventory from './pages/Inventory';
import Contacts from './pages/Contacts';
import Reports from './pages/Reports';
import Invoices from './pages/Invoices';
import AdminPanel from './pages/AdminPanel'; // Import AdminPanel
import LockScreen from './components/LockScreen';
import LoginScreen from './components/LoginScreen';
import { Crown, Star, X } from 'lucide-react';

const LimitModal: React.FC = () => {
    const { limitReachedType, clearLimitReached, storeProfile } = useStore();

    if (!limitReachedType) return null;

    let title = '';
    let message = '';
    let limit = 0;

    switch (limitReachedType) {
        case 'PRODUCTS':
            title = 'وصلت للحد الأقصى للمنتجات';
            limit = FREE_LIMITS.PRODUCTS;
            message = `عذراً، النسخة المجانية تسمح بإضافة ${limit} منتجات فقط.`;
            break;
        case 'CONTACTS':
            title = 'وصلت للحد الأقصى للعملاء';
            limit = FREE_LIMITS.CONTACTS;
            message = `عذراً، النسخة المجانية تسمح بإضافة ${limit} عملاء فقط.`;
            break;
        case 'TRANSACTIONS':
            title = 'وصلت للحد الأقصى للعمليات';
            limit = FREE_LIMITS.TRANSACTIONS;
            message = `عذراً، النسخة المجانية تسمح بإضافة ${limit} عملية فقط.`;
            break;
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
                 {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-100/50 to-transparent dark:from-amber-900/20"></div>
                
                <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30 ring-4 ring-white dark:ring-slate-800">
                        <Crown size={40} className="text-white" fill="currentColor" />
                    </div>

                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                        {title}
                    </h2>
                    
                    <p className="text-gray-500 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                        {message}
                        <br/>
                        <span className="text-amber-600 dark:text-amber-400 font-bold mt-2 block">
                            قم بترقية حسابك للاستمتاع بلا حدود!
                        </span>
                    </p>

                    <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-dashed border-gray-200 dark:border-slate-600 mb-6">
                        <p className="text-xs text-gray-400 mb-1">كود حسابك (ID)</p>
                        <p className="font-mono text-xl font-bold text-gray-800 dark:text-white tracking-wider">{storeProfile.id}</p>
                        <p className="text-[10px] text-gray-400 mt-1">تواصل مع الإدارة لتفعيل هذا الكود</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={clearLimitReached}
                            className="w-full py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-slate-700 dark:to-slate-800 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            حسناً، فهمت
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isLocked, currentUser } = useStore();
  
  // 1. Check Login
  if (!currentUser) {
    return <LoginScreen />;
  }

  // 2. Check Security Lock
  if (isLocked) {
      return <LockScreen />;
  }

  // Hide BottomNav on:
  // - AddTransaction page (/add)
  // - AdminPanel page (/admin-panel)
  const showNav = location.pathname !== '/add' && location.pathname !== '/admin-panel';

  return (
    <div className="max-w-md mx-auto bg-gray-50 dark:bg-slate-900 min-h-screen shadow-2xl relative overflow-hidden transition-colors duration-200">
      {children}
      <LimitModal />
      {showNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
