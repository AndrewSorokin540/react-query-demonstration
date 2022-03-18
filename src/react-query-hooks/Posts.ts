import { useQuery } from "react-query";
import api from "api";
import { QueryKey } from "./QueryKey";

export const useGetPosts = () => {
  return useQuery(QueryKey.Posts, api.postsService.getPosts);
};
