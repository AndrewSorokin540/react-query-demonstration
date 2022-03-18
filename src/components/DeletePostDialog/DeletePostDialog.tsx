import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";

import { useDeletePost } from "react-query-hooks/Post";

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

  const { mutateAsync: deletePost, isLoading } = useDeletePost(postId);

  const handleDelete = () => {
    deletePost();
    setSelectedPost?.(undefined);
    setIsOpen(false);
  };

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
        <Button onClick={handleDelete} autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
