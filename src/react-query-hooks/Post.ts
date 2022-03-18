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
    onMutate: async (newPost) => {
      // На всякий случай отменяем фетчи, чтобы они не затерли наш оптимистик апдейт
      await queryClient.cancelQueries(QueryKey.Posts);

      // Сохраняем предыдущие данные
      const previousPosts = queryClient.getQueryData(QueryKey.Posts);

      // Оптимистично добавляем новый пост в кеш постов
      queryClient.setQueryData(QueryKey.Posts, (old) => [
        ...(old as PostT[]),
        newPost,
      ]);

      // Возвращаем предыдущее значение
      return previousPosts;
    },
    // При ошибке ставим старые данные
    onError: (err, newTodo, previousPosts) => {
      queryClient.setQueryData(QueryKey.Posts, previousPosts as PostT[]);
    },
    // Ошибка или нет - рефетчим
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey.Posts);
    },
  });
};

export const useUpdatePost = (postId?: string) => {
  return useMutation(
    (body: UpdatePostT) => api.postsService.updatePost(postId || "", body),
    {
      onMutate: async (newPost) => {
        // На всякий случай отменяем фетчи, чтобы они не затерли наш оптимистик апдейт
        await queryClient.cancelQueries(QueryKey.Posts);

        // Сохраняем предыдущие данные
        const previousPosts = queryClient.getQueryData(QueryKey.Posts);

        // Оптимистично подставляем измененный пост в кеш постов
        queryClient.setQueryData(QueryKey.Posts, (old) => [
          ...(old as PostT[]).map((post) => {
            if (post.id === postId) {
              return { ...post, ...newPost };
            } else {
              return post;
            }
          }),
        ]);
        queryClient.setQueryData([QueryKey.Post, postId], (old) => ({
          ...(old as PostT),
          ...newPost,
        }));
        // Возвращаем предыдущее значение
        return previousPosts;
      },
      // При ошибке ставим старые данные
      onError: (err, newTodo, previousPosts) => {
        queryClient.setQueryData(QueryKey.Posts, previousPosts as PostT[]);
      },
      // Ошибка или нет - рефетчим
      onSettled: () => {
        queryClient.invalidateQueries([QueryKey.Post, postId]);
        queryClient.invalidateQueries(QueryKey.Posts);
      },
    }
  );
};

export const useDeletePost = (postId: string) => {
  return useMutation(() => api.postsService.deletePost(postId), {
    onMutate: async () => {
      await queryClient.cancelQueries(QueryKey.Posts);

      const previousPosts = queryClient.getQueryData(QueryKey.Posts);

      queryClient.setQueryData(QueryKey.Posts, (old) =>
        (old as PostT[]).filter((post) => post.id !== postId)
      );
      queryClient.setQueryData([QueryKey.Post, postId], () => null);
      return previousPosts;
    },
    onError: (err, newTodo, previousPosts) => {
      queryClient.setQueryData(QueryKey.Posts, previousPosts as PostT[]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey.Posts);
    },
  });
};
