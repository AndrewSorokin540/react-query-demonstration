import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LinearProgress } from "@mui/material";

import { useCreatePost, useUpdatePost } from "react-query-hooks/Post";
import { PostT } from "types";

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
  const [postBody, setPostBody] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");

  const { mutateAsync: createPost, isLoading: createLoading } = useCreatePost();

  const { mutateAsync: updatePost, isLoading: updateLoading } = useUpdatePost(
    defaultValues?.id
  );

  const handleClose = () => {
    setIsOpen(false);
    setPostBody("");
    setPostTitle("");
  };

  const handleSubmit = () => {
    if (defaultValues) {
      updatePost({ body: postBody, title: postTitle });
    } else {
      createPost({ id: nanoid(), body: postBody, title: postTitle });
    }
    handleClose();
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
