export type PostMetadata = {
  title: string;
  excerpt?: string;
  thumnail?: string;
  categories?: string[];
  tags?: string[];
  date?: string;
  last_modified_at?: string;
  content:string;
  draft?:boolean
};

export type PostDetailType = {
  slugs: string[] | string;
  metadata: PostMetadata;
};

