interface History {
  push(path: string): void;
}

type Info = {
  discount_rate?: string;
  title?: string;
  price?: string;
  image?: string;
  content_urls?: Array<string>;
  is_green?: boolean;
  category_id?: string;
  badge?: Array<string>;
  quantity?: number;
};
