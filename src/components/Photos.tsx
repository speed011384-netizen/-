import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryPhoto } from '../types';
import { GALLERY_PHOTOS } from '../data';
import { ZoomIn, X, ChevronLeft, ChevronRight, MessageSquare, Info, Edit, Trash2, Plus, RefreshCw, MessageCircle } from 'lucide-react';

interface PhotosProps {
  setActiveTab: (tab: string) => void;
  photos: GalleryPhoto[];
  onUpdatePhotos: (updated: GalleryPhoto[]) => void;
}

export default function Photos({ setActiveTab, photos, onUpdatePhotos }: PhotosProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dog' | 'cat' | 'special'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Admin Editing States (Permanently unlocked by user preference for direct delete/edit management)
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Form states
  const [formCategory, setFormCategory] = useState<'dog' | 'cat' | 'special'>('dog');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Compress image before draft saving to keep local storage lightweight
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

  // File, Drag & Drop and Clipboard Paste logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file).then(compressed => {
        setFormImageUrl(compressed);
      });
    }
  };

  const handlePasteEvent = (e: React.ClipboardEvent<HTMLDivElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          compressImage(file).then(compressed => {
            setFormImageUrl(compressed);
          });
          break;
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      compressImage(file).then(compressed => {
        setFormImageUrl(compressed);
      });
    }
  };

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? filteredPhotos.length - 1 : prev - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(prev => {
      if (prev === null) return null;
      return prev === filteredPhotos.length - 1 ? 0 : prev + 1;
    });
  };

  const handleOpenAdd = () => {
    setFormCategory('dog');
    setFormTitle('');
    setFormDescription('');
    setFormImageUrl('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500');
    setIsAddMode(true);
  };

  const handleOpenEdit = (photo: GalleryPhoto, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingPhoto(photo);
    setFormCategory(photo.category);
    setFormTitle(photo.title);
    setFormDescription(photo.description);
    setFormImageUrl(photo.imageUrl);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 사진을 삭제하시겠습니까?')) {
      const updated = photos.filter(p => p.id !== id);
      onUpdatePhotos(updated);
      setSelectedPhotoIndex(null);
    }
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDescription || !formImageUrl) {
      alert('모든 필드를 기입해 주세요!');
      return;
    }
    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      category: formCategory,
      title: formTitle,
      description: formDescription,
      imageUrl: formImageUrl
    };
    onUpdatePhotos([newPhoto, ...photos]);
    setIsAddMode(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    if (!formTitle || !formDescription || !formImageUrl) {
      alert('모든 필드를 기입해 주세요!');
      return;
    }
    const updated = photos.map(p => {
      if (p.id === editingPhoto.id) {
        return {
          ...p,
          category: formCategory,
          title: formTitle,
          description: formDescription,
          imageUrl: formImageUrl
        };
      }
      return p;
    });
    onUpdatePhotos(updated);
    setEditingPhoto(null);
  };

  const handleResetGallery = () => {
    if (window.confirm('사진첩을 원래 기본값으로 초기화하시겠습니까? (이전까지 등록/수정하신 내용은 사라집니다)')) {
      onUpdatePhotos(GALLERY_PHOTOS);
      localStorage.removeItem('manspet_gallery_photos');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="photos-view">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs bg-brand-green-light text-brand-green font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Real Drive Gallery
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          MANS.PET PETTAXI 안전 운행 사진관
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          실시간 살균 방역 차량 내 전용 카시트와 튼튼한 벨트 체결 하에 기쁘게 탑승 중인 아이들 사진입니다.
        </p>

        {/* Direct Photo Management Ribbon (Permanently Enabled) */}
        <div className="flex justify-center pt-2" id="gallery-admin-options-ribbon">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-6 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-sm hover:shadow-md cursor-pointer transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>운행 사진 실시간 추가하기</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center bg-gray-100/80 p-1 rounded-2xl max-w-sm mx-auto shadow-inner" id="gallery-filters">
        {[
          { id: 'all', label: '전체 보기 🐾' },
          { id: 'dog', label: '강아지 🐶' },
          { id: 'cat', label: '고양이 🐱' },
          { id: 'special', label: '특수동물 🐹' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id as any);
              setSelectedPhotoIndex(null);
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-brand-green text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Grid gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6" id="gallery-photo-master-grid">
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-anim-${photo.id}`}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group relative rounded-3xl overflow-hidden aspect-square bg-gray-50 border border-gray-150 shadow-sm cursor-pointer"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Admin Controls Overlay right on Image Card */}
            {isAdminMode && (
              <div 
                className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 gap-2" 
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[9px] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded font-bold text-gray-200">
                  ID: {photo.id.replace('photo-', '#')}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleOpenEdit(photo, e)}
                    className="p-1.5 bg-white/95 hover:bg-white text-gray-700 hover:text-brand-green rounded-lg shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                    title="글자 및 사진 변경"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(photo.id, e)}
                    className="p-1.5 bg-stone-900/90 hover:bg-rose-600 text-gray-200 hover:text-white rounded-lg shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Hover overlay effects */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
              <div className="flex justify-between items-center">
                <span className="text-[9px] bg-brand-green text-white px-2 py-0.5 rounded font-extrabold uppercase">
                  {photo.category === 'dog' ? '강아지' : photo.category === 'cat' ? '고양이' : '특수동물'}
                </span>
                <ZoomIn className="w-4 h-4 text-brand-yellow font-bold" />
              </div>

              <div className="space-y-1 text-left">
                <h5 className="text-xs sm:text-sm font-extrabold line-clamp-1">{photo.title}</h5>
                <p className="text-[10px] text-gray-300 line-clamp-1">{photo.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredPhotos.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl space-y-3">
            <p className="text-sm font-bold text-gray-400">등록된 운행 사진이 존재하지 않습니다.</p>
            {isAdminMode && (
              <button
                onClick={handleOpenAdd}
                className="bg-brand-green text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-green-hover shadow-2xs"
              >
                첫 사진 등록해보기
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div 
              className="relative max-w-4xl w-full flex flex-col items-center gap-4 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Indicators */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white cursor-pointer z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white cursor-pointer z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image View */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="rounded-3xl overflow-hidden border-2 border-white/10 max-h-[80vh] bg-neutral-900 max-w-lg md:max-w-2xl"
              >
                <img
                  src={filteredPhotos[selectedPhotoIndex].imageUrl}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="object-contain w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Photo Modal Form Dialog */}
      <AnimatePresence>
        {(isAddMode || editingPhoto !== null) && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-55 flex items-center justify-center p-4 animate-fadeIn">
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-gray-100 shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-brand-green text-white px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  <h3 className="font-extrabold text-base md:text-lg">
                    {isAddMode ? '새 운행 사진 등록' : '사진 설명 및 글자 수정'}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    setIsAddMode(false);
                    setEditingPhoto(null);
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={isAddMode ? handleSaveAdd : handleSaveEdit} className="p-6 space-y-4 overflow-y-auto">
                
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700 block">반려동물 카테고리</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['dog', 'cat', 'special'] as const).map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormCategory(cat)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formCategory === cat
                            ? 'bg-brand-green border-brand-green text-white shadow-xs'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat === 'dog' ? '강아지 🐶' : cat === 'cat' ? '고양이 🐱' : '특수동물 🐹'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700 block">사진 제목 / 타이틀</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="예: 비숑 구름이 병원 무사히 도착"
                    className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:bg-white transition-colors"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-700 block">상세 설명 / 텍스트 글자</label>
                  <textarea
                    required
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="예: 뒷좌석 방역 카시트에서 기분 좋게 안전 이동 중인 비숑 구름이"
                    className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Image URL Input */}
                <div className="space-y-4">
                  {/* Paste / Upload Box */}
                  <div className="space-y-1.5" onPaste={handlePasteEvent}>
                    <label className="text-xs font-black text-gray-700 block">📸 내 사진 붙여넣기 (Clipboard Paste) / 컴퓨터 파일 선택</label>
                    <div 
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-gray-200 hover:border-brand-green/70 bg-gray-50 rounded-2xl p-4 text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center gap-1.5"
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="p-2 bg-brand-green/10 text-brand-green rounded-full group-hover:scale-105 transition-transform duration-350">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <span className="text-xs font-extrabold text-gray-800">여기에 복사한 사진 붙여넣기 (Ctrl + V)</span>
                      <span className="text-[10px] text-gray-500 font-semibold">마우스 클릭으로 파일 직접 선택 또는 드래그 앤 드롭</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black text-gray-700 block">이미지 주소 (URL/Base64)</label>
                      <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded leading-none">자동 동기화 중</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="사진을 붙여넣거나 파일을 선택하면 자동으로 채워집니다. 직접 입력도 가능합니다."
                      className="w-full text-[10px] font-mono bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-green focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Examples recommendation panel */}
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <p className="text-[10px] font-bold text-gray-500">💡 갤러리 추천 예시 사진 원클릭 선택:</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        { label: '비숑 🐶', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500' },
                        { label: '포메 🐶', url: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=500' },
                        { label: '리트리버 🐶', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500' },
                        { label: '치와와 🐶', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500' },
                        { label: '샴고양이 🐱', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500' },
                        { label: '치즈냥이 🐱', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=500' },
                        { label: '토끼 🐰', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=500' },
                        { label: '다람쥐 🐿️', url: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=500' },
                      ].map((preset, pIdx) => (
                        <button
                          type="button"
                          key={pIdx}
                          onClick={() => setFormImageUrl(preset.url)}
                          className={`px-2 py-1 bg-white hover:bg-gray-100 border text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                            formImageUrl === preset.url ? 'border-brand-green text-brand-green font-black ring-1 ring-brand-green/30' : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mini Preview Frame */}
                {formImageUrl && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-500">주소(URL) 사진 미리보기:</span>
                    <div className="rounded-xl border border-gray-150 overflow-hidden bg-gray-50 h-28 flex items-center justify-center">
                      <img
                        src={formImageUrl}
                        alt="Preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as any).src = "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=500";
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}

                {/* CTA Action Buttons */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddMode(false);
                      setEditingPhoto(null);
                    }}
                    className="w-1/2 py-3 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-55 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-brand-green text-white text-xs font-bold rounded-xl hover:bg-brand-green-hover transition-colors shadow-2xs cursor-pointer"
                  >
                    {isAddMode ? '사진 등록 완료' : '수정 사항 저장'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="bg-brand-green-light/40 border border-brand-green-light rounded-3xl p-6 md:p-8" id="driver-care-guide">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-brand-green text-white rounded-xl">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 text-left">
            <h4 className="font-extrabold text-sm text-gray-900">운행 사진 촬영 및 프라이빗 개인 보안 안내</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              본 갤러리에 업로드된 모든 반려동물 주행 운행 사진은 **보호자님의 명확한 사전 동의(서면 또는 카톡동의)** 하에 촬영되었으며, 
              외부에 아이들의 초상권을 침해하지 않도록 안전 수칙 내에서 게재하고 있습니다. 
              내 아이 단독 등하원 시에 실시간으로 공유 드리는 안심 관제 샷 또한 타인에게 절대 공유되지 않는 프라이빗 1:1 보장 안전 보관을 준수합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
