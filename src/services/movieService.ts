/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IMovie } from '../models/movieModel.js';
import MovieModel from '../models/movieModel.js';
import fileService from '../utils/fileService.js';

class MovieService {
  getAll = async () => {
    try {
      const movies = await MovieModel.find();
      return movies;
    } catch (error) {
      throw new Error('Failed to get all movies');
    }
  };

  getMovieById = async (movieId: string) => {
    try {
      const foundMovie: IMovie | null = await MovieModel.findById(movieId);
      return foundMovie;
    } catch (error) {
      throw new Error('Failed to get movie by id');
    }
  };

  create = async (newMovie: IMovie, poster: any) => {
    try {
      if (poster) {
        const posterUrl = fileService.save(poster);
        newMovie.posterUrl = posterUrl;
      }
      const createdMovie = await MovieModel.create(newMovie);
      return createdMovie;
    } catch (error) {
      throw new Error('Failed to create movie');
    }
  };

  update = async (movieId: string, movie: IMovie) => {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, movie, { new: true });
      return updatedMovie;
    } catch (error) {
      throw new Error('Failed to update movie');
    }
  };

  delete = async (movieId: string) => {
    try {
      const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
      return deletedMovie;
    } catch (error) {
      throw new Error('Failed to delete movie');
    }
  };
}

export default new MovieService();
