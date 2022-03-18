import { List, ListItemButton, Alert, CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

import api from "api";

import { PostT } from "types";

type Props = {
  selectedPost?: PostT;
  setSelectedPost: (post: PostT) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedPost,
  setSelectedPost,
}) => {
  const {
    data: posts,
    isError,
    isLoading,
  } = useQuery("posts", api.postsService.getPosts);

  const onPostClick = (post: PostT) => () => {
    setSelectedPost(post);
  };

  if (isError) return <Alert severity="error">Error!</Alert>;

  if (isLoading) return <CircularProgress />;

  return (
    <List>
      {posts?.map((post) => (
        <ListItemButton
          key={post.id}
          onClick={onPostClick(post)}
          selected={post.id === selectedPost?.id}
        >
          {post.title}
        </ListItemButton>
      ))}
    </List>
  );
};
