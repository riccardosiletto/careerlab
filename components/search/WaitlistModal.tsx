'use client';

import { useState, useEffect } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setEmail('');
    }, 300);
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (isValidEmail(email)) {
      setIsSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-all duration-300
        ${isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'}
      `}
      onClick={handleClose}
    >
      <div 
        className={`
          bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative
          transition-all duration-300
          ${isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F8F9FF] flex items-center justify-center text-[#8D96AC] hover:bg-[#E8EAF8] hover:text-[#5A607F] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {!isSubmitted ? (
          <>
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-[#D0E957] to-[#B6DC00] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D0E957]/30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#212746]">
                <path d="M12 3L1 9L12 15L23 9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 9V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 11V18C5 18 8 21 12 21C16 21 19 18 19 18V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-medium text-[#212746] text-center mb-2">
              Join the Waitlist
            </h3>
            <p className="text-[#5A607F] text-center mb-8">
              Be the first to know when "Search by Degree" launches!
            </p>

            {/* Email Input */}
            <div className="mb-6">
              <div className="relative bg-[#F8F9FF] rounded-xl border-2 border-[#E8EAF8] focus-within:border-[#6D7BFC] focus-within:shadow-[0_0_0_4px_rgba(109,123,252,0.1)] transition-all duration-300">
                <div className="flex items-center px-4 py-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8D96AC] mr-3">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="your.email@example.com"
                    className="flex-1 text-[#212746] placeholder-[#8D96AC] outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValidEmail(email)}
              className={`
                w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all duration-300
                ${isValidEmail(email) 
                  ? 'bg-gradient-to-r from-[#D0E957] to-[#B6DC00] text-[#212746] hover:shadow-lg hover:shadow-[#D0E957]/30' 
                  : 'bg-[#E8EAF8] text-[#8D96AC] cursor-not-allowed'
                }
              `}
            >
              <span>Join Waitlist</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Note */}
            <p className="text-xs text-[#8D96AC] text-center mt-4">
              We'll only email you about this feature launch. No spam, ever.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D0E957] to-[#B6DC00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D0E957]/30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[#212746]">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-[#212746] mb-2">
              You're on the list!
            </h3>
            <p className="text-[#5A607F] mb-6">
              We'll notify you at <span className="font-medium text-[#6D7BFC]">{email}</span> when this feature is ready.
            </p>
            <button
              onClick={handleClose}
              className="text-[#6D7BFC] font-medium hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}




