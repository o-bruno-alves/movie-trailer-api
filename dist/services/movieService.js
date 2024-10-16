import MovieModel from '../models/movieModel.js';
import fileService from '../utils/fileService.js';
class MovieService {
    constructor() {
        this.getAll = async () => {
            try {
                const movies = await MovieModel.find();
                return movies;
            }
            catch (error) {
                throw new Error('Failed to get all movies');
            }
        };
        this.getMovieById = async (movieId) => {
            try {
                const foundMovie = await MovieModel.findById(movieId);
                return foundMovie;
            }
            catch (error) {
                throw new Error('Failed to get movie by id');
            }
        };
        this.create = async (newMovie, poster) => {
            try {
                if (poster) {
                    const posterUrl = fileService.save(poster);
                    newMovie.posterUrl = posterUrl;
                }
                const createdMovie = await MovieModel.create(newMovie);
                return createdMovie;
            }
            catch (error) {
                throw new Error('Failed to create movie');
            }
        };
        this.update = async (movieId, movie) => {
            try {
                const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, movie, { new: true });
                return updatedMovie;
            }
            catch (error) {
                throw new Error('Failed to update movie');
            }
        };
        this.delete = async (movieId) => {
            try {
                const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
                return deletedMovie;
            }
            catch (error) {
                throw new Error('Failed to delete movie');
            }
        };
    }
}
export default new MovieService();
