import { AxiosRequestConfig } from "axios";

import type { CommentT } from "types";

export default class CommentsService {
  constructor(private server: <T>(config: AxiosRequestConfig) => Promise<T>) {}

  public getCommentsByPostId = async (postId: string) => {
    return this.server<CommentT[]>({
      method: "GET",
      url: `/comments?postId=${postId}`,
    });
  };
}
