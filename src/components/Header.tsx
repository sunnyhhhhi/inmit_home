import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, Phone, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'main', label: 'MAIN', sub: '홈' },
    { id: 'portfolio', label: 'PORTFOLIO', sub: '포트폴리오' },
    { id: 'about', label: 'ABOUT', sub: '인미트 소개' },
    { id: 'contact', label: 'CONTACT', sub: '프로젝트 문의' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 py-3'
          : 'bg-white/90 backdrop-blur-xs border-b border-gray-100/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with attached image */}
          <button
            onClick={() => handleNavClick('main')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <img
              src="/assets/aistudio/inmit_logo2_67c270cc.png"
              alt="INMIT 인미트 디자인제작소"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <div className="border-l border-gray-200 pl-2.5 hidden sm:block">
              <span className="font-extrabold text-xs sm:text-sm text-gray-900 tracking-tight block">
                인미트 디자인제작소
              </span>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider">
                www.inmit.co.kr
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#7db701] bg-[#7db701]/10'
                      : 'text-gray-700 hover:text-gray-950 hover:bg-gray-50'
                  }`}
                >
                  <span className="tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#7db701] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Access (Password Protected) */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="관리자 모드"
            >
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">관리자</span>
            </button>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#7db701] hover:bg-[#6fa300] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer transform active:scale-95"
            >
              <span>프로젝트 문의</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg cursor-pointer"
              title="관리자"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-950 rounded-lg cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium text-base cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[#7db701]/10 text-[#7db701] font-bold'
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div>
                <span className="block text-sm tracking-wide font-bold">{item.label}</span>
                <span className="text-xs text-gray-500 font-normal">{item.sub}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 rounded-xl bg-[#7db701] text-white font-bold text-center text-sm shadow-xs cursor-pointer"
            >
              프로젝트 견적 문의하기
            </button>
            <a
              href="tel:010-9072-1005"
              className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-center text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#7db701]" />
              <span>전화 상담: 010-9072-1005</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
