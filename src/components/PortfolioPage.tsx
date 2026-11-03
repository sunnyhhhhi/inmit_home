import React, { useState, useMemo } from 'react';
import { Search, Eye, Filter, Sparkles, Layers, ArrowRight, Check } from 'lucide-react';
import { PortfolioItem, CategoryType } from '../types/portfolio';

interface PortfolioPageProps {
  portfolios: PortfolioItem[];
  onSelectProject: (project: PortfolioItem) => void;
  onNavigate: (page: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  portfolios,
  onSelectProject,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'package', label: '패키지 디자인' },
    { id: 'print', label: '홍보인쇄물' },
    { id: 'web', label: '웹 디자인' },
    { id: 'logo', label: '로고 디자인' },
  ];

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.background.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [portfolios, activeCategory, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-bold tracking-wider uppercase mb-3">
            PORTFOLIO ARCHIVE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            포트폴리오
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            다양한 산업군에서 검증된 성공적인 디자인 레퍼런스를 구축해 왔습니다. <br className="hidden sm:inline" />
            각 프로젝트를 클릭하시면 <strong>첨부된 고화질 시안 및 실물 컷 이미지</strong>를 가로세로 원본 비율로 시원하게 확인하실 수 있습니다.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-gray-100">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? portfolios.length
                  : portfolios.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#7db701] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80 hover:text-black'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="프로젝트명, 클라이언트, 키워드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 outline-hidden transition-all bg-gray-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                지우기
              </button>
            )}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        {filteredPortfolios.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-2xl mt-8 border border-gray-100">
            <p className="text-gray-500 text-sm">일치하는 포트폴리오 작업물이 없습니다.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs text-[#7db701] font-bold hover:underline"
            >
              전체 목록 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {filteredPortfolios.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="group relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-xl hover:border-[#7db701] transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5"
              >
                {/* Pure Image Container - no text labels */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Clean hover overlay with view icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-gray-900 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      <Eye className="w-5 h-5 text-[#7db701]" />
                    </div>
                  </div>

                  {/* Multiple images indicator */}
                  {item.images && item.images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1 shadow-xs">
                      <span>+{item.images.length}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              원하시는 스타일의 프로젝트를 찾으셨나요?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              해당 디자인의 제작 기간, 지기구조, 종이/소재 컨설팅 및 맞춤 견적을 즉시 제안해 드립니다.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-sm font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>프로젝트 견적 상담하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
