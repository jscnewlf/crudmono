import { Request, Response } from 'express';
import { PostModel } from '../models/postModel';
import { getAuthenticatedUser } from '../controllers/authController';

const postModel = new PostModel();

export const createPost = (req: Request, res: Response) => {
    const { title, content } = req.body;
    const user = getAuthenticatedUser();
    if (user) {
        try {
            const result = postModel.createPost(title, content, user.id);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const user = getAuthenticatedUser();
    if (user) {
        try {
            const result = postModel.updatePost(parseInt(id), title, content, user.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const removePost = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = getAuthenticatedUser();
    if (user) {
        try {
            const result = postModel.removePost(parseInt(id), user.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const getPost = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = getAuthenticatedUser();
    if (user) {
        const post = postModel.getPost(parseInt(id), user.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post não encontrado' });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const getUserPosts = (req: Request, res: Response) => {
    const user = getAuthenticatedUser();
    if (user) {
        const posts = postModel.getPostsByUser(user.id);
        res.status(200).json(posts);
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};
