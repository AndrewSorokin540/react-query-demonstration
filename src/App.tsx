import { Grid, Paper } from "@mui/material";

import { PostsList } from "components/PostsList";
import { Post } from "components/Post";

import { SelectedPostContextProvider } from "context/selectedPostCotext";

function App() {
  return (
    <SelectedPostContextProvider>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Paper sx={{ padding: 1 }}>
            <PostsList />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Post />
        </Grid>
      </Grid>
    </SelectedPostContextProvider>
  );
}

export default App;
