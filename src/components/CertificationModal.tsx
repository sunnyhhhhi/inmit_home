import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2, FileText, Download } from 'lucide-react';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7db701]/10 flex items-center justify-center text-[#7db701]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">공식 보유 자격 및 공인 인증</h3>
              <p className="text-xs text-gray-500">정부 공인 및 공공기관 신뢰 평가 완료 증빙</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Certificate 1 */}
          <div className="p-5 rounded-xl border border-[#7db701]/30 bg-[#7db701]/5 relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#7db701] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-gray-900">산업디자인전문회사 신고필증</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#7db701] text-white font-medium">공인 등록</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">한국디자인진흥원(KIDP) / 산업통상자원부 인가</p>
                  <div className="mt-3 text-xs text-gray-700 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7db701]" />
                      <strong>전문 분야:</strong> 시각 디자인 (Visual Design) · 포장 디자인 (Package Design)
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7db701]" />
                      <strong>혜택:</strong> 공공기관 발주 사업 및 정부 지원 디자인 바우처 공식 수행 가능
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate 2 */}
          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-[#7db701] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-gray-900">여성기업 확인서 (Female Enterprise)</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-white font-medium">법적 인증</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">중소벤처기업부 장관 공인 발급</p>
                  <div className="mt-3 text-xs text-gray-700 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7db701]" />
                      <strong>공공계약 혜택:</strong> 국가 및 지자체 수의계약 5천만원 이하 체결 가능
                    </p>
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7db701]" />
                      <strong>입찰 가점:</strong> 공공기관 우선구매 대상 기업 및 적격심사 가산점 부여
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate 3 */}
          <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/70">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-[#7db701] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-base text-gray-900">전문 디자인 역량 & 사후 AS 평생 가능</h4>
                <p className="text-xs text-gray-600 mt-1">디자인 기획부터 출력 규격, 지기구조, 신규 디자인 구독 서비스까지</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  인쇄소와 감리 현장에서 다져진 실무 전문성과 종이 물성, 후가공 노하우를 바탕으로 최상의 품질과 평생 지속되는 사후 케어를 약속드립니다.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              * 프로젝트 진행 시 필요하신 서류(사업자등록증, 전문회사 신고필증, 여성기업 확인서, 국세/지방세 완납증명서)는 즉시 송부해 드립니다.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
