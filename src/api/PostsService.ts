import { AxiosRequestConfig } from "axios";

import type { PostT, CreatePostT, UpdatePostT } from "types";

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

  public createPost = async (data: CreatePostT) => {
    return this.server<void>({
      method: "POST",
      url: `/posts`,
      data,
    });
  };

  public updatePost = async (postId: string, data: UpdatePostT) => {
    return this.server<void>({
      method: "PUT",
      url: `/posts/${postId}`,
      data,
    });
  };

  public deletePost = async (postId: string) => {
    return this.server<void>({
      method: "DELETE",
      url: `/posts/${postId}`,
    });
  };
}
