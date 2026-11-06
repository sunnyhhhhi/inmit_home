import React, { useState, useEffect } from 'react';
import { Mail, Phone, Globe, ShieldCheck, Award, ExternalLink, ArrowUp, MapPin } from 'lucide-react';
import { getStoredCompanyInfo, CompanyInfo } from '../utils/storage';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onOpenCertModal: () => void;
  onOpenAdmin: () => void;
  onOpenTermsModal?: (tab: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  onOpenCertModal,
  onOpenAdmin,
  onOpenTermsModal,
}) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => getStoredCompanyInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setCompanyInfo(getStoredCompanyInfo());
    };
    window.addEventListener('inmit-company-info-updated', handleUpdate);
    return () => window.removeEventListener('inmit-company-info-updated', handleUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top certification banner */}
        <div className="bg-gray-800/80 border border-gray-700/60 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7db701]/20 border border-[#7db701]/40 flex items-center justify-center text-[#7db701] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-white text-base">공인 자격 및 공식 인증 스튜디오</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#7db701]/20 text-[#7db701] font-semibold border border-[#7db701]/30">
                  공식 인증
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                산업디자인전문회사(KIDP) 인가 및 여성기업 인증 보유로 공공기관 및 대기업 프로젝트의 안전한 수주가 가능합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCertModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
          >
            <span>인증서 사본 확인</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg shadow-xs flex items-center justify-center">
                <img
                  src="/assets/aistudio/inmit_logo2_67c270cc.png"
                  alt="INMIT 인미트 디자인제작소"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight block">
                  {companyInfo.companyName || '인미트 디자인제작소'}
                </span>
                <span className="text-[11px] text-[#7db701] font-mono">
                  {companyInfo.websiteUrl}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              인미트 디자인제작소는 브랜드의 본질을 꿰뚫는 전략과 정교한 완성도로 지속 가능한 비즈니스 가치를 창출합니다.
              패키지, 홍보인쇄물, 웹, 브랜딩부터 월 정기 디자인 구독 서비스까지 원스톱으로 책임집니다.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800 text-xs text-gray-300 border border-gray-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7db701]" />
                산업디자인전문회사
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800 text-xs text-gray-300 border border-gray-700">
                <Award className="w-3.5 h-3.5 text-[#7db701]" />
                여성기업 인증
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800 text-xs text-gray-300 border border-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                인쇄 감리 직발주
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Sitemap</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('main');
                    scrollToTop();
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  메인 홈 (MAIN)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    scrollToTop();
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  인미트 소개 (ABOUT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('portfolio');
                    scrollToTop();
                  }}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  포트폴리오 (PORTFOLIO)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    scrollToTop();
                  }}
                  className="text-[#7db701] hover:underline font-semibold transition-colors cursor-pointer"
                >
                  프로젝트 문의 (CONTACT)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-gray-200 tracking-wider uppercase">Contact Details</h4>
            <div className="space-y-2.5 text-sm text-gray-400">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-[#7db701] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{companyInfo.email}</span>
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-[#7db701] shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-gray-200">{companyInfo.phone}</span>
              </a>
              <a
                href={companyInfo.websiteUrl.startsWith('http') ? companyInfo.websiteUrl : `https://${companyInfo.websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-[#7db701] shrink-0">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span className="underline underline-offset-4 decoration-gray-600 group-hover:decoration-[#7db701] truncate">
                  {companyInfo.websiteUrl}
                </span>
                <ExternalLink className="w-3 h-3 text-gray-500 shrink-0" />
              </a>

              {/* Company Address */}
              <div className="flex items-start gap-2.5 text-xs text-gray-300 pt-1">
                <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7db701]" />
                </div>
                <div className="space-y-0.5 leading-snug">
                  <p className="text-gray-200 font-semibold">{companyInfo.address}</p>
                  {companyInfo.addressDetail && (
                    <p className="text-gray-400 text-[11px]">{companyInfo.addressDetail}</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-gray-500 block">
                  운영시간: {companyInfo.businessHours || '평일 09:30 ~ 18:30 (점심 12:30 ~ 13:30)'}
                </span>
                <span className="text-xs text-[#7db701] block mt-0.5">
                  온라인 문의 접수는 24시간 언제든 가능합니다.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & admin */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>© {new Date().getFullYear()} INMIT (인미트 디자인제작소). All Rights Reserved. 산업디자인전문회사 · 여성기업인증</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {onOpenTermsModal && (
              <>
                <button
                  onClick={() => onOpenTermsModal('terms')}
                  className="hover:text-gray-300 transition-colors cursor-pointer underline underline-offset-2"
                >
                  기본이용약관
                </button>
                <span className="text-gray-700">|</span>
                <button
                  onClick={() => onOpenTermsModal('privacy')}
                  className="hover:text-gray-300 transition-colors cursor-pointer underline underline-offset-2"
                >
                  개인정보처리방침
                </button>
                <span className="text-gray-700">|</span>
              </>
            )}
            <button
              onClick={onOpenAdmin}
              className="hover:text-gray-300 transition-colors cursor-pointer underline underline-offset-2"
            >
              관리자 모드
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#7db701] transition-colors cursor-pointer"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
