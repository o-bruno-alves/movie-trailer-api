/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { IMovie } from '../models/movieModel.js';
import MovieService from '../services/movieService.js';

class MovieController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const movies: IMovie[] = await MovieService.getAll();

      res.json(movies);
    } catch {
      res.status(500).json({ error: 'Failed to get movies' });
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId: string = req.params.id;
      const movie = await MovieService.getMovieById(movieId);
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get movie' });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const movieToCreate: IMovie = req.body;
      const poster = req.files?.poster;

      const createdMovie = await MovieService.create(movieToCreate, poster);

      res.status(201).json(createdMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create movie' });
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId: string = req.params.id;
      const movieToUpdate: IMovie = req.body;
      const updatedMovie = await MovieService.update(movieId, movieToUpdate);
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update movie' });
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId: string = req.params.id;
      await MovieService.delete(movieId);
      res.status(204).json({ message: 'Movie deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete movie' });
    }
  }
}

export default new MovieController();
