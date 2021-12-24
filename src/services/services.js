import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=d3f582e137f31af7cec428b7f255ac65';

// Get Popular Movies from TMDB API
export const getPopularMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/popular?${apiKey}`);
  // console.log(JSON.stringify(response.data.results[0],null,2));
  return response.data.results;
};

// Get Popular TV Shows from TMDB API
export const getPopularTvShows = async () => {
  const response = await axios.get(`${baseUrl}/tv/popular?${apiKey}`);
  return response.data.results;
};

// Get Upcoming Movies from TMDB API
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/upcoming?${apiKey}`);
  return response.data.results;
};

// Get Family Genre from TMDB API
export const getFamilyGenreMovies = async () => {
  const response = await axios.get(
    `${baseUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};

// Get Documentary Genre from TMDB API
export const getDocumentaries = async () => {
  const response = await axios.get(
    `${baseUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return response.data.results;
};

// Get Movie Details from TMDB API
export const getMoviesById = async id => {
  const response = await axios.get(`${baseUrl}/movie/${id}?${apiKey}`);
  return response.data;
};

//Get Movie Video Data from TMDB API
export const getMovieVideo = async id => {
  const response = await axios.get(`${baseUrl}/movie/${id}/videos?${apiKey}`);
  return response.data.results;
};
