import { AxiosRequestConfig } from "axios";

import type { PostT } from "types";

export default class PostsService {
  constructor(private server: <T>(config: AxiosRequestConfig) => Promise<T>) {}

  public getPosts = async () => {
    return this.server<PostT[]>({
      method: "GET",
      url: "/posts",
    });
  };

  public getPostById = async (postId: string) => {
    return this.server<PostT>({
      method: "GET",
      url: `/posts/${postId}`,
    });
  };
}
