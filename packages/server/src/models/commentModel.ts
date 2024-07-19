interface Comment {
    id: number;
    postId: number;
    userId: number;
    content: string;
}

export class CommentModel {
    private static COMMENTS_KEY = 'comments';
    private comments: Comment[] = [];
    private nextId: number = 1;

    constructor() {
        this.loadComments();
    }

    private saveComments() {
        localStorage.setItem(CommentModel.COMMENTS_KEY, JSON.stringify(this.comments));
    }

    private loadComments() {
        const comments = localStorage.getItem(CommentModel.COMMENTS_KEY);
        if (comments) {
            this.comments = JSON.parse(comments);
            const ids = this.comments.map(comment => comment.id);
            this.nextId = Math.max(...ids, 0) + 1;
        }
    }

    createComment(postId: number, content: string, userId: number) {
        if (!postId || !content || !userId) {
            throw new Error('Dados invalidos');
        }

        const newComment: Comment = {
            id: this.nextId++,
            postId,
            userId,
            content
        };
        this.comments.push(newComment);
        this.saveComments();
        return { message: 'Comentario adicionado', comment: newComment };
    }

    updateComment(id: number, content: string, userId: number) {
        const comment = this.comments.find(c => c.id === id && c.userId === userId);
        if (!comment) {
            throw new Error('Comentario não encontrado ou não autorizado');
        }

        comment.content = content;
        this.saveComments();
        return { message: 'Comentario atualizado', comment };
    }

    removeComment(id: number, userId: number) {
        const index = this.comments.findIndex(c => c.id === id && c.userId === userId);
        if (index === -1) {
            throw new Error('Comentario não encontrado ou não autorizado');
        }

        const [removedComment] = this.comments.splice(index, 1);
        this.saveComments();
        return { message: 'Comentario removido', comment: removedComment };
    }

    getCommentsByPost(postId: number, userId: number) {
        return this.comments.filter(c => c.postId === postId && c.userId === userId);
    }
}