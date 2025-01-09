export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
};

export type PostAuthor = {
  id: number;
  profileImage: string | null;
  username: string;
};
