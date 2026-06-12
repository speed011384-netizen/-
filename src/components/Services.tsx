import { motion } from 'motion/react';
import { 
  Stethoscope, Scissors, Plane, MapPin, Heart, 
  CheckCircle2, Sparkles, UserCheck, ShieldAlert 
} from 'lucide-react';
import { useState } from 'react';
import { SERVICES } from '../data';

interface ServicesProps {
  setActiveTab: (tab: string) => void;
}

export default function Services({ setActiveTab }: ServicesProps) {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);

  // Map service icon name to components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-8 h-8" />;
      case 'Scissors': return <Scissors className="w-8 h-8" />;
      case 'Plane': return <Plane className="w-8 h-8" />;
      case 'MapPin': return <MapPin className="w-8 h-8" />;
      case 'Heart': return <Heart className="w-8 h-8 fill-brand-green-light" />;
      default: return <Stethoscope className="w-8 h-8" />;
    }
  };

  const activeServiceData = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="services-view">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs bg-brand-green-light text-brand-green font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Premium Program
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          반려견 & 반려묘 맞춤 운송 프로그램 소개
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          단독 등하원부터 병원 동행 검진, 장거리 힐링 트립까지 완벽한 솔루션을 제안 드립니다.
        </p>
      </div>

      {/* Selector Tabs (Dynamic & beautifully clickable with icons) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3" id="service-selector-grid">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedService(s.id)}
            className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
              selectedService === s.id
                ? 'bg-brand-green text-white border-brand-green shadow-lg shadow-green-900/10'
                : 'bg-white border-gray-100 text-gray-700 hover:border-brand-green/30 hover:bg-gray-50/50'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${selectedService === s.id ? 'bg-white/10 text-brand-yellow' : 'bg-brand-green-light text-brand-green'}`}>
              {getIcon(s.icon)}
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm">{s.title}</p>
              <p className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${selectedService === s.id ? 'text-green-200' : 'text-gray-400'}`}>
                {s.sub}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Detail Card Box */}
      <motion.div
        key={selectedService}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        id="service-detail-container"
      >
        {/* Left Side: Detail & Explanations */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] bg-brand-green-light text-brand-green font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {activeServiceData.tag}
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900">
              {activeServiceData.title} <span className="text-brand-green">{activeServiceData.sub}</span>
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-normal pt-2">
              {activeServiceData.desc}
            </p>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-gray-50">
            <h4 className="font-extrabold text-sm text-gray-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
              핵심 제공 가이드 & 케어 특징
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
              {activeServiceData.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6">
            <button
              onClick={() => setActiveTab('fare')}
              className="w-full sm:w-auto bg-brand-green text-white hover:bg-brand-green-hover px-6 py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              실시간 예상 요금 계산
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full sm:w-auto bg-brand-yellow text-gray-950 hover:bg-brand-yellow-hover px-6 py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              간편 예약 신청하기
            </button>
          </div>
        </div>

        {/* Right Side: Showcase Illustration Image */}
        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/15 to-transparent z-10 pointer-events-none"></div>
          {/* We'll showcase appropriate beautiful Unsplash images for each type of service */}
          <img
            src={
              selectedService === 'hospital' ? 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600' :
              selectedService === 'grooming' ? 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=600' :
              selectedService === 'airport' ? 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600' :
              selectedService === 'long-distance' ? 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600' :
              'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=600'
            }
            alt={activeServiceData.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl px-3 py-1.5 shadow-md flex items-center gap-1.5 text-[10px] font-bold text-gray-900 z-10">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-ping"></span>
            <span>최상위 위생안전 실시간 모니터링 가동</span>
          </div>
        </div>
      </motion.div>

      {/* Companion Options Card Info */}
      <section className="bg-slate-50 border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10" id="companion-policy-box">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-green font-bold bg-brand-green-light px-3 py-1.5 rounded-full">
              <UserCheck className="w-4 h-4" />
              보호자 무제한 비동승 승차 지원 제도
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              보호자 비동승 단독 안심 픽업 케어 서비스
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              바쁜 일정, 병원 정기 수액 치료 등 보호자 동행이 어려운 상황을 위해 준비되었습니다. <br />
              기사님이 1:1 전담 도우미가 되어 약 처방 대행, 미용실 인수인계, 소변 체크 및 음수대 케어 후 상세 증서와 탑승 사진을 안심 알림톡으로 전송해 드립니다.
            </p>
          </div>
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-5 space-y-3 shadow-inner">
            <h4 className="font-extrabold text-xs text-gray-950">단독 픽업 보완 진행 사항</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                <span>출발 시: 카시트 벨트 체결샷 전송</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                <span>이동 중: 실시간 전용 메세지 안부</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                <span>도착 시: 인수인계 안전 확인 문자</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full bg-brand-green-light hover:bg-brand-green/10 text-brand-green py-2.5 rounded-xl text-xs font-bold transition-all text-center"
            >
              상담 예약 서식 작성
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
