import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Guide from './components/Guide';
import FareCalculator from './components/FareCalculator';
import Reviews from './components/Reviews';
import Photos from './components/Photos';
import Inquiry from './components/Inquiry';
import { Review, Booking } from './types';
import { INITIAL_REVIEWS } from './data';
import { PawPrint, Heart, Smartphone, MapPin, Clock, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [calculatorData, setCalculatorData] = useState<{
    petType: 'dog' | 'cat' | 'special';
    serviceType: string;
    distance: number;
    options: string[];
    fare: number;
  } | null>(null);

  // Load reviews from localStorage on initialization, fallback to default
  useEffect(() => {
    const savedReviews = localStorage.getItem('menzpet_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (err) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }

    const savedBookings = localStorage.getItem('menzpet_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (err) {
        setBookings([]);
      }
    }
  }, []);

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

  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    const freshBooking: Booking = {
      ...newBookingData,
      id: `bk-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toLocaleString('ko-KR', { hour12: false })
    };
    const updated = [freshBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('menzpet_bookings', JSON.stringify(updated));
  };

  // Callback from fare calculator card logic
  const handleApplyBookingFromCalculator = (data: {
    petType: 'dog' | 'cat' | 'special';
    serviceType: string;
    distance: number;
    options: string[];
    fare: number;
  }) => {
    setCalculatorData(data);
    setActiveTab('contact'); // redirect to Inquiry screen
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} reviews={reviews} />;
      case 'services':
        return <Services setActiveTab={setActiveTab} />;
      case 'guide':
        return <Guide />;
      case 'fare':
        return <FareCalculator onApplyForBooking={handleApplyBookingFromCalculator} />;
      case 'reviews':
        return <Reviews reviews={reviews} onAddReview={handleAddReview} />;
      case 'photos':
        return <Photos setActiveTab={setActiveTab} />;
      case 'contact':
        return (
          <Inquiry
            bookings={bookings}
            onAddBooking={handleAddBooking}
            calculatorData={calculatorData}
          />
        );
      default:
        return <Home setActiveTab={setActiveTab} reviews={reviews} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between" id="app-root-container">
      <div>
        {/* Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

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
              <div>
                <p className="font-extrabold text-white text-base tracking-tight">mans pet♥펫택시</p>
                <p className="text-[9px] text-neutral-500 font-display font-medium uppercase tracking-widest leading-none">Mans Pet Taxi</p>
              </div>
            </div>

            {/* Bottom floating phone widgets */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <a href="tel:010-7644-0799" className="flex items-center gap-1.5 text-white hover:text-brand-yellow font-bold">
                <Smartphone className="w-4 h-4" />
                대표전화: 010-7644-0799
              </a>
              <span>|</span>
              <p className="text-neutral-400">카카오톡 검색창에 <strong className="text-brand-yellow">"mans pet택시"</strong>를 검색하세요</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-normal leading-relaxed text-neutral-400">
            {/* Left coordinates description */}
            <div className="lg:col-span-8 space-y-3">
              <p className="text-neutral-300 font-bold text-sm block">회사 및 사업 정보 고시</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-neutral-500">
                <p>상호명: mans pet (MANS PET CO.) | 대표자: 김태민</p>
                <p>주소: 경기도 평택시 비전동 안심로 펫타워 (평택 본부)</p>
                <p>사업자등록번호: 312-87-01292 | 통신판매등록서 2026-평택비전-0811호</p>
                <p>동물위생운송업 허가등록번호: 제 3910000-014-0002 호</p>
                <p>고객 안심 24시 직통 상담센터: <a href="tel:010-7644-0799" className="hover:underline text-neutral-400 font-bold">010-7644-0799</a></p>
                <p>개인정보 보호책임자: 김태민</p>
              </div>
            </div>

            {/* Right Brand quote */}
            <div className="lg:col-span-4 space-y-3 bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-1 text-xs text-brand-green font-bold">
                <Heart className="w-3.5 h-3.5 fill-brand-green" />
                <span>안전 수송 서약 고시</span>
              </div>
              <p className="text-neutral-500 leading-relaxed text-[11px]">
                "우리 아이들의 소중한 봄날 같은 걸음, mans pet이 밤낮없이 수호하겠습니다. 
                매 회 탑승 전 연무 피톤치드 집중 방역 및 전 차량 대형 카시트 탑승과 동승 가이드 규정을 철저히 이행함을 정직히 고시합니다."
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-neutral-800 text-[10px] text-neutral-600">
            <p>© 2026 MANS PET TAXI. All Rights Reserved. Designed with premium components.</p>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab('guide')} className="hover:underline">이용약관</button>
              <span>|</span>
              <button onClick={() => setActiveTab('contact')} className="hover:underline">개인정보처리방침</button>
              <span>|</span>
              <button onClick={() => setActiveTab('fare')} className="hover:underline">요금정책 고시</button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
