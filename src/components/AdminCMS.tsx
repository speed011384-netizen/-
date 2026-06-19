import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, DollarSign, MessageSquare, Image as ImageIcon, 
  Save, RefreshCw, Trash2, Plus, Edit, Shield, CheckCircle2, 
  X, HelpCircle, FileText, Sparkles
} from 'lucide-react';
import { Review, GalleryPhoto, SiteConfig, FareConfig, Booking } from '../types';

interface AdminCMSProps {
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  fareConfig: FareConfig;
  onUpdateFareConfig: (config: FareConfig) => void;
  reviews: Review[];
  onUpdateReviews: (reviews: Review[]) => void;
  photos: GalleryPhoto[];
  onUpdatePhotos: (photos: GalleryPhoto[]) => void;
  onResetToDefault: () => void;
}

export default function AdminCMS({
  siteConfig,
  onUpdateSiteConfig,
  fareConfig,
  onUpdateFareConfig,
  reviews,
  onUpdateReviews,
  photos,
  onUpdatePhotos,
  onResetToDefault
}: AdminCMSProps) {
  const [activeSubTab, setActiveSubTab] = useState<'site' | 'fare' | 'reviews' | 'photos'>('site');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // 1. Local state copies for unsaved drafts
  const [siteDraft, setSiteDraft] = useState<SiteConfig>({ ...siteConfig });
  const [fareDraft, setFareDraft] = useState<FareConfig>({ ...fareConfig });

  // 2. Reviews state
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<Partial<Review>>({
    author: '',
    petName: '',
    petType: 'dog',
    rating: 5,
    content: '',
  });

  // 3. Photos state
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoForm, setPhotoForm] = useState<Partial<GalleryPhoto>>({
    category: 'dog',
    title: '',
    description: '',
    imageUrl: '',
  });

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2500);
  };

  // Handlers for general configurations
  const handleSaveSiteConfig = () => {
    onUpdateSiteConfig(siteDraft);
    triggerNotification('사업 정보 및 사이트 메인 설정이 실시간 반영되었습니다. 💚');
  };

  const handleSaveFareConfig = () => {
    onUpdateFareConfig(fareDraft);
    triggerNotification('정량 요금제 설정 및 할증 기준이 실시간 성공적으로 업데이트되었습니다. 💰');
  };

  // Review Handlers
  const handleAddOrEditReview = () => {
    if (!reviewForm.author || !reviewForm.petName || !reviewForm.content) {
      alert('모든 양식 정보를 정확히 입력해 주세요.');
      return;
    }

    let updatedReviews: Review[];
    if (editingReviewId) {
      updatedReviews = reviews.map(r => r.id === editingReviewId ? {
        ...r,
        author: reviewForm.author || '',
        petName: reviewForm.petName || '',
        petType: reviewForm.petType as 'dog' | 'cat' | 'special',
        rating: reviewForm.rating || 5,
        content: reviewForm.content || '',
      } : r);
      setEditingReviewId(null);
      triggerNotification('리뷰 정보가 성공적으로 수정보완되었습니다. ⭐');
    } else {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        author: reviewForm.author || '비공개',
        petName: reviewForm.petName || '우리 아이',
        petType: (reviewForm.petType as 'dog' | 'cat' | 'special') || 'dog',
        rating: reviewForm.rating || 5,
        content: reviewForm.content || '',
        date: new Date().toISOString().split('T')[0],
      };
      updatedReviews = [newReview, ...reviews];
      triggerNotification('새로운 명품 실승객 리뷰가 동적 생성 등록되었습니다. 🐶');
    }

    onUpdateReviews(updatedReviews);
    setReviewForm({
      author: '',
      petName: '',
      petType: 'dog',
      rating: 5,
      content: '',
    });
  };

  const handleStartEditReview = (rev: Review) => {
    setEditingReviewId(rev.id);
    setReviewForm({
      author: rev.author,
      petName: rev.petName,
      petType: rev.petType,
      rating: rev.rating,
      content: rev.content,
    });
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('해당 리뷰를 정말 삭제하시겠습니까? 관련 데이터가 영구 상실됩니다.')) {
      const filtered = reviews.filter(r => r.id !== id);
      onUpdateReviews(filtered);
      triggerNotification('해당 데이터 리뷰가 영구 삭제되었습니다.');
    }
  };

  // Compress image before CMS draft saving to keep storage/payload lightweight
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 1200; // 1200px is more than enough for gallery previews
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        };
        img.onerror = () => {
          resolve(reader.result as string);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // CMS Photo Upload/Paste Help logic
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file).then(compressed => {
        setPhotoForm(prev => ({ ...prev, imageUrl: compressed }));
      });
    }
  };

  const handlePhotoPasteEvent = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          compressImage(file).then(compressed => {
            setPhotoForm(prev => ({ ...prev, imageUrl: compressed }));
          });
          break;
        }
      }
    }
  };

  const handlePhotoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      compressImage(file).then(compressed => {
        setPhotoForm(prev => ({ ...prev, imageUrl: compressed }));
      });
    }
  };

  // Photo Handlers
  const handleAddOrEditPhoto = () => {
    if (!photoForm.title || !photoForm.description || !photoForm.imageUrl) {
      alert('사진의 제목, 한줄 요약 및 이미지 URL 주소를 완벽히 채워 넣어 주세요.');
      return;
    }

    let updatedPhotos: GalleryPhoto[];
    if (editingPhotoId) {
      updatedPhotos = photos.map(p => p.id === editingPhotoId ? {
        ...p,
        category: photoForm.category as 'dog' | 'cat' | 'special',
        title: photoForm.title || '',
        description: photoForm.description || '',
        imageUrl: photoForm.imageUrl || '',
      } : p);
      setEditingPhotoId(null);
      triggerNotification('운행 실시간 갤러리 사진 정보가 정성껏 편집되었습니다. 📸');
    } else {
      const newPhoto: GalleryPhoto = {
        id: `photo-${Date.now()}`,
        category: (photoForm.category as 'dog' | 'cat' | 'special') || 'dog',
        title: photoForm.title || '새로운 탑승길',
        description: photoForm.description || '아이의 기쁨 넘치는 드라이브 시간',
        imageUrl: photoForm.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500',
      };
      updatedPhotos = [newPhoto, ...photos];
      triggerNotification('운행 사진이 포토갤러리에 실시간 등재 완료되었습니다. 🟢');
    }

    onUpdatePhotos(updatedPhotos);
    setPhotoForm({
      category: 'dog',
      title: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleStartEditPhoto = (p: GalleryPhoto) => {
    setEditingPhotoId(p.id);
    setPhotoForm({
      category: p.category,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl,
    });
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('실시간 운행 갤러리에서 이 사진을 완전 삭제 처리하시겠습니까?')) {
      const filtered = photos.filter(p => p.id !== id);
      onUpdatePhotos(filtered);
      triggerNotification('해당 갤러리 사진이 완벽 삭제되었습니다.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="cms-dashboard">
      
      {/* Dynamic Toast feedback */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 bg-stone-900 border border-brand-green/30 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-slideIn">
          <CheckCircle2 className="w-5 h-5 text-brand-green fill-brand-green-light" />
          <span className="text-xs font-bold leading-none">{notificationMsg}</span>
        </div>
      )}

      {/* Header title cards and warnings */}
      <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-brand-green/20 text-brand-green text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
            <Shield className="w-3 h-3 text-brand-green animate-pulse" />
            MANS.PET PETTAXI CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
            실시간 원격 콘텐츠 및 요금 관리 시스템
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
            관리자 승인 모드 하에 상호명, 개인정보 보호 고지, 정밀 최적 요금 수식, 운행 사진전, 실후기 피드백을 실시간 제어할 수 있습니다.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (confirm('모든 CMS 설정 및 요금 체계, 리뷰를 최초 초깃값으로 강제 복원하시겠습니까?')) {
                onResetToDefault();
                // reload drafts
                setTimeout(() => window.location.reload(), 100);
              }
            }}
            className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs px-4 py-2.5 rounded-xl font-bold transition-all border border-neutral-700/50"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
            초기값 정밀 복원
          </button>
        </div>
      </div>

      {/* Grid structure main admin screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left pane: Sidebar options */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-[10px] text-gray-400 font-extrabold px-3 py-2 uppercase tracking-widest border-b border-gray-50 mb-2">CMS 대시보드 메뉴</p>
            
            <button
              onClick={() => setActiveSubTab('site')}
              className={`w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeSubTab === 'site'
                  ? 'bg-brand-green-light text-brand-green shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>사업 및 사이트 기본 세팅</span>
            </button>

            <button
              onClick={() => setActiveSubTab('fare')}
              className={`w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeSubTab === 'fare'
                  ? 'bg-brand-green-light text-brand-green shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>실시간 택시 요금 체계</span>
            </button>

            <button
              onClick={() => setActiveSubTab('reviews')}
              className={`w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeSubTab === 'reviews'
                  ? 'bg-brand-green-light text-brand-green shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>실승객 이용후기(리뷰) 관리</span>
            </button>

            <button
              onClick={() => setActiveSubTab('photos')}
              className={`w-full text-left flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeSubTab === 'photos'
                  ? 'bg-brand-green-light text-brand-green shadow-xs'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>수송 갤러리 사진 데이터</span>
            </button>
          </div>

          <div className="bg-emerald-50/50 border border-brand-green-light/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1 text-xs text-brand-green font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-green fill-brand-green-light" />
              <span>CMS 원격 연동 상태</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              여기서 수정한 모든 정보는 별도의 호스팅 재배포 없이, 브라우저 스토리지 연동 규격에 따라 즉시 실주행 모드로 적용 제공됩니다.
            </p>
          </div>
        </div>

        {/* Right pane: Core configurations forms */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: SITE CONFIGURATION */}
          {activeSubTab === 'site' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="border-b border-gray-50 pb-4">
                  <h3 className="text-lg font-black text-gray-900">대표 사업자 자격 및 사이트 정보 제어</h3>
                  <p className="text-xs text-gray-500 mt-1">사이트 푸터 전반, 영수증, 동승 상담 번호에 연동될 실제 고유 정보입니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">대표자 성명</label>
                    <input 
                      type="text" 
                      value={siteDraft.ceoName}
                      onChange={(e) => setSiteDraft({ ...siteDraft, ceoName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">회사 상호명</label>
                    <input 
                      type="text" 
                      value={siteDraft.companyName}
                      onChange={(e) => setSiteDraft({ ...siteDraft, companyName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">고객센터 대표번호</label>
                    <input 
                      type="text" 
                      value={siteDraft.phone}
                      onChange={(e) => setSiteDraft({ ...siteDraft, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">사업자등록번호</label>
                    <input 
                      type="text" 
                      value={siteDraft.businessNumber}
                      onChange={(e) => setSiteDraft({ ...siteDraft, businessNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block">사업자 본부 주소지</label>
                    <input 
                      type="text" 
                      value={siteDraft.address}
                      onChange={(e) => setSiteDraft({ ...siteDraft, address: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">통신판매업 신고번호</label>
                    <input 
                      type="text" 
                      value={siteDraft.mailOrderNumber}
                      onChange={(e) => setSiteDraft({ ...siteDraft, mailOrderNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">동물위생운송업 정식 허가번호</label>
                    <input 
                      type="text" 
                      value={siteDraft.animalLicenseNumber}
                      onChange={(e) => setSiteDraft({ ...siteDraft, animalLicenseNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-4 border-t border-gray-100 mt-2">
                    <h4 className="text-xs font-black text-gray-900 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                      공식 SNS 및 소통 채널 외부 주소 설정 (바로가기 링크)
                    </h4>
                    <p className="text-[11px] text-gray-500 mb-3">메인 화면에 표시되는 공식 블로그, 상담 톡톡, 인스타, 네이버TV 링크를 직접 변경하실 수 있습니다.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">네이버 블로그 URL 주소</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://blog.naver.com/..."
                      value={siteDraft.naverBlogUrl || ''}
                      onChange={(e) => setSiteDraft({ ...siteDraft, naverBlogUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">네이버 톡톡 URL 주소</label>
                    <input 
                      type="text" 
                      placeholder="e.g. http://talk.naver.com/..."
                      value={siteDraft.naverTalktalkUrl || ''}
                      onChange={(e) => setSiteDraft({ ...siteDraft, naverTalktalkUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">인스타그램 URL 주소</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://www.instagram.com/..."
                      value={siteDraft.instagramUrl || ''}
                      onChange={(e) => setSiteDraft({ ...siteDraft, instagramUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">네이버 TV URL 주소</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://tv.naver.com/..."
                      value={siteDraft.naverTvUrl || ''}
                      onChange={(e) => setSiteDraft({ ...siteDraft, naverTvUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">카카오톡 채널 URL 주소</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://pf.kakao.com/..."
                      value={siteDraft.kakaoChannelUrl || ''}
                      onChange={(e) => setSiteDraft({ ...siteDraft, kakaoChannelUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-150">
                  <button
                    onClick={handleSaveSiteConfig}
                    className="flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-white px-6 py-3 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Save className="w-4 h-4 fill-white text-white" />
                    사이트 사업자 정보 저장 고시
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: FARE CONFIGURATION */}
          {activeSubTab === 'fare' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="border-b border-gray-50 pb-4">
                  <h3 className="text-lg font-black text-gray-900">정찰 안심 요금 체계 및 가중치 제어</h3>
                  <p className="text-xs text-gray-500 mt-1">예상 요금 자동 계산기에 실시간 적용되는 변수 설정 엔진입니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">기본 요금 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.baseFare}
                      onChange={(e) => setFareDraft({ ...fareDraft, baseFare: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">1km 당 누적 요금 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.perKmFare}
                      onChange={(e) => setFareDraft({ ...fareDraft, perKmFare: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">최저 요금 보장제 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.minFare}
                      onChange={(e) => setFareDraft({ ...fareDraft, minFare: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">최저 요금 기준 단거리 (km)</label>
                    <input 
                      type="number" 
                      value={fareDraft.minFareDistanceLimit}
                      onChange={(e) => setFareDraft({ ...fareDraft, minFareDistanceLimit: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">단독 탑승 펫케어 세션 추가 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.petCareSurcharge}
                      onChange={(e) => setFareDraft({ ...fareDraft, petCareSurcharge: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">경로지 추가 경유 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.viaSurcharge}
                      onChange={(e) => setFareDraft({ ...fareDraft, viaSurcharge: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">심야 및 이른아침 할증 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.nightSurcharge}
                      onChange={(e) => setFareDraft({ ...fareDraft, nightSurcharge: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">서울 경기 외곽 할증 시작액 (원)</label>
                    <input 
                      type="number" 
                      value={fareDraft.outOfSeoulSurcharge}
                      onChange={(e) => setFareDraft({ ...fareDraft, outOfSeoulSurcharge: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">왕복 대기 시간당 요금 (10분당)</label>
                    <input 
                      type="number" 
                      value={fareDraft.waitingFarePer10Min}
                      onChange={(e) => setFareDraft({ ...fareDraft, waitingFarePer10Min: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 text-[11px] text-emerald-800 leading-relaxed p-4 rounded-xl border border-brand-green-light">
                  <p className="font-extrabold flex items-center gap-1">🛡️ 수식 정찰제 가이드 라인:</p>
                  <p className="mt-1">
                    요금 계산식: [기본 요금 + (거리km * km당 누적 요금)]. 이때 산출액이 최저 요금보다 낮고 거리 기준이 제한값 이내이면, 지정한 최저 요금이 지연 없이 적용됩니다. 옵션 체결 시 각 수송 가중 추가 할증이 정액 산란됩니다.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-150">
                  <button
                    onClick={handleSaveFareConfig}
                    className="flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-hover text-white px-6 py-3 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    <Save className="w-4 h-4 fill-white text-white" />
                    새 요금 보장 가중치 설정 저장
                  </button>
                </div>

                {/* 요금표 이미지 업로드 관리 */}
                <div className="border-t border-gray-150 pt-6 space-y-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-brand-green rounded-full"></span>
                    <h4 className="text-sm font-black text-gray-900">공식 요금표 이미지 업로드 및 관리</h4>
                  </div>
                  <p className="text-xs text-gray-500">
                    실제 운임표 이미지 파일(JPG, PNG, GIF 등)을 여기에 업로드하면, 고객 "요금안내" 화면에 해당 고해상도 이미지가 우선 적용되어 노출됩니다.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setSiteDraft(prev => ({ ...prev, fareTableImageUrl: event.target?.result as string }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id="fare-table-image-upload"
                        />
                        <label
                          htmlFor="fare-table-image-upload"
                          className="bg-brand-green/15 hover:bg-brand-green/20 text-brand-green font-extrabold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                        >
                          컴퓨터에서 요금표 사진 찾아보기 📂
                        </label>
                        {siteDraft.fareTableImageUrl && (
                          <button
                            onClick={() => {
                              if (confirm('설정된 요금표 이미지를 지우고 기본 HTML 요금표 디자인으로 복구하시겠습니까?')) {
                                setSiteDraft(prev => ({ ...prev, fareTableImageUrl: '' }));
                              }
                            }}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors border border-rose-200/40"
                          >
                            초기화 및 기본 복구 🗑️
                          </button>
                        )}
                      </div>
                      
                      {/* URL direct insert for flexibility */}
                      <div className="space-y-1.5 pt-2">
                        <label className="text-xs font-bold text-gray-700 block">또는 요금표 이미지 외부 URL 직접 주소 입력</label>
                        <input
                          type="text"
                          placeholder="e.g. https://.../image.jpg"
                          value={siteDraft.fareTableImageUrl || ''}
                          onChange={(e) => setSiteDraft(prev => ({ ...prev, fareTableImageUrl: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="border border-dashed border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center min-h-[140px] bg-gray-50/50">
                      {siteDraft.fareTableImageUrl ? (
                        <div className="relative w-full max-h-48 overflow-y-auto rounded-lg shadow-sm border border-gray-100 bg-white p-1">
                          <img
                            src={siteDraft.fareTableImageUrl}
                            alt="업로드된 요금표"
                            className="w-full h-auto object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 space-y-1 py-4">
                          <p className="text-xs font-bold">등록된 이미지 요금표가 없습니다.</p>
                          <p className="text-[10px] text-gray-500">미등록 시, 수동 제작된 영문/국문 텍스트 요금표가 자동 송출됩니다.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        onUpdateSiteConfig(siteDraft);
                        triggerNotification('공식 요금표 파일 설정이 실시간 업로드 및 저장되었습니다! 💚');
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 fill-white text-white" />
                      요금표 이미지 및 URL 정보 저장 고시
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REVIEWS CMS */}
          {activeSubTab === 'reviews' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* Form card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-brand-green bg-brand-green-light p-1 rounded-full" />
                  {editingReviewId ? '이용 후기 정정 편집' : '새 수동 리뷰 직접 작성 고시'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">보호자 필명 (e.g. 김*아)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 박*은"
                      value={reviewForm.author}
                      onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">아이 이름 & 종</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 초코(푸들)"
                      value={reviewForm.petName}
                      onChange={(e) => setReviewForm({ ...reviewForm, petName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">반려동물 분류</label>
                    <select 
                      value={reviewForm.petType}
                      onChange={(e) => setReviewForm({ ...reviewForm, petType: e.target.value as 'dog' | 'cat' | 'special' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    >
                      <option value="dog">강아지 (Dog)</option>
                      <option value="cat">고양이 (Cat)</option>
                      <option value="special">특수동물 (Special)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">별점 부여 (1-5)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="5"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-4">
                    <label className="text-xs font-bold text-gray-700 block">이용 총평 및 행복한 후기내용</label>
                    <textarea 
                      rows={3}
                      placeholder="실탑승 후 느낌점과 기사님의 친절도, 소독 위생 전경 등을 자유롭게 작성해 주세요."
                      value={reviewForm.content}
                      onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editingReviewId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReviewId(null);
                        setReviewForm({ author: '', petName: '', petType: 'dog', rating: 5, content: '' });
                      }}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer"
                    >
                      취소
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddOrEditReview}
                    className="flex items-center gap-1 bg-brand-green hover:bg-brand-green-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    <Save className="w-3.5 h-3.5 fill-white" />
                    {editingReviewId ? '리뷰 편집 완료' : '실후기 전광판 발행 등재'}
                  </button>
                </div>
              </div>

              {/* Reviews list table */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-900">현 탑승객 실후기 목록 ({reviews.length}건 등록됨)</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600">
                    <thead className="text-[10px] text-gray-400 font-extrabold uppercase bg-gray-50/50 border-b border-gray-150">
                      <tr>
                        <th className="px-3 py-3 rounded-l-lg">보호자</th>
                        <th className="px-3 py-3">아이 인적사항</th>
                        <th className="px-3 py-3">평점</th>
                        <th className="px-3 py-3 w-1/3">리뷰 요약</th>
                        <th className="px-3 py-3 text-right rounded-r-lg">CMS 액션</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50/30">
                      {reviews.map((rev) => (
                        <tr key={rev.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-3 py-3.5 font-bold text-gray-900">{rev.author}</td>
                          <td className="px-3 py-3.5">
                            <span className="font-semibold text-gray-800">{rev.petName}</span>
                            <span className="ml-1 px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-emerald-50 text-emerald-800 uppercase">
                              {rev.petType === 'dog' ? '강아지' : rev.petType === 'cat' ? '고양이' : '특수'}
                            </span>
                          </td>
                          <td className="px-3 py-3.5 text-amber-500 font-bold">★ {rev.rating}</td>
                          <td className="px-3 py-3.5 text-gray-500 truncate max-w-xs">{rev.content}</td>
                          <td className="px-3 py-3.5 text-right space-x-1 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleStartEditReview(rev)}
                              className="p-1 px-2.5 bg-sky-50 text-sky-700 hover:bg-sky-100/70 text-[10px] font-bold rounded-md transition-colors inline-flex items-center gap-0.5"
                            >
                              <Edit className="w-2.5 h-2.5" />
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(rev.id)}
                              className="p-1 px-2.5 bg-red-50 text-red-600 hover:bg-red-100/70 text-[10px] font-bold rounded-md transition-colors inline-flex items-center gap-0.5"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: PHOTOS CMS */}
          {activeSubTab === 'photos' && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              {/* Form editing card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-brand-green bg-brand-green-light p-1 rounded-full" />
                  {editingPhotoId ? '운행 갤러리 액자 요량수정' : '신규 운행 사진 등록'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">사진 제목</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 쿠키 병원 스탠바이 완료"
                      value={photoForm.title}
                      onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">반려 아이 분류</label>
                    <select 
                      value={photoForm.category}
                      onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value as 'dog' | 'cat' | 'special' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    >
                      <option value="dog">강아지 (Dog)</option>
                      <option value="cat">고양이 (Cat)</option>
                      <option value="special">특수동물 (Special)</option>
                    </select>
                  </div>

                  {/* Drag, Drop and Paste Box */}
                  <div className="space-y-1.5 sm:col-span-3" onPaste={handlePhotoPasteEvent}>
                    <label className="text-xs font-bold text-gray-750 block">📸 내 운행 사진 파일 선택 또는 복사 이미지 붙여넣기 (Ctrl + V)</label>
                    <div 
                      onDragOver={handlePhotoDragOver}
                      onDrop={handlePhotoDrop}
                      className="border-2 border-dashed border-gray-200 hover:border-brand-green bg-slate-50/50 rounded-2xl p-4 text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center gap-1.5"
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handlePhotoFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="p-1.5 bg-brand-green/10 text-brand-green rounded-full group-hover:scale-105 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-gray-850">여기에 운행 사진 붙여넣기 (Ctrl + V)</span>
                      <span className="text-[10px] text-gray-500 font-semibold">마우스 클릭으로 내 기기 사진 선택 또는 이미지 드래그</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-3">
                    <label className="text-xs font-bold text-gray-700 block">이미지 주소 (URL 및 복사한 이미지 데이터)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://images.unsplash.com/photo-... (위 상자에서 이미지 붙여넣기 시 자동 기입됩니다)"
                      value={photoForm.imageUrl}
                      onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-mono focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>

                  {photoForm.imageUrl && (
                    <div className="space-y-1 sm:col-span-3">
                      <span className="text-[10px] font-bold text-gray-500">사진 미리보기 (미리뷰):</span>
                      <div className="rounded-xl border border-gray-150 overflow-hidden bg-gray-55 h-28 flex items-center justify-center max-w-sm">
                        <img
                          src={photoForm.imageUrl}
                          alt="CMS Photo Preview"
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            (e.target as any).src = "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=500";
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5 sm:col-span-3">
                    <label className="text-xs font-bold text-gray-700 block">사진 하단 세부 한글 설명</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 뒷좌석 에토스 가림막과 피톤치드로 쾌적한 비염차단 안심 공간 속 이동"
                      value={photoForm.description}
                      onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:border-brand-green focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {editingPhotoId && (
                    <button
                      onClick={() => {
                        setEditingPhotoId(null);
                        setPhotoForm({ category: 'dog', title: '', description: '', imageUrl: '' });
                      }}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer"
                    >
                      취소
                    </button>
                  )}
                  <button
                    onClick={handleAddOrEditPhoto}
                    className="flex items-center gap-1 bg-brand-green hover:bg-brand-green-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all"
                  >
                    <Save className="w-3.5 h-3.5 fill-white text-white" />
                    {editingPhotoId ? '액자 사진 편집 변경' : '수송 사진 전시장 발행 고시'}
                  </button>
                </div>
              </div>

              {/* Grid visual list */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-900">수송 갤러리 기사 사진 명부 ({photos.length}매 고시인쇄)</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((p) => (
                    <div key={p.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-slate-50 relative group flex flex-col justify-between">
                      <div className="h-32 overflow-hidden relative">
                        <img 
                          src={p.imageUrl} 
                          alt={p.title} 
                          className="object-cover w-full h-full"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 text-[8px] font-extrabold bg-[#03c75a] text-white p-1 py-0.5 rounded-md uppercase">
                          {p.category === 'dog' ? '강아지' : p.category === 'cat' ? '고양이' : '특수'}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="font-extrabold text-xs text-gray-900 line-clamp-1">{p.title}</p>
                        <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{p.description}</p>
                      </div>
                      <div className="p-2 border-t border-gray-100/60 bg-white/80 flex justify-end gap-1">
                        <button
                          onClick={() => handleStartEditPhoto(p)}
                          className="p-1 px-2.5 bg-sky-50 text-sky-700 hover:bg-sky-100 text-[9px] font-bold rounded-md"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(p.id)}
                          className="p-1 px-2.5 bg-red-50 text-red-600 hover:bg-red-100 text-[9px] font-bold rounded-md"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
