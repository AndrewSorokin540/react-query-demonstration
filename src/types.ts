export type PostT = {
  id: string;
  title: string;
  body: string;
};

export type CommentT = {
  id: string;
  body: string;
  postId: string;
};
