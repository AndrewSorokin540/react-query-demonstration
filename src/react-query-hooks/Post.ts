import { useQuery, useMutation } from "react-query";
import api from "api";
import { queryClient } from "./queryClient";
import { QueryKey } from "./QueryKey";

import type { CreatePostT, UpdatePostT } from "types";

export const useGetPost = (postId?: string) => {
  return useQuery(
    [QueryKey.Post, postId],
    () => api.postsService.getPostById(postId!),
    {
      enabled: Boolean(postId),
    }
  );
};

export const useCreatePost = () => {
  return useMutation((post: CreatePostT) => api.postsService.createPost(post), {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.Posts),
  });
};

export const useUpdatePost = (postId?: string) => {
  return useMutation(
    (body: UpdatePostT) => api.postsService.updatePost(postId || "", body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.Post, postId]);
        queryClient.invalidateQueries(QueryKey.Posts);
      },
    }
  );
};

export const useDeletePost = (postId: string) => {
  return useMutation(() => api.postsService.deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Posts);
    },
  });
};
