export const requireLoginMsg = '로그인이 필요한 기능입니다.';
export const showErrorMsgTime = 1500;
const RouteListArray = [
  '/',
  '/login',
  '/cart',
  '/order',
  '/mypage',
  '/end-order',
  '/signupMethod',
  '/goods',
  '/detail',
  '/signup',
  '/callback',
  '/mypage/review',
  '/mypage/like',
  '/mypage/order',
  '/mypage/QnA',
];

export const RouteList = new Set(RouteListArray);

export const testCategories = [
  { name: '문구', level: 1, id: 2, parent_id: null },
  { name: '의류', level: 1, id: 3, parent_id: null },
  { name: '책', level: 1, id: 1, parent_id: null },
  { name: '에디션', level: 1, id: 5, parent_id: null },
  { name: '세트', level: 1, id: 4, parent_id: null },
];

export const testSubCategories = [
  { name: '필기', level: 2, parent_id: 2, id: 6 },
  { name: '노트', level: 2, parent_id: 2, id: 8 },
  { name: '기타', level: 2, parent_id: 2, id: 9 },
  { name: '소설', level: 2, parent_id: 1, id: 7 },
  { name: '수필', level: 2, parent_id: 1, id: 10 },
  { name: '시', level: 2, parent_id: 1, id: 23 },
  { name: '에세이', level: 2, parent_id: 1, id: 12 },
  { name: '잡지', level: 2, parent_id: 1, id: 22 },
  { name: '양말', level: 2, parent_id: 3, id: 11 },
  { name: '신발', level: 2, parent_id: 3, id: 13 },
  { name: '속옷', level: 2, parent_id: 3, id: 15 },
  { name: 'ㅋㅋ에디션', level: 2, parent_id: 5, id: 14 },
  { name: '을지로에디션', level: 2, parent_id: 5, id: 16 },
  { name: '배달이친구들', level: 2, parent_id: 5, id: 17 },
  { name: '콜라보레이션', level: 2, parent_id: 5, id: 18 },
  { name: '선물세트', level: 2, parent_id: 4, id: 19 },
  { name: '혼밥세트', level: 2, parent_id: 4, id: 20 },
  { name: '커플세트', level: 2, parent_id: 4, id: 21 },
];
