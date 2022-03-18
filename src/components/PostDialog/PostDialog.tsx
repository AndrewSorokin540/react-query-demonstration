import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { nanoid } from "nanoid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LinearProgress } from "@mui/material";

import api from "api";
import { CreatePostT, UpdatePostT, PostT } from "types";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultValues?: PostT;
};

export const PostDialog: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  defaultValues,
}) => {
  const queryClient = useQueryClient();
  const [postBody, setPostBody] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");

  const handleClose = () => {
    setIsOpen(false);
    setPostBody("");
    setPostTitle("");
  };

  const { mutateAsync: createPost, isLoading: createLoading } = useMutation(
    (post: CreatePostT) => api.postsService.createPost(post),
    {
      onSuccess: () => queryClient.invalidateQueries("posts"),
      onSettled: handleClose,
    }
  );

  const { mutateAsync: updatePost, isLoading: updateLoading } = useMutation(
    ({ id, body }: { id: string; body: UpdatePostT }) =>
      api.postsService.updatePost(id, body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", defaultValues?.id]);
        queryClient.invalidateQueries("posts");
      },
      onSettled: handleClose,
    }
  );

  const handleSubmit = () => {
    if (defaultValues) {
      updatePost({
        id: defaultValues.id,
        body: { body: postBody, title: postTitle },
      });
    } else {
      createPost({ id: nanoid(), body: postBody, title: postTitle });
    }
  };

  useEffect(() => {
    if (!defaultValues) return;
    setPostBody(defaultValues?.body);
    setPostTitle(defaultValues?.title || "");
  }, [defaultValues]);

  const isLoading = createLoading || updateLoading;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {defaultValues ? "Изменение поста" : "Добавление поста"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Заголовок поста"
          fullWidth
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <TextField
          multiline
          margin="normal"
          label="Текст поста"
          fullWidth
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
      </DialogContent>
      <LinearProgress sx={{ visibility: isLoading ? "visible" : "hidden" }} />
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit}>
          {defaultValues ? "Сохранить" : "Добавить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
