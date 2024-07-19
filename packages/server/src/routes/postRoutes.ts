import { Router } from 'express';
import { createPost, updatePost, removePost, getPost, getUserPosts } from '../controllers/postController';

const router = Router();

router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.delete('/remove/:id', removePost);
router.get('/:id', getPost);
router.get('/user/posts', getUserPosts);

router.use((req, res) => {
    res.status(404).json({ error: 'Rota não existe' });
});

export default router;
