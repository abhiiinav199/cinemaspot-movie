import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDBmNGI0ZThiMTU4NGQ2NTM0YzVjM2ZiZjMxMmZjZiIsInN1YiI6IjY2MWQ0YzkyY2I2ZGI1MDE4NTBhMTAwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Knmcadxlt97WD_gxyMvuXQAn_LOcGngUWPzJ9DL9ExE",
  },
});

export default instance;
