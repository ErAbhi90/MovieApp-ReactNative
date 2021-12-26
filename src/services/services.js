import axios from 'axios';
import {BASE_URL, API_KEY} from '@env';

// Get Popular Movies from TMDB API
export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?${API_KEY}`);
  // console.log(JSON.stringify(response.data.results[0],null,2));
  return response.data.results;
};

// Get Popular TV Shows from TMDB API
export const getPopularTvShows = async () => {
  const response = await axios.get(`${BASE_URL}/tv/popular?${API_KEY}`);
  return response.data.results;
};

// Get Upcoming Movies from TMDB API
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming?${API_KEY}`);
  return response.data.results;
};

// Get Family Genre from TMDB API
export const getFamilyGenreMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?${API_KEY}&with_genres=10751`,
  );
  return response.data.results;
};

// Get Documentary Genre from TMDB API
export const getDocumentaries = async () => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?${API_KEY}&with_genres=99`,
  );
  return response.data.results;
};

// Get Movie Details from TMDB API
export const getMoviesById = async id => {
  const response = await axios.get(`${BASE_URL}/movie/${id}?${API_KEY}`);
  return response.data;
};

//Get Movie Video Data from TMDB API
export const getMovieVideo = async id => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos?${API_KEY}`);
  return response.data.results;
};

// Search for Movie or TV using keyword from TMDB API
export const searchMovieOrTvShows = async (query, type) => {
  const response = await axios.get(
    `${BASE_URL}/search/${type}?${API_KEY}&query=${query}`,
  );
  return response.data.results;
};
