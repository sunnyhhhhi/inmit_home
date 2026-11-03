import React, { useState } from 'react';
import { ShieldCheck, Award, Building2, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { PartnerClient } from '../types/portfolio';

interface ClientsPageProps {
  partners: PartnerClient[];
  onNavigate: (page: string) => void;
  onOpenCertModal: () => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({
  partners,
  onNavigate,
  onOpenCertModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: '전체 파트너' },
    { id: '공공기관/재단', label: '공공기관 / 재단' },
    { id: '뷰티/코스메틱', label: '뷰티 / 코스메틱' },
    { id: 'F&B/라이프', label: 'F&B / 라이프스타일' },
    { id: '기업/IT', label: '기업 / IT 테크' },
  ];

  const filteredPartners = activeFilter === 'all'
    ? partners
    : partners.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-bold tracking-wider uppercase mb-3">
            CLIENTS & REFERENCES
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            주거래 파트너사
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            15년 동안 공공기관, 중견기업, 신뢰받는 소비재 브랜드들과 함께 가치를 일구어 왔습니다. <br className="hidden sm:inline" />
            한 번 인연을 맺은 클라이언트와 오랜 시간 지속적인 협업을 이어오고 있는 것은 인미트 디자인제작소의 가장 큰 자부심입니다.
          </p>
        </div>

        {/* Highlight Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">92%</span>
            <p className="text-xs text-gray-500 mt-1 font-medium">재계약 및 추가 의뢰율</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-2xl sm:text-3xl font-black text-[#7db701]">15년+</span>
            <p className="text-xs text-gray-500 mt-1 font-medium">업계 공인 전문 연륜</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">480+</span>
            <p className="text-xs text-gray-500 mt-1 font-medium">총 누적 프로젝트 수행</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
            <span className="text-2xl sm:text-3xl font-black text-[#7db701]">0건</span>
            <p className="text-xs text-gray-500 mt-1 font-medium">인쇄 색상 오차 사고율</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-gray-100">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7db701] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPartners.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-xl hover:border-[#7db701] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-[#7db701]/10 flex items-center justify-center text-gray-900 group-hover:text-[#7db701] font-black text-base transition-colors">
                    {item.name.charAt(0)}
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold group-hover:bg-[#7db701]/10 group-hover:text-[#7db701] transition-colors">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#7db701] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">대표 수행 과업:</span>
                <span className="text-gray-800 font-bold truncate max-w-[180px]">
                  {item.highlightWork}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Public procurement trust callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#7db701] text-white font-bold">
                공공기관 / 지자체 발주 안내
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              여성기업 수의계약 & 산업디자인전문회사 공공 입찰 적격
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl">
              국가계약법 및 지방계약법에 따른 여성기업 수의계약 체결(추정가격 5,000만원 이하)이 가능하며, 나라장터(G2B) 및 공공기관 적격심사 가산점 혜택을 제공합니다.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenCertModal}
              className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-gray-700"
            >
              인증서 확인하기
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              기관 프로젝트 문의
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
