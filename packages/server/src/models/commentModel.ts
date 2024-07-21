// commentModel.ts
import * as fs from 'fs';
import * as path from 'path';

interface Comment {
    id: number;
    user_id: number;
    content: string;
}

interface Post {
    id: number;
    user_id: number;
    title: string;
    content: string;
    comments: Comment[];
}

interface PostCollection {
    posts: Post[];
}

export class CommentModel {
    private postsFilePath = path.join(__dirname, '../data', 'posts.json');
    private posts: PostCollection = { posts: [] };
    private nextCommentId: number = 1;

    constructor() {
        this.loadPosts();
    }

    private savePosts() {
        fs.writeFileSync(this.postsFilePath, JSON.stringify(this.posts));
    }

    private loadPosts() {
        if (fs.existsSync(this.postsFilePath)) {
            const postsData = fs.readFileSync(this.postsFilePath, 'utf8');
            this.posts = postsData ? JSON.parse(postsData) : { posts: [] };
            // Atualize nextCommentId
            const commentIds = this.posts.posts.flatMap(post => post.comments.map(comment => comment.id));
            this.nextCommentId = Math.max(...commentIds, 0) + 1;
        }
    }

    addComment(postId: number, userId: number, content: string) {
        const post = this.posts.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        const newComment: Comment = {
            id: this.nextCommentId++,
            user_id: userId,
            content
        };
        post.comments.push(newComment);
        this.savePosts();
        return newComment;
    }

    updateComment(postId: number, commentId: number, content: string) {
        const post = this.posts.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        const comment = post.comments.find(comment => comment.id === commentId);
        if (!comment) {
            throw new Error('Comentário não encontrado');
        }
        comment.content = content;
        this.savePosts();
        return comment;
    }

    removeComment(postId: number, commentId: number) {
        const post = this.posts.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        post.comments = post.comments.filter(comment => comment.id !== commentId);
        this.savePosts();
    }

    getCommentsByPost(postId: number) {
        const post = this.posts.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        return post.comments;
    }
}
