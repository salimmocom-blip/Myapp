
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { 
  ArrowLeft, Wallet, TrendingUp, Package, Users, 
  BarChart2, Phone, CheckCircle2, DollarSign, ShoppingCart,
  Moon, Sun, ShieldCheck
} from 'lucide-react';

const LoginScreen: React.FC = () => {
  const { login, darkMode, toggleDarkMode } = useStore();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    const cleanPhone = phone.trim();
    if (cleanPhone.length !== 11 || !cleanPhone.startsWith('01')) {
      setError('رقم الهاتف غير صحيح');
      return;
    }
    login(cleanPhone);
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && phone.length === 11) {
      handleLogin();
    }
  };

  // مكون فرعي لبطاقات الخلفية الوهمية
  const MockCard = ({ icon: Icon, value, color, delay }: any) => (
    <div className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-3 transform rotate-[-6deg] opacity-60 hover:opacity-100 transition-all duration-1000 animate-float ${delay}`}>
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
      <div>
        <div className="h-2 w-16 bg-gray-200 dark:bg-slate-600 rounded mb-1"></div>
        <div className="h-4 w-10 bg-gray-300 dark:bg-slate-500 rounded font-bold text-xs">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden transition-colors font-['Cairo']">
      
      {/* --- Theme Toggle Button --- */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 left-6 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-yellow-400 transition-transform hover:scale-110 active:scale-95"
        title="تبديل المظهر"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* --- Dynamic App Preview Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/80 to-gray-50 dark:via-slate-950/80 dark:to-slate-950 z-10"></div>
          
          {/* Grid of Mock Widgets mimicking the Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 scale-110 opacity-30 dark:opacity-20 blur-[2px]">
              <MockCard icon={TrendingUp} value="+5000" color="bg-emerald-500" delay="animate-delay-100" />
              <MockCard icon={Package} value="150" color="bg-blue-500" delay="animate-delay-300" />
              <MockCard icon={Users} value="24" color="bg-purple-500" delay="animate-delay-500" />
              
              <MockCard icon={ShoppingCart} value="-1200" color="bg-red-500" delay="animate-delay-200" />
              <MockCard icon={BarChart2} value="Stats" color="bg-orange-500" delay="animate-delay-400" />
              <MockCard icon={Wallet} value="Cash" color="bg-teal-500" delay="animate-delay-100" />
              
              <MockCard icon={DollarSign} value="$" color="bg-indigo-500" delay="animate-delay-300" />
              <MockCard icon={CheckCircle2} value="Done" color="bg-green-500" delay="animate-delay-500" />
              <MockCard icon={TrendingUp} value="High" color="bg-emerald-500" delay="animate-delay-200" />
          </div>
      </div>

      {/* --- Main Glass Login Card --- */}
      <div className={`
          relative z-20 w-full max-w-md p-6 sm:p-8
          bg-white/80 dark:bg-slate-900/80 
          backdrop-blur-xl 
          border border-white/50 dark:border-slate-700/50 
          shadow-2xl dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]
          rounded-3xl
          transition-all duration-700 ease-out transform
          flex flex-col
          ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
      `}>
        
        {/* Header & Logo */}
        <div className="flex flex-col items-center mb-8">
             <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                 <Wallet size={40} className="text-white" />
             </div>
             <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">حساباتي</h1>
             <p className="text-gray-500 dark:text-gray-400 text-sm">نظام إدارة مالي متكامل</p>
        </div>

        {/* Features Icons Row */}
        <div className="flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50 p-4 rounded-2xl mb-8 border border-gray-100 dark:border-slate-700/50">
            <div className="flex flex-col items-center gap-1 group">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-110 transition-transform"><TrendingUp size={18} /></div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">مبيعات</span>
            </div>
            <div className="flex flex-col items-center gap-1 group">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform"><ShoppingCart size={18} /></div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">مشتريات</span>
            </div>
            <div className="flex flex-col items-center gap-1 group">
                <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl group-hover:scale-110 transition-transform"><Package size={18} /></div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">مخزون</span>
            </div>
            <div className="flex flex-col items-center gap-1 group">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-110 transition-transform"><BarChart2 size={18} /></div>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">تقارير</span>
            </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
            <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                    <Phone className={`w-5 h-5 transition-colors ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-emerald-500'}`} />
                </div>
                <input 
                    type="tel"
                    value={phone}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                        setPhone(val);
                        setError('');
                    }}
                    placeholder="رقم الهاتف (01xxxxxxxxx)"
                    className={`
                        w-full py-4 pr-12 pl-4 
                        bg-gray-50 dark:bg-slate-950 
                        border-2 ${error ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-emerald-500'} 
                        rounded-xl outline-none 
                        text-lg font-bold text-gray-800 dark:text-white text-right
                        shadow-inner transition-all
                        placeholder:text-gray-400 dark:placeholder:text-slate-600
                        font-mono
                    `}
                    dir="ltr" // Keep LTR for number input feel but right align text
                    autoFocus
                />
                {error && (
                    <p className="absolute -bottom-5 right-1 text-xs text-red-500 font-bold animate-pulse">{error}</p>
                )}
            </div>

            <button 
                onClick={handleLogin}
                className={`
                    w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg 
                    flex items-center justify-center gap-2
                    transition-all duration-300 active:scale-[0.98]
                    ${phone.length === 11 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/30 hover:to-emerald-500' 
                        : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-slate-500 cursor-not-allowed shadow-none'
                    }
                `}
                disabled={phone.length !== 11}
            >
                <span>تسجيل الدخول</span>
                <ArrowLeft size={20} className={phone.length === 11 ? 'animate-pulse' : ''} />
            </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-start gap-3 p-3 bg-emerald-50/50 dark:bg-slate-800/50 rounded-xl border border-emerald-100/50 dark:border-slate-700/50">
            <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={18} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200">حسابك مرتبط برقم الهاتف</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-4">
                    جميع بيانات المبيعات، الفواتير، والمخزون يتم حفظها وتشفيرها تلقائياً وربطها بهذا الرقم لضمان سهولة الوصول إليها.
                </p>
            </div>
        </div>

      </div>

      <div className="absolute bottom-6 text-center z-20 opacity-40">
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">SECURE ACCESS v2.0</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: rotate(-6deg) translateY(0); }
          50% { transform: rotate(-6deg) translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-delay-100 { animation-delay: 0.5s; }
        .animate-delay-200 { animation-delay: 1s; }
        .animate-delay-300 { animation-delay: 1.5s; }
        .animate-delay-400 { animation-delay: 2s; }
        .animate-delay-500 { animation-delay: 2.5s; }
      `}</style>
    </div>
  );
};

export default LoginScreen;
