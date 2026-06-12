import { Phone, MessageCircle, Menu, X, PawPrint } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: '홈' },
    { id: 'services', label: '서비스 소개' },
    { id: 'guide', label: '이용안내' },
    { id: 'fare', label: '요금안내' },
    { id: 'reviews', label: '이용후기' },
    { id: 'photos', label: '운행사진' },
    { id: 'contact', label: '문의하기' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" id="main-header">
      {/* Top Banner Contact bar (Matches blog layout) */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 py-2 text-xs text-gray-500 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          <span>mans pet 안전 파수꾼 대기중 (24시간 상담)</span>
        </div>
        <div className="flex items-center gap-4">
          <span>평일/주말 상시 전용 매칭 보장</span>
          <span>|</span>
          <span className="font-semibold text-gray-700">전화 접수: 010-7644-0799</span>
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
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl lg:text-2xl text-gray-900 tracking-tight text-brand-green">mans pet</span>
              <span className="text-gray-900 font-bold">♥</span>
              <span className="font-extrabold text-xl lg:text-2xl text-gray-900 tracking-tight">펫택시</span>
            </div>
            <p className="text-[9px] text-gray-400 font-display font-medium tracking-widest uppercase -mt-0.5">
              Mans Pet Taxi
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
            href="tel:010-7644-0799"
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            id="btn-call-header"
          >
            <Phone className="w-4 h-4 fill-white" />
            <div className="text-left leading-tight">
              <p className="text-[10px] opacity-95 font-normal">24시간 상담 예약</p>
              <p className="text-xs font-bold tracking-tight">010-7644-0799</p>
            </div>
          </a>

          {/* Kakao Talk (Yellow) */}
          <button
            onClick={() => setActiveTab('contact')}
            className="flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            id="btn-kakao-header"
          >
            <MessageCircle className="w-4 h-4 fill-gray-900 text-gray-900" />
            <div className="text-left leading-tight">
              <p className="text-[10px] text-gray-700 font-normal">카카오톡 상담하기</p>
              <p className="text-xs font-bold">실시간 간편 문의</p>
            </div>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Phone Link */}
          <a
            href="tel:010-7644-0799"
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
          <div className="grid grid-cols-2 gap-2 pb-3 mb-2 border-b border-gray-100">
            <a
              href="tel:010-7644-0799"
              className="flex items-center justify-center gap-2 bg-brand-green text-white py-3 rounded-xl text-xs font-bold"
            >
              <Phone className="w-4 h-4 fill-white" />
              전화 연결
            </a>
            <button
              onClick={() => {
                setActiveTab('contact');
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-brand-yellow text-gray-900 py-3 rounded-xl text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4 fill-gray-900" />
              카톡 상담 신청
            </button>
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
