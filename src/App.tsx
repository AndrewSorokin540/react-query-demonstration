import { useState } from "react";
import { Grid, Paper } from "@mui/material";

import { PostsList } from "components/PostsList";
import { Post } from "components/Post";

import { PostT } from "types";

function App() {
  const [selectedPost, setSelectedPost] = useState<PostT | undefined>(
    undefined
  );
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Paper>
          <PostsList
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Post postId={selectedPost?.id} />
      </Grid>
    </Grid>
  );
}

export default App;
