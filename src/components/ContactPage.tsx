import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  Copy,
  Calendar,
  AlertCircle,
  Check,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { InquiryItem, PortfolioItem } from '../types/portfolio';
import { saveStoredInquiries, getStoredInquiries } from '../utils/storage';

interface ContactPageProps {
  prefilledProject?: PortfolioItem | null;
  onClearPrefilled?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefilledProject,
  onClearPrefilled,
}) => {
  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>(['패키지']);
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [budget, setBudget] = useState<string>('300~500만원');
  const [deadline, setDeadline] = useState<string>('');
  const [referenceUrl, setReferenceUrl] = useState<string>('http://www.inmit.co.kr');
  const [description, setDescription] = useState<string>('');
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(true);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle prefilled project if user arrived via "이 프로젝트 스타일로 문의하기"
  useEffect(() => {
    if (prefilledProject) {
      const catMap: Record<string, string> = {
        package: '패키지',
        print: '홍보인쇄물',
        web: '웹디자인',
        logo: '로고디자인',
      };
      const serviceName = catMap[prefilledProject.category] || '패키지';
      if (!selectedServices.includes(serviceName)) {
        setSelectedServices((prev) => [...prev, serviceName]);
      }
      setDescription(
        `[참고 프로젝트: ${prefilledProject.title} (${prefilledProject.client})]\n위 프로젝트의 스타일과 제작 공정(기여 범위: ${prefilledProject.contribution})을 참고하여 우리 브랜드에 맞는 견적과 제작 일정을 상담받고 싶습니다.\n\n`
      );
    }
  }, [prefilledProject]);

  const serviceOptions = [
    { id: 'package', label: '패키지' },
    { id: 'print', label: '홍보인쇄물' },
    { id: 'web', label: '웹디자인' },
    { id: 'logo', label: '로고디자인' },
    { id: 'subscription', label: '디자인구독' },
    { id: 'other', label: '기타' },
  ];

  const budgetOptions = [
    '100만원 미만',
    '100~300만원',
    '300~500만원',
    '500~1,000만원',
    '1,000만원 이상',
    '월 정기 구독 협의',
    '예산 협의 필요',
  ];

  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (selectedServices.length === 0) {
      setErrorMessage('의뢰 분야를 최소 1개 이상 선택해 주세요.');
      return;
    }
    if (!contactName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('담당자명, 연락처, 이메일은 필수 입력 사항입니다.');
      return;
    }
    if (!agreePrivacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);

    const newInquiry: InquiryItem = {
      id: `inq-${Date.now()}`,
      services: selectedServices,
      companyName: companyName.trim() || '미기재',
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      budget: budget || '협의',
      deadline: deadline || '협의 필요',
      referenceUrl: referenceUrl.trim() || 'http://www.inmit.co.kr',
      description: description.trim() || '상담 요청',
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
    }, 600);
  };

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7db701]/10 text-[#7db701] text-xs font-bold tracking-wider uppercase mb-3">
            PROJECT INQUIRY
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            프로젝트 문의
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            성공적인 프로젝트의 첫걸음입니다. 의뢰하실 내용을 남겨주시면 <strong className="text-gray-900 underline decoration-[#7db701] underline-offset-4">24시간 이내에 검토 후 연락드립니다.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm relative">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#7db701]/10 text-[#7db701] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    문의가 정상적으로 접수되었습니다!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    작성해 주신 내용({contactName} 님 / {email})을 꼼꼼히 검토한 뒤 <strong>24시간 이내</strong>에 담당 디자이너가 유선 또는 이메일로 회신드리겠습니다.
                  </p>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 max-w-md mx-auto text-xs text-gray-600 text-left">
                    <p className="font-semibold text-gray-900 mb-1">긴급한 일정 문의의 경우</p>
                    <p>대표 유선 <strong>010-9072-1005</strong>로 연락 주시면 보다 빠른 상담이 가능합니다.</p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setDescription('');
                        if (onClearPrefilled) onClearPrefilled();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold cursor-pointer"
                    >
                      추가 문의 작성하기
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. 의뢰 분야 (체크박스 다중 선택) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-gray-900">
                        1. 의뢰 분야 <span className="text-[#7db701] font-bold">*</span>
                      </label>
                      <span className="text-xs text-gray-400">중복 선택 가능</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {serviceOptions.map((opt) => {
                        const isChecked = selectedServices.includes(opt.label);
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => toggleService(opt.label)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isChecked
                                ? 'bg-[#7db701]/10 border-[#7db701] text-gray-900 font-bold'
                                : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="text-xs sm:text-sm">{opt.label}</span>
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                isChecked
                                  ? 'bg-[#7db701] border-[#7db701] text-white'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. 기본 인적사항 */}
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-900">
                      2. 신청자 및 기업 정보 <span className="text-[#7db701]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          기업명 / 브랜드명
                        </label>
                        <input
                          type="text"
                          placeholder="예: 낫선코스메틱 또는 개인"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          담당자 성함 <span className="text-[#7db701]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="예: 홍길동 팀장"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          연락처 (휴대폰) <span className="text-[#7db701]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="예: 010-9072-1005"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          이메일 주소 <span className="text-[#7db701]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="예: addition9@naver.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. 예상 예산 범위 & 원하는 마감일 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-gray-600">
                          예상 예산 범위 (선택)
                        </label>
                        <span className="text-[11px] text-gray-400">맞춤 제안 유도</span>
                      </div>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-gray-600">
                          원하는 마감일 (희망 납품일)
                        </label>
                        <span className="text-[11px] text-gray-400">Datepicker</span>
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. 참고 레퍼런스 링크 (https://www.notsun.net 등) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-600">
                      참고 레퍼런스 링크 (선택)
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="http://www.inmit.co.kr 또는 타사 참고 웹사이트 URL"
                        value={referenceUrl}
                        onChange={(e) => setReferenceUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 pl-1">
                      공식 웹사이트: <a href="http://www.inmit.co.kr" target="_blank" rel="noopener noreferrer" className="text-[#7db701] hover:underline">www.inmit.co.kr</a>
                    </p>
                  </div>

                  {/* 5. 프로젝트 소개 & 요청사항 */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-600">
                      프로젝트 소개 및 상세 요청사항
                    </label>
                    <textarea
                      rows={5}
                      placeholder="제품 설명, 필요한 패키지 규격, 페이지 수(인쇄물), 제작 수량, 혹은 고민하고 계신 브랜드 콘셉트에 대해 편안하게 적어주세요."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden resize-y"
                    />
                  </div>

                  {/* 6. 개인정보 수집 및 이용 동의 */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#7db701] focus:ring-[#7db701] rounded border-gray-300 cursor-pointer"
                    />
                    <label htmlFor="privacy" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
                      <strong>(필수) 개인정보 수집 및 이용에 동의합니다.</strong> <br />
                      수집 목적: 프로젝트 견적 상담 및 일정 조율 회신 / 보유 기간: 문의 처리 완료 후 1년 (요청 시 즉시 파기)
                    </label>
                  </div>

                  {/* Guidance Notice */}
                  <div className="p-4 rounded-xl bg-[#7db701]/10 border border-[#7db701]/20 text-xs text-gray-800 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#7db701] shrink-0" />
                    <span>
                      <strong>안내:</strong> 문의를 남겨주시면 <strong>24시간 이내</strong>에 검토 후 연락드립니다.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-base font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>문의 전송 중...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>프로젝트 문의 제출하기</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Fast Response */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-[#7c726e] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-[#6b625e]">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-bold border border-white/30">
                DIRECT CHANNELS
              </span>

              <div>
                <h3 className="text-xl font-bold">빠른 직통 상담</h3>
                <p className="text-xs text-white/80 mt-1">
                  급한 일정이나 전화 상담을 원하시면 언제든 연락주세요.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Phone */}
                <div className="p-4 rounded-xl bg-black/15 border border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-white" />
                      대표 직통 전화
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('010-9072-1005', 'phone')}
                      className="text-xs text-white/80 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-[#7db701]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPhone ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                  <a
                    href="tel:010-9072-1005"
                    className="text-xl font-extrabold text-white mt-1 block hover:text-[#7db701] transition-colors"
                  >
                    010-9072-1005
                  </a>
                </div>

                {/* Email */}
                <div className="p-4 rounded-xl bg-black/15 border border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-white" />
                      공식 대표 이메일
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('addition9@naver.com', 'email')}
                      className="text-xs text-white/80 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-[#7db701]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? '복사됨' : '복사'}</span>
                    </button>
                  </div>
                  <a
                    href="mailto:addition9@naver.com"
                    className="text-sm font-bold text-white mt-1 block hover:text-[#7db701] transition-colors truncate"
                  >
                    addition9@naver.com
                  </a>
                </div>

                {/* Reference Website Link */}
                <div className="p-4 rounded-xl bg-black/15 border border-white/20">
                  <span className="text-xs text-white/80 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-white" />
                    공식 웹사이트
                  </span>
                  <a
                    href="http://www.inmit.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white mt-1 flex items-center gap-1 hover:underline"
                  >
                    <span>www.inmit.co.kr</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* KakaoTalk Open Chat Button */}
              <div className="pt-2">
                <a
                  href="https://open.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-[#191919] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>카카오톡 1:1 상담 바로가기</span>
                </a>
                <p className="text-[11px] text-white/70 text-center mt-2">
                  * 오픈채팅 선호 클라이언트를 위한 실시간 톡 채널
                </p>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-2">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7db701]" />
                상담 및 업무 운영 안내
              </h4>
              <p>• <strong>평일:</strong> 09:30 ~ 18:30 (점심시간 12:30 ~ 13:30)</p>
              <p>• <strong>휴무:</strong> 토 / 일 / 법정 공휴일</p>
              <p>• <strong>온라인 문의:</strong> 365일 24시간 접수 (24시간 내 회신)</p>
              <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500">
                인쇄 감리 출장 중일 경우 유선 연결이 지연될 수 있습니다. 부재 시 문자를 남겨주시면 즉시 회신드립니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
