import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { useMutation, useQueryClient } from "react-query";

import api from "api";

import { useSelectedPostContext } from "context/selectedPostCotext";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  postId: string;
};

export const DeletePostDialog: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  postId,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const { setSelectedPost } = useSelectedPostContext();

  const queryClient = useQueryClient();

  const { mutateAsync: deletePost, isLoading } = useMutation(
    () => api.postsService.deletePost(postId),
    {
      onSuccess: () => {
        setSelectedPost?.(undefined);
        queryClient.invalidateQueries("posts");
      },
      onSettled: handleClose,
    }
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Удалить?</DialogTitle>
      <LinearProgress sx={{ visibility: isLoading ? "visible" : "hidden" }} />
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={() => deletePost()} autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
