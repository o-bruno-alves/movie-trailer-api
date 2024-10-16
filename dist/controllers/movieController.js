import MovieService from '../services/movieService.js';
class MovieController {
    async getAll(req, res, next) {
        try {
            const movies = await MovieService.getAll();
            res.json(movies);
        }
        catch (_a) {
            res.status(500).json({ error: 'Failed to get movies' });
        }
    }
    async getOne(req, res, next) {
        try {
            const movieId = req.params.id;
            const movie = await MovieService.getMovieById(movieId);
            res.json(movie);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get movie' });
        }
    }
    async create(req, res, next) {
        var _a;
        try {
            const movieToCreate = req.body;
            const poster = (_a = req.files) === null || _a === void 0 ? void 0 : _a.poster;
            const createdMovie = await MovieService.create(movieToCreate, poster);
            res.status(201).json(createdMovie);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create movie' });
        }
    }
    async update(req, res, next) {
        try {
            const movieId = req.params.id;
            const movieToUpdate = req.body;
            const updatedMovie = await MovieService.update(movieId, movieToUpdate);
            res.json(updatedMovie);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update movie' });
        }
    }
    async delete(req, res, next) {
        try {
            const movieId = req.params.id;
            await MovieService.delete(movieId);
            res.status(204).json({ message: 'Movie deleted' });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete movie' });
        }
    }
}
export default new MovieController();
