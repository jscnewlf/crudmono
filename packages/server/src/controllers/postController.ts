import { Request, Response } from 'express';
import { PostModel } from '../models/postModel';
import { UserModel } from '../models/userModel';

const postModel = new PostModel();
const userModel = new UserModel();

export const createPost = (req: Request, res: Response) => {
    const { title, content } = req.body;
    try {
        const user = userModel.getAuthenticatedUserInfo();
        const newPost = postModel.createPost(user.id, title, content);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = postModel.updatePost(Number(id), title, content);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const removePost = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        postModel.removePost(Number(id));
        res.status(200).json({ message: 'Post removido com sucesso' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getPost = (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const post = postModel.getPost(Number(id));
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: (error as Error).message });
    }
};

export const getUserPosts = (req: Request, res: Response) => {
    try {
        const user = userModel.getAuthenticatedUserInfo();
        const posts = postModel.getUserPosts(user.id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};
