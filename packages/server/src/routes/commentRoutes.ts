import { Router } from 'express';
import {
    createComment,
    updateComment,
    removeComment,
    getCommentsByPost
} from '../controllers/commentController';

const router = Router();

router.post('/comments/create', createComment);
router.put('/comments/update/:id', updateComment);
router.delete('/comments/remove/:id', removeComment);
router.get('/comments/:postId', getCommentsByPost);

export default router;
