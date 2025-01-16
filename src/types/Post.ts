export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
  comments: PostComment[];
  _count: {
    comments: number;
  };
  hasMoreComments: boolean;
};

export type PostAuthor = {
  id: number;
  profileImage: string | null;
  username: string;
};

export type PostComment = {
  id: number;
  authorId: number;
  parentId: number | null;
  postId: number;
  content: string;
  createdAt: string;
  author: PostAuthor;
  replies: PostComment[];
};
