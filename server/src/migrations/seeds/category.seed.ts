interface CategorySeed {
  name: string;
  level: number;
  parentName?: string;
}

export const level1CategorySeed: CategorySeed[] = [
  { name: '문구', level: 1 },
  { name: '의류', level: 1 },
  { name: '책', level: 1 },
  { name: '에디션', level: 1 },
  { name: '세트', level: 1 },
];

export const level2CategorySeed: CategorySeed[] = [
  { name: '필기', level: 2, parentName: '문구' },
  { name: '노트', level: 2, parentName: '문구' },
  { name: '기타', level: 2, parentName: '문구' },
  { name: '소설', level: 2, parentName: '책' },
  { name: '수필', level: 2, parentName: '책' },
  { name: '시', level: 2, parentName: '책' },
  { name: '에세이', level: 2, parentName: '책' },
  { name: '잡지', level: 2, parentName: '책' },
  { name: '양말', level: 2, parentName: '의류' },
  { name: '신발', level: 2, parentName: '의류' },
  { name: '속옷', level: 2, parentName: '의류' },
  { name: 'ㅋㅋ에디션', level: 2, parentName: '에디션' },
  { name: '을지로에디션', level: 2, parentName: '에디션' },
  { name: '배달이친구들', level: 2, parentName: '에디션' },
  { name: '콜라보레이션', level: 2, parentName: '에디션' },
  { name: '선물세트', level: 2, parentName: '세트' },
  { name: '혼밥세트', level: 2, parentName: '세트' },
  { name: '커플세트', level: 2, parentName: '세트' },
];
