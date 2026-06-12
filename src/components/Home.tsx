import { motion } from 'motion/react';
import { 
  PawPrint, Phone, MessageCircle, ShieldCheck, Heart, 
  Sparkles, Clock, MapPin, Star, ArrowRight, UserPlus, 
  MessageSquare, MoreHorizontal, ShieldAlert, BadgeInfo,
  Instagram, ExternalLink, Tv
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { SERVICES, ADVANTAGES, INITIAL_REVIEWS, GALLERY_PHOTOS } from '../data';
import { Review } from '../types';
import menzpetBanner from '../assets/images/menzpet_banner_1781229718829.jpg';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  reviews: Review[];
}

export default function Home({ setActiveTab, reviews }: HomeProps) {
  const [neighborCount, setNeighborCount] = useState(1234);
  const [hasAddedNeighbor, setHasAddedNeighbor] = useState(false);
  const [activePhotoCategory, setActivePhotoCategory] = useState<'all' | 'dog' | 'cat' | 'special'>('all');
  const [visitorCount, setVisitorCount] = useState(45678);

  // Increment visitors slightly on load to resemble active blog
  useEffect(() => {
    const randomIncr = Math.floor(Math.random() * 5) + 1;
    setVisitorCount(prev => prev + randomIncr);
  }, []);

  const handleNeighborClick = () => {
    if (!hasAddedNeighbor) {
      setNeighborCount(prev => prev + 1);
      setHasAddedNeighbor(true);
    } else {
      setNeighborCount(prev => prev - 1);
      setHasAddedNeighbor(false);
    }
  };

  const filteredPhotos = activePhotoCategory === 'all' 
    ? GALLERY_PHOTOS.slice(0, 6) 
    : GALLERY_PHOTOS.filter(photo => photo.category === activePhotoCategory).slice(0, 6);

  return (
    <div className="space-y-12 pb-16" id="home-view">
      {/* 1. HERO SECTION (Designed to precisely match user's image) */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 z-10 space-y-6 lg:pr-4">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-green-light rounded-full text-brand-green text-xs font-bold font-display italic">
                  <Heart className="w-3.5 h-3.5 fill-brand-green text-brand-green" />
                  사랑하는 아이, 안전하고 편안하게!
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  안전한 반려동물 <br className="hidden sm:inline" />
                  <span className="text-brand-green text-shadow-sm">이동 서비스</span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 font-medium">
                  병원 · 미용 · 공항 · 장거리 · 입양 이동 전문
                </p>
              </motion.div>

              {/* 5 Circular Bullet Points precisely matching the image icons list */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2 text-sm text-gray-700 font-semibold"
              >
                <div className="flex items-center gap-1.5" id="bullet-safety">
                  <div className="bg-brand-green-light p-1 rounded-full text-brand-green">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>안전최우선</span>
                </div>
                <div className="flex items-center gap-1.5" id="bullet-comfort">
                  <div className="bg-brand-green-light p-1 rounded-full text-brand-green">
                    <Heart className="w-4 h-4 fill-brand-green" />
                  </div>
                  <span>편안한 이동</span>
                </div>
                <div className="flex items-center gap-1.5" id="bullet-nationwide">
                  <div className="bg-brand-green-light p-1 rounded-full text-brand-green">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>전국 운행</span>
                </div>
                <div className="flex items-center gap-1.5" id="bullet-booking shadow">
                  <div className="bg-brand-green-light p-1 rounded-full text-brand-green">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>예약제 운영</span>
                </div>
                <div className="flex items-center gap-1.5" id="bullet-realtime">
                  <div className="bg-brand-green-light p-1 rounded-full text-brand-green">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>실시간 소통</span>
                </div>
              </motion.div>

              {/* Huge CTAs matching colors of original image phone + kakaotalk */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
              >
                {/* Phone Green CTA button */}
                <a
                  href="tel:010-7644-0799"
                  className="flex items-center justify-center gap-3 bg-brand-green hover:bg-brand-green-hover text-white px-7 py-4 rounded-2xl font-bold shadow-lg shadow-green-900/10 hover:shadow-xl transition-all cursor-pointer group"
                  id="hero-btn-phone"
                >
                  <Phone className="w-5 h-5 fill-white group-hover:animate-bounce" />
                  <div className="text-left">
                    <p className="text-lg font-extrabold tracking-tight">010-7644-0799</p>
                    <p className="text-[11px] opacity-80 font-normal">24시간 전화 즉시 실시간 전화 상담하기</p>
                  </div>
                </a>

                {/* Kakao Yellow CTA button */}
                <button
                  onClick={() => setActiveTab('contact')}
                  className="flex items-center justify-center gap-3 bg-brand-yellow hover:bg-brand-yellow-hover text-gray-900 px-7 py-4 rounded-2xl font-bold shadow-lg shadow-yellow-500/10 hover:shadow-xl transition-all cursor-pointer group"
                  id="hero-btn-kakao"
                >
                  <MessageCircle className="w-5 h-5 fill-gray-900 text-gray-900" />
                  <div className="text-left">
                    <p className="text-lg font-extrabold tracking-tight">카카오톡 상담</p>
                    <p className="text-[11px] text-gray-700 font-normal">인사 후 실시간 상담 바로 상담하기</p>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Right Images Column (with matching car-seat puppy background & badges) */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/5 to-transparent rounded-3xl -m-4"></div>
              
              {/* Core Image container framed beautifully */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-md md:max-w-xl w-full aspect-[16/9] bg-gray-100"
                id="hero-image-wrapper"
              >
                <img
                  src={menzpetBanner}
                  alt="반려동물 전용 안전 이동 서비스 mans pet 펫택시"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Bottom Quote Overlaid exactly as original mockup */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-center">
                  <p className="text-xs font-semibold text-brand-yellow">우리 아이의 안전한 동행</p>
                  <p className="text-sm font-bold">mans pet♥펫택시가 안전하고 편안하게 함께합니다. 💚</p>
                </div>
              </motion.div>

              {/* Three Round Floating Side Badges matching the visual stickers in original image */}
              <div className="absolute -bottom-6 -left-2 md:-left-6 lg:left-0 xl:-left-6 flex flex-col gap-3">
                {/* Badge 1: Fogger Disinfection */}
                <motion.div 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/95 backdrop-blur-sm shadow-md border border-gray-100 rounded-full px-4 py-2.5 flex items-center gap-2.5 max-w-[180px] hover:scale-105 transition-transform"
                >
                  <span className="p-1 bg-green-50 text-brand-green rounded-full">💨</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-gray-900 leading-none">연무기 상시 방역</p>
                    <p className="text-[9px] text-gray-500 mt-0.5 leading-none">청결하고 쾌적한 안심 차내</p>
                  </div>
                </motion.div>

                {/* Badge 2: Seatbelt */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm shadow-md border border-gray-100 rounded-full px-4 py-2.5 flex items-center gap-2.5 max-w-[180px] hover:scale-105 transition-transform"
                >
                  <span className="p-1 bg-amber-50 text-amber-500 rounded-full">🦺</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-gray-900 leading-none">안전벨트 & 카시트</p>
                    <p className="text-[9px] text-gray-500 mt-0.5 leading-none">안전하게 튼튼히 보호합니다</p>
                  </div>
                </motion.div>

                {/* Badge 3: Special stress care */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/95 backdrop-blur-sm shadow-md border border-gray-100 rounded-full px-4 py-2.5 flex items-center gap-2.5 max-w-[180px] hover:scale-105 transition-transform"
                >
                  <span className="p-1 bg-red-50 text-red-500 rounded-full">🐶</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-gray-900 leading-none">반려동물 전용 이동</p>
                    <p className="text-[9px] text-gray-500 mt-0.5 leading-none">스트레스 피로도 소음 최소화</p>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. PROFILE SECTION (Naver Blog Styled Box precisely representing the mock profile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="profile-card-section">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-green-light border-2 border-brand-green flex items-center justify-center p-1 overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200"
                  alt="mans pet 로고 프로필"
                  className="object-cover w-full h-full rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-5.5 h-5.5 bg-brand-green border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900" id="profile-title">
                  mans pet <span className="text-red-500">♥</span> 펫택시
                </h3>
                <span className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded">
                  반려동물 전문이동 사업등록
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 max-w-xl">
                사랑하는 아이의 안전하고 편안한 이동, mans pet♥펫택시가 함께합니다. 병원 정기검진, 미용 등하원, 공항 이동, 전국 장거리 운송 안전케어.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-gray-400 pt-1">
                <span>이웃 <strong className="text-gray-700 font-bold">{neighborCount.toLocaleString()}</strong></span>
                <span>•</span>
                <span>방문 <strong className="text-gray-700 font-bold">{visitorCount.toLocaleString()}</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Profile Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={handleNeighborClick}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                hasAddedNeighbor 
                  ? 'bg-gray-100 border-gray-200 text-gray-500' 
                  : 'bg-white border-gray-200 text-brand-green hover:bg-brand-green-light hover:border-brand-green'
              }`}
              id="btn-add-neighbor"
            >
              <UserPlus className={`w-4 h-4 ${hasAddedNeighbor ? 'fill-gray-400' : 'fill-brand-green-light text-brand-green'}`} />
              {hasAddedNeighbor ? '이웃 맺기 취소' : '이웃 추가하기'}
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="flex items-center gap-1.5 bg-brand-green text-white hover:bg-brand-green-hover px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
              id="btn-send-message"
            >
              <MessageSquare className="w-4 h-4 fill-white text-white" />
              실시간 문의
            </button>
            <button
              className="p-2.5 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-700"
              aria-label="더보기"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2.5. 공식 SNS 및 소통 채널 바로가기 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" id="sns-channels-section">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-green" />
                mans pet 공식 소통 채널 바로가기
              </h4>
              <p className="text-xs text-gray-500 mt-1">블로그, 인스타, 카톡채널에서 실시간 소식과 후기를 보실 수 있습니다.</p>
            </div>
            <p className="text-xs font-semibold text-neutral-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start sm:self-center">
              24시간 상시 운행 및 대기 중 • 010-7644-0799
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. 네이버 블로그 (Naver Blog) */}
            <motion.a
              href="https://blog.naver.com/speed011384"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#03c75a]/5 hover:bg-[#03c75a]/10 border border-[#03c75a]/10 p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer h-36"
              id="sns-card-naver-blog"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#03c75a] flex items-center justify-center font-black text-white text-xs shadow-sm">
                  블로그
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#03c75a]" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-gray-900 leading-none">네이버 블로그</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">이웃 추가하고 생생한 실시간 탑승기와 리얼 후기를 만나보세요.</p>
              </div>
            </motion.a>

            {/* 2. 카카오톡 채널 (Kakao Channel) */}
            <motion.a
              href="https://pf.kakao.com/_xgpxexnG"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#FEE500]/5 hover:bg-[#FEE500]/10 border border-[#FEE500]/10 p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer h-36"
              id="sns-card-kakao-channel"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FEE500] flex items-center justify-center text-amber-950 shadow-sm">
                  <MessageCircle className="w-5 h-5 fill-amber-950 text-amber-950" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-gray-900 leading-none">카카오톡 채널</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">"mans pet택시" 채널 추가로 손쉽게 요금을 체크하고 대기상담을 받으세요.</p>
              </div>
            </motion.a>

            {/* 3. 인스타그램 (Instagram) */}
            <motion.a
              href="https://www.instagram.com/menzpet_taxi/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-pink-50/50 hover:bg-pink-100/50 border border-pink-100 p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer h-36"
              id="sns-card-instagram"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-sm">
                  <Instagram className="w-5 h-5" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-600" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-gray-900 leading-none">인스타그램</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">매일 탑승하는 귀여운 아이들의 활짝 웃는 미소와 일상을 함께하세요.</p>
              </div>
            </motion.a>

            {/* 4. 네이버 TV */}
            <motion.a
              href="https://tv.naver.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#03c75a]/5 hover:bg-[#03c75a]/10 border border-[#03c75a]/10 p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer h-36"
              id="sns-card-naver-tv"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#000000] border border-gray-800 flex items-center justify-center text-white shadow-sm">
                  <Tv className="w-5 h-5 text-emerald-400" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#03c75a]" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-gray-900 leading-none">네이버 TV</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">운전자 동승 과정과 아이들의 쾌적한 안심 운송 비디오 세션을 감상하세요.</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* 3. 서비스 소개 (Service Introduction Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="services-grid-section">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              <span className="text-brand-green font-bold text-sm tracking-wider uppercase">Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              이동 목적에 맞는 다양한 펫택시 서비스
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="hidden sm:inline-flex items-center gap-1.5 text-brand-green font-bold text-sm hover:underline"
          >
            전체 프로그램 보기 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES.map((s) => (
            <motion.div
              key={s.id}
              whileHover={{ y: -6 }}
              onClick={() => setActiveTab('services')}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              id={`service-card-${s.id}`}
            >
              <div>
                <span className="text-[10px] bg-brand-green-light text-brand-green font-bold px-2 py-0.5 rounded-md">
                  {s.tag}
                </span>
                <h4 className="font-extrabold text-base text-gray-900 mt-2">{s.title}</h4>
                <p className="text-xs font-semibold text-brand-green mt-0.5">{s.sub}</p>
                <p className="text-[11px] text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-50 mt-4 flex items-center justify-between text-[11px] font-bold text-gray-600">
                <span>상자 열기</span>
                <span className="text-brand-green">➔</span>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => setActiveTab('services')}
          className="w-full mt-4 sm:hidden bg-white text-brand-green py-3.5 rounded-xl border border-gray-100 text-xs font-bold flex items-center justify-center gap-1"
        >
          전체 프로그램 상세 내용 확인 <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* 4. mans pet❤펫택시 장점 (Advantages) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-brand-green-light/40 rounded-3xl border border-brand-green-light" id="advantages-section">
        <div className="p-6 md:p-8">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] bg-brand-green text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Mans Pet Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
              mans pet 펫택시만의 5가지 차별화된 든든한 강점
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {ADVANTAGES.map((adv, index) => (
              <div
                key={adv.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3 flex flex-col justify-between"
                id={`adv-card-${index}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-lg text-brand-green italic">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] bg-brand-green-light text-brand-green font-bold px-2 py-0.5 rounded">
                      {adv.tag}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-gray-900">{adv.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
                {/* Visual bullet check */}
                <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-brand-green text-left">
                  <span>●</span> <span>케어 서비스 안심 완비</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 이용후기 (Mock Reviews list on Home page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="reviews-summary-section">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              <span className="text-brand-green font-bold text-sm tracking-wider uppercase">User Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              실제 어머님, 아버님들의 믿음직한 이동 후기
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('reviews')}
            className="text-brand-green font-bold text-sm hover:underline flex items-center gap-1"
          >
            후기 전체 검색하기 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Display exactly 3 real stellar user reviews in a beautiful flexible view */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all h-full"
              id={`rev-summary-card-${rev.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center text-xs">
                        {rev.imageUrl ? (
                          <img 
                            src={rev.imageUrl} 
                            alt={rev.author} 
                            className="object-cover w-full h-full" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          rev.author[0]
                        )}
                      </div>
                      <span className="absolute -bottom-1 -right-1 bg-brand-yellow text-gray-900 font-extrabold text-[8px] w-5 h-5 rounded-full border border-white flex items-center justify-center">
                        ★
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{rev.author} 고객님</h4>
                      <p className="text-[11px] text-gray-400 font-medium">{rev.petName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 text-amber-500 font-bold text-xs px-2 py-1 rounded-lg">
                    <span>★</span>
                    <span>{rev.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 font-normal italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-4 text-[11px]">
                <span className="text-gray-400 font-display">{rev.date}</span>
                <span className="text-brand-green font-bold">안전 탑승 완료</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setActiveTab('reviews')}
            className="bg-white border border-gray-200 text-gray-700 hover:text-brand-green hover:border-brand-green px-6 py-3 rounded-full text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
            id="btn-more-reviews-home"
          >
            <span>더 많은 이용 후기 보고 작성하기</span>
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </section>

      {/* 6. 운행 사진 (Drive Photos Grid on Home page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="photos-summary-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              <span className="text-brand-green font-bold text-sm tracking-wider uppercase">Drive Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              행복하게 이동 중인 아이들 실시간 모습
            </h2>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setActivePhotoCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePhotoCategory === 'all'
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-950'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setActivePhotoCategory('dog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePhotoCategory === 'dog'
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-950'
              }`}
            >
              강아지
            </button>
            <button
              onClick={() => setActivePhotoCategory('cat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePhotoCategory === 'cat'
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-950'
              }`}
            >
              고양이
            </button>
            <button
              onClick={() => setActivePhotoCategory('special')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePhotoCategory === 'special'
                  ? 'bg-brand-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-950'
              }`}
            >
              특수동물
            </button>
          </div>
        </div>

        {/* Photos Grid precisely representing driver photos block */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredPhotos.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveTab('photos')}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-50 cursor-pointer border border-gray-100 shadow-sm"
              id={`photo-grid-home-${p.id}`}
            >
              <img
                src={p.imageUrl}
                alt={p.title}
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-[9px] bg-brand-yellow text-gray-900 font-extrabold px-1.5 py-0.5 rounded self-start mb-1 uppercase">
                  {p.category}
                </span>
                <h5 className="text-[11px] font-bold text-white line-clamp-1">{p.title}</h5>
                <p className="text-[8px] text-gray-300 line-clamp-1">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setActiveTab('photos')}
            className="bg-white border border-gray-200 text-gray-700 hover:text-brand-green hover:border-brand-green px-6 py-3 rounded-full text-xs font-bold shadow-sm flex items-center gap-2 transition-all"
            id="btn-more-photos-home"
          >
            <span>전체 고화질 갤러리 더 보기</span>
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </section>



    </div>
  );
}
