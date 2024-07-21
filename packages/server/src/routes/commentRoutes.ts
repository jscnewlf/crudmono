import express from 'express';
import cookieParser from 'cookie-parser';
import { createComment, updateComment, removeComment, getCommentsByPost } from '../controllers/commentController';

const router = express.Router();

router.use(cookieParser());

router.post('/create', createComment);
router.put('/update/:postId/:commentId', updateComment); 
router.delete('/remove/:postId/:commentId', removeComment);
router.get('/:postId', getCommentsByPost);

router.use((req, res) => {
    res.status(404).json({ error: 'Rota não existe' });
});

export default router;
