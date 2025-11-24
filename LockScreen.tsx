import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Lock, Unlock } from 'lucide-react';

const LockScreen: React.FC = () => {
  const { unlockApp } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleNumberClick = (num: number) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      
      if (newPin.length === 4) {
        // Auto submit on 4th digit
        setTimeout(() => {
            const success = unlockApp(newPin);
            if (!success) {
                setError(true);
                setPin('');
            }
        }, 100);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-[9999] flex flex-col items-center justify-center p-6 text-white animate-fade-in">
        <div className="mb-8 flex flex-col items-center">
            <div className={`p-4 rounded-full bg-slate-800 mb-4 transition-all duration-300 ${error ? 'animate-bounce bg-red-900/50' : ''}`}>
                <Lock size={40} className={error ? 'text-red-500' : 'text-emerald-500'} />
            </div>
            <h1 className="text-2xl font-bold mb-2">تطبيق حساباتي</h1>
            <p className="text-gray-400 text-sm">أدخل رمز المرور للدخول</p>
        </div>

        {/* PIN Dots */}
        <div className="flex gap-4 mb-10">
            {[0, 1, 2, 3].map(i => (
                <div 
                    key={i} 
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        i < pin.length 
                        ? (error ? 'bg-red-500' : 'bg-emerald-500 scale-110') 
                        : 'bg-slate-700'
                    }`}
                />
            ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-xs" dir="ltr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className="w-16 h-16 rounded-full bg-slate-800 text-2xl font-bold hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto"
                >
                    {num}
                </button>
            ))}
            <div className="col-start-2">
                <button
                    onClick={() => handleNumberClick(0)}
                    className="w-16 h-16 rounded-full bg-slate-800 text-2xl font-bold hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto"
                >
                    0
                </button>
            </div>
            <div className="col-start-3">
                 <button
                    onClick={handleDelete}
                    className="w-16 h-16 rounded-full bg-transparent text-gray-400 hover:text-white flex items-center justify-center mx-auto"
                >
                    مسح
                </button>
            </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500">
            نسيت الرمز؟ قم بمسح بيانات المتصفح لإعادة تعيين التطبيق.
        </div>
    </div>
  );
};

export default LockScreen;