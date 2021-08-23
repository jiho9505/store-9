interface ProductSeed {
  name: string;
  price: number;
  content?: string;
  category_id: number;
  thumbnail: string;
  stock: number;
}

const productSeed: ProductSeed[] = [
  {
    name: '유해물질이 나오지 않는 지우개',
    stock: 1,
    price: 10000,
    content: '지우개랍니다.',
    category_id: 7,
    thumbnail: '/',
  },
  {
    name: '유해물질이 나오지 않는 연필',
    stock: 1,
    price: 30000,
    content: '연필입니다.',
    category_id: 7,
    thumbnail: '/',
  },
  {
    name: 'ㅋㅋ연필',
    stock: 1,
    price: 9000,
    content: '연필입니다..',
    category_id: 7,

    thumbnail: '/',
  },
  {
    name: '난쟁이가 쏘아올린 작은 공',
    stock: 1,
    price: 15000,
    content: '철거민들 힘내요!',
    category_id: 6,
    thumbnail: '/',
  },
  {
    name: '국화꽃 필 무렵',
    stock: 1,
    price: 20000,
    content: '이건 영화가 지려...',
    category_id: 6,
    thumbnail: '/',
  },
  {
    name: 'ㅋㅋ양말',
    stock: 1,
    price: 36000,
    content: 'ㅋㅋㅋㅋ.',
    category_id: 12,
    thumbnail: '/',
  },
];

export default productSeed;
