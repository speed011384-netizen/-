import { motion, AnimatePresence } from 'motion/react';
import { 
  PawPrint, Phone, MessageCircle, ShieldCheck, Heart, 
  Sparkles, Clock, MapPin, Star, ArrowRight, 
  MessageSquare, MoreHorizontal, ShieldAlert, BadgeInfo,
  Instagram, ExternalLink, Tv, Camera, Upload, Plus,
  Trash2, RotateCcw, X
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { SERVICES, ADVANTAGES, INITIAL_REVIEWS, GALLERY_PHOTOS } from '../data';
import { Review, GalleryPhoto, SiteConfig } from '../types';
import menzpetBanner from '../assets/images/menzpet_banner_1781229718829.jpg';
import menzpetBannerWithCat from '../assets/images/menzpet_banner_with_cat_1781445861262.jpg';
import menzpetBannerSmallDog from '../assets/images/menzpet_banner_small_dog_1781446007378.jpg';
import menzpetAirportBanner from '../assets/images/menzpet_airport_banner_logo_1781703921038.jpg';
import menzpetIllustrationBanner from '../assets/images/menzpet_illustration_banner_1781703701586.jpg';

const bannerSlides = [
  {
    image: menzpetIllustrationBanner,
    alt: "맨즈펫 펫택시 안심 수송 서비스 - 귀여운 반려견 일러스트 테마"
  },
  {
    image: menzpetAirportBanner,
    alt: "맨즈펫 프리미엄 공항 펫택시 서비스 - 럭셔리 픽업 앤 샌딩 대기 수송 (로고 최적화 완료)"
  },
  {
    image: menzpetBanner,
    alt: "반려동물 전용 안전 이동 서비스 MANS.PET PETTAXI - 골든 리트리버"
  },
  {
    image: menzpetBannerWithCat,
    alt: "반려동물 전용 안전 이동 서비스 MANS.PET PETTAXI - 강아지와 고양이 동행"
  },
  {
    image: menzpetBannerSmallDog,
    alt: "반려동물 전용 안전 이동 서비스 MANS.PET PETTAXI - 귀여운 반려견"
  }
];

interface HomeProps {
  setActiveTab: (tab: string) => void;
  reviews: Review[];
  photos?: GalleryPhoto[];
  siteConfig?: SiteConfig;
}

export default function Home({ setActiveTab, reviews, photos = [], siteConfig }: HomeProps) {
  const [activePhotoCategory, setActivePhotoCategory] = useState<'all' | 'dog' | 'cat' | 'special'>('all');
  const [slides, setSlides] = useState(() => {
    const saved = localStorage.getItem('manspet_banner_slides');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up or replace old stale images with the new logo-optimized airport banner
        const migrated = parsed.map((slide: any) => {
          if (slide.image && (slide.image.includes('menzpet_airport_banner_1781703681823') || slide.image === '/src/assets/images/menzpet_airport_banner_1781703681823.jpg')) {
            return {
              ...slide,
              image: menzpetAirportBanner,
              alt: "맨즈펫 프리미엄 공항 펫택시 서비스 - 럭셔리 픽업 앤 샌딩 대기 수송 (로고 최적화 완료)"
            };
          }
          return slide;
        });
        return migrated;
      } catch (err) {
        return bannerSlides;
      }
    }
    return bannerSlides;
  });
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isEditingBanners, setIsEditingBanners] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    if (slides && slides.length > 0) {
      localStorage.setItem('manspet_banner_slides', JSON.stringify(slides));
    }
  }, [slides]);

  // Auto-rotate banner slides every 3 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Handle upload of new banner image(s) from user's device (DURABLE BASE64!)
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const promises = Array.from(files).map((file: File) => {
        return new Promise<{ image: string; alt: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              image: reader.result as string,
              alt: `사용자 지정 배너 - ${file.name}`
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(newUploadedSlides => {
        const updatedSlides = [...slides, ...newUploadedSlides];
        setSlides(updatedSlides);
        setCurrentBannerIndex(updatedSlides.length - 1); // Select the newly uploaded slide
      });
    }
  };

  // Delete a slide
  const handleDeleteSlide = (indexToDelete: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== indexToDelete);
    setSlides(newSlides);
    if (currentBannerIndex >= newSlides.length) {
      setCurrentBannerIndex(newSlides.length - 1);
    }
  };

  // Restore the original slides setup
  const handleResetBanners = () => {
    setSlides(bannerSlides);
    setCurrentBannerIndex(0);
  };

  const displayPhotos = photos.length > 0 ? photos : GALLERY_PHOTOS;

  const filteredPhotos = activePhotoCategory === 'all' 
    ? displayPhotos.slice(0, 6) 
    : displayPhotos.filter(photo => photo.category === activePhotoCategory).slice(0, 6);

  return (
    <div className="space-y-12 pb-16" id="home-view">
      {/* 1. HERO TOP BANNER SLIDER (Full-width prominent premium slide-show) */}
      <section className="relative overflow-hidden bg-white" id="hero-banner-top-section">
        <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl border-2 sm:border-4 border-white w-full aspect-[2/1] sm:aspect-[2.4/1] lg:aspect-[2.6/1] xl:aspect-[2.8/1] bg-gray-50 group"
            id="hero-image-wrapper"
          >
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence mode="wait">
                {slides[currentBannerIndex] ? (
                  <motion.img
                    key={currentBannerIndex}
                    src={slides[currentBannerIndex].image}
                    alt={slides[currentBannerIndex].alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 object-cover w-full h-full transform group-hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-450 text-xs">
                    등록된 배너 이미지가 없습니다.
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Small Elegant Floating Watermark Logo on the Banner Image */}
            <div className="absolute top-3 sm:top-5 right-3 sm:right-5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-gray-100 flex items-center gap-1.5 shadow-sm pointer-events-none hover:opacity-100 transition-opacity z-10">
              <span className="text-xs">🐾</span>
              <span className="text-[10px] sm:text-xs font-black tracking-tight text-gray-900">MANS.PET <span className="text-brand-green">PETTAXI</span></span>
            </div>

            {/* Trigger Button to Edit Banners directly */}
            <button
              type="button"
              onClick={() => setIsEditingBanners(true)}
              className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 bg-black/60 hover:bg-black/85 text-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-md border border-white/10 text-xs font-bold active:scale-95 transition-all z-10 hover:border-brand-green/30 cursor-pointer"
              id="btn-edit-banner"
            >
              <Camera className="w-4 h-4 fill-white/10" />
              <span>배너 직접 변경</span>
            </button>

            {/* Slideshow Progress Dot Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 bg-black/35 backdrop-blur-xs rounded-full z-10 border border-white/10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBannerIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentBannerIndex 
                      ? 'bg-brand-green w-4' 
                      : 'bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`${i + 1}번 배너로 이동`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1.5 HERO CONTENT & CTA LINKS SECTION (Positioned elegant and large below the slider) */}
      <section className="bg-white border-b border-gray-100 pb-8" id="hero-action-section">
        <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-55 rounded-3xl border border-gray-100 p-6 md:p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Texts & Circular Bullet Points */}
            <div className="space-y-5 lg:max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-green-light rounded-full text-brand-green text-xs sm:text-sm font-bold font-display italic">
                <Heart className="w-4 h-4 fill-brand-green text-brand-green" />
                사랑하는 아이, 안전하고 편안하게!
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                안전한 반려동물 <span className="text-brand-green text-shadow-sm">이동 서비스</span>
              </h1>
              
              <p className="text-sm sm:text-base text-gray-650 font-medium">
                병원 · 미용 · 공항 · 장거리 · 입양 이동 전문 전용 택시
              </p>

              {/* 5 Bullet Icons matching original image design for brand validity */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2.5 pt-2 text-xs sm:text-sm text-gray-700 font-semibold">
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
                <div className="flex items-center gap-1.5" id="bullet-booking">
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
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-brand-green border border-brand-green/20 rounded-lg text-xs sm:text-sm font-black" id="premium-safe-companion">- 맨즈펫 펫택시가 동행합니다 ✨</span>
              </div>
            </div>

            {/* Right CTAs Panel matching original design phone + kakaotalk + navertalk */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3.5">
              {/* Phone green CTA */}
              <a
                href="tel:010-7644-0799"
                className="flex items-center justify-center gap-3.5 bg-brand-green hover:bg-brand-green-hover text-white px-6 py-4.5 rounded-2xl font-bold shadow-lg shadow-green-900/10 hover:shadow-xl transition-all cursor-pointer group flex-1"
                id="hero-btn-phone"
              >
                <Phone className="w-5.5 h-5.5 fill-white group-hover:animate-bounce" />
                <div className="text-left">
                  <p className="text-base sm:text-lg font-extrabold tracking-tight">010-7644-0799</p>
                  <p className="text-[11px] opacity-80 font-normal">24시간 즉시 유선 상담</p>
                </div>
              </a>

              {/* Naver TalkTalk CTA */}
              <a
                href={siteConfig?.naverTalktalkUrl || "https://talk.naver.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3.5 bg-[#03c75a] hover:bg-[#02b350] text-white px-6 py-4.5 rounded-2xl font-bold shadow-lg shadow-emerald-500/10 hover:shadow-xl transition-all cursor-pointer group flex-1"
                id="hero-btn-naver-talktalk"
              >
                <MessageCircle className="w-5.5 h-5.5 fill-white text-white group-hover:scale-105 transition-transform" />
                <div className="text-left">
                  <p className="text-base sm:text-lg font-extrabold tracking-tight">네이버 톡톡</p>
                  <p className="text-[11px] text-emerald-100 font-normal">빠른 온라인 비대면 상담</p>
                </div>
              </a>

              {/* KakaoTalk Channel CTA */}
              <a
                href={siteConfig?.kakaoChannelUrl || "https://pf.kakao.com/_xgpxkxbG"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3.5 bg-[#FEE500] hover:bg-[#FADC00] text-[#3C1E1E] px-6 py-4.5 rounded-2xl font-bold shadow-lg shadow-yellow-500/15 hover:shadow-xl transition-all cursor-pointer group flex-1"
                id="hero-btn-kakao-channel"
              >
                <MessageSquare className="w-5.5 h-5.5 fill-[#3C1E1E] text-[#3C1E1E] group-hover:scale-105 transition-transform" />
                <div className="text-left">
                  <p className="text-base sm:text-lg font-extrabold tracking-tight">카톡 상담</p>
                  <p className="text-[11px] text-[#5C3F1E] font-normal">실시간 카스 채널 대화</p>
                </div>
              </a>
            </div>

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
                MANS.PET PETTAXI 공식 소통 채널 바로가기
              </h4>
              <p className="text-xs text-gray-500 mt-1">블로그, 인스타, 카톡채널에서 실시간 소식과 후기를 보실 수 있습니다.</p>
            </div>
            <p className="text-xs font-semibold text-neutral-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start sm:self-center">
              24시간 상시 운행 및 대기 중 • 010-7644-0799
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. 네이버 블로그 (Naver Blog) */}
            <motion.a
              href={siteConfig?.naverBlogUrl || 'https://blog.naver.com/speed011384'}
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

            {/* 2. 네이버 톡톡 (Naver TalkTalk) */}
            <motion.a
              href={siteConfig?.naverTalktalkUrl || 'https://talk.naver.com/'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#03c75a]/5 hover:bg-[#03c75a]/10 border border-[#03c75a]/10 p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer h-36"
              id="sns-card-naver-talktalk"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#03c75a] flex items-center justify-center text-white shadow-sm">
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#03c75a]" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-gray-900 leading-none">네이버 톡톡 상담</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">"네이버 톡톡" 간편 접속으로 손쉽게 요금을 체크하고 인공지능 즉석 상담을 받으세요.</p>
              </div>
            </motion.a>

            {/* 3. 카카오톡 채널 (KakaoTalk Channel) */}
            <motion.a
              href={siteConfig?.kakaoChannelUrl || 'https://pf.kakao.com/_xgpxkxbG'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#FEE500]/5 hover:bg-[#FEE500]/10 border border-[#FEE500]/25 p-5 rounded-2xl flex flex-col justify-between transition-all cursor-pointer h-36"
              id="sns-card-kakao-channel"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-[#FEE500] flex items-center justify-center text-[#3C1E1E] shadow-sm">
                  <MessageSquare className="w-5 h-5 fill-[#3C1E1E] text-[#3C1E1E]" />
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-extrabold text-gray-900 leading-none">카카오톡 채널</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">편리한 공식 카톡 채널을 통해 펫택시 요금 안내와 수송 예약을 상시 진행해보세요.</p>
              </div>
            </motion.a>

            {/* 4. 인스타그램 (Instagram) */}
            <motion.a
              href={siteConfig?.instagramUrl || 'https://www.instagram.com/menzpet_taxi/'}
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

            {/* 5. 네이버 TV */}
            <motion.a
              href={siteConfig?.naverTvUrl || 'https://tv.naver.com/'}
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

      {/* 4. MANS.PET PETTAXI 장점 (Advantages) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-brand-green-light/40 rounded-3xl border border-brand-green-light" id="advantages-section">
        <div className="p-6 md:p-8">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] bg-brand-green text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              MANS.PET PETTAXI Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
              MANS.PET PETTAXI만의 5가지 차별화된 든든한 강점
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

      {/* Banner Editor Modal */}
      <AnimatePresence>
        {isEditingBanners && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            id="banner-editor-modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-150"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-brand-green/10 text-brand-green rounded-lg">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">배너 슬라이드쇼 편집</h3>
                    <p className="text-[11px] text-gray-500">배너 사진을 추가, 삭제하거나 변경해 보세요.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingBanners(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="창 닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Core Help Info */}
                <div className="bg-brand-green-light/50 border border-brand-green/20 rounded-xl p-3 text-xs text-brand-green-dark flex items-start gap-2">
                  <span className="text-sm mt-0.5">ℹ️</span>
                  <p className="leading-relaxed font-semibold text-gray-700">
                    새 반려동물 사진이나 원하시는 이미지를 직접 추가하여 슬라이드쇼를 업데이트하세요. 
                    지정된 이미지는 즉시 배너 슬라이드쇼에 적용됩니다.
                  </p>
                </div>

                {/* Slides List */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">현재 구성된 배너 리스트 ({slides.length}개)</p>
                  <div className="grid gap-2">
                    {slides.map((slide, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                          idx === currentBannerIndex 
                            ? 'bg-brand-green-light/30 border-brand-green/35 ring-1 ring-brand-green' 
                            : 'bg-gray-50 hover:bg-gray-100/75 border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-16 h-9 object-cover rounded-lg border border-gray-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                              {idx + 1}번 배너
                              {idx === currentBannerIndex && (
                                <span className="text-[9px] bg-brand-green text-white px-1.5 py-0.2 rounded-md font-semibold font-sans">
                                  노출중
                                </span>
                              )}
                            </span>
                            <p className="text-[10px] text-gray-400 truncate max-w-[200px]">
                              {slide.alt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {/* Preview Slide Button */}
                          <button
                            type="button"
                            onClick={() => setCurrentBannerIndex(idx)}
                            className="text-[10.5px] font-bold text-gray-600 hover:text-brand-green bg-white hover:bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm transition-all cursor-pointer"
                            aria-label={`슬라이드 ${idx + 1} 미리보기`}
                          >
                            미리보기
                          </button>
                          
                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteSlide(idx)}
                            disabled={slides.length <= 1}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              slides.length <= 1 
                                ? 'bg-gray-100 text-gray-300 border-gray-150 cursor-not-allowed' 
                                : 'bg-white hover:bg-rose-50 text-gray-400 hover:text-rose-600 border-gray-200'
                            }`}
                            title="이 슬라이드 제거"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Uploader & Reset buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* File Upload Button */}
                  <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-gray-200 hover:border-brand-green bg-gray-50/50 hover:bg-brand-green-light/10 rounded-2xl cursor-pointer group transition-all text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleBannerUpload}
                    />
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-brand-green transform group-hover:-translate-y-0.5 transition-all mb-1" />
                    <span className="text-xs font-bold text-gray-700 group-hover:text-brand-green">새 사진 추가</span>
                    <span className="text-[9.5px] text-gray-400 mt-0.5 font-medium">컴퓨터에서 직접 선택</span>
                  </label>

                  {/* Reset / Restore Preset Button */}
                  <button
                    type="button"
                    onClick={handleResetBanners}
                    className="flex flex-col items-center justify-center p-3.5 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 rounded-2xl cursor-pointer group transition-all text-center active:scale-98"
                  >
                    <RotateCcw className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transform group-hover:rotate-45 transition-all mb-1" />
                    <span className="text-xs font-bold text-gray-700">기본 배너로 복원</span>
                    <span className="text-[9.5px] text-gray-400 mt-0.5">처음 설정 사진으로 복구</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditingBanners(false)}
                  className="bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                >
                  설정 적용하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
