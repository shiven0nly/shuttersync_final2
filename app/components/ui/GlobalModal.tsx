'use client';

import { useModals } from '@/store/modal-context';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraIcon, CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export function GlobalModal() {
  const { state, dispatch } = useModals();

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <AnimatePresence>
      {state.isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white border-[4px] border-black p-8 md:p-12 max-w-sm w-full shadow-[20px_20px_0_0_#000] overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-zinc-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Content Based on Type */}
            <div className="flex flex-col items-center text-center">
              {state.type === 'LOGIN' && (
                <>
                  <div className="w-16 h-16 bg-blue-500 text-white border-[3px] border-black flex items-center justify-center mb-8 shadow-[4px_4px_0_0_#000] rotate-6">
                    <CameraIcon className="w-8 h-8 stroke-[3px]" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic mb-4">Auth_Required</h3>
                  <p className="font-bold text-slate-500 mb-10 leading-relaxed uppercase tracking-widest text-[10px]">
                    SIGN IN TO ACCESS THIS PREMIUM FEATURE.
                  </p>
                  <Link
                    href="/sign-in"
                    onClick={closeModal}
                    className="w-full py-4 bg-blue-500 border-[3px] border-black text-white text-lg font-black uppercase tracking-wider hover:bg-black transition-all shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                  >
                    SIGN_IN
                  </Link>
                </>
              )}

              {state.type === 'SUCCESS' && (
                <>
                  <div className="w-16 h-16 bg-blue-500 text-white border-[3px] border-black flex items-center justify-center mb-8 shadow-[4px_4px_0_0_#000] -rotate-6">
                    <CheckCircleIcon className="w-8 h-8 stroke-[3px]" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic mb-4">{state.title || 'SUCCESS!'}</h3>
                  <p className="font-bold text-slate-500 mb-10 leading-relaxed uppercase tracking-tighter">
                    {state.message || 'ACTION COMPLETED SUCCESSFULLY.'}
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full py-4 bg-black text-white text-lg font-black uppercase tracking-widest border-[3px] border-black shadow-[6px_6px_0_0_#3b82f6] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    AWESOME_
                  </button>
                </>
              )}

              {state.type === 'ERROR' && (
                <>
                  <div className="w-16 h-16 bg-red-500 text-white border-[3px] border-black flex items-center justify-center mb-8 shadow-[4px_4px_0_0_#000] rotate-12">
                    <ExclamationTriangleIcon className="w-8 h-8 stroke-[3px]" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic mb-4">ERROR_</h3>
                  <p className="font-bold text-red-500/70 mb-10 leading-relaxed uppercase tracking-widest text-[10px]">
                    {state.message || 'SOMETHING WENT WRONG. PLEASE TRY AGAIN.'}
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full py-4 bg-white border-[3px] border-black text-black text-lg font-black uppercase tracking-widest shadow-[6px_6px_0_0_#ef4444] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    TRY_AGAIN
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
