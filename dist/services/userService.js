import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fileService from '../utils/fileService.js';
dotenv.config();
class UserService {
    constructor() {
        this.getAll = async () => {
            try {
                return await userModel.find();
            }
            catch (error) {
                throw new Error('Failed to get all users');
            }
        };
        this.getUserById = async (userId) => {
            try {
                const foundUser = await userModel.findById(userId);
                return foundUser;
            }
            catch (error) {
                throw new Error('Failed to get user by ID');
            }
        };
        this.register = async (newUser, avatar) => {
            try {
                const foundUser = await userModel.findOne({ email: newUser.email });
                if (foundUser) {
                    throw new Error('User already exists');
                }
                const avatarFile = 'avatar-default.jpg';
                if (avatar) {
                    avatar = fileService.save(avatar);
                }
                newUser.avatar = avatarFile;
                const hashedPass = await bcrypt.hash(newUser.password, 10);
                newUser.password = hashedPass;
                const createdUser = await userModel.create(newUser);
                return createdUser;
            }
            catch (error) {
                throw new Error('Failed to create user');
            }
        };
        this.login = async (email, password) => {
            try {
                const foundUser = await userModel.findOne({ email: email });
                if (!foundUser) {
                    return null;
                }
                if (!(await bcrypt.compare(password, foundUser.password))) {
                    return null;
                }
                let token = '';
                if (process.env.SECRET_KEY) {
                    token = jwt.sign({
                        id: foundUser._id,
                        email: foundUser.email,
                        role: foundUser.role,
                    }, process.env.SECRET_KEY);
                }
                else {
                    throw new Error('SECRET_KEY is not set');
                }
                return { user: foundUser, accessToken: token };
            }
            catch (error) {
                throw new Error('Failed to login');
            }
        };
        this.update = (userId, user) => {
            try {
                const updatedUser = userModel.findByIdAndUpdate(userId, user, { new: true });
                return updatedUser;
            }
            catch (error) {
                throw new Error('Failed to update user');
            }
        };
        this.delete = async (userId) => {
            try {
                const deletedUser = await userModel.findByIdAndDelete(userId);
                return deletedUser;
            }
            catch (error) {
                throw new Error('Failed to delete user');
            }
        };
    }
}
export default new UserService();
