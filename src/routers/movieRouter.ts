import { Router } from 'express';
import movieController from '../controllers/movieController.js';
import { checkRole } from '../middlewares/authMiddleware.js';

const router: Router = Router();

router.get('/movies', checkRole(['ADMIN','USER']), movieController.getAll);
router.get('/movies/:id',checkRole(['ADMIN','USER']), movieController.getOne);
router.post('/movies', checkRole(['ADMIN']), movieController.create);
router.put('/movies/:id', checkRole(['ADMIN']), movieController.update);
router.delete('/movies/:id', checkRole(['ADMIN']), movieController.delete);

export default router;
