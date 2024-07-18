import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getMovies, getMovieDetails } from "./movieService";

const mock = new MockAdapter(axios);

describe("movieService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("getMovies", () => {
    it("should fetch popular movies when no query is provided", async () => {
      const page = 1;
      const responseData = { results: [{ id: 1, title: "Movie 1" }] };

      mock
        .onGet("https://api.themoviedb.org/3/movie/popular")
        .reply(200, responseData);

      const result = await getMovies(page);

      expect(result).toEqual(responseData);
      expect(mock.history.get[0].params).toEqual({
        api_key: "8b496706b8901d1260b07a80852b20c3",
        page,
      });
    });

    it("should fetch searched movies when a query is provided", async () => {
      const page = 1;
      const query = "test";
      const responseData = { results: [{ id: 1, title: "Test Movie" }] };

      mock
        .onGet("https://api.themoviedb.org/3/search/movie")
        .reply(200, responseData);

      const result = await getMovies(page, query);

      expect(result).toEqual(responseData);
      expect(mock.history.get[0].params).toEqual({
        api_key: "8b496706b8901d1260b07a80852b20c3",
        query,
        page,
      });
    });
  });

  describe("getMovieDetails", () => {
    it("should fetch movie details", async () => {
      const id = 1;
      const responseData = { id: 1, title: "Movie 1" };

      mock
        .onGet(`https://api.themoviedb.org/3/movie/${id}`)
        .reply(200, responseData);

      const result = await getMovieDetails(id);

      expect(result).toEqual(responseData);
      expect(mock.history.get[0].params).toEqual({
        api_key: "8b496706b8901d1260b07a80852b20c3",
      });
    });
  });
});
