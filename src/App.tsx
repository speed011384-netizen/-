import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Guide from './components/Guide';
import FareCalculator from './components/FareCalculator';
import Reviews from './components/Reviews';
import Photos from './components/Photos';
import AdminCMS from './components/AdminCMS';
import { Review, Booking, GalleryPhoto, SiteConfig, FareConfig } from './types';
import { 
  INITIAL_REVIEWS, GALLERY_PHOTOS, 
  DEFAULT_SITE_CONFIG, DEFAULT_FARE_CONFIG 
} from './data';
import { PawPrint, Heart, Smartphone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('menzpet_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('menzpet_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return [];
      }
    }
    return [];
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('manspet_gallery_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return GALLERY_PHOTOS;
      }
    }
    return GALLERY_PHOTOS;
  });
  
  // Custom CMS configurations state
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('manspet_site_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.naverTalktalkUrl === 'https://talk.naver.com/' || !parsed.naverTalktalkUrl)) {
          parsed.naverTalktalkUrl = 'http://talk.naver.com/profile/w4pxji';
          localStorage.setItem('manspet_site_config', JSON.stringify(parsed));
        }
        return parsed;
      } catch (err) {
        return DEFAULT_SITE_CONFIG;
      }
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [fareConfig, setFareConfig] = useState<FareConfig>(() => {
    const saved = localStorage.getItem('manspet_fare_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return DEFAULT_FARE_CONFIG;
      }
    }
    return DEFAULT_FARE_CONFIG;
  });

  const [calculatorData, setCalculatorData] = useState<{
    petType: 'dog' | 'cat' | 'special';
    serviceType: string;
    distance: number;
    options: string[];
    fare: number;
  } | null>(null);

  // Sync state helpers
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const freshReview: Review = {
      ...newReviewData,
      id: `custom-rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [freshReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('menzpet_reviews', JSON.stringify(updated));
  };

  const handleApplyBookingFromCalculator = (data: {
    petType: 'dog' | 'cat' | 'special';
    serviceType: string;
    distance: number;
    options: string[];
    fare: number;
  }) => {
    setCalculatorData(data);
    try {
      const optionsStr = data.options.length > 0 ? `\n추가옵션: ${data.options.join(', ')}` : '';
      const textToCopy = `[MANS.PET PETTAXI 견적 문의]\n${data.serviceType}\n이동거리: ${data.distance}km\n예상요금: ${data.fare.toLocaleString()}원${optionsStr}`;
      navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.log('Clipboard copy failed', err);
    }
    
    // Directly launch Naver TalkTalk externally
    const link = document.createElement('a');
    link.href = 'http://talk.naver.com/profile/w4pxji';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  // Reset function passed to CMS ('manspet_gallery_photos' is fully protected from rolback reset)
  const handleResetToDefault = () => {
    localStorage.removeItem('manspet_site_config');
    localStorage.removeItem('manspet_fare_config');
    localStorage.removeItem('menzpet_reviews');
    setSiteConfig(DEFAULT_SITE_CONFIG);
    setFareConfig(DEFAULT_FARE_CONFIG);
    setReviews(INITIAL_REVIEWS);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} reviews={reviews} photos={photos} siteConfig={siteConfig} />;
      case 'services':
        return <Services setActiveTab={setActiveTab} />;
      case 'guide':
        return <Guide />;
      case 'fare':
        return (
          <FareCalculator 
            fareConfig={fareConfig}
            siteConfig={siteConfig}
          />
        );
      case 'reviews':
        return <Reviews reviews={reviews} onAddReview={handleAddReview} />;
      case 'photos':
        return (
          <Photos 
            setActiveTab={setActiveTab} 
            photos={photos}
            onUpdatePhotos={(updated: GalleryPhoto[]) => {
              setPhotos(updated);
              localStorage.setItem('manspet_gallery_photos', JSON.stringify(updated));
            }}
          />
        );
      case 'admin':
        return (
          <AdminCMS
            siteConfig={siteConfig}
            onUpdateSiteConfig={(updated) => {
              setSiteConfig(updated);
              localStorage.setItem('manspet_site_config', JSON.stringify(updated));
            }}
            fareConfig={fareConfig}
            onUpdateFareConfig={(updated) => {
              setFareConfig(updated);
              localStorage.setItem('manspet_fare_config', JSON.stringify(updated));
            }}
            reviews={reviews}
            onUpdateReviews={(updated) => {
              setReviews(updated);
              localStorage.setItem('menzpet_reviews', JSON.stringify(updated));
            }}
            photos={photos}
            onUpdatePhotos={(updated) => {
              setPhotos(updated);
              localStorage.setItem('manspet_gallery_photos', JSON.stringify(updated));
            }}
            onResetToDefault={handleResetToDefault}
          />
        );
      default:
        return <Home setActiveTab={setActiveTab} reviews={reviews} photos={photos} siteConfig={siteConfig} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col justify-between" id="app-root-container">
      <div>
        {/* Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} siteConfig={siteConfig} />

        {/* Core Main stage area */}
        <main className="pt-2 animate-fadeIn" id="app-main-viewports">
          {renderActiveScreen()}
        </main>
      </div>

      {/* FOOTER SECTION (Commercial, precise Korean company footer styling) */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-neutral-800">
            {/* Logo in footer */}
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-brand-green text-white rounded-full">
                <PawPrint className="w-5 h-5 fill-white" />
              </div>
              <div className="notranslate" translate="no">
                <p className="font-extrabold text-white text-base tracking-tight">MANS.PET PETTAXI</p>
                <p className="text-[9px] text-neutral-500 font-display font-semibold uppercase tracking-widest leading-none">MANS.PET PETTAXI</p>
              </div>
            </div>

            {/* Bottom floating phone widgets */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 text-white hover:text-brand-yellow font-bold">
                <Smartphone className="w-4 h-4" />
                대표전화: {siteConfig.phone}
              </a>
              <span>|</span>
              <p className="text-neutral-400">네이버 검색창에 <strong className="text-emerald-400 notranslate" translate="no">"MANS.PET PETTAXI"</strong>를 검색해 톡톡으로 문의하세요</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-normal leading-relaxed text-neutral-400">
            {/* Left coordinates description */}
            <div className="lg:col-span-8 space-y-3">
              <p className="text-neutral-300 font-bold text-sm block">회사 및 사업 정보 고시</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-neutral-500">
                <p>상호명: {siteConfig.companyName} | 대표자: {siteConfig.ceoName}</p>
                <p>주소: {siteConfig.address}</p>
                <p>사업자등록번호: {siteConfig.businessNumber}</p>
                <p>고객 안심 24시 직통 상담센터: <a href={`tel:${siteConfig.phone}`} className="hover:underline text-neutral-400 font-bold">{siteConfig.phone}</a></p>
                <p>개인정보 보호책임자: {siteConfig.privacyOfficer}</p>
              </div>
            </div>

            {/* Right Brand quote */}
            <div className="lg:col-span-4 space-y-3 bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-1 text-xs text-brand-green font-bold">
                <Heart className="w-3.5 h-3.5 fill-brand-green" />
                <span>안전 수송 서약 고시</span>
              </div>
              <p className="text-neutral-500 leading-relaxed text-[11px]">
                "우리 아이들의 소중한 봄날 같은 걸음, MANS.PET PETTAXI가 밤낮없이 수호하겠습니다. 
                매 회 탑승 전 연무 피톤치드 집중 방역 및 전 차량 대형 카시트 탑승과 동승 가이드 규정을 철저히 이행함을 정직히 고시합니다."
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-neutral-800 text-[10px] text-neutral-600">
            <p>© 2026 <span className="notranslate" translate="no">MANS.PET PETTAXI</span>. All Rights Reserved. Designed with premium components.</p>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab('guide')} className="hover:underline">이용약관</button>
              <span>|</span>
              <a href={siteConfig.naverTalktalkUrl || "http://talk.naver.com/profile/w4pxji"} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-500">네이버 톡톡 상담</a>
              <span>|</span>
              <a href={siteConfig.kakaoChannelUrl || "https://pf.kakao.com/_xgpxkxbG"} target="_blank" rel="noopener noreferrer" className="hover:underline text-yellow-500">카카오톡 채널 상담</a>
              <span>|</span>
              <button onClick={() => setActiveTab('fare')} className="hover:underline">요금정책 고시</button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
