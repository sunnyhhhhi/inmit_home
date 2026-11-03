import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onInquireWithProject: (project: PortfolioItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInquireWithProject,
}) => {
  if (!project) return null;

  // Gather all unique images for this project
  const allImages = project.images && project.images.length > 0
    ? project.images
    : [project.thumbnail];

  // Ensure thumbnail is included if not in images
  const displayImages = allImages.includes(project.thumbnail)
    ? allImages
    : [project.thumbnail, ...allImages];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-gray-100 relative my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Control Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7db701]" />
            <span className="text-xs sm:text-sm font-bold text-gray-700">
              이미지 갤러리 ({displayImages.length}장)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* 이 프로젝트 스타일로 견적 문의하기 CTA */}
            <button
              onClick={() => {
                onClose();
                onInquireWithProject(project);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>이 프로젝트 스타일로 견적 문의하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: ONLY Attached Images Display (Text completely removed) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 bg-gray-50/50">
          <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            {displayImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-full flex justify-center bg-white rounded-2xl border border-gray-200/90 shadow-xs p-2 sm:p-3 overflow-hidden"
              >
                {/* Natural aspect ratio display: no fixed aspect cropping, width and height display naturally */}
                <img
                  src={imgUrl}
                  alt={`포트폴리오 첨부 이미지 ${idx + 1}`}
                  className="w-auto max-w-full h-auto object-contain rounded-xl select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-t border-gray-100 flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500 font-medium">
            전체 {displayImages.length}장의 원본 시안 컷
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-semibold cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onInquireWithProject(project);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <span>이 프로젝트 스타일로 견적 문의하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
