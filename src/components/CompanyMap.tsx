import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, ExternalLink, Copy, Check, Building2 } from 'lucide-react';

interface CompanyMapProps {
  address: string;
  locationGuide?: string;
}

// Approximate coordinates for 경기도 군포시 엘에스로 92 국제유통단지
const DEFAULT_COORDS = { lat: 37.3695, lng: 126.9442 };

export const CompanyMap: React.FC<CompanyMapProps> = ({ address, locationGuide }) => {
  const [copied, setCopied] = useState(false);
  const mapsApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const iframeEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Top Address & Action Bar */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7db701]/15 text-[#6c9f00] text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>본사 및 디자인 제작소 위치</span>
            </span>
            <span className="text-xs text-gray-400 font-mono">인미트 (INMIT)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <span>{address}</span>
          </h3>
          {locationGuide && (
            <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 pt-0.5">
              <Building2 className="w-4 h-4 text-[#7db701] shrink-0" />
              <span>{locationGuide}</span>
            </p>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold border border-gray-200 transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#7db701]" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
            <span>{copied ? '주소 복사됨' : '주소 복사'}</span>
          </button>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7db701] hover:bg-[#6fa300] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>길찾기 (Google Maps)</span>
          </a>

          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            <span>지도 크게 보기</span>
          </a>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="w-full h-[360px] sm:h-[440px] relative bg-gray-100">
        {mapsApiKey ? (
          <APIProvider apiKey={mapsApiKey} solutionChannel="gmp_mcp_codeassist_v1_aistudio">
            <div className="w-full h-full">
              <Map
                defaultCenter={DEFAULT_COORDS}
                defaultZoom={16}
                mapId="DEMO_MAP_ID"
                style={{ width: '100%', height: '100%' }}
                gestureHandling="cooperative"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                <AdvancedMarker position={DEFAULT_COORDS} title={address}>
                  <Pin background="#7db701" glyphColor="#ffffff" borderColor="#4d7200" scale={1.2} />
                </AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
        ) : (
          <iframe
            title="Google Maps Location - INMIT"
            src={iframeEmbedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>

      {/* Bottom Transport Guide Bar */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7db701] shrink-0" />
          <span>
            <strong>방문 및 감리 미팅:</strong> 원활한 디자인 상담 및 일정 조율을 위해 사전 예약 후 방문을 권장합니다.
          </span>
        </div>
        <div className="text-gray-500 text-[11px]">
          * 지하철 1·4호선 금정역에서 차량 5분 / 안양국제유통단지 내 주차 가능
        </div>
      </div>
    </div>
  );
};
