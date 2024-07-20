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

export class PostModel {
    private postsFilePath = path.join(__dirname, '../data', 'posts.json');
    private posts: PostCollection = { posts: [] };
    private nextId: number = 1;
    private nextCommentId: number = 1; // Adiciona o nextCommentId

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
            const ids = this.posts.posts.map(post => post.id);
            this.nextId = Math.max(...ids, 0) + 1;
        }
    }

    createPost(userId: number, title: string, content: string) {
        const newPost: Post = {
            id: this.nextId++,
            user_id: userId,
            title,
            content,
            comments: []
        };
        this.posts.posts.push(newPost);
        this.savePosts();
        return newPost;
    }

    updatePost(id: number, title: string, content: string) {
        const post = this.posts.posts.find(post => post.id === id);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        post.title = title;
        post.content = content;
        this.savePosts();
        return post;
    }

    removePost(id: number) {
        this.posts.posts = this.posts.posts.filter(post => post.id !== id);
        this.savePosts();
    }

    getPost(id: number) {
        const post = this.posts.posts.find(post => post.id === id);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        return post;
    }

    getUserPosts(userId: number) {
        return this.posts.posts.filter(post => post.user_id === userId);
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

    removeComment(postId: number, commentId: number) {
        const post = this.posts.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        post.comments = post.comments.filter(comment => comment.id !== commentId);
        this.savePosts();
    }
}
