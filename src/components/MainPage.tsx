import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Eye,
  Phone,
  Building2
} from 'lucide-react';
import { PortfolioItem, PartnerClient } from '../types/portfolio';
import { MainHeroQuoteForm } from './MainHeroQuoteForm';

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
  // Selected works: representative works from the 4 categories
  const selectedWorks = portfolios
    .filter((p) => p.isFeatured)
    .slice(0, 8);

  const displayWorks = selectedWorks.length >= 4 ? selectedWorks : portfolios.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* =========================================================================
          [1. 최상단] 히어로 영역 & 메인 즉시 견적 문의 폼
          ========================================================================= */}
      <section className="relative pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden border-b border-gray-100 bg-gradient-to-b from-white via-gray-50/40 to-white">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Copy & Brand Identity */}
            <div className="lg:col-span-6 space-y-6 lg:pt-2">
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7db701]/10 border border-[#7db701]/25 text-gray-900 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#7db701] animate-pulse" />
                <span className="font-extrabold text-[#7db701]">INMIT</span>
                <span>인미트 디자인제작소 · 디자인 구독 서비스 시작</span>
                <span className="text-gray-400">|</span>
                <button
                  onClick={onOpenCertModal}
                  className="text-gray-700 hover:text-black hover:underline font-bold inline-flex items-center gap-0.5 cursor-pointer"
                >
                  공인 인증 보기
                </button>
              </div>

              {/* Main Catchphrase */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-[1.18]">
                  브랜드의 가치를 높이는 <br />
                  <span className="relative inline-block text-gray-900">
                    감각적이고 전략적인
                    <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#7db701]/20 -z-10 rounded-sm" />
                  </span>{' '}
                  <span className="text-[#7db701]">시각 디자인</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl font-normal pt-1">
                  <strong>인미트 디자인제작소(INMIT)</strong>는 비즈니스 성과를 창출하는
                  <strong> 기획 · 패키지 디자인 · 홍보물 인쇄 · 상세페이지 제작</strong>
                </p>
              </div>

              {/* NEW: 디자인 구독 서비스 시작 부각 카드 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#7c726e] text-white border border-[#6b625e] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black tracking-wide border border-white/30">
                    <Sparkles className="w-3 h-3 text-[#7db701]" />
                    <span>디자인 구독 서비스 시작</span>
                  </div>
                  <span className="text-[11px] text-white/80 font-medium">1:1 전담 디자이너 파트너십</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  건별 계약 없이 월 단위로 필요한 디자인을 자유롭게 의뢰하세요
                </h3>
                <p className="text-xs text-white/90 mt-1 leading-relaxed font-light">
                  패키지, 홍보인쇄물, 웹 상세페이지, 그래픽까지 전담 디자이너가 빠르고 정교하게 제작하며 평생 사후 AS를 보장합니다.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/20 text-[11px]">
                  <div className="bg-black/15 rounded-lg p-2 text-center">
                    <span className="text-white/70 block text-[10px]">기획부터 출력까지</span>
                    <strong className="text-white font-bold">원스톱디자인</strong>
                  </div>
                  <div className="bg-black/15 rounded-lg p-2 text-center">
                    <span className="text-white/70 block text-[10px]">전담 케어</span>
                    <strong className="text-[#7db701] font-bold">1:1 디자이너</strong>
                  </div>
                  <div className="bg-black/15 rounded-lg p-2 text-center">
                    <span className="text-white/70 block text-[10px]">품질 보증</span>
                    <strong className="text-white font-bold">사후 AS 평생</strong>
                  </div>
                </div>
              </div>

              {/* Official website & hotline */}
              <div className="p-4 rounded-2xl bg-[#7c726e] text-white shadow-lg border border-[#6b625e] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-white/80 font-mono tracking-wider block">
                    OFFICIAL DOMAIN
                  </span>
                  <a
                    href="http://www.inmit.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:underline transition-colors"
                  >
                    www.inmit.co.kr
                  </a>
                </div>
                <a
                  href="tel:010-9072-1005"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white font-bold self-start sm:self-auto border border-white/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7db701]" />
                  <span>010-9072-1005</span>
                </a>
              </div>
            </div>

            {/* Right: Embedded Direct Quote Inquiry Form (메인에 링크없이 바로 보이는 견적 신청 폼) */}
            <div className="lg:col-span-6">
              <MainHeroQuoteForm onOpenTermsModal={onOpenTermsModal} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          [2. 상단 배치] 포트폴리오 (PORTFOLIO - 미리보기도 이미지만 나오게 제작)
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#7db701] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PORTFOLIO SHOWCASE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                포트폴리오
              </h2>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7db701] hover:underline cursor-pointer"
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

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>포트폴리오 갤러리 더보기</span>
              <ArrowUpRight className="w-4 h-4 text-[#7db701]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          [3. 하단 배치] 파트너사 (주거래 파트너사 모음)
          5단계 프로세스는 삭제되고 파트너사가 가장 하단에 배치됨
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gray-50/70 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#7db701] uppercase">TRUSTED PARTNERS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
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
          [4. 하단 콜투액션 배너]
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#7c726e] text-white shadow-2xl relative overflow-hidden border border-[#6b625e]">
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-center mb-4">
              <div className="bg-white p-2 rounded-xl shadow-xs">
                <img
                  src="/assets/aistudio/inmit_logo2_67c270cc.png"
                  alt="INMIT"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
              당신의 다음 프로젝트를 <br />
              <span className="text-[#7db701]">함께할 준비가 되어 있습니다.</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/90 mt-3 max-w-xl mx-auto font-light leading-relaxed">
              아이디어 단계여도 괜찮습니다. 체계적인 디자인 전문성과 맞춤 구독 서비스를 바탕으로 최적의 제작 견적과 일정을 맞춤 제안해 드립니다.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#7db701] hover:bg-[#6ea100] text-white text-sm font-extrabold shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>견적 및 일정 문의하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:010-9072-1005"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-[#7db701]" />
                <span>전화 직통 상담: 010-9072-1005</span>
              </a>
            </div>

            <p className="text-[11px] text-white/70 mt-5">
              * 공식 웹사이트: <a href="http://www.inmit.co.kr" target="_blank" rel="noopener noreferrer" className="text-white underline">www.inmit.co.kr</a> | 이메일: addition9@naver.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
