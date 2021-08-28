interface History {
  push(path: string): void;
}

type Info = {
  discountRate?: number;
  name?: string;
  price?: number;
  thumbnail?: string;
  content_urls?: Array<string>;
  isGreen?: boolean;
  category_id?: string;
  badges?: Array<string>;
  stock?: number;
  reviewAverageRate?: number;
  reviewCount?: number;
  likeCount?: number;
};

type MessageModeType = 'success' | 'fail' | 'caution';

type Message = {
  showMessage: boolean;
  messageContent?: string;
  messageMode?: MessageModeType;
};
