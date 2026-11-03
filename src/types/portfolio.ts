export type CategoryType = 'package' | 'print' | 'web' | 'logo';

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  categoryLabel: string;
  client: string;
  period: string;
  contribution: string; // e.g. "기획 100% / 디자인 100% / 인쇄 감리 100%"
  tools: string[]; // e.g. ["Illustrator", "Photoshop", "Cinema 4D"]
  background: string; // 기획 의도 및 문제 해결 관점
  keyResults: string[]; // 주요 성과 및 특징
  thumbnail: string;
  images: string[];
  review: {
    quote: string;
    author: string;
    role: string;
  };
  isFeatured: boolean; // 메인 대표 포트폴리오 노출 여부
  order: number;
  createdAt: string;
}

export interface AttachedFileMeta {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
}

export interface InquiryItem {
  id: string;
  services: string[]; // ['패키지', '홍보인쇄물', '웹디자인', '로고디자인']
  companyName: string;
  contactName: string;
  phone?: string;
  email: string;
  budget: string;
  deadline?: string;
  referenceUrl?: string;
  description: string;
  attachedFiles?: AttachedFileMeta[];
  status: '신규접수' | '상담진행' | '견적발송' | '계약완료' | '보류';
  adminMemo?: string;
  createdAt: string;
}

export interface PartnerClient {
  id: string;
  name: string;
  category: '공공기관/재단' | '뷰티/코스메틱' | 'F&B/라이프' | '기업/IT';
  description: string;
  highlightWork: string;
  logoUrl?: string;
}
