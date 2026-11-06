import { PortfolioItem, InquiryItem, PartnerClient } from '../types/portfolio';
import { INITIAL_PORTFOLIO_ITEMS, INITIAL_INQUIRIES, INITIAL_PARTNERS } from '../data/initialData';

const PORTFOLIO_STORAGE_KEY = 'inmit_portfolio_items_v2';
const INQUIRIES_STORAGE_KEY = 'inmit_inquiries_items_v2';
const PARTNERS_STORAGE_KEY = 'inmit_partners_items_v2';

export function getStoredPortfolios(): PortfolioItem[] {
  if (typeof window === 'undefined') return INITIAL_PORTFOLIO_ITEMS;
  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_ITEMS));
      return INITIAL_PORTFOLIO_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PORTFOLIO_ITEMS;
  } catch (e) {
    console.error('Failed to read portfolios from storage', e);
    return INITIAL_PORTFOLIO_ITEMS;
  }
}

export function saveStoredPortfolios(items: PortfolioItem[]): void {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save portfolios to storage', e);
  }
}

export function resetStoredPortfolios(): PortfolioItem[] {
  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_ITEMS));
    return INITIAL_PORTFOLIO_ITEMS;
  } catch (e) {
    console.error('Failed to reset portfolios', e);
    return INITIAL_PORTFOLIO_ITEMS;
  }
}

export function getStoredPartners(): PartnerClient[] {
  if (typeof window === 'undefined') return INITIAL_PARTNERS;
  try {
    const raw = localStorage.getItem(PARTNERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(INITIAL_PARTNERS));
      return INITIAL_PARTNERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PARTNERS;
  } catch (e) {
    console.error('Failed to read partners from storage', e);
    return INITIAL_PARTNERS;
  }
}

export function saveStoredPartners(items: PartnerClient[]): void {
  try {
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save partners to storage', e);
  }
}

export function resetStoredPartners(): PartnerClient[] {
  try {
    localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(INITIAL_PARTNERS));
    return INITIAL_PARTNERS;
  } catch (e) {
    console.error('Failed to reset partners', e);
    return INITIAL_PARTNERS;
  }
}

export function getStoredInquiries(): InquiryItem[] {
  if (typeof window === 'undefined') return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_INQUIRIES;
  } catch (e) {
    console.error('Failed to read inquiries from storage', e);
    return INITIAL_INQUIRIES;
  }
}

export function saveStoredInquiries(items: InquiryItem[]): void {
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save inquiries to storage', e);
  }
}

// ==========================================
// Admin Password Management
// ==========================================
const ADMIN_PASSWORD_STORAGE_KEY = 'inmit_admin_pwd_v2';
export const DEFAULT_ADMIN_PASSWORD = '1978';

export function getStoredAdminPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSWORD;
  try {
    const pwd = localStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY);
    return pwd && pwd.trim().length > 0 ? pwd : DEFAULT_ADMIN_PASSWORD;
  } catch (e) {
    console.error('Failed to read admin password from storage', e);
    return DEFAULT_ADMIN_PASSWORD;
  }
}

export function saveStoredAdminPassword(password: string): void {
  try {
    localStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, password);
  } catch (e) {
    console.error('Failed to save admin password to storage', e);
  }
}

// ==========================================
// Kakao Channel Settings Management
// ==========================================
export interface KakaoSettings {
  url: string;
  enabled: boolean;
}

const KAKAO_SETTINGS_STORAGE_KEY = 'inmit_kakao_settings_v2';
export const DEFAULT_KAKAO_SETTINGS: KakaoSettings = {
  url: 'https://pf.kakao.com/_YtuVn',
  enabled: true,
};

export function getStoredKakaoSettings(): KakaoSettings {
  if (typeof window === 'undefined') return DEFAULT_KAKAO_SETTINGS;
  try {
    const raw = localStorage.getItem(KAKAO_SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(KAKAO_SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_KAKAO_SETTINGS));
      return DEFAULT_KAKAO_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return {
      url: typeof parsed.url === 'string' && parsed.url.trim() ? parsed.url : DEFAULT_KAKAO_SETTINGS.url,
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_KAKAO_SETTINGS.enabled,
    };
  } catch (e) {
    console.error('Failed to read kakao settings from storage', e);
    return DEFAULT_KAKAO_SETTINGS;
  }
}

export function saveStoredKakaoSettings(settings: KakaoSettings): void {
  try {
    localStorage.setItem(KAKAO_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    // Trigger custom event so other components update immediately
    window.dispatchEvent(new Event('inmit-kakao-updated'));
  } catch (e) {
    console.error('Failed to save kakao settings to storage', e);
  }
}

// ==========================================
// Site & Company Basic Info Management
// ==========================================
export interface CompanyInfo {
  phone: string;
  email: string;
  websiteUrl: string;
  address: string;
  addressDetail?: string;
  companyName?: string;
  representative?: string;
  businessNumber?: string;
  businessHours?: string;
  locationGuide?: string;
}

const COMPANY_INFO_STORAGE_KEY = 'inmit_company_info_v2';
export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  phone: '010-9072-1005',
  email: 'addition9@naver.com',
  websiteUrl: 'www.inmit.co.kr',
  address: '경기도 군포시 엘에스로 92 국제유통단지 24동 205호',
  addressDetail: '안양국제유통단지 24동 205호',
  companyName: '인미트(INMIT) 디자인제작소',
  representative: '인미트',
  businessNumber: '산업디자인전문회사 · 여성기업인증',
  businessHours: '평일 09:30 ~ 18:30 (점심시간 12:30 ~ 13:30)',
  locationGuide: '지하철 1·4호선 금정역 인근 / 안양국제유통단지 24동 205호 (방문 상담 시 사전 예약 필수)',
};

export function getStoredCompanyInfo(): CompanyInfo {
  if (typeof window === 'undefined') return DEFAULT_COMPANY_INFO;
  try {
    const raw = localStorage.getItem(COMPANY_INFO_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMPANY_INFO_STORAGE_KEY, JSON.stringify(DEFAULT_COMPANY_INFO));
      return DEFAULT_COMPANY_INFO;
    }
    const parsed = JSON.parse(raw);
    return {
      phone: typeof parsed.phone === 'string' && parsed.phone.trim() ? parsed.phone : DEFAULT_COMPANY_INFO.phone,
      email: typeof parsed.email === 'string' && parsed.email.trim() ? parsed.email : DEFAULT_COMPANY_INFO.email,
      websiteUrl: typeof parsed.websiteUrl === 'string' && parsed.websiteUrl.trim() ? parsed.websiteUrl : DEFAULT_COMPANY_INFO.websiteUrl,
      address: typeof parsed.address === 'string' && parsed.address.trim() ? parsed.address : DEFAULT_COMPANY_INFO.address,
      addressDetail: typeof parsed.addressDetail === 'string' ? parsed.addressDetail : DEFAULT_COMPANY_INFO.addressDetail,
      companyName: typeof parsed.companyName === 'string' ? parsed.companyName : DEFAULT_COMPANY_INFO.companyName,
      representative: typeof parsed.representative === 'string' ? parsed.representative : DEFAULT_COMPANY_INFO.representative,
      businessNumber: typeof parsed.businessNumber === 'string' ? parsed.businessNumber : DEFAULT_COMPANY_INFO.businessNumber,
      businessHours: typeof parsed.businessHours === 'string' ? parsed.businessHours : DEFAULT_COMPANY_INFO.businessHours,
      locationGuide: typeof parsed.locationGuide === 'string' ? parsed.locationGuide : DEFAULT_COMPANY_INFO.locationGuide,
    };
  } catch (e) {
    console.error('Failed to read company info from storage', e);
    return DEFAULT_COMPANY_INFO;
  }
}

export function saveStoredCompanyInfo(info: CompanyInfo): void {
  try {
    localStorage.setItem(COMPANY_INFO_STORAGE_KEY, JSON.stringify(info));
    window.dispatchEvent(new Event('inmit-company-info-updated'));
  } catch (e) {
    console.error('Failed to save company info to storage', e);
  }
}

export function resetStoredCompanyInfo(): CompanyInfo {
  try {
    localStorage.setItem(COMPANY_INFO_STORAGE_KEY, JSON.stringify(DEFAULT_COMPANY_INFO));
    window.dispatchEvent(new Event('inmit-company-info-updated'));
    return DEFAULT_COMPANY_INFO;
  } catch (e) {
    console.error('Failed to reset company info in storage', e);
    return DEFAULT_COMPANY_INFO;
  }
}
