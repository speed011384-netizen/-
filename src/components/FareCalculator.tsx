import { motion } from 'motion/react';
import { 
  Check, Phone, MessageCircle, MessageSquare, Receipt, MapPin, 
  Clock, Shield, Info, ExternalLink, Calendar, User, FileText, ChevronRight, Plus
} from 'lucide-react';
import { FareConfig, SiteConfig } from '../types';
import luxuryVanImg from '../assets/images/menzpet_luxury_van_1781606817371.jpg';

interface FareCalculatorProps {
  fareConfig?: FareConfig;
  siteConfig?: SiteConfig;
}

export default function FareCalculator({ fareConfig, siteConfig }: FareCalculatorProps) {
  const phoneNum = siteConfig?.phone || '010-7644-0799';
  const talkUrl = siteConfig?.naverTalktalkUrl || 'http://talk.naver.com/profile/w4pxji';
  const kakaoUrl = siteConfig?.kakaoChannelUrl || 'https://pf.kakao.com/_xgpxkxbG';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="fare-page-container">
      
      {/* Title Header with descriptive concept */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none">
          정찰제 안심 요금 안내
        </h2>
        <p className="text-sm text-gray-555 font-medium leading-relaxed">
          거품 없고 투명한 MANS.PET PETTAXI의 공식 표준 운임표입니다.<br className="hidden sm:block" />
          반려동물과 보호자의 안전하고 정직한 탑승과 이동을 정성껏 약속합니다.
        </p>
      </div>

      {/* Conditional Rendering: Custom Saved Image vs Custom Engineered HTML Table */}
      {siteConfig?.fareTableImageUrl ? (
        <div className="flex flex-col items-center justify-center p-2 sm:p-5 bg-white border border-gray-150 rounded-3xl shadow-md overflow-hidden max-w-5xl mx-auto" id="custom-uploaded-fare-table">
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 px-6 py-4 border-b border-gray-100 rounded-t-3xl gap-3">
            <div>
              <h3 className="text-sm font-black text-gray-900 leading-none">맨즈펫 공식 이미지 요금안내표</h3>
              <p className="text-[10px] text-gray-500 mt-1">업로드하여 등록하신 오피셜 정찰 운임표 고정 안내 장표입니다.</p>
            </div>
            <a 
              href={siteConfig.fareTableImageUrl} 
              download="menzpet_fare_table.png"
              className="bg-brand-green/10 hover:bg-brand-green/20 text-brand-green font-extrabold px-3 py-1.5 rounded-lg text-[11px] transition-colors flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
            >
              원본 파일 다운로드 💾
            </a>
          </div>
          <div className="p-3 bg-white w-full flex justify-center">
            <img 
              src={siteConfig.fareTableImageUrl} 
              alt="맨즈펫 공식 요금표" 
              className="max-w-full h-auto rounded-xl object-contain shadow-2xs border border-gray-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      ) : (
        /* HIGHEST FIDELITY HTML/TAILWIND REPLICA OF THE INFOGRAPHIC FLYER */
        <div className="bg-amber-50/15 border border-amber-950/5 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto font-sans text-gray-800" id="official-premium-fare-flyer">
          
          {/* 1. FLYER HEADER BRANDING */}
          <div className="bg-white border-b border-gray-100 p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50/30 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="space-y-4 text-center md:text-left z-10 max-w-lg">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-extrabold shadow-sm">
                  🐾
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight py-0 leading-none">MANSPET</h1>
                  <p className="text-[11px] text-brand-green font-black tracking-widest mt-0.5">PET TAXI</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-neutral-800 tracking-tight leading-snug">
                  맨즈펫 펫택시 요금 및 이용안내
                </p>
                <p className="text-xs font-bold text-gray-500 flex items-center justify-center md:justify-start gap-1">
                  <Shield className="w-3.5 h-3.5 text-brand-green" />
                  소중한 가족의 이동, 안전하고 편안하게!
                </p>
              </div>
            </div>

            {/* Premium Generated Black SUV Asset */}
            <div className="relative w-full max-w-[280px] md:max-w-[320px] shrink-0 border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
              <img 
                src={luxuryVanImg} 
                alt="MANSPET Luxury SUV"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 bg-neutral-900/80 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md">
                안심 안락 럭셔리 수송 차량
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6 bg-white">
            
            {/* 2. TOP COLUMNS GRID: 운행지역, 기본요금, 요금예시 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* 운행지역 안내 (Left) */}
              <div className="md:col-span-4 bg-orange-50/20 border border-orange-100/40 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs bg-[#6E4E37]/10 text-[#6E4E37] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                    📍 운행지역 안내
                  </h3>
                  <ul className="text-xs font-bold text-neutral-700 space-y-2 mt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-605 text-[10px]">✓</span> 
                      서울 전지역
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-605 text-[10px]">✓</span> 
                      인천 지역
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-605 text-[10px]">✓</span> 
                      경기 일부지역
                    </li>
                  </ul>
                </div>
                <p className="text-[9.5px] text-gray-400 leading-normal font-medium">
                  ※ 기사님 배차 상황에 따라 일부 지역은 운행이 제한될 수 있습니다.
                </p>
              </div>

              {/* 기본요금 안내 (Center) */}
              <div className="md:col-span-4 bg-[#7A6B58]/5 border border-[#7A6B58]/10 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs bg-[#7A6B58]/10 text-[#7A6B58] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                    💰 기본요금 안내
                  </h3>
                  
                  <div className="border border-gray-200/60 rounded-xl overflow-hidden mt-4 text-xs font-bold bg-white">
                    <div className="grid grid-cols-2 bg-[#7A6B58]/10 border-b border-gray-200/60 p-2 text-center text-[10px] text-[#7A6B58] font-black">
                      <span>구분</span>
                      <span>요금</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 p-2 text-center text-gray-700">
                      <span>기본요금</span>
                      <span>8,000원</span>
                    </div>
                    <div className="grid grid-cols-2 p-2 text-center text-gray-700">
                      <span>거리요금 (1km당)</span>
                      <span>1,000원</span>
                    </div>
                  </div>
                </div>
                <p className="text-[9.5px] text-gray-400 leading-normal font-medium">
                  ※ 네이버 지도 추천 경로 기준 요금이 산정됩니다.
                </p>
              </div>

              {/* 요금 예시 (Right) */}
              <div className="md:col-span-4 bg-brand-green/5 border border-brand-green/10 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs bg-brand-green/10 text-brand-green font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                    🏷️ 요금 예시
                  </h3>
                  
                  <div className="space-y-2 mt-4 text-xs font-bold text-neutral-700">
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-gray-400 text-[10px]">운행거리</span>
                      <span className="text-gray-900">10km</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-gray-400 text-[10px]">계산방식</span>
                      <span className="text-gray-900 text-[10px] text-right leading-tight">기본 8,000원<br />+ 거리요금 10,000원</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-emerald-100">
                      <span className="text-brand-green text-xs font-extrabold">총 요금</span>
                      <span className="text-lg font-black text-rose-500">18,000원</span>
                    </div>
                  </div>
                </div>
                <p className="text-[9.5px] text-emerald-600/80 leading-normal font-black text-right">
                  소중한 가족의 이동 안심 보장 💚
                </p>
              </div>

            </div>

            {/* 3. ALERT ROW: 최저요금제 실시 */}
            <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-rose-500 text-white font-extrabold px-2.5 py-1 rounded-md animate-pulse">
                  ★ 최저요금제 실시
                </span>
                <span className="text-sm font-extrabold text-neutral-800">
                  7km 이하의 단거리 운행 시 최저 요금제 <span className="text-rose-500">15,000원</span> 적용
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium">
                ※ 7km 이하 운행 시에도 최저요금 15,000원이 일률 적용됩니다.
              </p>
            </div>

            {/* 4. ADDITIONAL & SURCHARGES LIST */}
            <div className="bg-neutral-50 rounded-2xl p-5 md:p-6 border border-gray-100 space-y-4">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-green bg-brand-green/10 p-0.5 rounded-full" />
                추가요금 및 할증요금 상세 안내
              </h3>
              
              <div className="space-y-3 Divide-y divide-gray-105 border border-gray-200/40 rounded-xl p-4 bg-white text-xs font-bold text-gray-700">
                <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                  <span className="flex items-center gap-2 shrink">
                    <span className="text-neutral-300 text-[9px] shrink-0">🐾</span>
                    <span className="line-clamp-1">펫케어 서비스 (강아지 단독이동, 병원진료, 홈픽업서비스 등)</span>
                  </span>
                  <span className="font-extrabold text-[#7A6B58] shrink-0 pl-2">5,000원 ~ 추가</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="flex items-center gap-2 shrink">
                    <span className="text-neutral-300 text-[9px] shrink-0">🐾</span>
                    <span>경로 외 경유시 (중간 목적지 경유)</span>
                  </span>
                  <span className="font-extrabold text-[#7A6B58] shrink-0">5,000원 ~ 추가</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="flex items-center gap-2 shrink">
                    <span className="text-neutral-300 text-[9px] shrink-0">🐾</span>
                    <span>왕복 운행 시 30분 이후 10분당 요금</span>
                  </span>
                  <span className="font-extrabold text-rose-500 shrink-0">1,000원 추가</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="flex items-center gap-2 shrink">
                    <span className="text-neutral-300 text-[9px] shrink-0">🐾</span>
                    <span>09:00 ~ 21:00 외 시간 운행시 (심야/새벽 할증)</span>
                  </span>
                  <span className="font-extrabold text-[#7A6B58] shrink-0">5,000원 ~ 추가</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
                  <span className="flex items-center gap-2 shrink">
                    <span className="text-neutral-300 text-[9px] shrink-0">🐾</span>
                    <span>서울 외 지역 (인천, 파주, 분당, 의정부 등) 외곽 지역 운행시</span>
                  </span>
                  <span className="font-extrabold text-[#7A6B58] shrink-0">5,000원 ~ 추가</span>
                </div>
                <div className="flex justify-between items-center pt-2.5 p-0">
                  <span className="flex items-center gap-2 shrink">
                    <span className="text-neutral-300 text-[9px] shrink-0">🐾</span>
                    <span>각 기사님 차고지 기준 출발지가 5km 이상일 경우</span>
                  </span>
                  <span className="font-black text-rose-500 shrink-0">추가요금 발생</span>
                </div>
              </div>
            </div>

            {/* 5. FOUR DETAILED ROUND CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-3">
              {/* 왕복 운행 */}
              <div className="bg-[#FAF5EE] border border-[#7A6B58]/10 p-5 rounded-2xl flex flex-col justify-between text-center min-h-[140px] space-y-2">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-[#7A6B58]/80 leading-none">🔄 왕복 운행 요금</p>
                  <p className="text-xs font-black text-neutral-800 mt-2">대기 30분까지 무료</p>
                </div>
                <p className="text-xs font-bold text-rose-500 leading-tight">
                  30분 초과 후<br />10분당 1,000원 추가
                </p>
              </div>

              {/* 심야 할증 */}
              <div className="bg-[#ECECEE]/40 border border-neutral-200/50 p-5 rounded-2xl flex flex-col justify-between text-center min-h-[140px] space-y-2">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-neutral-500 leading-none">🌙 심야 할증</p>
                  <p className="text-xs font-black text-neutral-800 mt-2">21:00 ~ 익일 09:00</p>
                </div>
                <p className="text-sm font-black text-rose-500 leading-none">
                  5,000원 ~ 추가
                </p>
              </div>

              {/* 외곽지역 */}
              <div className="bg-[#EEFAF5] border border-emerald-500/10 p-5 rounded-2xl flex flex-col justify-between text-center min-h-[140px] space-y-2 col-span-1">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-brand-green leading-none">🚗 외곽지역 추가요금</p>
                  <p className="text-[10.5px] font-bold text-neutral-700 mt-1.5 leading-snug">
                    인천, 파주, 분당, 의정부 및 기타 외곽지 출발/도착 시
                  </p>
                </div>
                <p className="text-xs font-black text-brand-green">
                  전 권역 일률 5,000원~ 추가
                </p>
              </div>
            </div>

            {/* 6. MANSPET PET TAXI SPECIAL COOPERATIVE SERVICES (6 Circles) */}
            <div className="border-t border-gray-100 pt-8 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-black tracking-widest uppercase text-brand-green bg-brand-green-light px-2.5 py-0.5 rounded-full inline-block">
                  Special safety care
                </span>
                <p className="text-sm font-black text-gray-900">MANSPET PET TAXI 안심 특화 서비스 칭호</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
                {[
                  { title: 'Door To Door 픽업', desc: '집 앞까지 안전 픽업', icon: '🏡' },
                  { title: '연무기 상시 방역', desc: '매 회 피톤치드 세밀 소독', icon: '💨' },
                  { title: '반려동물 전문 이동', desc: '동물 운송 등록 정식 면허', icon: '🐾' },
                  { title: '안전한 전용 차량', desc: '튼튼한 가변 안심 격벽', icon: '🛡' },
                  { title: '스트레스 최소화 이동', desc: '편안한 안도 승차감 가공', icon: '💖' },
                  { title: '실시간 예약 상담', desc: '친절 신속 24시 대기', icon: '💬' }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-2 bg-gray-50/50 p-3 rounded-2xl border border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-white border border-gray-150 flex items-center justify-center text-xl shadow-2xs">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-neutral-805 leading-none">{item.title}</p>
                      <p className="text-[9px] text-gray-400 font-semibold leading-tight mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. DETAILED BOOKING HOW-TO SECTION */}
            <div className="border-t border-gray-100 pt-8 space-y-5" id="flyer-booking-guide">
              <div className="text-center space-y-1">
                <p className="text-sm font-black text-gray-900">이용 및 예약 신청 안내</p>
                <p className="text-[10px] text-gray-400">맨즈펫 펫택시는 예약제로 운영되며, 세 가지 방법으로 즉시 신청 가능합니다.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Kakao Talk */}
                <div className="bg-[#FEE500]/5 border border-[#FEE500]/20 p-5 rounded-2xl flex flex-col justify-between min-h-[170px] space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#FEE500] flex items-center justify-center text-[#3C1E1E]">
                        <MessageSquare className="w-4 h-4 fill-[#3C1E1E] text-[#3C1E1E]" />
                      </div>
                      <span className="text-xs font-black text-[#5C3F1E]">카카오톡 예약</span>
                    </div>
                    <p className="text-[10.5px] text-gray-650 leading-relaxed font-semibold">
                      카카오톡 채널 <span className="font-extrabold text-[#3C1E1E]">"펫택시 맨즈펫"</span> 검색 친구추가 후 24시간 실시간 카톡 상담 대화 신청이 가능합니다.
                    </p>
                  </div>
                  <a
                    href={kakaoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#FEE500] hover:bg-[#FADC00] text-[#3C1E1E] font-black text-center py-2.5 rounded-xl text-[11px] flex items-center justify-center gap-1 transition-all shadow-2xs"
                  >
                    <span>카톡 상담 채널 연결</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>

                {/* SMS Text */}
                <div className="bg-brand-green/5 border border-brand-green/10 p-5 rounded-2xl flex flex-col justify-between min-h-[170px] space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-white">
                        <FileText className="w-4 h-4 fill-white text-white" />
                      </div>
                      <span className="text-xs font-black text-brand-green">문자 예약 신청</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold">필수 작성 항목 송신 요청:</p>
                    <div className="text-[10px] text-gray-650 leading-relaxed space-y-0.5 pl-2 border-l border-brand-green/30 font-semibold">
                      <p>✓ 보호자님 함 및 고유 번호</p>
                      <p>✓ 상세 출발지 및 정밀 목적지</p>
                      <p>✓ 반려동물 종류 / 몸무게</p>
                      <p>✓ 수송 요청 날짜 및 목적 시간</p>
                    </div>
                  </div>
                  <a
                    href={`sms:${phoneNum}`}
                    className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-extrabold text-center py-2.5 rounded-xl text-[11px] flex items-center justify-center gap-1 transition-all shadow-2xs"
                  >
                    <span>문자 예약 양식 송신</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Direct Call Mobile */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between min-h-[170px] space-y-3 text-white">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-white">
                        <Phone className="w-4 h-4 fill-white text-white" />
                      </div>
                      <span className="text-xs font-black text-white">24시간 정속 전화</span>
                    </div>
                    <p className="text-[10.5px] text-neutral-300 leading-relaxed font-medium">
                      당일 예약 혹은 빠른 콜 배차가 필요하실 때에는 안심 직통 대표번호로 가볍고 우아하게 직 유선 대전 전화를 즉시 주시기 바라옵니다.
                    </p>
                  </div>
                  <a
                    href={`tel:${phoneNum}`}
                    className="w-full bg-brand-green hover:bg-brand-green-hover text-white font-extrabold text-center py-2.5 rounded-xl text-[11px] flex items-center justify-center gap-1 transition-all shadow-2xs"
                  >
                    <span className="font-sans font-black">{phoneNum}</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* FLYER REGULATORY FOOTER */}
          <div className="bg-neutral-950 p-5 text-center text-[10px] text-neutral-500 font-bold border-t border-neutral-900">
            <p>MANSPET PET TAXI 맨즈펫 펫택시 • 병원 이동 • 미용 이동 • 공항 이동 • 지방 이사 전국 수송</p>
            <p className="mt-1 opacity-80">동물위탁관리업 등록번호: {siteConfig?.animalLicenseNumber || '제 3910000-014-0002 호'}</p>
          </div>

        </div>
      )}

      {/* QUICK IN-VIEW FLOATING CALL-TO-ACTIONS FOR MOBILE COOPERATIVE CONSULTATION */}
      <div className="max-w-xl mx-auto flex gap-4 pt-4" id="floating-ctas-fare-guide">
        <a 
          href={talkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#03c75a] hover:bg-[#02b350] text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-lg cursor-pointer transform hover:-translate-y-0.5 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span className="text-xs font-extrabold">실시간 네이버 톡톡 상담</span>
          <span className="text-[9px] text-emerald-100 font-normal">빠른 예약 양식 즉석 확인</span>
        </a>
        <a 
          href={kakaoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#FEE500] hover:bg-[#FADC00] text-[#3C1E1E] p-4 rounded-2xl flex flex-col items-center justify-center gap-1 text-center shadow-lg cursor-pointer transform hover:-translate-y-0.5 transition-all"
        >
          <MessageSquare className="w-5 h-5 fill-[#3C1E1E] text-[#3C1E1E]" />
          <span className="text-xs font-[#3C1E1E] font-black">24시 카카오 채널 상담</span>
          <span className="text-[9px] text-[#5C3F1E] font-normal">실시간 카톡 채널 문의하기</span>
        </a>
      </div>

    </div>
  );
}
