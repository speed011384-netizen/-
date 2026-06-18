import { Phone, MessageCircle, MessageSquare, Menu, X, PawPrint, Shield } from 'lucide-react';
import { useState } from 'react';
import { SiteConfig } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  siteConfig: SiteConfig;
}

export default function Header({ activeTab, setActiveTab, siteConfig }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: '홈' },
    { id: 'services', label: '서비스 소개' },
    { id: 'guide', label: '이용안내' },
    { id: 'fare', label: '요금안내' },
    { id: 'reviews', label: '이용후기' },
    { id: 'photos', label: '운행사진' },
    { id: 'admin', label: '관리자(CMS)' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" id="main-header">
      {/* Top Banner Contact bar (Matches blog layout) */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 py-2 text-xs text-gray-500 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          <span><span className="notranslate" translate="no">MANS.PET PETTAXI</span> 안전 드라이버 대기중 (24시간 상담)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>평일/주말 상시 전용 매칭 보장</span>
          <span>|</span>
          <span className="font-semibold text-gray-700">전화 접수: {siteConfig.phone}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => setActiveTab('home')}
          id="header-logo"
        >
          <div className="bg-brand-green p-2 text-white rounded-full shadow-md group-hover:scale-105 transition-transform">
            <PawPrint className="w-6 h-6" />
          </div>
          <div className="notranslate" translate="no">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl lg:text-2xl text-gray-900 tracking-tight text-brand-green">MANS.PET</span>
              <span className="text-gray-900 font-bold">♥</span>
              <span className="font-extrabold text-xl lg:text-2xl text-gray-900 tracking-tight">PETTAXI</span>
            </div>
            <p className="text-[9px] text-gray-400 font-display font-semibold tracking-widest uppercase -mt-0.5">
              MANS.PET PETTAXI
            </p>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-brand-green-light text-brand-green font-bold scale-105'
                  : 'text-gray-600 hover:text-brand-green hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Call buttons (Matches Yellow & Green mockup styled buttons) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Phone Call (Green) */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            id="btn-call-header"
          >
            <Phone className="w-4 h-4 fill-white" />
            <div className="text-left leading-tight">
              <p className="text-[10px] opacity-95 font-normal">24시간 상담 예약</p>
              <p className="text-xs font-bold tracking-tight">{siteConfig.phone}</p>
            </div>
          </a>

          {/* Naver TalkTalk (Green) */}
          <a
            href={siteConfig.naverTalktalkUrl || 'https://talk.naver.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#03c75a] hover:bg-[#02b350] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            id="btn-naver-talktalk-header"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <div className="text-left leading-tight">
              <p className="text-[10px] text-emerald-100 font-normal">네이버 톡톡 상담하기</p>
              <p className="text-xs font-bold">실시간 간편 문의</p>
            </div>
          </a>

          {/* KakaoTalk Channel (Yellow) */}
          <a
            href={siteConfig.kakaoChannelUrl || 'https://pf.kakao.com/_xgpxkxbG'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FEE500] hover:bg-[#FADC00] text-[#3C1E1E] px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            id="btn-kakao-channel-header"
          >
            <MessageSquare className="w-4 h-4 fill-[#3C1E1E] text-[#3C1E1E]" />
            <div className="text-left leading-tight">
              <p className="text-[10px] text-[#5C3F1E] font-normal">카카오톡 채널 상담</p>
              <p className="text-xs font-bold font-sans">실시간 카톡 문의</p>
            </div>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Phone Link */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="p-2.5 bg-brand-green text-white rounded-xl shadow-sm sm:hidden"
            id="btn-mobile-call"
          >
            <Phone className="w-5 h-5 fill-white" />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 bg-gray-50 text-gray-700 hover:text-brand-green rounded-xl hover:bg-gray-100 transition-colors"
            id="btn-mobile-menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation - Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 animate-fadeIn" id="mobile-drawer">
          <div className="grid grid-cols-3 gap-1.5 pb-3 mb-2 border-b border-gray-100">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex flex-col items-center justify-center gap-1 bg-brand-green text-white py-2 rounded-xl text-[11px] font-bold"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>전화 연결</span>
            </a>
            <a
              href={siteConfig.naverTalktalkUrl || 'https://talk.naver.com/'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="flex flex-col items-center justify-center gap-1 bg-[#03c75a] text-white py-2 rounded-xl text-[11px] font-bold hover:bg-[#02b350]"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>네이버 톡톡</span>
            </a>
            <a
              href={siteConfig.kakaoChannelUrl || 'https://pf.kakao.com/_xgpxkxbG'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="flex flex-col items-center justify-center gap-1 bg-[#FEE500] text-[#3C1E1E] py-2 rounded-xl text-[11px] font-bold hover:bg-[#FADC00]"
            >
              <MessageSquare className="w-4 h-4 fill-[#3C1E1E] text-[#3C1E1E]" />
              <span>카카오톡</span>
            </a>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-brand-green-light text-brand-green font-bold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-green'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
