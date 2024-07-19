interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

export class PostModel {
    private posts: Post[] = [];
    private nextId: number = 1;

    public createPost(title: string, content: string, authorId: number): { success: boolean; message: string } {
        const newPost: Post = { id: this.nextId++, title, content, authorId };
        this.posts.push(newPost);
        return { success: true, message: 'Post adicionado' };
    }

    public updatePost(id: number, title: string, content: string, authorId: number): { success: boolean; message: string } {
        const post = this.posts.find(post => post.id === id && post.authorId === authorId);
        if (post) {
            post.title = title;
            post.content = content;
            return { success: true, message: 'Post atualizado' };
        } else {
            throw new Error('Post não encontrado ou usuário não autorizado');
        }
    }

    public removePost(id: number, authorId: number): { success: boolean; message: string } {
        const index = this.posts.findIndex(post => post.id === id && post.authorId === authorId);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return { success: true, message: 'Post removido' };
        } else {
            throw new Error('Post não encontrado ou usuário não autorizado');
        }
    }

    public getPost(id: number, authorId: number): Post | null {
        return this.posts.find(post => post.id === id && post.authorId === authorId) || null;
    }

    public getPostsByUser(authorId: number): Post[] {
        return this.posts.filter(post => post.authorId === authorId);
    }
}
