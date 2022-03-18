import axios, { AxiosResponse } from "axios";
import PostsService from "./PostsService";
import CommentsService from "./CommentsService";

const server = axios.create({
  baseURL: `http://localhost:3004`,
});

class API {
  public postsService = new PostsService(server.request);
  public commentsService = new CommentsService(server.request);

  constructor() {
    server.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (error) => {
        console.error(error);

        return Promise.reject(error);
      }
    );
  }
}

export default new API();
