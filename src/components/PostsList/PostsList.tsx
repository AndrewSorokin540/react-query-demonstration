import { useState } from "react";
import {
  List,
  ListItemButton,
  Alert,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";

import { useGetPosts } from "react-query-hooks/Posts";
import { PostDialog } from "components/PostDialog";
import { useSelectedPostContext } from "context/selectedPostCotext";

import { PostT } from "types";

export const PostsList: React.FC = () => {
  const { data: posts, isError, isLoading } = useGetPosts();

  const { selectedPost, setSelectedPost } = useSelectedPostContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPostClick = (post: PostT) => () => {
    setSelectedPost?.(post);
  };

  if (isError) return <Alert severity="error">Error!</Alert>;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <List>
        {posts?.map((post) => (
          <ListItemButton
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
