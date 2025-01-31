export type PostDetailType = {
  slugs: string[];
  metadata: {
    title: string;
    excerpt: string;
    categories: string[];
    tags: string[];
    date: string;
    last_modified_at: Date;
  };
};

export type PostMatter = {
  title: string;
  description: string;
  tags: string[];
  draft?: boolean;
  date: string;
};

export type Post = PostMatter & {
  slug: string;
  content: string;
  readingMinutes: number;
  wordCount: number;
  excerpt?: string;
  last_modified_at?: Date;
};
