export type PostPreviewT = {
  id: string;
  title: string;
  body: string;
};

export type PostT = {
  id: string;
  title: string;
  body: string;
};

export type CreatePostT = PostT;

export type UpdatePostT = Omit<PostT, "id">;

export type CommentT = {
  id: string;
  body: string;
  postId: string;
};
