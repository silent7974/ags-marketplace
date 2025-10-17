import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SuccessModal({ onClose }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-[90%] max-w-[320px] text-center animate-fadeInScale"
      >
        <img src="/ags-logo.svg" alt="AGS Logo" className="mx-auto w-16 h-auto mb-4" />
        <CheckCircle size={48} className="text-green-600 mx-auto mb-2" />
        <h2 className="text-lg font-semibold text-[#000000] mb-1">Signup Successful 🎉</h2>
        <p className="text-sm text-[#000000]/50 mb-4">
          You’re now part of Malltiply. Sign in to start selling and growing.
        </p>
        <button
          onClick={() => router.push('/seller/signin')}
          className="bg-[#005770] text-white text-sm font-semibold px-4 py-2 rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}