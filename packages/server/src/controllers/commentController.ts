// commentController.ts
import { Request, Response } from 'express';
import { CommentModel } from '../models/commentModel';
import { UserModel } from '../models/userModel';

const commentModel = new CommentModel();
const userModel = new UserModel();

export const createComment = (req: Request, res: Response) => {
    const { postId, content } = req.body;
    try {
        const user = userModel.getAuthenticatedUserInfo();
        const newComment = commentModel.addComment(postId, user.id, content);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateComment = (req: Request, res: Response) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = commentModel.updateComment(Number(postId), Number(commentId), content);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const removeComment = (req: Request, res: Response) => {
    const { postId, commentId } = req.params;
    try {
        commentModel.removeComment(Number(postId), Number(commentId));
        res.status(200).json({ message: 'Comentário removido com sucesso' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getCommentsByPost = (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
        const comments = commentModel.getCommentsByPost(Number(postId));
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ error: (error as Error).message });
    }
};
