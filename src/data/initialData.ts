import { PortfolioItem, PartnerClient, InquiryItem } from '../types/portfolio';

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. 패키지 디자인
  {
    id: 'pkg-01',
    title: '보태니컬 하베스트 프리미엄 티 & 지기구조 패키지',
    subtitle: '친환경 FSC 인증 용지와 특수 슬리브 지기구조로 완성한 프리미엄 차 패키징',
    category: 'package',
    categoryLabel: '패키지 디자인',
    client: '티테라퓨틱스 (Tea Therapeutics Korea)',
    period: '2024.03 - 2024.05 (8주)',
    contribution: '기획 100% · 지기구조 개발 100% · 그래픽 디자인 100% · 인쇄 감리 100%',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Cinema 4D', 'CAD 지기설계'],
    background: '기존 시중 차 제품들의 단조로운 사각 틴케이스를 탈피하여, 선물을 열어보는 순간의 감동과 찻잎의 유기농 스토리를 전할 수 있는 입체적 개봉 경험을 설계했습니다. 100% 재활용 가능한 사탕수수 비목재지와 무용제 콩기름 잉크를 적용하고, 잎차의 형태를 형상화한 섬세한 형압과 앤틱 은박으로 품격을 극대화했습니다.',
    keyResults: [
      '국내 주요 백화점 및 편집숍 프리미엄 라인 단독 입점',
      '와디즈 크라우드펀딩 목표 대비 1,480% 초과 달성',
      '접착제를 사용하지 않는 원터치 조립 지기구조 특허 출원 지원'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '15년 경력의 베테랑답게 단순 디자인을 넘어 인쇄소 현장 감리까지 책임져주셔서 색상 오차 없이 원하는 고급스러운 톤앤매너가 완벽히 구현되었습니다. 입점 바이어들의 반응이 폭발적이었습니다.',
      author: '김서연 대표',
      role: '티테라퓨틱스 브랜드 디렉터'
    },
    isFeatured: true,
    order: 1,
    createdAt: '2024-05-15'
  },
  {
    id: 'pkg-02',
    title: '퓨어 더마 코스메틱 앰플 & 바이알 라인 패키징',
    subtitle: '병원 피부과 전용 코스메슈티컬의 신뢰감을 현대적인 미니멀리즘으로 재해석',
    category: 'package',
    categoryLabel: '패키지 디자인',
    client: '에이치앤바이오 랩 (H&Bio Lab)',
    period: '2024.01 - 2024.03 (6주)',
    contribution: '브랜드 패키지 가이드 100% · 용기 라벨 100% · 단상자 디자인 100%',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'KeyShot 3D'],
    background: '의학적 신뢰와 피부 본연의 휴식을 시각화하기 위해 불필요한 장식을 배제하고, 정갈한 타이포그래피 그리드 시스템과 앰버 글래스 용기 매칭을 제안했습니다. UV 실크스크린 인쇄와 매트 에칭 코팅을 적용하여 손에 쥐었을 때 전해지는 촉각적 고급스러움을 완성했습니다.',
    keyResults: [
      '전국 120여 개 피부과 클리닉 공식 채택',
      '글로벌 뷰티 어워드 패키지 디자인 부문 파이널리스트 선정',
      '원가 15% 절감형 통합 단상자 지기구조 규격화'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1608248597359-0097c5e2ecf2?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1608248597359-0097c5e2ecf2?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1556228722-d0b57116cb79?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '의학 전문용어와 효능 성분이 많아 정보 구조화가 난해했는데, 직관적이면서도 하이엔드 병원 브랜드에 걸맞은 패키지로 변신시켜 주셨습니다.',
      author: '박진우 연구소장',
      role: '에이치앤바이오 개발총괄'
    },
    isFeatured: true,
    order: 2,
    createdAt: '2024-03-20'
  },
  {
    id: 'pkg-03',
    title: '제주 자연농원 프리미엄 야생화 꿀 기프트 세트',
    subtitle: '천연 벌집의 육각형 모티브와 제주 돌담의 질감을 결합한 시그니처 지함 패키지',
    category: 'package',
    categoryLabel: '패키지 디자인',
    client: '제주자연농원 영농조합',
    period: '2023.09 - 2023.11 (7주)',
    contribution: '기획 100% · 지함 구조설계 100% · 라벨 & 띠지 100% · 인쇄 감리 100%',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'ArtiosCAD'],
    background: '명절 선물 시즌 고가 선물세트 시장에서 플라스틱 포장재 대신 고급 싸바리 지함과 면끈 손잡이를 일체형으로 설계하여 테이프나 별도 쇼핑백 없이 바로 전달할 수 있는 친환경 럭셔리 패키지를 구현했습니다.',
    keyResults: [
      '추석 명절 선물세트 출시 2주 만에 초도 물량 5,000세트 완판',
      '한국농수산식품유통공사(aT) 우수 농식품 패키징 선정'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '농가 브랜드의 투박한 이미지를 완전히 벗겨내고 하이엔드 백화점 전용 상품으로 격상시켜 주셨습니다. 꼼꼼한 인쇄 감리 덕분에 색감도 너무 고급스럽습니다.',
      author: '고명식 대표',
      role: '제주자연농원 대표'
    },
    isFeatured: false,
    order: 3,
    createdAt: '2023-11-28'
  },

  // 2. 홍보인쇄물 디자인
  {
    id: 'print-01',
    title: '서울 아키텍처 포럼 연례 리포트 & 전시 카탈로그',
    subtitle: '건축적 공간감과 그리드 타이포그래피를 결합한 사철 누드 양장 브로슈어',
    category: 'print',
    categoryLabel: '홍보인쇄물',
    client: '서울문화재단 & 건축문화진흥원',
    period: '2024.02 - 2024.04 (7주)',
    contribution: '편집 기획 100% · 레이아웃 디자인 100% · 제본/종이 컨설팅 100% · 인쇄 감리 100%',
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'Adobe Photoshop'],
    background: '서울의 근현대 건축 아카이브를 전달하는 책자인 만큼, 종이의 물성과 여백의 미학을 극대화했습니다. 180도 완전 펼침이 가능한 특수 사철 누드제본과 에어블루 표지 박가공을 적용하여 소장 가치가 높은 프리미엄 아트북 형태로 제작되었습니다.',
    keyResults: [
      '국공립 도서관 및 건축협회 영구 아카이브 소장 도서 등록',
      '전시 오프닝 당일 1,200부 전량 배포 완료',
      '우수 공공간행물 디자인 표창 수상'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '단순한 정보 전달 책자를 넘어 건축물의 질감을 그대로 만질 수 있는 예술품을 만들어주셨습니다. 도록 수령자들의 칭찬이 자자했습니다.',
      author: '윤도현 책임큐레이터',
      role: '서울문화재단 전시팀'
    },
    isFeatured: true,
    order: 4,
    createdAt: '2024-04-10'
  },
  {
    id: 'print-02',
    title: '글로벌 모빌리티 솔루션 기업 IR 브로슈어 & 브랜드북',
    subtitle: '복잡한 미래 자율주행 기술 데이터를 한눈에 전달하는 직관적 인포그래픽 디자인',
    category: 'print',
    categoryLabel: '홍보인쇄물',
    client: '모빌테크놀로지 (Mobil Technology)',
    period: '2023.10 - 2023.12 (8주)',
    contribution: '콘텐츠 구조화 100% · 인포그래픽 디자인 100% · 영문/국문 에디토리얼 100%',
    tools: ['Adobe InDesign', 'Adobe Illustrator'],
    background: '국내외 기관 투자자 대상 IR 행사에서 전문성과 혁신성을 각인시킬 수 있도록, 기술 사양표와 재무 데이터를 모던한 인포그래픽과 브랜드 컬러(#7db701 연계 테크 그린) 시스템으로 재구성했습니다. 별색 5도 인쇄와 하드커버 양장 표지로 무게감을 더했습니다.',
    keyResults: [
      '시리즈 B 투자 라운드 180억 성공적 유치 지원',
      'CES 글로벌 전시회 메인 기업 홍보 키트 채택',
      '국문/영문/일문 3개 국어 글로벌 통합 판형 개발'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1507842229451-79b1be886a20?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '기술 용어가 어려워 고민이었는데, 인포그래픽과 타이포그래피로 누구나 쉽게 이해하도록 풀어주셨습니다. 투자 설명회에서 큰 호평을 받았습니다.',
      author: '이승환 상무',
      role: '모빌테크놀로지 전략기획실'
    },
    isFeatured: true,
    order: 5,
    createdAt: '2023-12-15'
  },
  {
    id: 'print-03',
    title: '국립공원 생태보전 캠페인 리플렛 & 종합 안내 포스터',
    subtitle: '시민의 자발적 친환경 실천을 유도하는 3단 6면 접지 리플렛 & 인포그래픽 포스터',
    category: 'print',
    categoryLabel: '홍보인쇄물',
    client: '국립공원공단 보전기획처',
    period: '2023.05 - 2023.07 (6주)',
    contribution: '기획 100% · 일러스트레이션 디렉팅 100% · 편집 디자인 100%',
    tools: ['Adobe InDesign', 'Adobe Illustrator', 'Photoshop'],
    background: '기존의 딱딱한 관공서 규제 안내문 대신, 야생동물 서식지와 숲길 걷기 수칙을 따뜻한 손그림 감성의 일러스트 맵과 접지 리플렛 형태로 풀어내어 탐방객 누구나 주머니에 쏙 넣고 탐방할 수 있도록 설계했습니다.',
    keyResults: [
      '전국 22개 국립공원 탐방지원센터 10만 부 배포',
      'QR코드 기반 생태탐방 모바일 웹 유입률 380% 증가'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '공공기관 특유의 경직된 문화를 깨고 친근하면서도 완성도 높은 결과물을 만들어 주셨습니다. 후속 캠페인도 전적으로 맡길 예정입니다.',
      author: '정원택 팀장',
      role: '국립공원공단 홍보협력실'
    },
    isFeatured: false,
    order: 6,
    createdAt: '2023-07-22'
  },

  // 3. 웹 디자인
  {
    id: 'web-01',
    title: '스위스 오가닉 스킨케어 브랜드 반응형 글로벌 웹사이트',
    subtitle: '절제된 미니멀리즘과 몰입감 넘치는 인터랙션으로 브랜드 철학을 전달하는 D2C 사이트',
    category: 'web',
    categoryLabel: '웹 디자인',
    client: '알프스 네이처 코리아 (Alps Nature Korea)',
    period: '2024.04 - 2024.06 (9주)',
    contribution: 'UI/UX 기획 100% · 인터랙션 디자인 100% · 반응형 웹 구현 100%',
    tools: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion'],
    background: '모바일 중심의 탐색 환경에서 브랜드의 청정한 자연 원료 스토리와 직관적인 성분 비교 가이드를 심리스하게 연결했습니다. 불필요한 배너를 걷어내고 제품 본연의 텍스처와 비주얼을 전면에 배치하여 전환율 중심의 고급스러운 사용자 여정을 완성했습니다.',
    keyResults: [
      '웹사이트 리뉴얼 후 첫 달 온라인 자사몰 매출 240% 성장',
      '평균 세션 체류 시간 1분 12초 -> 3분 45초로 210% 연장',
      '모바일 장바구니 담기 전환율(CVR) 4.8% 기록'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '단순 웹 에이전시와 달리 그래픽 디자이너의 심미안과 최신 웹 반응형 인터랙션이 결합되어 해외 본사에서도 극찬을 아끼지 않았습니다.',
      author: '마크 뮐러 지사장',
      role: '알프스 네이처 한국 총괄'
    },
    isFeatured: true,
    order: 7,
    createdAt: '2024-06-30'
  },
  {
    id: 'web-02',
    title: '스튜디오 아틀리에 건축 & 공간 디자인 아카이브 웹',
    subtitle: '빛과 여백의 조형미를 웹 인터페이스로 치환한 건축 포트폴리오 쇼케이스',
    category: 'web',
    categoryLabel: '웹 디자인',
    client: '아틀리에 공간건축사사무소',
    period: '2023.11 - 2024.01 (7주)',
    contribution: 'UX 아키텍처 100% · UI 비주얼 시스템 100% · 반응형 웹 100%',
    tools: ['Figma', 'Next.js', 'Tailwind CSS'],
    background: '건축가의 도면과 완공 사진이 가진 깊이를 방해하지 않도록, 극도로 절제된 모노크롬 톤에 미세한 그리드 가이드라인을 접목했습니다. 프로젝트별 스토리와 공간 시공 도면을 부드럽게 넘겨볼 수 있는 직관적인 내비게이션을 설계했습니다.',
    keyResults: [
      '국내외 하이엔드 단독주택 및 상업공간 설계 프로젝트 수주 8건 연계',
      '독일 iF 디자인 어워드 웹 & 디지털 미디어 부문 출품'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '우리 건축 사무소의 철학인 "단순함과 정직함"이 웹 화면에 고스란히 담겼습니다. 클라이언트들과의 미팅 자리에서 언제나 자랑스럽게 화면을 엽니다.',
      author: '성지훈 소장',
      role: '아틀리에 공간 대표건축가'
    },
    isFeatured: false,
    order: 8,
    createdAt: '2024-01-18'
  },

  // 4. 로고 디자인 & 브랜딩
  {
    id: 'logo-01',
    title: '루미에르 스페셜티 커피 로스터리 BI & 브랜드 아이덴티티',
    subtitle: '원두의 빛깔과 물의 파동을 조형화한 모던 심볼 마크와 토탈 브랜딩 가이드라인',
    category: 'logo',
    categoryLabel: '로고 디자인',
    client: '루미에르 로스터스 (Lumière Roasters)',
    period: '2024.03 - 2024.04 (5주)',
    contribution: '네이밍 컨설팅 100% · BI 로고 100% · 서식류 12종 100% · 패키지 어플리케이션 100%',
    tools: ['Adobe Illustrator', 'Photoshop'],
    background: '하이엔드 스페셜티 커피 시장에서 빛(Lumière)의 굴절과 추출되는 에스프레소 크레마의 미학을 미니멀한 기하학 심볼로 완성했습니다. 명함, 컵 슬리브, 원두 봉투, 매장 사인물까지 완벽한 통합 브랜딩 가이드를 구축했습니다.',
    keyResults: [
      '성수동 플래그십 스토어 오픈 3개월 만에 월 매출 1억 2,000만원 달성',
      '원두 패키징 구독자 수 2,500명 돌파',
      '인스타그램 브랜드 해시태그 게시물 15,000건 이상 확산'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '매장을 찾는 손님들마다 컵과 로고 디자인이 너무 예쁘다고 사진을 찍어 올립니다. 브랜드의 정체성을 한눈에 정의해주신 탁월한 작업이었습니다.',
      author: '최현석 바리스타',
      role: '루미에르 로스터스 총괄 디렉터'
    },
    isFeatured: true,
    order: 9,
    createdAt: '2024-04-28'
  },
  {
    id: 'logo-02',
    title: '에코스마트팜 테크놀로지 CI & 코퍼레이트 아이덴티티',
    subtitle: '데이터 기반 미래 농업의 지속가능성을 녹여낸 볼드하고 신뢰감 있는 코퍼레이트 심볼',
    category: 'logo',
    categoryLabel: '로고 디자인',
    client: '(주)에코스마트팜',
    period: '2023.08 - 2023.10 (6주)',
    contribution: 'CI 전략 수립 100% · 심볼/워드마크 100% · 비즈니스 서식류 100%',
    tools: ['Adobe Illustrator', 'Photoshop'],
    background: '농업의 따뜻한 생명력(새싹)과 IT 테크놀로지의 정밀함(디지털 노드)을 결합하여, 글로벌 스마트팜 시장 진출을 목표로 하는 기업의 확고한 비전과 신뢰도를 시각화했습니다.',
    keyResults: [
      '정부 스마트팜 혁신밸리 핵심 참여기업 선정',
      '해외 3개국 수출 박람회 공식 한국관 대표 기업 전시'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=85'
    ],
    review: {
      quote: '15년 업력의 전문성과 산업디자인전문회사 공인 타이틀에 걸맞게 투자자들과 정부 관계자 모두에게 깊은 신뢰를 주는 훌륭한 CI를 만들어 주셨습니다.',
      author: '임동규 대표이사',
      role: '(주)에코스마트팜'
    },
    isFeatured: true,
    order: 10,
    createdAt: '2023-10-12'
  }
];

export const INITIAL_PARTNERS: PartnerClient[] = [
  {
    id: 'p-1',
    name: '한국관광공사',
    category: '공공기관/재단',
    description: '대한민국 구석구석 관광 홍보 브로슈어 및 다국어 리플렛 기획·인쇄 감리',
    highlightWork: '전국 관광 홍보 리플렛 6종 & 캠페인 그래픽'
  },
  {
    id: 'p-2',
    name: '서울문화재단',
    category: '공공기관/재단',
    description: '서울시 예술축제 아이덴티티 및 도록/전시 그래픽 제작',
    highlightWork: '서울 아키텍처 포럼 전시 카탈로그 & 도록'
  },
  {
    id: 'p-3',
    name: '국립공원공단',
    category: '공공기관/재단',
    description: '생태보전 탐방 캠페인 및 전국 22개 국립공원 안내 인포그래픽 리플렛',
    highlightWork: '생태보전 캠페인 인포그래픽 포스터'
  },
  {
    id: 'p-4',
    name: '티테라퓨틱스',
    category: 'F&B/라이프',
    description: '프리미엄 잎차 패키지 3D 지기구조 개발 및 백화점 단독 입점 패키징',
    highlightWork: '보태니컬 하베스트 프리미엄 티 패키지'
  },
  {
    id: 'p-5',
    name: '에이치앤바이오 랩',
    category: '뷰티/코스메틱',
    description: '피부과 전용 고기능성 더마 코스메틱 용기 라벨 및 단상자 패키징',
    highlightWork: '퓨어 더마 코스메틱 앰플 라인'
  },
  {
    id: 'p-6',
    name: '알프스 네이처 코리아',
    category: '뷰티/코스메틱',
    description: '스위스 유기농 스킨케어 브랜드 글로벌 반응형 웹사이트 구축 및 D2C 몰',
    highlightWork: '반응형 인터랙티브 글로벌 웹사이트'
  },
  {
    id: 'p-7',
    name: '루미에르 로스터스',
    category: 'F&B/라이프',
    description: '스페셜티 커피 플래그십 스토어 BI 및 토탈 브랜딩 어플리케이션',
    highlightWork: '루미에르 로스터리 BI & 브랜드 가이드'
  },
  {
    id: 'p-8',
    name: '(주)모빌테크놀로지',
    category: '기업/IT',
    description: '자율주행 모빌리티 솔루션 기업 IR 북 및 글로벌 전시회 기술 브로슈어',
    highlightWork: '글로벌 모빌리티 기업 IR 브로슈어'
  },
  {
    id: 'p-9',
    name: '아틀리에 공간건축',
    category: '기업/IT',
    description: '하이엔드 건축 아카이브 웹사이트 및 공간 포트폴리오 디자인',
    highlightWork: '건축사사무소 반응형 아카이브 웹'
  },
  {
    id: 'p-10',
    name: '제주자연농원 영농조합',
    category: 'F&B/라이프',
    description: '친환경 제주 벌꿀 명절 프리미엄 싸바리 지함 기프트 세트 개발',
    highlightWork: '프리미엄 야생화 꿀 지함 패키지'
  },
  {
    id: 'p-11',
    name: '(주)에코스마트팜',
    category: '기업/IT',
    description: '차세대 스마트농업 솔루션 기업 CI 및 서식류 통합 시스템',
    highlightWork: '에코스마트팜 테크놀로지 CI'
  },
  {
    id: 'p-12',
    name: '한국디자인진흥원 협력사',
    category: '공공기관/재단',
    description: '공인 산업디자인전문회사 공공 디자인 바우처 수행 및 중소기업 디자인 지원',
    highlightWork: '중소기업 디자인 혁신 바우처 수행 40여 건'
  }
];

export const INITIAL_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-sample-1',
    services: ['패키지', '로고디자인'],
    companyName: '오가닉티랩코리아',
    contactName: '이민지 실장',
    phone: '010-3456-7890',
    email: 'minji.lee@organictlab.co.kr',
    budget: '500~1,000만원',
    deadline: '2026-12-15',
    referenceUrl: 'http://www.inmit.co.kr',
    description: '신규 론칭하는 오가닉 허브티 3종의 단상자 패키지와 파우치 디자인, 그리고 심볼 로고 리뉴얼을 의뢰하고자 합니다. 친환경 용지와 인쇄 감리까지 원스톱으로 지원 가능한지 견적 요청드립니다.',
    status: '상담진행',
    adminMemo: '1차 전화 상담 완료 (2026-11-02). 친환경 FSC 지류 샘플북 지참 후 대면 미팅 일정 조율 중.',
    createdAt: '2026-11-02 14:20'
  },
  {
    id: 'inq-sample-2',
    services: ['홍보인쇄물'],
    companyName: '서울청년문화재단',
    contactName: '강태우 팀장',
    phone: '010-8912-3456',
    email: 'tw.kang@seoulculture.org',
    budget: '300~500만원',
    deadline: '2026-11-28',
    referenceUrl: 'http://www.inmit.co.kr',
    description: '청년 예술가 기획전시 브로슈어 64p 사철제본과 리플렛 3단 6면 제작 건입니다. 여성기업 수의계약 또는 산업디자인전문회사 인증서 제출이 필요합니다.',
    status: '신규접수',
    adminMemo: '여성기업 확인서 및 전문회사 등록증 메일 송부 준비.',
    createdAt: '2026-11-02 18:05'
  }
];
