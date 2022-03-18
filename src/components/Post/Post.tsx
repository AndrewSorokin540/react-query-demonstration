import api from "api";
import { useQuery } from "react-query";
import { Alert, CircularProgress, Typography } from "@mui/material";

type Props = {
  postId?: string;
};

export const Post: React.FC<Props> = ({ postId }) => {
  const {
    data: post,
    isError,
    isLoading,
  } = useQuery(["post", postId], () => api.postsService.getPostById(postId!), {
    enabled: Boolean(postId),
  });

  if (isError) return <Alert severity="error">Error!</Alert>;

  if (isLoading) return <CircularProgress />;

  return <Typography>{post?.body}</Typography>;
};
