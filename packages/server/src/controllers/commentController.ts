import { Request, Response } from 'express';
import { CommentModel } from '../models/commentModel';
import { getAuthenticatedUser } from '../controllers/authController';

const commentModel = new CommentModel();

export const createComment = (req: Request, res: Response) => {
    const { postId, content } = req.body;
    const user = getAuthenticatedUser();
    if (user) {
        try {
            const result = commentModel.createComment(postId, content, user.id);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const updateComment = (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    const user = getAuthenticatedUser();
    if (user) {
        try {
            const result = commentModel.updateComment(parseInt(id), content, user.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const removeComment = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = getAuthenticatedUser();
    if (user) {
        try {
            const result = commentModel.removeComment(parseInt(id), user.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};

export const getCommentsByPost = (req: Request, res: Response) => {
    const { postId } = req.params;
    const user = getAuthenticatedUser();
    if (user) {
        const comments = commentModel.getCommentsByPost(parseInt(postId), user.id);
        res.status(200).json(comments);
    } else {
        res.status(401).json({ error: 'Necessário autenticação' });
    }
};
