import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Check } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'privacy';
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7db701]/10 flex items-center justify-center text-[#7db701]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">
                인미트 디자인제작소 약관 및 정책 안내
              </h3>
              <p className="text-[11px] text-gray-500">투명하고 안전한 디자인 용역 계약 표준 준수</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 bg-gray-50/50 px-6 pt-3">
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#7db701] text-[#7db701]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            기본 이용약관
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-[#7db701] text-[#7db701]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            개인정보처리방침
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto text-xs text-gray-700 leading-relaxed space-y-4">
          {activeTab === 'terms' ? (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">제 1 조 (목적)</h4>
              <p>
                본 약관은 인미트 디자인제작소(이하 "회사")가 제공하는 디자인 기획, 패키지 개발, 홍보인쇄물 제작, 웹 디자인, 로고 브랜딩 및 인쇄 감리 등의 용역 서비스(이하 "서비스")를 이용함에 있어 회사와 의뢰인(이하 "고객") 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>

              <h4 className="text-sm font-bold text-gray-900">제 2 조 (견적 및 계약의 성립)</h4>
              <p>
                1. 고객이 온라인 견적 신청 폼을 통해 제출한 내용은 초기 상담 및 견적 산출을 위한 기초 자료로 활용됩니다.<br />
                2. 구체적인 계약은 상호 협의된 견적서 및 표준 디자인 용역 계약서 날인, 또는 계약금(선금) 입금 시 정식으로 성립합니다.
              </p>

              <h4 className="text-sm font-bold text-gray-900">제 3 조 (작업 진행 및 시안 제안)</h4>
              <p>
                1. 회사는 사전 합의된 일정과 기획 방향에 따라 맞춤 크리에이티브 시안을 제안합니다.<br />
                2. 인쇄물의 경우 지기구조 전개도 및 3D 목업을 통한 사전 시뮬레이션을 제공하며, 인쇄 현장 색상 감리 요청 시 전문 감리 인력을 파견합니다.
              </p>

              <h4 className="text-sm font-bold text-gray-900">제 4 조 (수정 및 보완)</h4>
              <p>
                1. 기본 계약 범위 내에서 제안된 시안의 텍스트 교정, 색상 변경, 레이아웃 미세 조정 등의 정밀 수정 횟수가 보장됩니다.<br />
                2. 기획 콘셉트의 전면 변경 또는 신규 시안 추가 요청 시 별도의 추가 비용과 일정 조율이 발생할 수 있습니다.
              </p>

              <h4 className="text-sm font-bold text-gray-900">제 5 조 (저작권 및 원본 데이터의 귀속)</h4>
              <p>
                1. 최종 잔금 지급 완료 시, 확정된 최종 디자인 결과물의 상업적 사용 권한 및 저작재산권은 고객에게 이전됩니다.<br />
                2. 채택되지 않은 후보 시안의 저작권은 회사에 귀속되며, 무단 복제 및 상업적 사용이 불가합니다.<br />
                3. 회사는 완성된 결과물을 스튜디오의 포트폴리오 아카이브(웹사이트, 제안서) 목적으로 활용할 수 있습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">1. 개인정보 수집 항목</h4>
              <p>
                회사는 견적 상담 및 프로젝트 문의 접수를 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.<br />
                - <strong>필수 항목:</strong> 업체명(기업명), 담당자 성명, 이메일 주소, 예산 금액, 원하는 서비스 설명<br />
                - <strong>선택 항목:</strong> 연락처(전화번호), 첨부파일(기획서, 참고 이미지 등)
              </p>

              <h4 className="text-sm font-bold text-gray-900">2. 개인정보의 수집 및 이용 목적</h4>
              <p>
                수집된 정보는 다음의 목적을 위해서만 이용됩니다.<br />
                - 맞춤 제작 견적서 산출 및 일정 상담 회신<br />
                - 프로젝트 관련 추가 요구사항 확인 및 시안 전달<br />
                - 세금계산서 발행 및 공식 계약 절차 진행
              </p>

              <h4 className="text-sm font-bold text-gray-900">3. 개인정보의 보유 및 이용 기간</h4>
              <p>
                - 견적 접수 후 프로젝트 계약이 성립되지 않은 경우: <strong>문의 처리 완료일로부터 1년간 보관 후 영구 파기</strong><br />
                - 고객이 본인의 개인정보 삭제 또는 파기를 요청할 경우: 지체 없이 즉시 파기<br />
                - 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 해당 법령이 정한 기간 동안 안전하게 보관합니다.
              </p>

              <h4 className="text-sm font-bold text-gray-900">4. 개인정보의 제3자 제공 금지</h4>
              <p>
                회사는 고객의 동의 없이 어떠한 경우에도 개인정보를 외부에 유출하거나 제3자에게 제공 및 위탁하지 않습니다.
              </p>

              <h4 className="text-sm font-bold text-gray-900">5. 개인정보 보호책임자</h4>
              <p>
                - 담당: 인미트 디자인제작소 고객지원팀<br />
                - 이메일: addition9@naver.com / 유선 직통: 010-9072-1005
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            시행일자: 2024년 1월 1일 (최신 개정)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
