import { useState } from "react";
import api from "api";
import { useQuery } from "react-query";
import {
  Alert,
  CircularProgress,
  Typography,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";

import { PostDialog } from "components/PostDialog";
import { DeletePostDialog } from "components/DeletePostDialog";

import { useSelectedPostContext } from "context/selectedPostCotext";

export const Post: React.FC = () => {
  const { selectedPost } = useSelectedPostContext();
  const postId = selectedPost?.id;

  const {
    data: post,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["post", postId], () => api.postsService.getPostById(postId!), {
    enabled: Boolean(postId),
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!postId) return null;

  if (isError) return <Alert severity="error">Error!</Alert>;

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ opacity: isFetching ? "0.5" : 1 }}>
        <Typography variant="h4">{post?.title}</Typography>
        <Typography>{post?.body}</Typography>
      </Grid>
      <Grid item>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          disabled={isFetching}
        >
          <Button onClick={() => setIsDialogOpen(true)}>Изменить</Button>
          <Button onClick={() => setIsDeleteDialogOpen(true)}>Удалить</Button>
          <Button onClick={() => refetch()}>Обновить</Button>
        </ButtonGroup>
      </Grid>

      <PostDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        defaultValues={post}
      />
      <DeletePostDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        postId={postId}
      />
    </Grid>
  );
};
