import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Eye,
  Phone,
  CheckCircle2,
  Award,
  ShieldCheck,
  Send,
  Clock,
  ExternalLink
} from 'lucide-react';
import { PortfolioItem, PartnerClient } from '../types/portfolio';
import { MainHeroQuoteForm } from './MainHeroQuoteForm';
import { getStoredCompanyInfo, CompanyInfo } from '../utils/storage';

interface MainPageProps {
  portfolios: PortfolioItem[];
  partners: PartnerClient[];
  onSelectProject: (project: PortfolioItem) => void;
  onNavigate: (page: string) => void;
  onOpenCertModal: () => void;
  onOpenTermsModal: (tab: 'terms' | 'privacy') => void;
}

export const MainPage: React.FC<MainPageProps> = ({
  portfolios,
  partners,
  onSelectProject,
  onNavigate,
  onOpenCertModal,
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

  // Representative works for portfolio showcase
  const selectedWorks = portfolios
    .filter((p) => p.isFeatured)
    .slice(0, 8);

  const displayWorks = selectedWorks.length >= 4 ? selectedWorks : portfolios.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* =========================================================================
          [블럭 1] 회사소개 (Company Introduction & Brand Story Block)
          ========================================================================= */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 border-b border-gray-100 bg-gradient-to-b from-white via-stone-50/40 to-white overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
          {/* Hero Header */}
          <div className="max-w-4xl space-y-5">
            {/* Trust Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7db701]/10 border border-[#7db701]/25 text-gray-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#7db701] animate-pulse" />
              <span className="font-extrabold text-[#7db701]">INMIT</span>
              <span>인미트 디자인제작소 · 디자인 구독 서비스 시작</span>
              <span className="text-gray-300">|</span>
              <button
                onClick={onOpenCertModal}
                className="text-gray-700 hover:text-black hover:underline font-bold inline-flex items-center gap-0.5 cursor-pointer"
              >
                공인 인증 보기
              </button>
            </div>

            {/* Main Catchphrase */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.16]">
              브랜드의 가치를 높이는 <br />
              <span className="relative inline-block text-gray-900">
                감각적이고 전략적인
                <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#7db701]/25 -z-10 rounded-sm" />
              </span>{' '}
              <span className="text-[#7db701]">시각 디자인</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-3xl">
              <strong>인미트 디자인제작소(INMIT)</strong>는 비즈니스 목적에 부합하는
              <strong> 기획 · 패키지 지기구조 · 인쇄소 현장 감리 · 웹 구현</strong>까지 원스톱으로 책임지는 전문 디자인 스튜디오입니다.
            </p>
          </div>

          {/* Simple & Clean 3 Core Features (정부 공인 인증 / 전단케어 / 디자인 구독 서비스) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* 1. 정부 공인 인증 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-[#eae2d5] flex items-center justify-between gap-4 transition-all hover:border-[#7db701] shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#eae2d5] text-[#7db701] flex items-center justify-center shrink-0 shadow-2xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-950">정부 공인 인증</h3>
                  <p className="text-xs text-gray-500 mt-0.5">산업디자인전문회사 · 여성기업 확인</p>
                </div>
              </div>
              <button
                onClick={onOpenCertModal}
                className="text-[11px] font-bold text-[#7db701] hover:underline shrink-0 cursor-pointer"
              >
                인증서 보기
              </button>
            </div>

            {/* 2. 전단케어 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-[#eae2d5] flex items-center gap-3.5 transition-all hover:border-[#7db701] shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#eae2d5] text-[#7db701] flex items-center justify-center shrink-0 shadow-2xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-950">전단케어</h3>
                <p className="text-xs text-gray-500 mt-0.5">1:1 전담 디자이너 맞춤 설계 & 평생 사후 AS</p>
              </div>
            </div>

            {/* 3. 디자인 구독 서비스 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fbf8f3] border border-[#eae2d5] flex items-center justify-between gap-4 transition-all hover:border-[#7db701] shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#eae2d5] text-[#7db701] flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-950">디자인 구독 서비스</h3>
                  <p className="text-xs text-gray-500 mt-0.5">월 단위 필요한 디자인 무제한 의뢰</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="text-[11px] font-bold text-[#7db701] hover:underline shrink-0 cursor-pointer"
              >
                구독 문의
              </button>
            </div>
          </div>

          {/* Simple Navigation / Domain Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="font-mono text-gray-400">DOMAIN</span>
              <a
                href={companyInfo.websiteUrl.startsWith('http') ? companyInfo.websiteUrl : `https://${companyInfo.websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-900 hover:text-[#7db701] underline"
              >
                {companyInfo.websiteUrl}
              </a>
              <span className="text-gray-300">|</span>
              <span>사람(人)과 함께(mit)하는 디자인제작소</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('about')}
                className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold border border-gray-200 transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>회사소개 더보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white font-bold transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          [블럭 2] 포트폴리오 (Portfolio Showcase Block)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#7db701] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PORTFOLIO SHOWCASE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                포트폴리오
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                클릭 시 모든 텍스트 없이 고화질 원본 시안 이미지만 자유로운 비율로 열람하실 수 있습니다.
              </p>
            </div>

            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7db701] hover:underline cursor-pointer self-start sm:self-auto"
            >
              <span>전체 작업물 보기 ({portfolios.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Portfolio Grid: ONLY IMAGES (모든 텍스트 삭제, 이미지만 노출) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayWorks.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="group relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-xl hover:border-[#7db701] transition-all duration-300 cursor-pointer aspect-square transform hover:-translate-y-1"
                title="클릭하여 이미지 크게 보기"
              >
                {/* Pure Image Card: No Text */}
                <img
                  src={item.thumbnail}
                  alt="포트폴리오 작업물"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Hover Overlay with Eye Icon */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-[#7db701] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>포트폴리오 갤러리 더보기</span>
              <ArrowUpRight className="w-4 h-4 text-[#7db701]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          [블럭 3] 주거래 파트너사 (Trusted Partners Block)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-stone-50/60 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#7db701] uppercase">TRUSTED PARTNERS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
              주거래 파트너사
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              공공기관, 중견기업부터 프리미엄 소비재 브랜드까지 신뢰로 함께해 온 주요 거래처입니다.
            </p>
          </div>

          {/* Partner Logos Grid - ONLY LOGOS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl h-24 sm:h-28 px-4 py-3 border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-[#7db701] transition-all duration-300 flex items-center justify-center text-center group"
                title={partner.name}
              >
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name || '파트너사 로고'}
                    className="max-h-14 max-w-[90%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="font-extrabold text-xs sm:text-sm tracking-tight text-gray-700 group-hover:text-gray-950 transition-colors">
                      {partner.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          [블럭 4] 맞춤견적설정 (Custom Quote Inquiry Block)
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Block Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-bold uppercase tracking-wider mb-3">
              <Send className="w-3.5 h-3.5" />
              <span>CUSTOM QUOTE & ESTIMATE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
              맞춤견적설정
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2.5 leading-relaxed">
              아이디어 단계여도 괜찮습니다. 업체명, 담당자 정보, 예산 금액 및 원하는 서비스 내용을 기재해 주시면<br className="hidden sm:inline" />
              전문 디자이너가 검토 후 <strong>24시간 이내</strong>에 맞춤 견적과 일정을 제안해 드립니다.
            </p>
          </div>

          {/* Dedicated Quote Form Container with Soft Beige background */}
          <div className="max-w-4xl mx-auto bg-[#fbf8f3] rounded-3xl p-6 sm:p-10 border border-[#eae2d5] shadow-sm">
            <MainHeroQuoteForm onOpenTermsModal={onOpenTermsModal} />
          </div>

          {/* Bottom Hotline / Quick Support Banner in Soft Beige */}
          <div className="max-w-4xl mx-auto mt-8 p-6 sm:p-8 rounded-2xl bg-[#f8f4ee] border border-[#eae2d5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-700">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-1.5">
                <Clock className="w-4 h-4 text-[#7db701]" />
                <span>급한 일정이나 제작 상담이 필요하신가요?</span>
              </p>
              <p className="text-gray-500 text-xs">
                유선 전화 또는 카카오톡으로도 언제든 상담이 가능합니다. (공식 도메인: www.inmit.co.kr)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:010-9072-1005"
                className="px-4 py-2.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4" />
                <span>010-9072-1005</span>
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800 font-bold border border-[#eae2d5] transition-colors cursor-pointer"
              >
                문의 페이지 이동
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
