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
