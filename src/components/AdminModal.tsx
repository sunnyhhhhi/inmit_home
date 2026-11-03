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
  Image as ImageIcon
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
  const [activeTab, setActiveTab] = useState<'portfolios' | 'partners' | 'inquiries'>('portfolios');

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

  // Sync partners with props if changed externally
  useEffect(() => {
    if (partners) {
      setPartnerList(partners);
    }
  }, [partners]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative my-auto flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7c726e] text-white flex items-center justify-center font-bold">
              <Settings className="w-5 h-5 text-[#7db701]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-gray-900">INMIT 인미트 디자인제작소 관리자 모드</h3>
              </div>
              <p className="text-xs text-gray-500">
                포트폴리오 이미지 관리, 주거래 파트너사 로고 관리 및 접수 견적 관리
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Direct Dashboard */}
        <div className="flex-1 flex flex-col">
          {/* Top Toolbar Tabs */}
          <div className="px-6 pt-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-2">
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
            </div>

            <div className="flex items-center gap-2 pb-2">
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
        </div>
      </div>
    </div>
  );
};
