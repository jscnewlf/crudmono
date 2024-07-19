interface User {
    id: number;
    name?: string;
    username: string;
    password: string;
}

export class UserModel {
    private static AUTH_KEY = 'authenticatedUser';
    private users: { [username: string]: User } = {};
    private nextId: number = 1;

    constructor() {
        this.loadUsers();
    }

    private saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    private loadUsers() {
        const users = localStorage.getItem('users');
        if (users) {
            this.users = JSON.parse(users);
            const ids = Object.values(this.users).map(user => user.id);
            this.nextId = Math.max(...ids, 0) + 1;
        }
    }

    private saveAuthenticatedUser(username: string) {
        localStorage.setItem(UserModel.AUTH_KEY, username);
    }

    private removeAuthenticatedUser() {
        localStorage.removeItem(UserModel.AUTH_KEY);
    }

    private getAuthenticatedUser() {
        const username = localStorage.getItem(UserModel.AUTH_KEY);
        return username ? this.users[username] : null;
    }

    register(name: string, username: string, password: string) {
        if (!name || !username || !password) {
            throw new Error('Dados invalidos');
        }

        if (this.users[username]) {
            throw new Error('Usuario já cadastrado');
        }

        const newUser: User = {
            id: this.nextId++,
            name,
            username,
            password
        };
        this.users[username] = newUser;
        this.saveUsers();
        return { message: 'Usuario registrado com sucesso' };
    }

    authenticate(username: string, password: string) {
        const user = this.users[username];
        if (!user || user.password !== password) {
            throw new Error('Usuario ou senha divergentes');
        }

        this.saveAuthenticatedUser(username);
        return { message: 'Usuario Logado', user };
    }

    logout() {
        this.removeAuthenticatedUser();
        return { message: 'Deslogado' };
    }

    getAuthenticatedUserInfo() {
        const user = this.getAuthenticatedUser();
        if (!user) {
            throw new Error('Necessario autenticação');
        }
        return user;
    }
}
