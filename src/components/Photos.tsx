import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryPhoto } from '../types';
import { GALLERY_PHOTOS } from '../data';
import { ZoomIn, X, ChevronLeft, ChevronRight, MessageSquare, Info } from 'lucide-react';

interface PhotosProps {
  setActiveTab: (tab: string) => void;
}

export default function Photos({ setActiveTab }: PhotosProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dog' | 'cat' | 'special'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(photo => photo.category === activeCategory);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="photos-view">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs bg-brand-green-light text-brand-green font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Real Drive Gallery
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          mans pet 안전 승무 사진관
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          실시간 살균 방역 차량 내 전용 카시트와 튼튼한 벨트 체결 하에 기쁘게 탑승 중인 아이들 사진입니다.
        </p>
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
            className="group relative rounded-3xl overflow-hidden aspect-square bg-gray-50 border border-gray-100 shadow-sm cursor-pointer"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
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
      </div>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
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
                className="rounded-3xl overflow-hidden border-2 border-white/10 max-h-[70vh] bg-neutral-900 max-w-lg md:max-w-2xl"
              >
                <img
                  src={filteredPhotos[selectedPhotoIndex].imageUrl}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="object-contain w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Image Explanations Box */}
              <div className="text-center space-y-2 max-w-md bg-stone-900/80 p-5 rounded-2xl border border-white/10 mt-2">
                <span className="text-[10px] bg-brand-yellow text-gray-950 font-black px-2.5 py-0.5 rounded uppercase">
                  {filteredPhotos[selectedPhotoIndex].category === 'dog' ? '강아지 케어' : filteredPhotos[selectedPhotoIndex].category === 'cat' ? '고양이 케어' : '특수 소형 동물'}
                </span>
                <h4 className="font-extrabold text-base md:text-lg">
                  {filteredPhotos[selectedPhotoIndex].title}
                </h4>
                <p className="text-xs text-stone-300 font-semibold leading-relaxed">
                  {filteredPhotos[selectedPhotoIndex].description}
                </p>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => {
                      setSelectedPhotoIndex(null);
                      setActiveTab('contact');
                    }}
                    className="flex items-center gap-1.5 bg-brand-green text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-green-hover transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>이 기사님 매칭 동승 문의</span>
                  </button>
                </div>
              </div>

            </div>
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
              본 갤러리에 업로드된 모든 반려동물 주행 승무 사진은 **보호자님의 명확한 사전 동의(서면 또는 카톡동의)** 하에 촬영되었으며, 
              외부에 아이들의 초상권을 침해하지 않도록 안전 수칙 내에서 게재하고 있습니다. 
              내 아이 단독 등하원 시에 실시간으로 공유 드리는 안심 관제 샷 또한 타인에게 절대 공유되지 않는 프라이빗 1:1 보장 안전 보관을 준수합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
