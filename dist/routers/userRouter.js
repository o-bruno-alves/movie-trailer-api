import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { check } from 'express-validator';
import { checkRole } from '../middlewares/authMiddleware.js';
const router = Router();
router.get('/users', checkRole(['ADMIN']), UserController.getAll);
router.get('/users/:id', checkRole(['ADMIN']), UserController.getOne);
router.post('/register', [
    check('name').notEmpty().withMessage('User name is required.'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isStrongPassword(),
    check('role').isIn(['USER', 'ADMIN', 'GUEST']).withMessage('Invalid role'),
    check('avatarFile').custom((value, { req }) => {
        if (!req.files || !req.files.avatarFile) {
            throw new Error('You must supply an avatar file.');
        }
        const avatar = req.file.avatarFile;
        const allowedMimes = ['image/jpeg', 'image/png'];
        if (!allowedMimes.includes(avatar.mimetype)) {
            throw new Error('Invalid image format. Only JPEG or PNG are allowed');
        }
        if (avatar.size > 5 * 1024 * 1024) {
            throw new Error('Avatar must be less than 5MB in size');
        }
        return true;
    }),
], UserController.register);
router.post('/login', [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password is required'),
], UserController.login);
router.put('/users/:id', checkRole(['ADMIN']), UserController.update);
router.delete('/users/:id', checkRole(['ADMIN']), UserController.delete);
export default router;
