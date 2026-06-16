import { Review, GalleryPhoto } from './types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: '이*정',
    petName: '쿠키 (골든리트리버)',
    petType: 'dog',
    rating: 5,
    content: '평택에서 서울 대학병원까지 대형견 데리고 첫 통원이라 너무 조마조마했는데 기as 님이 정말 따뜻하고 친절하게 맞아주셨어요. 차량이 엄청 넓고 대형견 전용 쿠션 매트에 하네스 전용 안전벨트까지 단단히 채워주셔서 가는 동안 쿠키가 누워서 완전 편하게 갔네요. 친절한 운전과 배려에 너무 감사해서 병원 갈 때마다 무조건 manspet taxi만 이용합니다! 강추해요. 😍',
    date: '2026-06-11',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-2',
    author: '최*민',
    petName: '나비 (코리안 쇼트헤어)',
    petType: 'cat',
    rating: 5,
    content: '고양이라 켄넬 안에만 들어가도 울고불고 예민보스인데 차 내부 시트나 공기가 너무 쾌적하고 냄새가 하나도 안 나서 그런지 나비가 금방 진정했어요. 기사님이 무소음 정속 주행으로 조심스럽게 운행해주신 덕분입니다. 출발 전후로 천연 연무 피톤치드 세척하시는 모습 보고 더 믿임이 갔어요. 고양이 배려 이동장 체결 고리 최고네요! 🙏',
    date: '2026-06-09',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-3',
    author: '정*아',
    petName: '하루 (포메라니안)',
    petType: 'dog',
    rating: 5,
    content: '바쁜 직장인이라 아이 미용실 하원만 비동승 단독이동 서비스로 부탁드렸는데 걱정이 무색하게 완벽했어요! 기사님이 픽업하실 때부터 미용실 도착, 그리고 인계 완료 순간까지 안심 실시간 카톡으로 사진이랑 상태 메시지를 바로 보내주셨습니다. 하루가 차량 안에서 활짝 웃고 있는 사진 보고 너무 안심했네요. 믿고 맡길 수 있는 펫택시입니다! 💚',
    date: '2026-06-07',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-4',
    author: '김*현',
    petName: '두부 (비숑 프리제)',
    petType: 'dog',
    rating: 5,
    content: '당일 오전에 급하게 대학병원 예약이 잡혀 1시간 전에 긴급 수배 전화를 드렸었는데, 공차 대기 중이시던 베테랑 기사님을 엄청 빠르게 안심 매칭해서 보내주셨어요! 시간 칼같이 맞춰 와주시고, 아이 카시트도 아주 포근하고 깨끗하게 세팅되어 있었습니다. 7km 안 되는 비교적 단거리였는데도 최저요금제로 완벽한 수송을 해주셔서 요금이 하나도 아깝지 않았습니다.',
    date: '2026-06-04',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-5',
    author: '황*인',
    petName: '구름이 (토이푸들)',
    petType: 'dog',
    rating: 5,
    content: '왕복으로 병원 대기 서비스를 처음 예약해 보았는데 진짜 대대대만족입니다. 병원 진료가 혼잡해서 예약시간보다 35분 대기가 길어졌는데도 싫은 내색 하나 없이 친절히 대기해 주시고 아이 컨디션을 꼼꼼하게 같이 챙겨 주셨어요. 투명하고 정직하게 30분 무료 대기 적용에 추가 대기만 깔끔하게 정산해 주셨고 운전 실력이 베스트 드라이버이십니다. 번창하세요!',
    date: '2026-05-31',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'rev-6',
    author: '윤*영',
    petName: '몽이 (페르시안)',
    petType: 'cat',
    rating: 5,
    content: '이사 일정으로 경기 안성외곽에서 서울 마포까지 장거리 펫택시를 불렀습니다. 거리가 꽤 되어서 걱정 수치가 가득했는데 차안에 냄새도 없고 은은한 연무가 돌아 탑승 내내 아주 공기가 깨끗했어요. 네이버 추천 최적길 안내에 부합되게 속임수 없이 합리적으로 최종 요금을 산정해 주셔서 기쁜 마음으로 결제했네요. 아이도 멀미 없이 무사 도착했습니다. 강력추천합니다!',
    date: '2026-05-25',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=400'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    category: 'dog',
    title: '비숑 구름이 병원 무사히 도착',
    description: '뒷좌석 방역 카시트에서 기분 좋게 안전 이동 중인 비숑 구름이',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-2',
    category: 'dog',
    title: '강릉 장거리 왕복 운행 중 휴게소',
    description: '장거리 여행을 위한 전용 벨트 장착 후 해방감 넘치는 미소',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b117b6281?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-3',
    category: 'cat',
    title: '안전 캐리어 벨트에 탑승한 나비',
    description: '고양이 전용 프라이빗 격막형 카시트로 돌발 움직임 방지',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-4',
    category: 'dog',
    title: '골든리트리버 대형견도 편안하게',
    description: '대형 SUV 넓직한 트렁크 전용 쿠션 매트로 기분 좋은 승차감 제공',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-5',
    category: 'dog',
    title: '포메라니안 뽀미 일상 나들이길',
    description: '바쁜 견주님을 대신해 성실하게 이동을 돕는 단골 뽀미',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-6',
    category: 'cat',
    title: '러시안블루 카이의 안심 이동',
    description: '적재함 내 연무 살균기가 실시간 쾌적한 피쉬 아로마 숲 환경을 제공합니다',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-7',
    category: 'special',
    title: '기니피그 꾸끼 정밀 진료길 동행',
    description: '소형 특수동물을 위한 맞춤형 미니 켄넬 충격 예방 고정 패드',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'photo-8',
    category: 'special',
    title: '애완토끼 초코의 미용실 나들이',
    description: '차량 흔들림을 주시하며 속도 제어로 스트레스 제로 이동 완수',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=500'
  }
];

export const SERVICES = [
  {
    id: 'hospital',
    title: '동물병원 이동',
    sub: '안전하게 병원까지',
    desc: '검진 및 입원/퇴원 치료 시 안심 보조 동행. 정밀 진료 대기 시간 동안 기사 대기 왕복 패키지도 지원합니다.',
    tag: '병원/통원 전문',
    icon: 'Stethoscope',
    details: [
      '아픈 아이들을 고려한 저속 및 충격 방지 서행 운행',
      '카니발외 SUV다수보유',
      '왕복 예약 시 병원 진료 중 대기 서비스 지원'
    ]
  },
  {
    id: 'grooming',
    title: '미용샵 이동',
    sub: '이용샵까지 편안하게',
    desc: '예쁘게 가꾸기 위한 정기 예약 이동 및 바쁜 반려인을 대신한 안심 픽업앤드롭 서비스를 제공합니다.',
    tag: '미용 정기권',
    icon: 'Scissors',
    details: [
      '바쁜 현대 반려인들을 위한 단독 완벽 픽업 대행',
      '미용샵 전후 털 날림 걱정 없는 내부 상시 집진 및 연식 환기',
      '보호자 비동승 단독 픽업 시 완벽한 승차/하차 인증 사진 전송'
    ]
  },
  {
    id: 'airport',
    title: '공항 이동',
    sub: '공항 픽업 & 센딩',
    desc: '반려동물과의 해외여행이나 국가간 간편 이주시 필요한 대형 러기지 적재와 전용 안심 공항 픽업 서비스.',
    tag: '인천/김포공항 전용',
    icon: 'Plane',
    details: [
      '대형 여행용 캐리어 다수 및 켄넬 동시 상차 가능한 SUV 보유',
      '국제선 출발/도착 맞춤형 스케줄 스탠바이 예약',
      '장시간 비행 전후 소변 패드 및 음수대 긴급 배려 서비스'
    ]
  },
  {
    id: 'long-distance',
    title: '장거리 이동',
    sub: '전국 어디든 안전하게',
    desc: '명절 귀향, 지방 이사, 펫 전용 펜션 여행 등 전국 도간 경계를 뛰어넘는 초장거리 안심 고속도로 운행.',
    tag: '전국 운행 보장',
    icon: 'MapPin',
    details: [
      '최장거리 무사고 기사의 안전 고속 안정 정속 주행',
      '2시간 간격 고속도로 휴게소 간이 산책 및 배변 세션 진행',
      '실시간 모바일 관제 GPS 경로 및 주행 사진 전송 서비스'
    ]
  },
  {
    id: 'adoption',
    title: '입양 이동',
    sub: '새로운 가족을 만나러',
    desc: '보호소, 임시보호처에서 귀한 인연을 맺어 내 집으로 오는 첫걸음. 새로운 출발을 기리는 따스하고 청결한 첫 이동.',
    tag: '신규 입양 우대할인',
    icon: 'Heart',
    details: [
      '낯선 만남에 극도로 예민한 새 가족 맞춤 방음 부스 시팅',
      '신규 유기견/유기묘 입양 차량 신청 시 10% 전폭 환영 혜택',
      '이동 후 새로운 보금자리 안전 인계 및 축하 기념 촬영 봉사'
    ]
  }
];

export const ADVANTAGES = [
  {
    id: 'adv-1',
    title: '예약제 운영',
    description: '원하시는 스케줄에 차질 없이 딱 맞춰 1:1 맞춤 예약제로 정확하게 가동됩니다.',
    tag: '시간 엄수'
  },
  {
    id: 'adv-2',
    title: '안전한 운행',
    description: '반려동물의 멀미 최소화와 안전성 확보를 위해 가속/감속 제어 및 방어 운전을 전면 보증합니다.',
    tag: '방어 운전'
  },
  {
    id: 'adv-3',
    title: '안전벨트 & 카시트',
    description: '소형/중형/대형 크기에 맞는 전용 가죽 카시트 및 흔들림 방지 보조 장치를 안전 체결합니다.',
    tag: '완벽 수비'
  },
  {
    id: 'adv-4',
    title: '실시간 소통',
    description: '기사 단독 동승 시 안심 전용 메신저로 탑승, 도중, 도착 상태와 눈 맞춤 웃는 사진을 즉시 전송합니다.',
    tag: '안심 공유'
  },
  {
    id: 'adv-5',
    title: '연무기 상시 방역',
    description: '인체와 동물에 100% 안전한 친환경 피톤치드 살균 소독 연무를 매 회 운행 완료 시 집중 전개합니다.',
    tag: '청결 안심'
  }
];

export const MOCK_BOT_RESPONSES: Record<string, string> = {
  '기본': '안녕하세요! MANS.PET PETTAXI 안심 도우미 봇입니다. 🐶🐾\n\n무엇이 궁금하신가요?\n\n1. 이용 요금 안내\n2. 예약 방법 및 준비 사항\n3. 반려동물 안전 조치\n4. 장거리 및 보호자 비동승 서비스\n\n번호나 궁금한 키워드를 입력해 주시면 빠르게 안내해 드릴게요!',
  '1': '💰 [요금 및 이용안내]\n\n📍 운행지역 안내\n- 서울 전 지역, 인천 전 지역, 경기 일부 지역\n\n💵 기본 요금 안내\n- [기본요금 8,000원 + 1km당 1,000원]\n- 예시: 10km 운행 시 기본요금 8,000원 + 10km요금 10,000원 = 총 운행요금 18,000원\n- 네이버 추천길 안내 기준으로 요금이 산정 및 부과됩니다.\n- (기사님 배차 스케줄에 따라 일부 외곽 제한 운행이 될 수 있습니다)\n\n⭐️ [최저요금제 실시]\n- 7km 이하의 가까운 단거리 운행 시 최저 요금제 일률 15,000원이 적용됩니다.\n\n⚠️ [추가요금 및 할증요금 안내]\n- 펫케어 서비스(강아지 단독이동, 병원진료, 홈픽업서비스 등) (+5,000원 추가)\n- 경로 외 추가 목적지 경유 시 (+5,000원 추가)\n- 왕복 운행 시 30분 대기 무료 / 이후 10분당 (+1,000원 추가)\n- 09:00 ~ 21:00 외 시간(야간/이른 아침) 운행 시 (+5,000원 할증)\n- 서울 외곽 지역(인천, 파주, 분당, 의정부 등) 운행 시 (+5,000원~ 추가)',
  '2': '📅 [예약 방법 및 탑승 전 준비사항]\n- 예약은 출발 최소 3시간 전까지 "문의하기"의 간편 신청서 또는 상단 번호/카카오톡 링크를 통해 접수 가능합니다.\n- 급한 당일 콜은 대표번호(010-7644-0799)로 안심 직통 유선 전화 주시면 스케줄 조율 후 빠른 매칭을 돕습니다.\n- 마킹(영역표시)이 심하거나 낯선 환경에 예민한 아이들은 오염 예방용 매너벨트나 기저귀 착용을 가볍게 권장 드리오며, 탑승 전 대소변을 유도해 주시면 더욱 좋습니다.',
  '3': '🛡️ [안전 조치 및 차량 방역 수칙]\n- 차량 내 이소성 차단 에토스 방울 격벽망 시공 완비\n- 충격 분산 하네스 체결형 안전벨트 어댑터 지원\n- 비숑/푸들 맞춤형 알러지 케어용 솜털 가죽 카시트 상비\n- 탑승 전후 천연 피톤치드 분사 연무 살균 및 피쉬 에어 클린 가동으로 냄새 없고 균 없는 최상급 위생 유지!',
  '4': '🛣️ [보호자 비동승 및 장거리 서비스]\n- 바쁘신 일정으로 아이만 단독 탑승 시, 기사님이 픽업 시점부터 인계 완료 시점까지 안심 카카오톡으로 실시간 무사 탑승 및 표정 사진, 도착 현황 문자를 즉각 공유해 주십니다.\n- 서울-부산, 경기-제주 탁송 등 전국 도간 고속 정속 주행으로 지방 이사 및 요양, 장거리 입양을 정성껏 연계합니다.'
};

export const DEFAULT_SITE_CONFIG = {
  companyName: 'MANS.PET PETTAXI',
  ceoName: '박태웅',
  address: '경기도 고양시 삼송동 50-76 (고양 삼송 본부)',
  businessNumber: '347-49-00344',
  mailOrderNumber: '2026-고양삼송-0811호',
  animalLicenseNumber: '제 3910000-014-0002 호',
  phone: '010-7644-0799',
  privacyOfficer: '박태웅',
  naverBlogUrl: 'https://blog.naver.com/speed011384',
  naverTalktalkUrl: 'https://talk.naver.com/',
  instagramUrl: 'https://www.instagram.com/menzpet_taxi/',
  naverTvUrl: 'https://tv.naver.com/',
  kakaoChannelUrl: 'https://pf.kakao.com/_xgpxkxbG',
  fareTableImageUrl: ''
};

export const DEFAULT_FARE_CONFIG = {
  baseFare: 8000,
  perKmFare: 1000,
  minFare: 15000,
  minFareDistanceLimit: 7,
  petCareSurcharge: 5000,
  viaSurcharge: 5000,
  nightSurcharge: 5000,
  outOfSeoulSurcharge: 5000,
  waitingFarePer10Min: 1000
};
