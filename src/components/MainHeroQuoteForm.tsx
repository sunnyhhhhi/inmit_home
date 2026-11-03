import React, { useState, useRef } from 'react';
import {
  Send,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Paperclip,
  ShieldCheck,
  Check
} from 'lucide-react';
import { AttachedFileMeta, InquiryItem } from '../types/portfolio';
import { getStoredInquiries, saveStoredInquiries } from '../utils/storage';

interface MainHeroQuoteFormProps {
  onOpenTermsModal: (tab: 'terms' | 'privacy') => void;
}

export const MainHeroQuoteForm: React.FC<MainHeroQuoteFormProps> = ({
  onOpenTermsModal,
}) => {
  // Form fields
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('300~500만원');
  const [customBudget, setCustomBudget] = useState('');
  const [serviceCategory, setServiceCategory] = useState<string>('패키지 디자인');
  const [description, setDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileMeta[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const serviceCategories = [
    '패키지 디자인',
    '홍보인쇄물',
    '웹 디자인',
    '로고 브랜딩',
    '디자인 구독 서비스',
    '원스톱 종합 의뢰',
    '기타',
  ];

  const budgetOptions = [
    '100만원 미만',
    '100~300만원',
    '300~500만원',
    '500~1,000만원',
    '1,000만원 이상',
    '월 정기 구독 협의',
    '직접 입력 / 협의',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 3 - attachedFiles.length;
    if (remainingSlots <= 0) {
      alert('파일은 최대 3개까지 첨부 가능합니다.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      alert(`파일은 최대 3개까지만 첨부할 수 있어 앞선 ${remainingSlots}개 파일만 추가되었습니다.`);
    }

    filesToProcess.forEach((file) => {
      // Check duplicate
      if (attachedFiles.some((f) => f.name === file.name && f.size === file.size)) return;

      const isImage = file.type.startsWith('image/');
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAttachedFiles((prev) => {
            if (prev.length >= 3) return prev;
            return [
              ...prev,
              {
                name: file.name,
                size: file.size,
                type: file.type,
                dataUrl: event.target?.result as string,
              },
            ];
          });
        };
        reader.readAsDataURL(file);
      } else {
        setAttachedFiles((prev) => {
          if (prev.length >= 3) return prev;
          return [
            ...prev,
            {
              name: file.name,
              size: file.size,
              type: file.type,
            },
          ];
        });
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!companyName.trim()) {
      setErrorMessage('업체명(기업명 또는 개인)을 입력해 주세요.');
      return;
    }
    if (!contactName.trim()) {
      setErrorMessage('담당자 성명을 입력해 주세요.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('담당자 연락처(전화번호)를 입력해 주세요.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('유효한 이메일 주소를 입력해 주세요.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('원하시는 서비스에 대한 간단한 설명을 작성해 주세요.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('기본 이용약관 및 개인정보처리방침에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);

    const finalBudget = budget === '직접 입력 / 협의' && customBudget.trim()
      ? customBudget.trim()
      : budget;

    const newInquiry: InquiryItem = {
      id: `inmit-${Date.now()}`,
      services: [serviceCategory],
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      budget: finalBudget,
      description: description.trim(),
      attachedFiles: attachedFiles,
      status: '신규접수',
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTimeout(() => {
      const existing = getStoredInquiries();
      saveStoredInquiries([newInquiry, ...existing]);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleResetForm = () => {
    setCompanyName('');
    setContactName('');
    setPhone('');
    setEmail('');
    setDescription('');
    setCustomBudget('');
    setAttachedFiles([]);
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-xl p-5 sm:p-7 relative overflow-hidden">
      {/* Top accent badge */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#7db701] animate-pulse" />
          <span className="text-xs font-black tracking-wider text-gray-900 uppercase">
            빠른 맞춤 견적 신청
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#7db701]/10 text-[#7db701] font-bold">
            24시간 내 회신
          </span>
        </div>
        <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
          인미트 디자인제작소
        </span>
      </div>

      {isSuccess ? (
        <div className="py-10 text-center space-y-4 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-[#7db701]/10 text-[#7db701] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-black text-gray-900">
              견적 문의가 정상 접수되었습니다!
            </h4>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              <strong>{companyName}</strong> ({contactName} 님 / {phone})의 의뢰 내용을 확인하였습니다.<br />
              <strong>{email}</strong> 로 24시간 이내에 담당 디자이너가 맞춤 견적서를 회신드립니다.
            </p>
          </div>
          {attachedFiles.length > 0 && (
            <p className="text-[11px] text-gray-500">
              * 첨부파일 {attachedFiles.length}건이 안전하게 등록되었습니다.
            </p>
          )}
          <div className="pt-2">
            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              새로운 견적 신청하기
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Row 1: 업체명 & 담당자 성명 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                업체명 <span className="text-[#7db701]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 인미트 또는 개인"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden transition-all bg-gray-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                담당자 성명 <span className="text-[#7db701]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 홍길동 팀장"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden transition-all bg-gray-50/50"
              />
            </div>
          </div>

          {/* Row 2: 연락처 & 이메일 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                연락처 / 전화번호 <span className="text-[#7db701]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="예: 010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden transition-all bg-gray-50/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                이메일 <span className="text-[#7db701]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="견적서 수신 이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden transition-all bg-gray-50/50"
              />
            </div>
          </div>

          {/* Row 3: 예산금액 */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              예산 금액 <span className="text-[#7db701]">*</span>
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden transition-all bg-white"
            >
              {budgetOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* If custom budget */}
          {budget === '직접 입력 / 협의' && (
            <div>
              <input
                type="text"
                placeholder="희망 예산 범위를 직접 적어주세요 (예: 400만원 내외)"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-[#7db701] text-xs outline-hidden"
              />
            </div>
          )}

          {/* Service Category selector chips */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1.5">
              의뢰 분야
            </label>
            <div className="flex flex-wrap gap-1.5">
              {serviceCategories.map((cat) => {
                const isSelected = serviceCategory === cat;
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setServiceCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7db701] text-white font-bold shadow-2xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Description */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              원하는 서비스 설명 <span className="text-[#7db701]">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="제작 수량, 규격, 희망 마감일 또는 고민 중이신 콘셉트를 간략히 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden resize-none bg-gray-50/50"
            />
          </div>

          {/* File Attachment & Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-[#7db701]" />
                <span>첨부파일 <span className="text-[#7db701] font-semibold">(최대 3개)</span></span>
                {attachedFiles.length > 0 && (
                  <span className="text-[11px] text-gray-400 font-mono">
                    ({attachedFiles.length}/3)
                  </span>
                )}
              </label>
              {attachedFiles.length < 3 ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-[#7db701] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  파일 추가 ({attachedFiles.length}/3)
                </button>
              ) : (
                <span className="text-[11px] text-gray-400 font-medium">
                  3개 파일 첨부 완료
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.ai,.zip,.doc,.docx,.ppt,.pptx"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag & Drop Trigger Area when empty */}
            {attachedFiles.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-gray-300 hover:border-[#7db701] rounded-xl p-3 text-center cursor-pointer transition-colors bg-gray-50/40 hover:bg-[#7db701]/5"
              >
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Upload className="w-3.5 h-3.5 text-gray-400" />
                  <span>클릭하여 참고 기획서나 디자인 시안 파일을 첨부하세요 (최대 3개, PDF·이미지 등)</span>
                </div>
              </div>
            ) : (
              /* Attached Files List & Preview */
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {file.dataUrl ? (
                        <img
                          src={file.dataUrl}
                          alt="preview"
                          className="w-8 h-8 rounded object-cover border border-gray-200 shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 truncate text-[11px]">
                          {file.name}
                        </p>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer shrink-0"
                      title="삭제"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terms Agreement Checkbox & Modal triggers */}
          <div className="pt-1">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-start justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 text-[#7db701] focus:ring-[#7db701] rounded border-gray-300"
                />
                <span className="text-xs font-semibold text-gray-800">
                  기본 이용약관 및 개인정보처리방침에 동의합니다. <span className="text-[#7db701]">*</span>
                </span>
              </label>

              <div className="flex items-center gap-2 text-[11px] shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenTermsModal('terms')}
                  className="text-gray-500 hover:text-gray-900 underline cursor-pointer"
                >
                  이용약관
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => onOpenTermsModal('privacy')}
                  className="text-[#7db701] hover:underline font-bold cursor-pointer"
                >
                  개인정보방침
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>견적 신청서 전송 중...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>견적 신청 문의하기 (무료 맞춤 상담)</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
