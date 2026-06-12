import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, CheckCircle2, AlertTriangle, Info, 
  HelpCircle, Sparkles, Receipt, ArrowRight, MapPin, Clock, ShieldCheck, HelpCircle as HelpIcon, ArrowUpDown
} from 'lucide-react';

interface FareCalculatorProps {
  onApplyForBooking: (bookingDetails: {
    petType: 'dog' | 'cat' | 'special';
    serviceType: string;
    distance: number;
    options: string[];
    fare: number;
  }) => void;
}

export default function FareCalculator({ onApplyForBooking }: FareCalculatorProps) {
  const [distance, setDistance] = useState<number>(10);
  const [options, setOptions] = useState<string[]>([]);
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  const toggleOption = (id: string) => {
    if (options.includes(id)) {
      setOptions(prev => prev.filter(o => o !== id));
    } else {
      setOptions(prev => [...prev, id]);
    }
  };

  // Live premium calculation matching the user's custom pricing sheet:
  // - [기본요금 8,000 원 + 1km 당 1,000 원]
  // - [최저요금제실시] 7km 이하의 단거리 운행시 최저 요금제 15,000원 적용
  // - 펫케어 서비스 (+5,000원)
  // - 경로 외 경유시 (+5,000원)
  // - 왕복 운행 시 30분 이후 10분당 (+1,000원)
  // - 09:00 ~ 21:00 외 시간 운행시 (+5,000원 할증)
  // - 서울 외 지역 외곽지역 (+5,000원 추가)
  const calculations = useMemo(() => {
    const baseFare = 8000;
    const distanceCost = distance * 1000;
    
    let distanceFare = baseFare + distanceCost;
    let isMinApplied = false;

    // 최저요금제 적용
    if (distance <= 7) {
      distanceFare = 15000;
      isMinApplied = true;
    }

    // 추가 옵션 계산
    let optionFare = 0;
    if (options.includes('petcare')) optionFare += 5000;
    if (options.includes('waypoint')) optionFare += 5000;
    if (options.includes('roundtrip_wait')) optionFare += 1000;
    if (options.includes('night')) optionFare += 5000;
    if (options.includes('outer')) optionFare += 5000;

    const total = distanceFare + optionFare;

    return {
      distanceFare,
      optionFare,
      total,
      isMinApplied,
      rawDistanceCost: distanceCost
    };
  }, [distance, options]);

  const handleApply = () => {
    onApplyForBooking({
      petType: 'dog',
      serviceType: `거리 맞춤 탑승 (${distance}km 운행)`,
      distance: distance,
      options: options.map(o => 
        o === 'petcare' ? '펫케어 서비스(단독이동/진료/픽업)' : 
        o === 'waypoint' ? '경로 외 경유지 추가' : 
        o === 'roundtrip_wait' ? '왕복 대기 30분 초과' :
        o === 'night' ? '09:00~21:00 외 시간 운행 할증' : '서울 외 외곽지역 운송'
      ),
      fare: calculations.total
    });

    setShowAppliedToast(true);
    setTimeout(() => setShowAppliedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="fare-calculator-view">
      
      {/* 2. 요금 및 이용안내 통합 요약 시트 */}
      <section className="bg-gradient-to-br from-brand-green/5 to-emerald-50 rounded-3xl border border-brand-green/10 p-6 md:p-8" id="official-fare-sheet-overview">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="space-y-1">
            <span className="text-[10px] bg-brand-green text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Official Policy
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2 mt-2">
              <Receipt className="w-6 h-6 text-brand-green" />
              요금 및 이용안내
            </h3>
            <p className="text-xs text-gray-500">mans pet 펫택시의 투명하고 정직한 정찰제 요금표입니다.</p>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl border border-brand-green/10 flex items-center gap-3 self-start md:self-center">
            <MapPin className="w-5 h-5 text-brand-green" />
            <div>
              <p className="text-[10px] font-bold text-gray-400">운행 지역 안내</p>
              <p className="text-xs font-black text-gray-900">서울 전 지역, 인천 전 지역, 경기 일부 지역</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {/* Section 1: 요금 안내 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3 shadow-2xs">
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <span className="w-1.5 h-3 bg-brand-green rounded-full"></span>
              요금 산정 방식
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-brand-green/5 p-3 rounded-xl border border-brand-green/5 text-center">
                <p className="text-[10px] font-extrabold text-brand-green">정식 요여 산정 공식</p>
                <p className="font-extrabold text-gray-900 mt-1">기본요금 8,000원 + 1km당 1,000원</p>
              </div>
              <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
                <strong>💡 요금 예시 (10km 운행 시):</strong><br />
                기본요금 8,000원 + 10km 요금 10,000원 = <strong className="text-brand-green text-xs">총 18,000원</strong>
              </p>
              <p className="text-[10px] text-neutral-400 font-medium font-semibold">
                ※ 네이버 추천 길 안내 최적 경로 기준으로 요금이 부과됩니다.
              </p>
              <p className="text-[10px] text-brand-green font-bold">
                (기사님 배차에 따라 일부 지역 제한 운행이 될 수 있습니다)
              </p>
            </div>
          </div>

          {/* Section 2: 최저요금제 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3 shadow-2xs">
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <span className="w-1.5 h-3 bg-brand-yellow rounded-full"></span>
              최저요금제 실시
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100 text-center">
                <p className="text-[10px] font-extrabold text-amber-700">단거리 안심 보장</p>
                <p className="font-black text-gray-900 mt-1">7km 이하 운행 시 최저 요금 15,000원</p>
              </div>
              <p className="text-[11px] text-gray-650 leading-relaxed font-normal">
                7km 이하의 가까운 단거리 통원이나 이동 시에도 숙련 차량 매칭을 위해 <strong>일률 최저 요금제 15,000원</strong>이 정직하게 적용됩니다.
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                체계적인 방역 세차 및 카시트 안전 세팅 비용이 포함된 합리적 수수료입니다.
              </p>
            </div>
          </div>

          {/* Section 3: 추가 및 할증 요금 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3 shadow-2xs">
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <span className="w-1.5 h-3 bg-red-400 rounded-full"></span>
              추가/할증요금 상세 안내
            </h4>
            <div className="space-y-2 text-[11px] text-gray-700 font-medium">
              <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                <span>펫케어 서비스 (비동승 단독이동/병원진료 등)</span>
                <span className="font-black text-brand-green shrink-0">+5,000원</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                <span>경로 외 경유 시 (중간 경유지)</span>
                <span className="font-black text-brand-green shrink-0">+5,000원</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                <span>왕복 운행 시 (30분 이후 대기)</span>
                <span className="text-gray-400 text-[10px] sm:inline hidden">10분당</span>
                <span className="font-black text-brand-green shrink-0">+1,000원</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-1.5">
                <span>심야/조조 할증 (09:00 ~ 21:00 외 운행)</span>
                <span className="font-black text-brand-green shrink-0">+5,000원</span>
              </div>
              <div className="flex justify-between items-center">
                <span>경기 외곽 지역 (인천, 파주, 분당, 의정부 등)</span>
                <span className="font-black text-brand-green shrink-0">+5,000원~</span>
              </div>
            </div>
          </div>

          {/* Section 4: 환불 규정 */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 space-y-3 shadow-2xs">
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <span className="w-1.5 h-3 bg-rose-500 rounded-full"></span>
              취소 및 환불 규정
            </h4>
            <div className="space-y-2 text-xs">
              <div className="bg-rose-50/45 p-2.5 rounded-xl border border-rose-100/30 space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold text-gray-700">
                  <span>• 예약 확정 후 2일 전 취소</span>
                  <span className="text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">전액 환불</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold text-gray-700">
                  <span>• 운행 하루 전 취소 시</span>
                  <span className="text-amber-600 font-extrabold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">50% 환불</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold text-gray-700">
                  <span>• 운행 당일 취소 시</span>
                  <span className="text-red-500 font-extrabold bg-red-50 px-1.5 py-0.5 rounded text-[10px]">환불 불가</span>
                </div>
              </div>
              <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-100/50 text-[10.5px] text-amber-950 leading-normal font-semibold">
                ⚠️ <strong className="text-rose-600 font-bold">7월·8월·9월 성수기 시즌</strong>에는 타 승객 예약 선점을 위해 <strong className="text-neutral-900 font-bold">예약하신 날부터 환불 불가</strong>이오니 이 점 너른 양해 부탁드립니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Calculator section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4" id="estimator-section">
        
        {/* Left Side: Parameters Selectors */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8" id="calculator-fields">
          
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <Calculator className="w-5 h-5 text-brand-green" />
            <h3 className="text-base sm:text-lg font-black text-gray-900">가상 요금 모의 계산기</h3>
          </div>

          {/* 1. Distance Input Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <label className="font-extrabold text-gray-900 flex items-center gap-1.5">
                <span className="text-brand-green">●</span> <span>예상 주행 거리 설정</span>
              </label>
              <div className="flex items-center gap-1 bg-white border border-brand-green/20 px-3 py-1 rounded-xl shadow-2xs">
                <span className="text-brand-green font-black text-xl">{distance}</span>
                <span className="text-xs font-bold text-gray-400">km</span>
              </div>
            </div>
            
            <div className="py-2">
              <input
                type="range"
                min="1"
                max="100"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-green"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1 pt-1.5">
                <span>1km</span>
                <span>20km</span>
                <span>40km</span>
                <span>60km</span>
                <span>80km</span>
                <span>100km</span>
              </div>
            </div>

            {distance <= 7 ? (
              <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-xl p-3 flex.items-start gap-2 text-xs font-semibold">
                <span>🌟 7km 이하의 단거리 운행이므로 <strong>최저 요금제 15,000원</strong>이 자동 적용됩니다.</span>
              </div>
            ) : (
              <div className="bg-brand-green-light/50 border border-brand-green-light text-brand-green rounded-xl p-3 text-xs font-semibold">
                <span>기본운행료: 8,000원 + 주행거리 요금 ({distance}km x 1,000원 = {calculations.rawDistanceCost.toLocaleString()}원)</span>
              </div>
            )}
          </div>

          {/* 2. Custom Surcharges Checkboxes */}
          <div className="space-y-3">
            <label className="font-extrabold text-sm text-gray-900 block flex items-center gap-1.5">
              <span className="text-brand-green">●</span> <span>추가 안심 서비스 및 할증 적용</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { 
                  id: 'petcare', 
                  label: '펫케어 서비스', 
                  desc: '강아지 단독이동, 병원진료, 홈픽업서비스 등', 
                  price: '+5,000원' 
                },
                { 
                  id: 'waypoint', 
                  label: '경로 외 경유지 추가', 
                  desc: '목적지 가기 전 경유지 지정 운행', 
                  price: '+5,000원' 
                },
                { 
                  id: 'roundtrip_wait', 
                  label: '왕복 운행 대기', 
                  desc: '30분 초과 시 10분당 추가요금', 
                  price: '+1,000원' 
                },
                { 
                  id: 'night', 
                  label: '야간 할증 요금', 
                  desc: '09:00 ~ 21:00 외 시간대 운행', 
                  price: '+5,000원' 
                },
                { 
                  id: 'outer', 
                  label: '서울 외곽 지역 운행', 
                  desc: '인천, 파주, 분당, 의정부 등지 하차', 
                  price: '+5,000원' 
                }
              ].map((o) => (
                <button
                  key={o.id}
                  onClick={() => toggleOption(o.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    options.includes(o.id)
                      ? 'border-brand-green bg-brand-green-light/40 text-brand-green font-bold'
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-black">{o.label}</p>
                    <span className="text-[11px] text-brand-green font-black">{o.price}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-normal mt-1 leading-normal">{o.desc}</p>
                </button>
              ))}
            </div>
          </div>

        </div>
 
        {/* Right Side: Virtual Interactive Receipt Invoice */}
        <div className="lg:col-span-5 sticky top-24" id="virtual-invoice-card">
          <div className="bg-brand-green text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden space-y-6">
            
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>

            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 mb-1 text-brand-yellow">
                <Receipt className="w-5 h-5" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest">Billing Receipt</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">예상 청구 명세서</h3>
              <p className="text-xs text-green-200 mt-1 font-medium">실시간 요금 고시에 의거한 투명 견적서입니다.</p>
            </div>

            {/* Receipt line items */}
            <div className="space-y-3.5 text-xs font-semibold" id="receipt-items">
              <div className="flex justify-between items-center text-green-200">
                <span>기본 주행 거리 운행비 ({distance}km)</span>
                <span className="text-white font-bold">{calculations.distanceFare.toLocaleString()}원</span>
              </div>

              {calculations.isMinApplied && (
                <div className="flex justify-between items-center text-brand-yellow text-[10px]">
                  <span>└ 7km 이하 단거리 최저요금제 보장</span>
                  <span>적용완료</span>
                </div>
              )}

              <div className="flex justify-between items-center text-green-200">
                <span>선택 추가 요금 / 할증 합계</span>
                <span className="text-white font-bold">
                  {calculations.optionFare === 0 ? '0원' : `+${calculations.optionFare.toLocaleString()}원`}
                </span>
              </div>
              
              {options.length > 0 && (
                <div className="text-[10px] text-green-250 font-normal pl-2 space-y-1">
                  {options.map(o => (
                    <div key={o} className="flex justify-between">
                      <span>• {
                        o === 'petcare' ? '펫케어 서비스' : 
                        o === 'waypoint' ? '경로 외 경유지' : 
                        o === 'roundtrip_wait' ? '왕복 대기 시간' :
                        o === 'night' ? '09:00~21:00 외운행 야간' : '경기 외곽 지역 추가'
                      }</span>
                      <span>{
                        o === 'roundtrip_wait' ? '+1,000원' : '+5,000원'
                      }</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-white/20 pt-4 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs text-green-200 font-extrabold">최종 예상 청구액</span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-brand-yellow tracking-tight">{calculations.total.toLocaleString()}</span>
                  <span className="text-sm font-bold text-white ml-0.5">원</span>
                </div>
              </div>

              <p className="text-[10px] text-green-150 text-left leading-relaxed">
                ※ 위 예상 산출 요금은 네이버 지도의 실제 거리 안내에 근거하여 최종 확정됩니다. 출발 시 기사님이 친절하고 맑게 안내해 드립니다.
              </p>
            </div>

            <button
              onClick={handleApply}
              className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-gray-950 font-extrabold py-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
              id="btn-apply-booking-calculator"
            >
              <span>이 견적으로 매칭 신청하기</span>
              <ArrowRight className="w-4 h-4 text-gray-950" />
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mt-4 flex items-start gap-2 text-xs text-amber-800">
            <Info className="w-4.5 h-4.5 shrink-0 text-amber-600 mt-0.5 animate-pulse" />
            <p className="leading-relaxed">
              <strong>네이버 추천 길 안내 원칙:</strong> 실시간 교통흐름 및 이동 경로에 따라 인명 및 반려동물의 절대적 승차 안전을 가득 지키며 운송해 드릴 것을 선서합니다. 💚
            </p>
          </div>
        </div>

      </div>

      {/* Booking confirmation Toast */}
      {showAppliedToast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-800 text-white rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-2.5 animate-slideUp">
          <div className="p-1.5 bg-brand-green text-white rounded-full">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-extrabold font-sans">안심 요금 정보 적용 성공!</p>
            <p className="text-[10px] text-gray-400 mt-0.5">"문의하기" 탭에서 상세 양식을 최종 작성하시면 즉시 차량 배차가 완료됩니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
