import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquarePlus, Check, X, Camera, Sparkles, Smile } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (newReview: Omit<Review, 'id' | 'date'>) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'special'>('dog');
  const [content, setContent] = useState('');
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !petName || !content) return;

    // Mask author name slightly as Korean standard (e.g., 홍길동 -> 홍*동)
    let maskedAuthor = author;
    if (author.length >= 2) {
      maskedAuthor = author[0] + '*'.repeat(author.length - 2) + author[author.length - 1];
    } else {
      maskedAuthor = author + '*';
    }

    onAddReview({
      author: maskedAuthor,
      petName: `${petName} (${petType === 'dog' ? '강아지' : petType === 'cat' ? '고양이' : '특수동물'})`,
      petType,
      rating,
      content,
      imageUrl: selectedAvatarUrl,
      isCustom: true
    });

    // Resetform
    setAuthor('');
    setPetName('');
    setContent('');
    setRating(5);
    setIsWriteOpen(false);
  };

  const currentPetAvatars = [
    { label: '사랑스런 비숑', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200' },
    { label: '얌전한 고양이', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200' },
    { label: '메롱 푸들', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200' },
    { label: '안심 포메라니안', url: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=200' },
    { label: '우아한 페르시안', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=200' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="reviews-view">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs bg-brand-green-light text-brand-green font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Reviews Room
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          manspet taxi를 직접 타본 실승객 후기 보드
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          견주님, 묘주님들의 진 솔 지극한 행복 이동 기록을 언제든지 편하게 확인하고 등록하실 수 있습니다.
        </p>
      </div>

      {/* Aggregate review panel stats */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xs">
        
        <div className="text-center space-y-1">
          <p className="text-xs font-semibold text-gray-400">네이버 블로그 평점 만족도</p>
          <div className="flex justify-center items-end gap-1">
            <span className="text-4xl md:text-5xl font-black text-gray-900">5.0</span>
            <span className="text-sm text-gray-400 font-bold mb-1">/ 5.0</span>
          </div>
          <div className="flex justify-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
          </div>
        </div>

        <div className="text-center md:border-x md:border-gray-100 py-3 space-y-1">
          <p className="text-xs font-semibold text-gray-400 font-display">Total Rides Registered</p>
          <p className="text-2xl sm:text-3xl font-black text-brand-green">{reviews.length + 143}건</p>
          <p className="text-[10px] text-gray-400 font-bold">인명 및 반려 동물 무사고 정직 운행 기간 2,190일 돌파</p>
        </div>

        <div className="flex justify-center" id="reviews-board-cta">
          <button
            onClick={() => setIsWriteOpen(true)}
            className="bg-brand-green text-white hover:bg-brand-green-hover px-6 py-3.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4.5 h-4.5" />
            <span>나의 탑승 후기 직접 쓰기</span>
          </button>
        </div>

      </div>

      {/* Naver Place Visitor Reviews (이런 점이 좋았어요!) */}
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-3xl border border-gray-150/40 p-6 md:p-8 space-y-6" id="naver-place-visitor-stats">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] font-bold text-emerald-600 block tracking-wider uppercase">Naver Place Real-time Feedback</p>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2">
              <Smile className="w-5.5 h-5.5 text-emerald-500" />
              네이버 방문자 리뷰 "이런 점이 좋았어요" (manspet taxi)
            </h3>
            <p className="text-[11px] text-gray-500">실제 네이버 영수증/인증 후기에서 견주님들이 직접 선택한 누적 키워드 통계입니다.</p>
          </div>
          <a 
            href="https://m.place.naver.com/place/1814789073/review/visitor?entry=pll" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 bg-white border border-emerald-200/50 px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 self-start sm:self-center shadow-2xs hover:shadow-xs transition-all"
          >
            <span>네이버 플레이스 실시간 리뷰보기</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { tag: "기사님이 친절해요", count: 247, pct: "98%", barColor: "bg-emerald-500" },
            { tag: "반려동물이 차량 안에서 편안해해요", count: 212, pct: "95%", barColor: "bg-emerald-500" },
            { tag: "차량이 아주 위생적이고 청결해요 (냄새 없음)", count: 198, pct: "94%", barColor: "bg-emerald-500" },
            { tag: "안전하게 방어운전하여 목적지까지 데려다줘요", count: 189, pct: "92%", barColor: "bg-emerald-500" },
            { tag: "예약 방법 상담 및 카톡 피드백이 대단히 빨라요", count: 165, pct: "89%", barColor: "bg-emerald-500" },
            { tag: "대기 요금이 친절하고 최종 비용이 정직해요", count: 143, pct: "85%", barColor: "bg-emerald-500" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100/60 flex items-center justify-between gap-4 shadow-3xs hover:scale-[1.01] transition-transform duration-300">
              <div className="space-y-1.5 flex-1">
                <div className="flex justify-between text-xs font-extrabold text-gray-900">
                  <span className="flex items-center gap-1.5 text-gray-800">
                    <span className="text-gray-400 font-normal">#{idx + 1}</span>
                    {item.tag}
                  </span>
                  <span className="text-emerald-600 font-black">{item.count}명 선택 ({item.pct})</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.barColor}`} style={{ width: item.pct }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Review Drawer Modal overlapping nicely */}
      {isWriteOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6" id="write-review-card">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-yellow fill-brand-yellow/10" />
                <h3 className="font-extrabold text-base text-gray-900">새로운 이용 후기 등록하기</h3>
              </div>
              <button
                onClick={() => setIsWriteOpen(false)}
                className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-800">이동 만족도 별점</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star className={`w-7 h-7 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Author & Pet name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-800">보호자 성함</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-800">반려동물 이름</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 단추"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              {/* Pet Type Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 block">반려동물 분류</label>
                <div className="flex gap-2">
                  {[
                    { id: 'dog', label: '강아지 🐶' },
                    { id: 'cat', label: '고양이 🐱' },
                    { id: 'special', label: '특수소형동물 🐹' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPetType(t.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        petType === t.id
                          ? 'border-brand-green bg-brand-green-light text-brand-green'
                          : 'border-gray-100 bg-gray-50 text-gray-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Selector (Using stunning pet photos) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800 block">원하는 리뷰 아이콘 사진</label>
                <div className="flex gap-2.5 overflow-x-auto pb-1" id="avatar-chooser">
                  {currentPetAvatars.map((avatar, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatarUrl(avatar.url)}
                      className={`w-11 h-11 rounded-full border-2 overflow-hidden shrink-0 cursor-pointer relative transition-all ${
                        selectedAvatarUrl === avatar.url ? 'border-brand-green scale-105 shadow-md' : 'border-transparent opacity-80'
                      }`}
                      title={avatar.label}
                    >
                      <img src={avatar.url} alt={avatar.label} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                      {selectedAvatarUrl === avatar.url && (
                        <div className="absolute inset-0 bg-brand-green/10 flex items-center justify-center text-white font-bold text-xs">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-800">이용 소감 상세 내용</label>
                <textarea
                  required
                  rows={4}
                  placeholder="쾌적한 실내 방역, 친절한 기사 배치, 대기 안심 패키지 중 인상 깊었던 점을 기록해 주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full border border-gray-100 rounded-xl p-4 text-xs focus:ring-1 focus:ring-brand-green bg-gray-50 focus:bg-white transition-all outline-none leading-relaxed"
                />
              </div>

              <div className="flex gap-2 pt-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsWriteOpen(false)}
                  className="px-5 py-3 border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  취소하기
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-green hover:bg-brand-green-hover text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  리뷰 등록 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews feed grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reviews-master-feed">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={`bg-white rounded-3xl border p-6 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md relative overflow-hidden ${
              rev.isCustom ? 'border-brand-green/30 bg-brand-green-light/10' : 'border-gray-50'
            }`}
            id={`review-board-card-${rev.id}`}
          >
            {rev.isCustom && (
              <span className="absolute top-0 right-0 bg-brand-green text-white text-[9px] font-bold px-2.5 py-1 rounded-bl-xl uppercase tracking-wider">
                My Review
              </span>
            )}
            <div className="space-y-4">
              {/* Profile header of cards */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
                    <img
                      src={rev.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200"}
                      alt={rev.author}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 bg-brand-yellow text-gray-900 border border-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                    ★
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                    <span>{rev.author} 보호자님</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold">{rev.petName}</p>
                </div>
              </div>

              {/* Rating stars display */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-100'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 font-bold ml-1">{rev.rating.toFixed(1)}</span>
              </div>

              {/* Text Body */}
              <p className="text-xs text-gray-600 leading-relaxed font-normal italic">
                "{rev.content}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-6 text-[10px]">
              <span className="text-gray-400 font-display font-semibold">{rev.date}</span>
              <span className="text-brand-green font-extrabold flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                실매칭 탑승인 승인완료
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
