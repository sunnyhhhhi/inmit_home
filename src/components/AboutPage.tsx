import React, { useState, useEffect } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Printer,
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  FileCheck2,
  ExternalLink,
  Users,
  Briefcase
} from 'lucide-react';
import { CompanyMap } from './CompanyMap';
import { getStoredCompanyInfo, CompanyInfo } from '../utils/storage';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenCertModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenCertModal }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => getStoredCompanyInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setCompanyInfo(getStoredCompanyInfo());
    };
    window.addEventListener('inmit-company-info-updated', handleUpdate);
    return () => window.removeEventListener('inmit-company-info-updated', handleUpdate);
  }, []);

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* 1. Header Section */}
      <section className="border-b border-gray-100 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-bold tracking-wider uppercase mb-4">
              ABOUT INMIT
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              비즈니스의 성장을 이끄는 <br />
              <span className="text-[#7db701]">전략적 시각 디자인</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-6 leading-relaxed">
              우리는 단순히 보기에 예쁜 그림을 그리는 것에 머무르지 않습니다. <br className="hidden sm:inline" />
              현장에서 축적된 실무 전문성과 체계적인 프로세스를 바탕으로, 클라이언트의 제품이 시장에서 돋보이고 실제로 팔리며,
              브랜드의 가치를 오랫동안 지켜낼 수 있는 <strong>목적 있는 디자인 솔루션</strong>을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Story & Name Identity (人 + mit) */}
      <section className="py-14 sm:py-16 border-b border-gray-100 bg-gradient-to-br from-gray-50 via-white to-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7db701]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-black tracking-wider uppercase">
                BRAND NAME & IDENTITY
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl text-[#7db701] font-black">人</span>
                <span className="text-2xl sm:text-3xl text-gray-400 font-light">+</span>
                <span className="text-4xl sm:text-5xl text-gray-900 font-black">mit</span>
              </h2>
              <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed pt-2">
                사람을 이르는 한자 '人' 과 함께를 나타내는 독일어 'mit'의 합성어로 사람과 사람을 함께 잇고, 비즈니스를 성공으로 이끌어 나가는 Client의 성공적인 비즈니스 파트너가 되겠습니다.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                클라이언트와 소비자가 함께 함으로 연결되는 오늘이 있는 이곳, 내일을 잇는 이곳은 인미트입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Philosophy & Greeting Section */}
      <section className="py-16 sm:py-20 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#7db701] uppercase tracking-wider">
                OUR PHILOSOPHY & VISION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                "디자인은 단순한 장식이 아닌, <br />
                가장 강력한 비즈니스 커뮤니케이션입니다."
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  패키지의 지기구조 하나, 리플렛의 접지 방식, 웹 인터페이스의 버튼 위치 하나까지도 사용자의 경험과 제품의 단가, 납품 일정, 인쇄 구현성을 모두 고려해야 합니다.
                </p>
                <p>
                  인미트 디자인제작소는 디자이너의 자기만족에 갇히지 않고, 기획 초기 단계부터 인쇄소 인쇄 감리 현장, 그리고 온라인 사용자 접점에 이르기까지 끝까지 책임지는 철저한 장인정신으로 임합니다.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#7db701]" />
                  <span>비즈니스 KPI 맞춤 설계</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#7db701]" />
                  <span>사후 AS 평생 가능</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#7db701]" />
                  <span>원스톱 책임 감리 및 제작</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1542744094-3a31727221eb?auto=format&fit=crop&w=1200&q=85"
                  alt="디자인 스튜디오 작업 및 감리 회의"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs text-[#7db701] font-bold">PROFESSIONAL WORKSPACE</p>
                    <p className="text-base font-bold">전문 실무 노하우가 깃든 디자인 & 감리 파이프라인</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Competencies (핵심 역량) */}
      <section className="py-20 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#7db701] tracking-widest uppercase">CORE COMPETENCIES</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">인미트 디자인제작소만의 핵심 경쟁력</h2>
            <p className="text-sm text-gray-500 mt-2">
              체계적인 실무에서 다져진 깊이와 유연함으로 프로젝트의 모든 여정을 성공으로 이끕니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Competency 1: 디자인 구독 서비스 시작 */}
            <div className="p-8 rounded-2xl border-2 border-[#7db701]/40 bg-white hover:border-[#7db701] shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-[#7db701] text-white text-[10px] font-black tracking-wider uppercase">
                  NEW
                </span>
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#7db701]/10 flex items-center justify-center text-[#7db701] mb-6 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7db701] transition-colors">
                  디자인 구독 서비스 시작
                </h3>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  건별 계약의 번거로움과 내부 채용 부담 없이, 월 단위 정기 구독으로 필요한 패키지, 홍보인쇄물, 웹, 그래픽 디자인을 전담 디자이너에게 자유롭게 요청하고 빠른 납품을 받으실 수 있습니다.
                </p>
              </div>
              <ul className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                  <span className="font-bold text-gray-900">무제한 디자인 의뢰 가능</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                  <span className="font-bold text-[#7db701]">사후 AS 평생 가능 보장</span>
                </li>
              </ul>
            </div>

            {/* Competency 2 */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-[#7db701] shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#7db701]/10 flex items-center justify-center text-[#7db701] mb-6 group-hover:scale-105 transition-transform">
                  <Printer className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7db701] transition-colors">
                  원스톱(One-Stop) 완결형 실행력
                </h3>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  기획 ➔ 지기구조 설계 ➔ 그래픽 디자인 ➔ 인쇄소 현장 색상 감리 ➔ 웹사이트 퍼블리싱까지 별도 외주 없이 한 곳에서 책임집니다. 외주 다원화로 인한 비용 낭비와 의사소통 미스를 원천 차단합니다.
                </p>
              </div>
              <ul className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                  <span>인쇄소 직접 감리 (별색 조색/후가공)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                  <span>반응형 웹 UI/UX 개발 연계</span>
                </li>
              </ul>
            </div>

            {/* Competency 3 */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:border-[#7db701] shadow-2xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#7db701]/10 flex items-center justify-center text-[#7db701] mb-6 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7db701] transition-colors">
                  공인 자격 & 법적 신뢰성
                </h3>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  한국디자인진흥원(KIDP) 공인 산업디자인전문회사 및 중소벤처기업부 여성기업 인증을 보유하고 있어, 공공 조달, 수의계약, 디자인 바우처 등 모든 제도권 사업에 적격합니다.
                </p>
              </div>
              <ul className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                  <span>산업디자인전문회사 신고필증</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7db701]" />
                  <span>여성기업 확인서 (수의계약 우대)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certifications Showcase (보유 자격 및 인증) */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#7db701] uppercase tracking-wider">OFFICIAL ACCREDITATIONS</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  보유 자격 및 정부 공인 인증
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  법적 기준과 전문성 평가를 통과한 신뢰할 수 있는 파트너입니다.
                </p>
              </div>
              <button
                onClick={onOpenCertModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer self-start md:self-auto"
              >
                <span>인증서 사본 확인하기</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Badge 1 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#7db701]/30 flex items-center justify-center text-[#7db701] shadow-2xs shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">산업디자인전문회사 신고필증</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#7db701]/10 text-[#7db701] font-semibold">
                      인가완료
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">한국디자인진흥원(KIDP) / 산업통상자원부</p>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    시각 디자인 및 포장(패키지) 디자인 전문 자격 요건과 실적을 검증받은 국가 공인 디자인 전문기업입니다.
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-300 flex items-center justify-center text-gray-800 shadow-2xs shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#7db701]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">여성기업 인증서</h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-900 text-white font-semibold">
                      법적 우대
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">중소벤처기업부 장관 발행</p>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                    여성기업지원에 관한 법률에 의거하여 공공기관 수의계약(최대 5,000만원) 및 입찰 적격심사 가점을 부여받습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Detailed Work Process (신뢰도 핵심) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#7db701] tracking-widest uppercase">DETAIL PROCESS</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">프로젝트 작업 프로세스</h2>
            <p className="text-sm text-gray-500 mt-2">
              체계적이고 투명한 협업 절차를 통해 예측 가능한 일정과 최상의 완성도를 보장합니다.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="p-6 sm:p-7 rounded-2xl border border-gray-200 bg-white shadow-2xs hover:border-[#7db701] transition-colors flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7db701]/10 text-[#7db701] font-mono font-black text-lg flex items-center justify-center shrink-0">
                01
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">의뢰 접수 및 요구사항 브리핑</h3>
                  <span className="text-xs text-gray-400 font-medium">소요: 1~2일</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  프로젝트의 목표, 마감일, 타깃 사용자층, 인쇄 사양(용지/사이즈/수량) 또는 웹 기능 스펙을 명확히 확인합니다.
                  정확한 견적서 및 표준 용역 계약서를 발행합니다.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-7 rounded-2xl border border-gray-200 bg-white shadow-2xs hover:border-[#7db701] transition-colors flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7db701]/10 text-[#7db701] font-mono font-black text-lg flex items-center justify-center shrink-0">
                02
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">리서치, 구조 설계 및 전략 수립</h3>
                  <span className="text-xs text-gray-400 font-medium">소요: 3~5일</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  유사 카테고리 벤치마킹 및 차별화 포인트를 발굴합니다. 패키지의 경우 전개도(지기구조) 샘플을 커팅하여 조립성과 보호력을 검증하고 최적의 종이 평량을 제안합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-7 rounded-2xl border border-gray-200 bg-white shadow-2xs hover:border-[#7db701] transition-colors flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7db701]/10 text-[#7db701] font-mono font-black text-lg flex items-center justify-center shrink-0">
                03
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">크리에이티브 시안 제안 & 3D 목업</h3>
                  <span className="text-xs text-gray-400 font-medium">소요: 7~10일</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  서로 다른 방향성의 콘셉트 시안 2~3종을 실물 느낌의 3D 렌더링 및 프로토타입과 함께 제안합니다. 실제 제작 시의 질감과 조명을 시뮬레이션하여 직관적인 피드백을 돕습니다.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 sm:p-7 rounded-2xl border border-gray-200 bg-white shadow-2xs hover:border-[#7db701] transition-colors flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7db701]/10 text-[#7db701] font-mono font-black text-lg flex items-center justify-center shrink-0">
                04
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">정밀 보완 & 인쇄소 현장 감리 (색상 교정)</h3>
                  <span className="text-xs text-gray-400 font-medium">소요: 3~7일</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  피드백 반영 후 최종 인쇄 데이터 검판을 진행합니다. 인쇄 당일 기장이 있는 인쇄소 현장에 직접 방문하여 잉크 배합(별색 팬톤 컬러), 인쇄 압력, 코팅 및 박 가공 상태를 육안으로 감리합니다.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-6 sm:p-7 rounded-2xl border border-gray-200 bg-white shadow-2xs hover:border-[#7db701] transition-colors flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#7db701]/10 text-[#7db701] font-mono font-black text-lg flex items-center justify-center shrink-0">
                05
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">최종 납품 및 사후 AS 평생 케어</h3>
                  <span className="text-xs text-[#7db701] font-bold">사후 AS 평생 가능</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  아웃라인 처리된 인쇄용 원본 AI/PDF 파일 및 웹 소스코드, 폰트/컬러 가이드북을 온전하게 인계합니다. <strong>인미트는 사후 AS 평생 가능 원칙</strong>으로 추후 재발주, 부분 수정, 추가 규격 제작 시에도 영구 아카이빙 데이터를 통해 책임지고 대응합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Design Subscription Feature Banner in AboutPage in soft beige */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#fbf8f3] text-gray-900 border border-[#eae2d5] shadow-sm relative overflow-hidden text-left">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7db701]/15 text-[#6c9f00] text-xs font-black border border-[#7db701]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEW SERVICE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                  <span>디자인 구독 서비스 시작</span>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  건별 품의와 계약 절차 없이, 월 고정 비용으로 인미트의 전담 디자이너와 함께하세요.<br className="hidden sm:inline" />
                  패키지 전개도, 인쇄 홍보물, 웹페이지, SNS 그래픽까지 한 곳에서 무제한 의뢰하고 사후 AS 평생 지원을 받으실 수 있습니다.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                >
                  구독 플랜 상담 및 견적 문의
                </button>
                <p className="text-[11px] text-gray-500 text-center">
                  * 기업 규모 및 월간 작업량에 맞춰 유연하게 설계해 드립니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-base font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>인미트 디자인제작소와 함께 프로젝트 시작하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Company Location & Google Maps Section */}
      <section className="py-20 border-b border-gray-100 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-bold tracking-wider uppercase mb-3">
              LOCATION & DIRECTIONS
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              오시는 길 및 본사 위치
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              인미트 디자인제작소는 경기 서남부권의 산업 중심지인 군포/안양국제유통단지에 위치해 있습니다.
            </p>
          </div>

          <CompanyMap
            address={companyInfo.address}
            locationGuide={companyInfo.locationGuide}
          />
        </div>
      </section>
    </div>
  );
};
