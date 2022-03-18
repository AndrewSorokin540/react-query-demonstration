import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  List,
  ListItemButton,
  Alert,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";

import api from "api";
import { useGetPosts } from "react-query-hooks/Posts";
import { QueryKey } from "react-query-hooks/QueryKey";
import { PostDialog } from "components/PostDialog";
import { useSelectedPostContext } from "context/selectedPostCotext";

import { PostPreviewT } from "types";

export const PostsList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: posts, isError, isLoading } = useGetPosts();

  const { selectedPost, setSelectedPost } = useSelectedPostContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPostClick = (post: PostPreviewT) => () => {
    setSelectedPost?.(post);
  };

  const prefetchPost = (postId: string) => () => {
    queryClient.prefetchQuery([QueryKey.Post, postId], () =>
      api.postsService.getPostById(postId)
    );
  };

  if (isError) return <Alert severity="error">Error!</Alert>;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <List>
        {posts?.map((post) => (
          <ListItemButton
            onMouseEnter={prefetchPost(post.id)}
            key={post.id}
            onClick={onPostClick(post)}
            selected={post.id === selectedPost?.id}
          >
            <Typography>{post.title}</Typography>
          </ListItemButton>
        ))}
      </List>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      >
        Добавить пост
      </Button>
      <PostDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};
