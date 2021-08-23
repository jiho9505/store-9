export interface CategorySchema {
  id: number;
  name: string;
  linkedName?: string;
  level: number;
  parentId: number;
}
