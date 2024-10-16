import userService from '../services/userService.js';
import { validationResult } from 'express-validator';
class UserController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                const users = await userService.getAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Error to get users' });
            }
        };
        this.getOne = async (req, res) => {
            try {
                const userId = req.params.id;
                const user = await userService.getUserById(userId);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            }
            catch (error) { }
        };
        this.register = async (req, res) => {
            var _a;
            try {
                const errors = validationResult(req);
                const avatar = (_a = req.files) === null || _a === void 0 ? void 0 : _a.avatarFile;
                if (!errors.isEmpty) {
                    return res.status(422).json({ errors: errors.array() });
                }
                const userToCreate = req.body;
                const userCreated = await userService.register(userToCreate, avatar);
                res.status(201).json(userCreated);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to create user' });
            }
        };
        this.login = async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
                const { email, password } = req.body;
                const foundUserWithToken = await userService.login(email, password);
                if (foundUserWithToken === null) {
                    res.status(404).json({ error: 'Invalid email or password' });
                }
                res.json(foundUserWithToken);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to login' });
            }
        };
        this.update = async (req, res) => {
            try {
                const userId = req.params.id;
                const userToUpdate = req.body;
                const updatedUser = await userService.update(userId, userToUpdate);
                if (!updatedUser) {
                    res.status(404).json({ error: "User not found" });
                }
                res.json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update user" });
            }
        };
        this.delete = async (req, res) => {
            try {
                const userId = req.params.id;
                const deletedUser = await userService.delete(userId);
                if (!deletedUser) {
                    res.status(404).json({ error: "User not found" });
                }
                res.json(deletedUser);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete user" });
            }
        };
    }
}
export default new UserController();
