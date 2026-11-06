import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  Check,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ExternalLink,
  Save,
  Upload,
  Settings,
  Building2,
  Image as ImageIcon,
  Lock,
  LogOut,
  KeyRound,
  MessageSquare,
  Eye,
  EyeOff,
  CheckCircle2,
  MapPin,
  Globe,
  Navigation
} from 'lucide-react';
import { PortfolioItem, InquiryItem, CategoryType, PartnerClient } from '../types/portfolio';
import {
  getStoredPortfolios,
  saveStoredPortfolios,
  resetStoredPortfolios,
  getStoredPartners,
  saveStoredPartners,
  resetStoredPartners,
  getStoredInquiries,
  saveStoredInquiries,
  getStoredAdminPassword,
  saveStoredAdminPassword,
  getStoredKakaoSettings,
  saveStoredKakaoSettings,
  KakaoSettings,
  DEFAULT_ADMIN_PASSWORD,
  getStoredCompanyInfo,
  saveStoredCompanyInfo,
  resetStoredCompanyInfo,
  CompanyInfo
} from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPortfoliosUpdated: () => void;
  partners?: PartnerClient[];
  onPartnersUpdated?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onPortfoliosUpdated,
  partners,
  onPartnersUpdated,
}) => {
  // Login Gate state (Session persistence)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('inmit_admin_logged_in') === 'true';
  });
  const [loginPasswordInput, setLoginPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<'info' | 'portfolios' | 'partners' | 'inquiries' | 'settings'>('info');

  // Company Info State (전화번호, 이메일, 웹사이트 URL, 회사 주소 등)
  const [companyForm, setCompanyForm] = useState<CompanyInfo>(() => getStoredCompanyInfo());
  const [companySavedFeedback, setCompanySavedFeedback] = useState(false);

  // Password change state
  const [currentPwdInput, setCurrentPwdInput] = useState('');
  const [newPwdInput, setNewPwdInput] = useState('');
  const [confirmPwdInput, setConfirmPwdInput] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Kakao settings state
  const [kakaoForm, setKakaoForm] = useState<KakaoSettings>(() => getStoredKakaoSettings());
  const [kakaoSavedFeedback, setKakaoSavedFeedback] = useState(false);

  // Portfolios state
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => getStoredPortfolios());
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
  const portfolioImageInputRef = useRef<HTMLInputElement>(null);

  // Partners state
  const [partnerList, setPartnerList] = useState<PartnerClient[]>(() => partners || getStoredPartners());
  const partnerLogoInputRef = useRef<HTMLInputElement>(null);
  const singlePartnerLogoInputRef = useRef<HTMLInputElement>(null);
  const [editingPartner, setEditingPartner] = useState<PartnerClient | null>(null);
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [partnerFormName, setPartnerFormName] = useState('');
  const [partnerFormLogo, setPartnerFormLogo] = useState('');

  // Inquiries state
  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => getStoredInquiries());

  // Reload settings whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setCompanyForm(getStoredCompanyInfo());
      setCompanySavedFeedback(false);
      setKakaoForm(getStoredKakaoSettings());
      setPortfolios(getStoredPortfolios());
      setInquiries(getStoredInquiries());
      setPartnerList(partners || getStoredPartners());
      setLoginError('');
      setPwdMessage(null);
    }
  }, [isOpen, partners]);

  const handleSaveCompanyInfo = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredCompanyInfo(companyForm);
    setCompanySavedFeedback(true);
    setTimeout(() => setCompanySavedFeedback(false), 3000);
  };

  const handleResetCompanyInfo = () => {
    if (window.confirm('기본 정보를 초기 권장값으로 복원하시겠습니까?')) {
      const reset = resetStoredCompanyInfo();
      setCompanyForm(reset);
      setCompanySavedFeedback(true);
      setTimeout(() => setCompanySavedFeedback(false), 3000);
    }
  };

  // Handle portfolio multi-image upload from computer
  const handlePortfolioImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const readPromises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then((newImages) => {
      setFormData((prev) => {
        const existing = prev.images || [];
        const combined = [...existing, ...newImages];
        return {
          ...prev,
          images: combined,
          thumbnail: prev.thumbnail || combined[0] || '',
        };
      });
      if (portfolioImageInputRef.current) {
        portfolioImageInputRef.current.value = '';
      }
    });
  };

  const handleRemovePortfolioImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const existing = prev.images || [];
      const removedImg = existing[indexToRemove];
      const updated = existing.filter((_, i) => i !== indexToRemove);
      let newThumb = prev.thumbnail;
      if (prev.thumbnail === removedImg) {
        newThumb = updated[0] || '';
      }
      return {
        ...prev,
        images: updated,
        thumbnail: newThumb,
      };
    });
  };

  const handleSetAsThumbnail = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: imgUrl,
    }));
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setIsCreatingNew(false);
    setEditingItem(item);
    setFormData({
      ...item,
      images: item.images && item.images.length > 0 ? [...item.images] : [item.thumbnail],
    });
  };

  const handleOpenNew = () => {
    setIsCreatingNew(true);
    setEditingItem(null);
    setFormData({
      id: `proj-${Date.now()}`,
      category: 'package',
      categoryLabel: '패키지 디자인',
      thumbnail: '',
      images: [],
      isFeatured: true,
      order: portfolios.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
    });
  };

  // Save portfolio: only requires attached images (no mandatory text inputs!)
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const imgs = formData.images || [];
    if (imgs.length === 0 && !formData.thumbnail) {
      alert('포트폴리오 이미지를 최소 1장 이상 첨부해 주세요.');
      return;
    }

    const categoryMap: Record<CategoryType, string> = {
      package: '패키지 디자인',
      print: '홍보인쇄물',
      web: '웹 디자인',
      logo: '로고 디자인',
    };

    const currentCat = (formData.category as CategoryType) || 'package';
    const thumb = formData.thumbnail || imgs[0] || '';
    const allImgs = imgs.length > 0 ? imgs : [thumb];

    const finalItem: PortfolioItem = {
      id: formData.id || `proj-${Date.now()}`,
      title: formData.title || `${categoryMap[currentCat]} 포트폴리오`,
      subtitle: formData.subtitle || 'INMIT 디자인제작소 시각 디자인 작업물',
      category: currentCat,
      categoryLabel: categoryMap[currentCat],
      client: formData.client || 'INMIT',
      period: formData.period || '상시',
      contribution: '기획 & 디자인 100%',
      tools: ['Adobe Illustrator', 'Photoshop'],
      background: '',
      keyResults: [],
      thumbnail: thumb,
      images: allImgs,
      review: {
        quote: '완벽한 인쇄 감리와 차별화된 디자인 퀄리티에 대만족합니다.',
        author: '클라이언트 담당자',
        role: '브랜드 팀장',
      },
      isFeatured: formData.isFeatured !== undefined ? !!formData.isFeatured : true,
      order: formData.order || 1,
      createdAt: formData.createdAt || new Date().toISOString().split('T')[0],
    };

    let updated: PortfolioItem[];
    if (isCreatingNew) {
      updated = [finalItem, ...portfolios];
    } else {
      updated = portfolios.map((p) => (p.id === finalItem.id ? finalItem : p));
    }

    setPortfolios(updated);
    saveStoredPortfolios(updated);
    onPortfoliosUpdated();
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('정말로 이 포트폴리오 항목을 삭제하시겠습니까?')) {
      const updated = portfolios.filter((p) => p.id !== id);
      setPortfolios(updated);
      saveStoredPortfolios(updated);
      onPortfoliosUpdated();
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        '모든 포트폴리오를 초기 기본 데이터로 복원하시겠습니까? (새로 추가한 항목은 초기화됩니다)'
      )
    ) {
      const reset = resetStoredPortfolios();
      setPortfolios(reset);
      onPortfoliosUpdated();
      setEditingItem(null);
      setIsCreatingNew(false);
    }
  };

  // ==========================================
  // Partners Logo Management Handlers
  // ==========================================
  // 1. Bulk Upload Partner Logos from Computer (Multiple files)
  const handlePartnerLogosBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const readPromises = Array.from(files).map((file) => {
      return new Promise<{ name: string; dataUrl: string }>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const cleanName = file.name.replace(/\.[^/.]+$/, '');
          resolve({
            name: cleanName,
            dataUrl: event.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then((results) => {
      const newPartners: PartnerClient[] = results.map((res, idx) => ({
        id: `partner-${Date.now()}-${idx}`,
        name: res.name || '파트너사',
        category: '기업/IT',
        description: '협력 파트너사',
        highlightWork: '브랜딩 디자인 협업',
        logoUrl: res.dataUrl,
      }));

      const updated = [...partnerList, ...newPartners];
      setPartnerList(updated);
      saveStoredPartners(updated);
      if (onPartnersUpdated) onPartnersUpdated();
      if (partnerLogoInputRef.current) {
        partnerLogoInputRef.current.value = '';
      }
    });
  };

  // 2. Single Partner Logo Upload
  const handleSinglePartnerLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPartnerFormLogo(dataUrl);
      if (!partnerFormName) {
        setPartnerFormName(file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
    if (singlePartnerLogoInputRef.current) {
      singlePartnerLogoInputRef.current.value = '';
    }
  };

  const handleOpenAddPartner = () => {
    setIsAddingPartner(true);
    setEditingPartner(null);
    setPartnerFormName('');
    setPartnerFormLogo('');
  };

  const handleOpenEditPartner = (p: PartnerClient) => {
    setIsAddingPartner(false);
    setEditingPartner(p);
    setPartnerFormName(p.name);
    setPartnerFormLogo(p.logoUrl || '');
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerFormLogo) {
      alert('파트너사 로고 이미지를 첨부해 주세요.');
      return;
    }

    if (editingPartner) {
      const updated = partnerList.map((p) =>
        p.id === editingPartner.id
          ? {
              ...p,
              name: partnerFormName.trim() || p.name,
              logoUrl: partnerFormLogo,
            }
          : p
      );
      setPartnerList(updated);
      saveStoredPartners(updated);
      if (onPartnersUpdated) onPartnersUpdated();
      setEditingPartner(null);
    } else {
      const newPartner: PartnerClient = {
        id: `partner-${Date.now()}`,
        name: partnerFormName.trim() || '파트너사',
        category: '기업/IT',
        description: '협력 파트너사',
        highlightWork: '디자인 협업',
        logoUrl: partnerFormLogo,
      };
      const updated = [newPartner, ...partnerList];
      setPartnerList(updated);
      saveStoredPartners(updated);
      if (onPartnersUpdated) onPartnersUpdated();
      setIsAddingPartner(false);
    }
    setPartnerFormName('');
    setPartnerFormLogo('');
  };

  const handleDeletePartner = (id: string) => {
    if (window.confirm('이 파트너사 로고를 메인에서 삭제하시겠습니까?')) {
      const updated = partnerList.filter((p) => p.id !== id);
      setPartnerList(updated);
      saveStoredPartners(updated);
      if (onPartnersUpdated) onPartnersUpdated();
    }
  };

  const handleResetPartners = () => {
    if (window.confirm('파트너사 목록을 기본 초기 데이터로 복원하시겠습니까?')) {
      const reset = resetStoredPartners();
      setPartnerList(reset);
      if (onPartnersUpdated) onPartnersUpdated();
      setEditingPartner(null);
      setIsAddingPartner(false);
    }
  };

  // ==========================================
  // Inquiries Handlers
  // ==========================================
  const handleInquiryStatusChange = (id: string, status: InquiryItem['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleInquiryMemoChange = (id: string, memo: string) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, adminMemo: memo } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('이 문의 내역을 삭제하시겠습니까?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      saveStoredInquiries(updated);
    }
  };

  // ==========================================
  // Login & Authentication Handlers
  // ==========================================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPwd = getStoredAdminPassword();
    if (loginPasswordInput.trim() === storedPwd.trim()) {
      setIsLoggedIn(true);
      sessionStorage.setItem('inmit_admin_logged_in', 'true');
      setLoginError('');
      setLoginPasswordInput('');
    } else {
      setLoginError('비밀번호가 올바르지 않습니다. 다시 입력해 주세요.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('inmit_admin_logged_in');
    setLoginPasswordInput('');
    setLoginError('');
  };

  // ==========================================
  // Password Change Handler
  // ==========================================
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);
    const storedPwd = getStoredAdminPassword();
    if (currentPwdInput.trim() !== storedPwd.trim()) {
      setPwdMessage({ type: 'error', text: '현재 비밀번호가 일치하지 않습니다.' });
      return;
    }
    if (!newPwdInput.trim() || newPwdInput.trim().length < 4) {
      setPwdMessage({ type: 'error', text: '새 비밀번호는 4자리 이상이어야 합니다.' });
      return;
    }
    if (newPwdInput.trim() !== confirmPwdInput.trim()) {
      setPwdMessage({ type: 'error', text: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
      return;
    }
    saveStoredAdminPassword(newPwdInput.trim());
    setPwdMessage({ type: 'success', text: '관리자 비밀번호가 성공적으로 변경되었습니다.' });
    setCurrentPwdInput('');
    setNewPwdInput('');
    setConfirmPwdInput('');
  };

  // ==========================================
  // Kakao Channel Settings Handler
  // ==========================================
  const handleSaveKakaoSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredKakaoSettings(kakaoForm);
    setKakaoSavedFeedback(true);
    setTimeout(() => setKakaoSavedFeedback(false), 2500);
  };

  const handleToggleKakaoEnabled = () => {
    const updated: KakaoSettings = {
      ...kakaoForm,
      enabled: !kakaoForm.enabled,
    };
    setKakaoForm(updated);
    saveStoredKakaoSettings(updated);
    setKakaoSavedFeedback(true);
    setTimeout(() => setKakaoSavedFeedback(false), 2500);
  };

  if (!isOpen) return null;

  // 1. If not logged in, render the login authentication dialog
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100 relative text-left">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-[#7db701]/10 text-[#7db701] flex items-center justify-center mb-5">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-gray-950 tracking-tight">
            관리자 인증
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            포트폴리오, 주거래 파트너사 및 환경설정을 관리하려면 관리자 비밀번호를 입력해 주세요.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                관리자 비밀번호
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  autoFocus
                  value={loginPasswordInput}
                  onChange={(e) => {
                    setLoginPasswordInput(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-sm outline-hidden pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>관리자 로그인</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center pt-2">
              * 인미트 관리자 전용 인증 화면입니다.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // 2. Logged-in full dashboard
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative my-auto flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold">
              <Settings className="w-5 h-5 text-[#7db701]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-gray-900">INMIT 인미트 디자인제작소 관리자 모드</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#7db701]/15 text-[#7db701] font-bold">
                  인증됨
                </span>
              </div>
              <p className="text-xs text-gray-500">
                포트폴리오 이미지 관리, 주거래 파트너사 로고 관리, 견적 내역 및 환경설정
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="관리자 세션 로그아웃"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Direct Dashboard */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar Tabs */}
          <div className="px-6 pt-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('info');
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'info'
                    ? 'border-[#7db701] text-[#7db701] bg-[#7db701]/5'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>기본 정보 관리 (전화·이메일·URL·주소)</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('portfolios');
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'portfolios'
                    ? 'border-[#7db701] text-[#7db701] bg-[#7db701]/5'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                포트폴리오 이미지 관리 ({portfolios.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('partners');
                  setEditingPartner(null);
                  setIsAddingPartner(false);
                }}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'partners'
                    ? 'border-[#7db701] text-[#7db701] bg-[#7db701]/5'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                주거래 파트너사 로고 관리 ({partnerList.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('inquiries');
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'border-[#7db701] text-[#7db701] bg-[#7db701]/5'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                접수된 문의 내역 ({inquiries.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setEditingItem(null);
                  setIsCreatingNew(false);
                }}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-[#7db701] text-[#7db701] bg-[#7db701]/5'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                비밀번호 및 카카오톡 설정
              </button>
            </div>

            <div className="flex items-center gap-2 pb-2">
              {activeTab === 'info' && (
                <button
                  type="button"
                  onClick={handleResetCompanyInfo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold cursor-pointer"
                  title="기본 정보 초기 권장값 복원"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>기본 정보 초기화</span>
                </button>
              )}
              {activeTab === 'portfolios' && !editingItem && !isCreatingNew && (
                <>
                  <button
                    onClick={handleResetToDefault}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold cursor-pointer"
                    title="기본 포트폴리오 데이터 복원"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>기본 데이터 초기화</span>
                  </button>
                  <button
                    onClick={handleOpenNew}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7db701] hover:bg-[#6fa300] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>새 이미지 등록</span>
                  </button>
                </>
              )}
              {activeTab === 'partners' && !isAddingPartner && !editingPartner && (
                <>
                  <button
                    onClick={handleResetPartners}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold cursor-pointer"
                    title="기본 파트너사 목록 복원"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>기본 파트너 복원</span>
                  </button>
                  <button
                    onClick={() => partnerLogoInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs cursor-pointer"
                    title="내 컴퓨터에서 여러 장의 로고 이미지 한 번에 등록"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#7db701]" />
                    <span>로고 일괄 첨부</span>
                  </button>
                  <button
                    onClick={handleOpenAddPartner}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7db701] hover:bg-[#6fa300] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>새 로고 등록</span>
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>

          {/* =========================================================================
              Tab 0: Company & Site Basic Info Management (전화번호, 이메일, 홈페이지, 회사 주소 등)
              ========================================================================= */}
          {activeTab === 'info' && (
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Header Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7db701] text-white text-[11px] font-bold">
                      실시간 사이트 연동
                    </span>
                    <span className="text-xs text-gray-300 font-mono">SITE & CONTACT SETTINGS</span>
                  </div>
                  <h4 className="text-lg font-black tracking-tight">
                    회사 기본 정보 및 구글 지도 연동 관리
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
                    수정하신 전화번호, 이메일, 홈페이지 URL, 회사 주소는 <strong>메인 홈, 회사소개(ABOUT), 구글 지도(Google Maps), 견적 문의(CONTACT), 푸터(FOOTER), 플로팅 통화 버튼</strong>에 실시간으로 즉시 일괄 반영됩니다.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetCompanyInfo}
                    className="px-3.5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                    <span>초기 권장값 복원</span>
                  </button>
                </div>
              </div>

              {/* Form & Live Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Input Form */}
                <form onSubmit={handleSaveCompanyInfo} className="lg:col-span-7 bg-[#fbf8f3] border border-[#eae2d5] rounded-2xl p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#eae2d5]">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#7db701]" />
                      <h5 className="text-sm font-bold text-gray-900">기본 정보 입력 폼</h5>
                    </div>
                    <span className="text-[11px] text-gray-500">* 표시는 필수 항목입니다</span>
                  </div>

                  {/* 1. 회사명 */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      회사 상호명 <span className="text-[#7db701]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.companyName || ''}
                      onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                      placeholder="인미트(INMIT) 디자인제작소"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                    />
                  </div>

                  {/* 2. 전화번호 & 이메일 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#7db701]" />
                        <span>대표 전화번호 <span className="text-[#7db701]">*</span></span>
                      </label>
                      <input
                        type="text"
                        required
                        value={companyForm.phone}
                        onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        placeholder="예: 010-9072-1005"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                      <p className="text-[11px] text-gray-400 mt-1">메인, 푸터, Contact, 플로팅 통화 버튼에 연동</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#7db701]" />
                        <span>공식 대표 이메일 <span className="text-[#7db701]">*</span></span>
                      </label>
                      <input
                        type="email"
                        required
                        value={companyForm.email}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        placeholder="예: addition9@naver.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                      <p className="text-[11px] text-gray-400 mt-1">푸터, Contact 공식 메일 링크에 연동</p>
                    </div>
                  </div>

                  {/* 3. 홈페이지 URL */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-[#7db701]" />
                      <span>홈페이지 대표 URL <span className="text-[#7db701]">*</span></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyForm.websiteUrl}
                      onChange={(e) => setCompanyForm({ ...companyForm, websiteUrl: e.target.value })}
                      placeholder="예: www.inmit.co.kr"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">상단 도메인 표기 및 푸터 웹사이트 링크에 연동</p>
                  </div>

                  {/* 4. 회사 주소 (Google Maps 연동) */}
                  <div className="p-4 rounded-xl bg-white border-2 border-[#7db701]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-gray-900 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#7db701]" />
                        <span>회사 주소 (구글 지도 연동) <span className="text-[#7db701]">*</span></span>
                      </label>
                      <span className="px-2 py-0.5 rounded-full bg-[#7db701]/15 text-[#6c9f00] text-[10px] font-bold">
                        Google Maps 실시간 연동
                      </span>
                    </div>

                    <input
                      type="text"
                      required
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      placeholder="예: 경기도 군포시 엘에스로 92 국제유통단지 24동 205호"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white font-medium text-gray-900"
                    />
                    <div className="p-3 rounded-lg bg-[#7db701]/10 text-[11px] text-[#4d7200] leading-relaxed">
                      * 이 주소를 변경하시면 <strong>ABOUT(회사소개) 페이지의 구글 지도 위치, 길찾기 링크, 푸터 주소, Contact 주소 카드</strong>가 즉시 자동으로 갱신됩니다.
                    </div>
                  </div>

                  {/* 5. 오시는 길 안내 & 운영시간 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        오시는 길 / 찾아오는 위치 안내
                      </label>
                      <input
                        type="text"
                        value={companyForm.locationGuide || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, locationGuide: e.target.value })}
                        placeholder="예: 지하철 1·4호선 금정역 인근 / 안양국제유통단지 24동 205호"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        운영 및 상담 시간 안내
                      </label>
                      <input
                        type="text"
                        value={companyForm.businessHours || ''}
                        onChange={(e) => setCompanyForm({ ...companyForm, businessHours: e.target.value })}
                        placeholder="예: 평일 09:30 ~ 18:30 (점심시간 12:30 ~ 13:30)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  {/* Save button and feedback */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>기본정보 일괄 저장 및 사이트 전체 즉시 반영</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetCompanyInfo}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 transition-colors cursor-pointer"
                    >
                      초기값 복원
                    </button>
                  </div>

                  {companySavedFeedback && (
                    <div className="p-3.5 rounded-xl bg-[#7db701]/15 border border-[#7db701]/40 text-xs text-[#5f8c00] font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>기본 정보가 성공적으로 저장되었습니다! 메인, ABOUT, 구글 지도, 푸터, Contact에 즉시 반영되었습니다.</span>
                    </div>
                  )}
                </form>

                {/* Right: Live Preview & Map Test Card */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#7db701]" />
                        <h5 className="text-sm font-bold text-gray-900">구글 지도 실시간 미리보기</h5>
                      </div>
                      <span className="text-[11px] text-gray-400">ABOUT 페이지 연동</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <p className="text-gray-500 font-semibold">현재 설정된 주소:</p>
                      <p className="font-extrabold text-gray-900 text-sm p-3 rounded-xl bg-gray-50 border border-gray-200">
                        {companyForm.address}
                      </p>
                      {companyForm.locationGuide && (
                        <p className="text-[11px] text-gray-500">{companyForm.locationGuide}</p>
                      )}
                    </div>

                    {/* Interactive mini iframe preview */}
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative">
                      <iframe
                        title="Google Maps Admin Preview"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(companyForm.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    </div>

                    {/* Test link buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyForm.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-gray-900 hover:bg-black text-white font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>지도 크게보기</span>
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyForm.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-[#7db701] hover:bg-[#6fa300] text-white font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>길찾기 테스트</span>
                      </a>
                    </div>
                  </div>

                  {/* Contact Channels Summary */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2.5">
                    <h6 className="font-bold text-gray-800 text-xs">실시간 반영 채널 요약</h6>
                    <ul className="space-y-1.5 text-gray-600 text-[11px]">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7db701]" />
                        <span><strong>전화:</strong> {companyForm.phone} (헤더, 푸터, Contact, 플로팅)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7db701]" />
                        <span><strong>이메일:</strong> {companyForm.email} (푸터, Contact 직통)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7db701]" />
                        <span><strong>홈페이지:</strong> {companyForm.websiteUrl} (도메인 표시, 링크)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#7db701]" />
                        <span><strong>주소:</strong> {companyForm.address} (ABOUT 구글지도, 푸터, Contact)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              Tab 1: Portfolios Management (100% Image-centric: No tedious text fields)
              ========================================================================= */}
          {activeTab === 'portfolios' && (
            <div className="p-6 overflow-y-auto">
              {editingItem || isCreatingNew ? (
                /* Pure Image Upload Form */
                <form onSubmit={handleSaveProject} className="space-y-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">
                        {isCreatingNew ? '새 포트폴리오 이미지 등록' : '포트폴리오 이미지 수정'}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        텍스트 입력 없이 내 컴퓨터의 이미지만 첨부하여 간편하게 등록할 수 있습니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setIsCreatingNew(false);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                      취소하고 목록으로
                    </button>
                  </div>

                  {/* Category & Main Feature Toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        카테고리 구분
                      </label>
                      <select
                        value={formData.category || 'package'}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value as CategoryType })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white font-medium"
                      >
                        <option value="package">패키지 디자인</option>
                        <option value="print">홍보인쇄물</option>
                        <option value="web">웹 디자인</option>
                        <option value="logo">로고 디자인</option>
                      </select>
                    </div>

                    <div className="flex items-center sm:pt-6">
                      <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-gray-50 border border-gray-200 w-full hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.isFeatured !== false}
                          onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                          className="w-4 h-4 text-[#7db701] rounded"
                        />
                        <span className="text-xs font-bold text-gray-800">
                          메인 페이지 대표작으로 노출
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Image Attachment Area */}
                  <div className="space-y-3 p-5 rounded-2xl bg-gray-50/90 border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-bold text-gray-900">
                          포트폴리오 이미지 첨부 (내 컴퓨터에서 업로드) *
                        </label>
                        <p className="text-[11px] text-gray-500">
                          내 컴퓨터의 이미지 파일(PNG, JPG, WEBP)을 여러 장 한 번에 선택할 수 있습니다.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => portfolioImageInputRef.current?.click()}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>내 컴퓨터에서 이미지 선택</span>
                      </button>
                    </div>

                    <input
                      ref={portfolioImageInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePortfolioImageUpload}
                      className="hidden"
                    />

                    {/* Attached Images Preview Grid */}
                    {formData.images && formData.images.length > 0 ? (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-[11px] text-gray-600 font-medium">
                          <span>총 {formData.images.length}장의 이미지가 첨부되었습니다.</span>
                          <span className="text-[#7db701] font-bold">* 클릭하여 대표 썸네일 지정</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-2 bg-white rounded-xl border border-gray-200">
                          {formData.images.map((imgUrl, idx) => {
                            const isThumb = (formData.thumbnail || formData.images![0]) === imgUrl;
                            return (
                              <div
                                key={idx}
                                className={`relative rounded-xl border-2 overflow-hidden group bg-gray-100 shadow-2xs transition-all ${
                                  isThumb ? 'border-[#7db701] ring-2 ring-[#7db701]/25' : 'border-gray-200'
                                }`}
                              >
                                <img
                                  src={imgUrl}
                                  alt={`첨부 ${idx + 1}`}
                                  className="w-full h-28 object-cover"
                                />
                                {isThumb && (
                                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#7db701] text-white text-[10px] font-bold shadow-xs">
                                    대표 썸네일
                                  </span>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-1">
                                  {!isThumb && (
                                    <button
                                      type="button"
                                      onClick={() => handleSetAsThumbnail(imgUrl)}
                                      className="px-2 py-1 rounded bg-white text-gray-800 text-[10px] font-bold hover:bg-gray-100 cursor-pointer shadow-xs"
                                    >
                                      대표 지정
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePortfolioImage(idx)}
                                    className="p-1.5 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-xs"
                                    title="삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => portfolioImageInputRef.current?.click()}
                        className="p-10 border-2 border-dashed border-gray-300 hover:border-[#7db701] rounded-2xl text-center cursor-pointer bg-white transition-colors flex flex-col items-center justify-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <Upload className="w-6 h-6 text-[#7db701]" />
                        </div>
                        <p className="text-sm font-bold text-gray-800">
                          여기를 클릭하여 내 컴퓨터에서 포트폴리오 이미지를 선택하세요
                        </p>
                        <span className="text-xs text-gray-400">
                          PNG, JPG, WEBP 등 다중 파일(여러 장)을 한 번에 올릴 수 있습니다
                        </span>
                      </div>
                    )}

                    {/* Optional Web URL Direct Input */}
                    <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-[11px] text-gray-500 font-medium shrink-0">
                        외부 웹 이미지 URL 추가:
                      </span>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="url"
                          id="directUrlInput"
                          placeholder="https://... 이미지 주소 입력 후 추가"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              if (input.value.trim()) {
                                setFormData((prev) => {
                                  const combined = [...(prev.images || []), input.value.trim()];
                                  return { ...prev, images: combined, thumbnail: prev.thumbnail || input.value.trim() };
                                });
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('directUrlInput') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              setFormData((prev) => {
                                const combined = [...(prev.images || []), input.value.trim()];
                                return { ...prev, images: combined, thumbnail: prev.thumbnail || input.value.trim() };
                              });
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs font-bold hover:bg-black cursor-pointer"
                        >
                          추가
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(null);
                        setIsCreatingNew(false);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>이미지 저장하기</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Visual Portfolio Grid */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1">
                    <p className="text-xs text-gray-500">
                      현재 등록된 포트폴리오 목록입니다. 이미지를 클릭하여 추가·변경하거나 삭제할 수 있습니다.
                    </p>
                    <span className="text-xs font-bold text-[#7db701]">
                      총 {portfolios.length}개 등록됨
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {portfolios.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs group flex flex-col justify-between"
                      >
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          <img
                            src={item.thumbnail}
                            alt="포트폴리오 썸네일"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                              {item.categoryLabel}
                            </span>
                            {item.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded-md bg-[#7db701] text-white text-[9px] font-bold">
                                메인
                              </span>
                            )}
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium">
                            {item.images && item.images.length > 1 ? `${item.images.length}장` : '1장'}
                          </div>
                        </div>

                        <div className="p-2.5 bg-gray-50 flex items-center justify-between border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-gray-400 text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            <Edit className="w-3 h-3 text-[#7db701]" />
                            <span>이미지 수정</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-1 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              Tab 2: Partner Logos Management (Upload Logos from Computer -> Reflects on Main)
              ========================================================================= */}
          {activeTab === 'partners' && (
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Hidden file input for bulk uploading logos */}
              <input
                ref={partnerLogoInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePartnerLogosBulkUpload}
                className="hidden"
              />

              {/* Hidden file input for single logo selection */}
              <input
                ref={singlePartnerLogoInputRef}
                type="file"
                accept="image/*"
                onChange={handleSinglePartnerLogoChange}
                className="hidden"
              />

              {isAddingPartner || editingPartner ? (
                /* Add / Edit Single Partner Logo Form */
                <form onSubmit={handleSavePartner} className="max-w-xl mx-auto space-y-5 p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <h4 className="text-base font-bold text-gray-900">
                      {isAddingPartner ? '새 주거래 파트너사 로고 등록' : '파트너사 로고 변경'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPartner(false);
                        setEditingPartner(null);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer"
                    >
                      취소
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      파트너사 / 브랜드명 (선택)
                    </label>
                    <input
                      type="text"
                      placeholder="예: 서울문화재단, 티테라퓨틱스 등"
                      value={partnerFormName}
                      onChange={(e) => setPartnerFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-2">
                      파트너사 로고 이미지 (내 컴퓨터에서 선택) *
                    </label>

                    {partnerFormLogo ? (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200">
                        <div className="w-24 h-16 rounded-lg bg-gray-100 flex items-center justify-center p-2 border border-gray-200">
                          <img
                            src={partnerFormLogo}
                            alt="파트너 로고"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <button
                            type="button"
                            onClick={() => singlePartnerLogoInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-bold cursor-pointer"
                          >
                            다른 이미지로 변경
                          </button>
                          <p className="text-[11px] text-gray-400">
                            권장: 투명 배경 PNG 또는 고화질 로고 이미지
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => singlePartnerLogoInputRef.current?.click()}
                        className="p-8 border-2 border-dashed border-gray-300 hover:border-[#7db701] rounded-2xl text-center cursor-pointer bg-white transition-colors flex flex-col items-center justify-center gap-2"
                      >
                        <Upload className="w-8 h-8 text-[#7db701]" />
                        <p className="text-xs sm:text-sm font-bold text-gray-800">
                          내 컴퓨터에서 파트너사 로고 이미지 파일 선택
                        </p>
                        <span className="text-[11px] text-gray-400">
                          PNG, JPG, SVG, WEBP 지원
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingPartner(false);
                        setEditingPartner(null);
                      }}
                      className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>메인에 로고 반영하기</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Partner Logos Grid List */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#7db701]/10 border border-[#7db701]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-800">
                    <div>
                      <p className="font-bold text-gray-900">
                        💡 메인 페이지 [주거래 파트너사] 영역에 로고로만 즉시 표시됩니다.
                      </p>
                      <p className="text-gray-600 mt-0.5">
                        컴퓨터에 보관 중인 파트너사 로고 이미지들을 <strong>[로고 일괄 첨부]</strong>로 한 번에 올릴 수 있습니다.
                      </p>
                    </div>
                    <button
                      onClick={() => partnerLogoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white font-bold shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Upload className="w-4 h-4" />
                      <span>내 컴퓨터에서 로고 일괄 첨부</span>
                    </button>
                  </div>

                  {partnerList.length === 0 ? (
                    <div className="p-12 text-center bg-gray-50 rounded-2xl border border-gray-200 text-gray-500 text-xs">
                      등록된 파트너사 로고가 없습니다. [새 로고 등록] 또는 [로고 일괄 첨부]를 클릭하세요.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                      {partnerList.map((partner) => (
                        <div
                          key={partner.id}
                          className="bg-white rounded-xl border border-gray-200 p-3 shadow-2xs hover:shadow-md hover:border-[#7db701] transition-all flex flex-col justify-between group relative"
                        >
                          <div className="h-20 flex items-center justify-center p-2 bg-gray-50 rounded-lg overflow-hidden">
                            {partner.logoUrl ? (
                              <img
                                src={partner.logoUrl}
                                alt={partner.name}
                                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                              />
                            ) : (
                              <div className="text-center">
                                <span className="font-bold text-xs text-gray-700 block">
                                  {partner.name}
                                </span>
                                <span className="text-[10px] text-gray-400">텍스트 표기 중</span>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
                            <span className="text-[11px] font-semibold text-gray-700 truncate max-w-[90px]">
                              {partner.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleOpenEditPartner(partner)}
                                className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded cursor-pointer"
                                title="로고 변경"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePartner(partner.id)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer"
                                title="삭제"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              Tab 3: Inquiries Management
              ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs text-gray-500">
                  고객이 메인 즉시 견적 폼 및 문의 페이지를 통해 접수한 상담 내역입니다.
                </p>
                <span className="text-xs font-bold text-[#7db701]">
                  총 {inquiries.length}건
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl text-gray-500 text-xs">
                  접수된 문의 내역이 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#7db701] text-white text-[11px] font-bold">
                            {inq.companyName || '미기재'}
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {inq.contactName}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            ({inq.createdAt})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleInquiryStatusChange(inq.id, e.target.value as InquiryItem['status'])
                            }
                            className="px-2.5 py-1 rounded-lg border border-gray-300 text-xs bg-white font-semibold text-gray-700"
                          >
                            <option value="신규접수">신규접수</option>
                            <option value="상담진행">상담진행</option>
                            <option value="견적발송">견적발송</option>
                            <option value="계약완료">계약완료</option>
                            <option value="보류">보류</option>
                          </select>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            title="문의 내역 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inquiry Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                        <div>
                          <span className="text-gray-400 block text-[11px]">의뢰 분야</span>
                          <span className="font-semibold text-gray-900">
                            {inq.services.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">연락처 / 이메일</span>
                          <span className="font-semibold text-gray-900 block truncate">
                            {inq.phone || '-'} / {inq.email}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[11px]">예산 / 희망일정</span>
                          <span className="font-semibold text-gray-900">
                            {inq.budget} {inq.deadline ? `· ${inq.deadline}` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="text-xs text-gray-700 whitespace-pre-wrap bg-white p-3 rounded-xl border border-gray-200/60">
                        {inq.description}
                      </div>

                      {/* Attached Files if any */}
                      {inq.attachedFiles && inq.attachedFiles.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[11px] font-bold text-gray-500 block mb-1">
                            고객 첨부 파일 ({inq.attachedFiles.length}건):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {inq.attachedFiles.map((file, fIdx) => (
                              <div
                                key={fIdx}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-[11px]"
                              >
                                {file.dataUrl ? (
                                  <img
                                    src={file.dataUrl}
                                    alt="thumb"
                                    className="w-5 h-5 rounded object-cover"
                                  />
                                ) : (
                                  <FileText className="w-3.5 h-3.5 text-[#7db701]" />
                                )}
                                <span className="font-medium text-gray-800">{file.name}</span>
                                <span className="text-gray-400 font-mono text-[10px]">
                                  ({file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(0)}KB` : `${(file.size / (1024 * 1024)).toFixed(1)}MB`})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {inq.referenceUrl && (
                        <div className="text-[11px] text-gray-500 flex items-center gap-1">
                          <span>참고 링크:</span>
                          <a
                            href={inq.referenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#7db701] hover:underline flex items-center gap-0.5"
                          >
                            {inq.referenceUrl}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {/* Admin Internal Memo */}
                      <div className="pt-2">
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">
                          관리자 내부 메모 (상담 일지 등):
                        </label>
                        <input
                          type="text"
                          value={inq.adminMemo || ''}
                          onChange={(e) => handleInquiryMemoChange(inq.id, e.target.value)}
                          placeholder="예: 1차 유선 상담 완료, 견적서 발송 대기 등"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-amber-50/30"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: 비밀번호 및 카카오톡 설정 */}
          {activeTab === 'settings' && (
            <div className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto w-full">
              {/* Settings Header */}
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-xl font-black text-gray-950 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#7db701]" />
                  <span>시스템 및 채널 연동 환경설정</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  카카오톡 1:1 상담창 연동 주소와 활성화 상태, 그리고 관리자 로그인 비밀번호를 변경할 수 있습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* 1. 카카오톡 상담창 설정 카드 */}
                <div className="p-6 rounded-2xl bg-[#fbf8f3] border border-[#eae2d5] shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#eae2d5]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#FEE500] text-[#191919] flex items-center justify-center font-bold">
                        <MessageSquare className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">카카오톡 상담창 설정</h4>
                        <span className="text-[11px] text-gray-500">실시간 채널 연동</span>
                      </div>
                    </div>

                    {/* ON / OFF Toggle Button */}
                    <button
                      type="button"
                      onClick={handleToggleKakaoEnabled}
                      className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        kakaoForm.enabled ? 'bg-[#7db701]' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={kakaoForm.enabled}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          kakaoForm.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-semibold">채널 노출 상태:</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          kakaoForm.enabled
                            ? 'bg-[#7db701]/15 text-[#6c9f00] border border-[#7db701]/30'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {kakaoForm.enabled ? '연결 활성화 (ON)' : '숨김 비활성화 (OFF)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      * 활성화 시 웹사이트 우측 하단 플로팅 및 프로젝트 문의 페이지에 카카오톡 1:1 상담 버튼이 노출됩니다.
                    </p>
                  </div>

                  {/* Kakao URL form */}
                  <form onSubmit={handleSaveKakaoSettings} className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        카카오톡 상담창 연결 주소 (URL)
                      </label>
                      <input
                        type="url"
                        required
                        value={kakaoForm.url}
                        onChange={(e) => setKakaoForm({ ...kakaoForm, url: e.target.value })}
                        placeholder="https://pf.kakao.com/_YtuVn"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                      <p className="text-[11px] text-gray-400 mt-1">
                        기본 권장 채널: <span className="font-mono text-gray-600">https://pf.kakao.com/_YtuVn</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>카카오톡 설정 저장</span>
                      </button>

                      {kakaoForm.url && (
                        <a
                          href={kakaoForm.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold border border-gray-200 transition-colors inline-flex items-center gap-1"
                          title="새 창에서 링크 확인"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                          <span>링크 테스트</span>
                        </a>
                      )}
                    </div>

                    {kakaoSavedFeedback && (
                      <div className="p-2.5 rounded-xl bg-[#7db701]/10 border border-[#7db701]/30 text-xs text-[#6fa300] font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>카카오톡 설정이 성공적으로 저장되었습니다.</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* 2. 관리자 비밀번호 변경 카드 */}
                <div className="p-6 rounded-2xl bg-[#fbf8f3] border border-[#eae2d5] shadow-xs space-y-5">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-[#eae2d5]">
                    <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">
                      <KeyRound className="w-4 h-4 text-[#7db701]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">관리자 비밀번호 변경</h4>
                      <span className="text-[11px] text-gray-500">인증 보안 관리</span>
                    </div>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-gray-800 mb-1">
                        현재 비밀번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPwdInput}
                        onChange={(e) => setCurrentPwdInput(e.target.value)}
                        placeholder="현재 사용 중인 비밀번호"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-800 mb-1">
                        새 비밀번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={4}
                        value={newPwdInput}
                        onChange={(e) => setNewPwdInput(e.target.value)}
                        placeholder="새 비밀번호 입력 (4자리 이상)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-800 mb-1">
                        새 비밀번호 확인 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={4}
                        value={confirmPwdInput}
                        onChange={(e) => setConfirmPwdInput(e.target.value)}
                        placeholder="새 비밀번호 다시 입력"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#7db701] focus:ring-2 focus:ring-[#7db701]/20 text-xs sm:text-sm outline-hidden bg-white"
                      />
                    </div>

                    {pwdMessage && (
                      <div
                        className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                          pwdMessage.type === 'success'
                            ? 'bg-[#7db701]/10 border border-[#7db701]/30 text-[#6fa300]'
                            : 'bg-red-50 border border-red-200 text-red-600'
                        }`}
                      >
                        {pwdMessage.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 shrink-0" />
                        )}
                        <span>{pwdMessage.text}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#7db701]" />
                        <span>비밀번호 변경 저장</span>
                      </button>
                    </div>

                    <div className="pt-3 border-t border-[#eae2d5] text-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('관리자 비밀번호를 초기 비밀번호로 복원하시겠습니까?')) {
                            saveStoredAdminPassword(DEFAULT_ADMIN_PASSWORD);
                            setPwdMessage({ type: 'success', text: '비밀번호가 초기 비밀번호로 복원되었습니다.' });
                          }
                        }}
                        className="text-[11px] text-gray-500 hover:text-gray-800 underline cursor-pointer"
                      >
                        비밀번호가 기억나지 않을 때: 초기 비밀번호로 복원
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
