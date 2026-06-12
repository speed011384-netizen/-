import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, Clock, MapPin, Phone, User, MessageCircle, 
  Send, Sparkles, CheckCircle2, ShieldCheck, Ticket, 
  Car, Eye, FileText, ClipboardList 
} from 'lucide-react';
import { Booking } from '../types';
import { MOCK_BOT_RESPONSES } from '../data';

interface InquiryProps {
  bookings: Booking[];
  onAddBooking: (newBooking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  calculatorData: {
    petType: 'dog' | 'cat' | 'special';
    serviceType: string;
    distance: number;
    options: string[];
    fare: number;
  } | null;
}

export default function Inquiry({ bookings, onAddBooking, calculatorData }: InquiryProps) {
  // Booking Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'special'>('dog');
  const [petDetails, setPetDetails] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [distance, setDistance] = useState(5);
  const [fare, setFare] = useState(13000);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    { sender: 'bot', text: MOCK_BOT_RESPONSES['기본'], time: '현재 시각' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Apply calculator quick filler when loaded or updated
  useEffect(() => {
    if (calculatorData) {
      setPetType(calculatorData.petType);
      setPetDetails(`${calculatorData.serviceType} (예상거리 ${calculatorData.distance}km)`);
      setDistance(calculatorData.distance);
      setFare(calculatorData.fare);
      setSelectedOptions(calculatorData.options);
      setPickup('서울 강남역 동물병원 (모의 입력)');
      setDropoff('경기 역삼아파트 (모의 입력)');
    }
  }, [calculatorData]);

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time || !pickup || !dropoff) return;

    onAddBooking({
      name,
      phone,
      date,
      time,
      petType,
      petDetails: petDetails || '소형견 한 마리',
      pickup,
      dropoff,
      distance,
      fare,
      options: selectedOptions
    });

    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 4000);

    // Reset Form
    setName('');
    setPhone('');
    setPickup('');
    setDropoff('');
    setPetDetails('');
  };

  // Bot response scroll view control
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isWriting]);

  // Robot sender core logics
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const currentTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { sender: 'user', text: textToSend, time: currentTime }]);
    setUserInput('');
    setIsWriting(true);

    setTimeout(() => {
      let botAnswer = '';
      
      // basic matching
      if (textToSend.includes('요금') || textToSend.includes('가격') || textToSend.includes('1') || textToSend.includes('결제')) {
        botAnswer = MOCK_BOT_RESPONSES['1'];
      } else if (textToSend.includes('예약') || textToSend.includes('방법') || textToSend.includes('2') || textToSend.includes('접수')) {
        botAnswer = MOCK_BOT_RESPONSES['2'];
      } else if (textToSend.includes('안전') || textToSend.includes('방역') || textToSend.includes('3') || textToSend.includes('위생') || textToSend.includes('카시트')) {
        botAnswer = MOCK_BOT_RESPONSES['3'];
      } else if (textToSend.includes('비동승') || textToSend.includes('혼자') || textToSend.includes('단독') || textToSend.includes('4') || textToSend.includes('장거리')) {
        botAnswer = MOCK_BOT_RESPONSES['4'];
      } else {
        botAnswer = `정상 수신완료! 🐾 입력 주신 키워드 [${textToSend}]와 관련하여 친절한 상담 기사가 배정 중입니다. \n\n기본 예약 방법, 요금 구조, 차내 방역 등 자주 묻는 질문은 하단의 빠른 수령 버튼으로도 즉시 검색 가능하십니다. 😊`;
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botAnswer, time: currentTime }]);
      setIsWriting(false);
    }, 8000 * 0.1); // Fast realistic delay
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="inquiry-view">
      
      {/* Target heading */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs bg-brand-green-light text-brand-green font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Reservation & Chat
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          실시간 편의 예약 신청 및 안심 챗봇
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          간편 예약 전용 양식을 작성하시거나, 우측의 카카오톡 시뮬레이터를 통해 궁금한 점을 즉시 해법 받아보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6" id="booking-form-box">
          
          <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
            <ClipboardList className="w-5.5 h-5.5 text-brand-green" />
            <h3 className="font-extrabold text-base text-gray-950">간편 펫택시 예약 접수처</h3>
            {calculatorData && (
              <span className="text-[9px] bg-brand-yellow text-gray-900 font-extrabold px-2 py-0.5 rounded-full ml-auto animate-pulse">
                요금 계산기 정보 연동됨
              </span>
            )}
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            
            {/* Passenger demographics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  보호자명 (필수)
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  연락처 (필수)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-7644-0799"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Time schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  이용 예약 일자
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  이용 출발 시각
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3 pt-2 border-t border-gray-50">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-green" />
                  출발지 픽업 주소
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 서울 구로구 디지털로 123 맨즈아파트 101동 앞"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  목적지 하차 주소
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 서울 강남구 테헤란로 하트 동물 메디컬 센터"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Pet info & options */}
            <div className="space-y-3 pt-2 border-t border-gray-50">
              
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 block">탑승 반려동물 상세 품종/몸무게</label>
                <input
                  type="text"
                  placeholder="예: 말티프 5kg 한마리, 마킹 예민함, 안전벨트 요청"
                  value={petDetails}
                  onChange={(e) => setPetDetails(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                />
              </div>

              {/* Special Options Summary linked */}
              {calculatorData && (
                <div className="bg-gray-50 rounded-xl p-3.5 text-xs leading-relaxed text-gray-600 block">
                  <p className="font-extrabold text-gray-900 mb-1 flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5 text-brand-green" />
                    자동 연동된 예상 명세:
                  </p>
                  <span>수송형: {calculatorData.serviceType} | 예상 거리: {calculatorData.distance}km</span> <br />
                  <span className="text-brand-green font-bold">합산 예상 요금: {calculatorData.fare.toLocaleString()}원 등록됨</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-4 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>안심 정밀 배차 상담 신청서 즉시 발송</span>
            </button>
          </form>

        </div>

        {/* Right Grid: KakaoTalk Chatbot Simulator (Exactly modeled for fun interactive FAQ play) */}
        <div className="lg:col-span-5 bg-stone-150 border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[520px]" id="kakao-chatbot-container">
          {/* Header background with classic yellow/brown styling */}
          <div className="bg-[#FFD92A] px-4 py-3.5 flex items-center justify-between border-b border-[#E9C317]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-green flex items-center justify-center shadow-md text-white">
                <MessageCircle className="w-5.5 h-5.5 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-extrabold text-xs text-gray-900">mans pet 24시 안심 상담 봇</h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-gray-600 font-medium">실시간 응답 가능 채널</p>
              </div>
            </div>
            <span className="text-[10px] bg-yellow-950/15 text-yellow-950 font-extrabold px-2 py-0.5 rounded-full">
              카카오 채널
            </span>
          </div>

          {/* Messages stream flow */}
          <div className="flex-1 bg-[#b2c7da] p-4 overflow-y-auto space-y-4" id="chat-messages-scroller">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Bot Profile Icon */}
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-brand-green flex items-center justify-center text-white text-xs shrink-0 font-bold shadow-sm">
                    M
                  </div>
                )}

                <div className={`space-y-1 max-w-[85%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.sender === 'bot' && (
                    <p className="text-[10px] text-gray-600 font-bold ml-1">mans pet 펫택시 봇</p>
                  )}
                  
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-[#FFE233] text-gray-950 rounded-tr-none' 
                      : 'bg-white text-gray-900 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  
                  <p className="text-[8px] text-gray-500 font-display font-medium px-1">
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {isWriting && (
              <div className="flex items-center gap-2 justify-start">
                <div className="w-8 h-8 rounded-xl bg-brand-green flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-gray-400">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Shortcuts buttons above chat composer */}
          <div className="bg-[#b2c7da] px-2.5 pb-2.5 flex flex-wrap gap-1.5" id="chat-fast-shortcuts">
            <button
              onClick={() => handleSendMessage('1')}
              className="bg-white/80 backdrop-blur-sm border border-stone-200/50 hover:bg-white text-[11px] font-bold text-gray-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              💰 요금 계산 알려줘
            </button>
            <button
              onClick={() => handleSendMessage('2')}
              className="bg-white/80 backdrop-blur-sm border border-stone-200/50 hover:bg-white text-[11px] font-bold text-gray-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              📅 예약 접수법 어떻게?
            </button>
            <button
              onClick={() => handleSendMessage('3')}
              className="bg-white/80 backdrop-blur-sm border border-stone-200/50 hover:bg-white text-[11px] font-bold text-gray-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              🛡️ 안전방역 정책 조치
            </button>
            <button
              onClick={() => handleSendMessage('4')}
              className="bg-white/80 backdrop-blur-sm border border-stone-200/50 hover:bg-white text-[11px] font-bold text-gray-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              🚗 단독탑승(비동승) 규약
            </button>
          </div>

          {/* Input text composer form */}
          <div className="bg-white border-t border-stone-100 p-2.5 flex gap-2">
            <input
              type="text"
              placeholder="궁금한 내용을 편안히 입력하세요..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage(userInput);
              }}
              className="flex-1 bg-stone-50 rounded-xl px-4 text-xs font-medium outline-none border border-transparent focus:border-stone-200 focus:bg-white transition-all py-2.5"
            />
            <button
              onClick={() => handleSendMessage(userInput)}
              className="p-3 bg-[#FFE233] hover:bg-[#ebd02c] text-gray-900 rounded-xl cursor-pointer shadow-xs transition-transform"
            >
              <Send className="w-4 h-4 fill-gray-900" />
            </button>
          </div>
        </div>

      </div>

      {/* Bookings Tracker component (My reservations screen displayed here to feel extremely full-system) */}
      {bookings.length > 0 && (
        <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6" id="bookings-tracker-board">
          <div className="flex items-center gap-2 pb-2 mr-auto">
            <Car className="w-5 h-5 text-brand-green" />
            <h4 className="font-extrabold text-base text-gray-900">나의 예약 신청 실시간 하우징 트래킹 ({bookings.length}건)</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((bk) => (
              <div 
                key={bk.id} 
                className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-brand-green text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                      대기 중
                    </span>
                    <h5 className="font-bold text-sm text-gray-900 mt-1.5">
                      {bk.name} 보호자님 ({bk.petType === 'dog' ? '강아지 🐶' : bk.petType === 'cat' ? '고양이 🐱' : '특수생물 🐹'})
                    </h5>
                    <p className="text-[10px] text-gray-400 font-semibold">{bk.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium font-display">{bk.date} | {bk.time}</p>
                    <p className="text-xs font-extrabold text-brand-green mt-1">{bk.fare.toLocaleString()}원 예정</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100/50 rounded-xl p-3 text-[11px] text-gray-500 space-y-1">
                  <p>• <strong>출발지:</strong> {bk.pickup}</p>
                  <p>• <strong>도착지:</strong> {bk.dropoff}</p>
                  {bk.options.length > 0 && (
                    <p>• <strong>안심 옵션:</strong> {bk.options.join(', ')}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 text-[10px] text-gray-400">
                  <span>신청 시각: {bk.createdAt}</span>
                  <span className="text-brand-green font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping"></span>
                    배정 매칭 스탠바이 가동 중
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Success notification banner */}
      {isSuccessToast && (
        <div className="fixed bottom-6 left-6 bg-gray-950 border border-gray-900 text-white rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-3 animate-slideUp">
          <div className="p-2 bg-brand-green text-white rounded-full">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">동행 예약안심 상담 발송 완료! 🐾</p>
            <p className="text-[10px] text-gray-400 mt-1">기록주신 번호로 담당 기사 검토 후 15분 이내 전화 드립니다.</p>
          </div>
        </div>
      )}

    </div>
  );
}
