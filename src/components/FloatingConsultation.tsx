import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, Send, Check } from 'lucide-react';

interface FloatingConsultationProps {
  onNavigateContact: () => void;
}

export const FloatingConsultation: React.FC<FloatingConsultationProps> = ({
  onNavigateContact,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhoneCallOrCopy = () => {
    navigator.clipboard.writeText('010-9072-1005');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <aside aria-label="빠른 문의 및 상담" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-gray-700 shadow-md border border-gray-200 hover:border-[#7db701] hover:text-[#7db701] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="화면 맨 위로 이동"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct Call Button */}
      <a
        href="tel:010-9072-1005"
        className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#7c726e] hover:bg-[#6c635f] text-white text-xs font-bold shadow-lg transition-all hover:scale-102 border border-[#6b625e]"
        title="전화 걸기 010-9072-1005"
      >
        <div className="w-6 h-6 rounded-full bg-[#7db701] flex items-center justify-center text-white">
          <Phone className="w-3 h-3 fill-current" />
        </div>
        <span className="hidden sm:inline font-mono">010-9072-1005</span>
      </a>

      {/* KakaoTalk Direct Link */}
      <a
        href="https://open.kakao.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FEE500] hover:bg-[#fae100] text-[#191919] text-xs font-extrabold shadow-xl transition-all hover:scale-105"
        title="카카오톡 1:1 상담 바로가기"
      >
        <MessageCircle className="w-4 h-4 fill-current text-[#191919]" />
        <span className="tracking-tight">카톡 상담</span>
      </a>
    </aside>
  );
};
