/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainPage } from './components/MainPage';
import { AboutPage } from './components/AboutPage';
import { PortfolioPage } from './components/PortfolioPage';
import { ClientsPage } from './components/ClientsPage';
import { ContactPage } from './components/ContactPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CertificationModal } from './components/CertificationModal';
import { AdminModal } from './components/AdminModal';
import { TermsModal } from './components/TermsModal';
import { FloatingConsultation } from './components/FloatingConsultation';
import { PortfolioItem, PartnerClient } from './types/portfolio';
import { getStoredPortfolios, getStoredPartners } from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => getStoredPortfolios());
  const [partners, setPartners] = useState<PartnerClient[]>(() => getStoredPartners());

  // Modals state
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);
  const [termsModalTab, setTermsModalTab] = useState<'terms' | 'privacy'>('terms');

  // Pre-filled project for contact inquiry
  const [prefilledProject, setPrefilledProject] = useState<PortfolioItem | null>(null);

  // Google Maps Platform quota defense state
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Scroll to top on page change
  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePortfoliosUpdated = () => {
    setPortfolios(getStoredPortfolios());
  };

  const handlePartnersUpdated = () => {
    setPartners(getStoredPartners());
  };

  const handleInquireWithProject = (project: PortfolioItem) => {
    setPrefilledProject(project);
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTermsModal = (tab: 'terms' | 'privacy') => {
    setTermsModalTab(tab);
    setIsTermsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#7db701]/20 selection:text-black">
      {/* Google Maps Quota Warning Banner if Demo quota exceeded */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-xs">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Navigation Bar */}
      <Header
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'main' && (
          <MainPage
            portfolios={portfolios}
            partners={partners}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onNavigate={navigateToPage}
            onOpenCertModal={() => setIsCertModalOpen(true)}
            onOpenTermsModal={handleOpenTermsModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateToPage}
            onOpenCertModal={() => setIsCertModalOpen(true)}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage
            portfolios={portfolios}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onNavigate={navigateToPage}
          />
        )}

        {currentPage === 'clients' && (
          <ClientsPage
            partners={partners}
            onNavigate={navigateToPage}
            onOpenCertModal={() => setIsCertModalOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            prefilledProject={prefilledProject}
            onClearPrefilled={() => setPrefilledProject(null)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={navigateToPage}
        onOpenCertModal={() => setIsCertModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenTermsModal={handleOpenTermsModal}
      />

      {/* Floating Quick Action Consultation Buttons */}
      <FloatingConsultation onNavigateContact={() => navigateToPage('contact')} />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireWithProject={handleInquireWithProject}
      />

      {/* Official Certifications Modal */}
      <CertificationModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      {/* Terms of Service & Privacy Policy Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        defaultTab={termsModalTab}
      />

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onPortfoliosUpdated={handlePortfoliosUpdated}
        partners={partners}
        onPartnersUpdated={handlePartnersUpdated}
      />
    </div>
  );
}
