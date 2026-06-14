import { motion } from 'motion/react';
import { 
  CalendarCheck2, ShieldAlert, Sparkles, AlertCircle, 
  Car, HeartHandshake, Smile, UserCheck, HelpCircle 
} from 'lucide-react';
import { useState } from 'react';

export default function Guide() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '01. 간편 예약 상담 접수',
      sub: '일정 및 탑승 정보 전송',
      icon: <CalendarCheck2 className="w-6 h-6" />,
      desc: '웹 간편 양식, 대표 번호 유선 통화, 혹은 카카오톡 채팅을 통해 탑승 일시, 승차/하차 주소, 동반 보호자 동승 여부 및 반려동물의 품종과 몸무게를 공유해 주시면 즉각 실시간 요금 확인이 진행됩니다.',
      tips: [
        '최우선 안심 배차 매칭을 위해 출발 최소 3시간 전 예약을 추천합니다.',
        '예민한 아이를 위한 특별 커스텀 요청사항(아로마 디퓨저 차단 등)이 있으면 전수 기록됩니다.'
      ],
      preps: '반려동물 몸무게, 품종, 이동 켄넬 수량 파악'
    },
    {
      title: '02. 매칭 확정 및 사전 연락',
      sub: '담당 크루 기사 사전 유선 연락',
      icon: <UserCheck className="w-6 h-6" />,
      desc: '배차가 완료되면 고객님께 배정된 담당 안심 기사의 프로필 카드와 차량 번호가 발송됩니다. 출발 전 유선 전화나 문자로 승차 위치를 재확인하고, 당일 안전 이동에 대한 사전 인사를 정중하게 나눕니다.',
      tips: [
        '당일 반려동물의 컨디션 상태를 기사님께 가볍게 사전 전송해 주세요.',
        '승차가 편하도록 복잡하지 않은 구역의 미팅 포인트를 약속합니다.'
      ],
      preps: '기본 하네스 장착 및 필수 약제 지참'
    },
    {
      title: '03. 탑승 및 실시간 관행 케어',
      sub: '안전벨트와 최적 소독 힐링 주행',
      icon: <Car className="w-6 h-6" />,
      desc: '기사님이 현장에 대기하며 강아지/고양이를 친절히 맞이합니다. 차내 전용 카시트 장착 후 편안히 시팅을 완료하며 보호자 비동승 시 이동 중 30분 단위 표정 인증 샷과 운행 동선을 실시간 공유합니다.',
      tips: [
        '멀미 예방을 위해 출발 최소 1~2시간 전 가벼운 식사 제어가 권장됩니다.',
        '체구가 큰 대형견의 경우 하네스 고정 어댑터 안전벨트를 적극 활용합니다.'
      ],
      preps: '매너 벨트(기저귀) 착용 권장, 평소 좋아하는 애착 담요 준비'
    },
    {
      title: '04. 도착 및 안전 안심 하차',
      sub: '보호자 확인 및 이동 완료',
      icon: <HeartHandshake className="w-6 h-6" />,
      desc: '목적지 동물병원이나 미용실, 신규 임동처에 도달 시 안전 하우징 리드선 연결 상태를 엄격 체크하고 인수자에게 정식 인도합니다. 완료 소식을 즉시 보호자 스마트폰으로 정성스럽게 피드백합니다.',
      tips: [
        '현장에서 카드 결제 및 계좌이체 등 투명하고 합리적인 간편 결제가 진행됩니다.',
        '다음 예약 시 활용 가능한 정기 구독 가입 혜택을 여쭤 보실 수 있습니다.'
      ],
      preps: '도착 알림톡 수신 확인 및 만족도 피드백'
    }
  ];

  const faqs = [
    {
      q: '보호자가 차량에 직접 함께 동승해서 타고 가도 되나요?',
      a: '네, 물론입니다! manspet taxi는 보호자님 동승 승차가 무료(무제한 추가요금 없음)이며, 동생 반려 보조인이나 보호자님 한두 분까지 넉넉히 수용 가능한 넓은 적재 공간을 제공하오니 편안하게 승차하여 아이의 곁을 안심하고 지키실 수 있습니다.'
    },
    {
      q: '고양이나 토끼, 앵무새 같은 특수동물도 예약할 수 있나요?',
      a: '그럼요! 강아지 뿐만 아니라 예민한 고양이, 기니피그, 햄스터, 애완 토끼, 파충류형 도마뱀 등 전용 이동장/케이스가 완비되어 있으시다면 흔들림 없는 숙련 서행 기술로 전국 안전 수송이 가능합니다.'
    },
    {
      q: '당일 긴급하게 바로 출발해야 햘 때는 어떻게 하나요?',
      a: '당일 1~2시간 이내의 급박한 이동이 필요하신 경우, 게시판 접수보다 대표 번호인 010-7644-0799 로 안심 긴급 전화를 주시면 인근에 공차 대기 중인 manspet taxi 소속 베테랑 구급 기사를 최우선으로 수배하여 긴박한 통원을 정성껏 도울 것입니다.'
    },
    {
      q: '차 안에서 실례(소변, 배변, 구토 등)를 하면 벌금이 있나요?',
      a: '걱정하지 않으셔도 되십니다! 이동 중 극심한 긴장감으로 예외적인 소변이나 대변 마킹, 침 흘림, 구토 등에 직면하실 수 있습니다. 별도의 페널티 벌금은 청구하지 않으며 일체의 청소 장비가 완비되어 상시 셀프 피톤치드 세척이 진행되니 아이를 보듬는 것에만 집중해 주세요.'
    },
    {
      q: '예약 취소 시 환불 규정은 어떻게 되나요?',
      a: 'manspet taxi는 정찰제 안심 매칭 신뢰를 기반으로 투명무결한 규정을 전개하고 있습니다.\n\n- 예약 확정 후 2일 전 취소 시: 전액(100%) 환불\n- 운행 하루 전 취소 시: 운행료의 50% 환불\n- 운행 당일 취소 시: 운행료 전액 환불 불가\n\n※ 단, 7월·8월·9월 여름 성수기 하계 시즌에는 귀여운 아이들의 소중한 통원 및 이동 예약 집중으로 인해 "예약하신 날(접수 완료 시점)"부터 취소 시 환불이 일률 불가하오니 이 점만 정성껏 너르고 유념 가득 차게 양해해 주시길 부탁드립니다. 💚'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="guide-view">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs bg-brand-green-light text-brand-green font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          Process Guide
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          이용 신청부터 도착 목적지 인계까지
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          첫 이용이라도 어려움 없도록 맑고 투명한 4단계 흐름을 알려 드립니다.
        </p>
      </div>

      {/* Stepper Timeline Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="guide-stepper">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeStep === idx
                ? 'bg-brand-green-light border-brand-green/40 shadow-sm'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-extrabold text-sm ${
                activeStep === idx ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {idx + 1}
              </span>
              <span className={`text-[11px] font-bold ${activeStep === idx ? 'text-brand-green' : 'text-gray-400'}`}>
                {activeStep === idx ? '확인 중' : '클릭'}
              </span>
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              {step.title.split('. ')[1]}
            </h4>
            <p className="text-[11px] text-gray-400 font-medium mt-1 leading-none">
              {step.sub}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 md:p-10" id="step-detail-panel">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Detailed text */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-green text-white rounded-2xl shadow-md">
                {steps[activeStep].icon}
              </div>
              <div>
                <span className="text-[10px] text-brand-green font-extrabold uppercase bg-brand-green-light px-2.5 py-1 rounded">
                  Step 0{activeStep + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
                  {steps[activeStep].title.split('. ')[1]}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal pt-2">
              {steps[activeStep].desc}
            </p>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h5 className="font-extrabold text-xs text-gray-950 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-brand-yellow fill-brand-yellow/20" />
                보호자 안심 꿀팁 & 주의 사항
              </h5>
              <div className="space-y-2">
                {steps[activeStep].tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-brand-green font-bold shrink-0 mt-0.5">✔</span>
                    <span className="leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Golden preparation checklist */}
          <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-gray-100 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-brand-green">
                <Sparkles className="w-5 h-5 fill-brand-green-light" />
                <h4 className="font-extrabold text-sm text-gray-900">당일 필수 안심 체킹 가방</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                원활한 픽업 전개를 위해 아래 준비사항을 확인해 주세요.
              </p>
              
              <div className="bg-white border border-gray-100 rounded-xl p-4 text-xs font-bold text-gray-700 flex items-center justify-between shadow-xs">
                <span>사전 권장 점검:</span>
                <span className="text-brand-green font-extrabold">{steps[activeStep].preps}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex items-start gap-2.5 text-[11px] text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                급격하게 흥분하는 대형견은 예약 접수 대행 기사와 입마개 착용 상담이 사전 전개될 수 있습니다.
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Beautiful accordion FAQ */}
      <section className="space-y-6" id="faq-accordions">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <HelpCircle className="w-7 h-7 text-brand-green mx-auto mb-1.5" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">자주 묻는 핵심 질문 (FAQ)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2 shadow-xs">
              <h5 className="font-extrabold text-sm text-gray-900 flex items-start gap-2">
                <span className="font-display font-black text-brand-green">Q.</span>
                <span>{faq.q}</span>
              </h5>
              <p className="text-xs text-gray-500 leading-relaxed pl-5 font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
