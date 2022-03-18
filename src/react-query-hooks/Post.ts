import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "api";
import { queryClient } from "./queryClient";
import { QueryKey } from "./QueryKey";

import type { CreatePostT, PostT, UpdatePostT } from "types";

export const useGetPost = (postId?: string) => {
  const queryClient = useQueryClient();
  return useQuery(
    [QueryKey.Post, postId],
    () => api.postsService.getPostById(postId!),
    {
      enabled: Boolean(postId),
      placeholderData() {
        const cachedPosts = queryClient.getQueryData(QueryKey.Posts) as PostT[];
        const cachedPost = cachedPosts?.find((post) => post.id === postId);

        return {
          id: "",
          title: cachedPost?.title || "",
          body: cachedPost?.body || "",
        };
      },
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
