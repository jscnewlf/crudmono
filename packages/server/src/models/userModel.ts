import * as fs from 'fs';
import * as path from 'path';

interface User {
    id: number;
    name?: string;
    username: string;
    password: string;
}

export class UserModel {
    private static AUTH_KEY = 'authenticatedUser';
    private usersFilePath = path.join(__dirname, 'users.json');
    private users: { [username: string]: User } = {};
    private nextId: number = 1;

    constructor() {
        this.loadUsers();
    }

    private saveUsers() {
        fs.writeFileSync(this.usersFilePath, JSON.stringify(this.users));
    }

    private loadUsers() {
        if (fs.existsSync(this.usersFilePath)) {
            const users = fs.readFileSync(this.usersFilePath, 'utf8');
            this.users = JSON.parse(users);
            const ids = Object.values(this.users).map(user => user.id);
            this.nextId = Math.max(...ids, 0) + 1;
        }
    }

    private saveAuthenticatedUser(username: string) {
        fs.writeFileSync(UserModel.AUTH_KEY, username);
    }

    private removeAuthenticatedUser() {
        if (fs.existsSync(UserModel.AUTH_KEY)) {
            fs.unlinkSync(UserModel.AUTH_KEY);
        }
    }

    private getAuthenticatedUser() {
        if (fs.existsSync(UserModel.AUTH_KEY)) {
            const username = fs.readFileSync(UserModel.AUTH_KEY, 'utf8');
            return this.users[username] || null;
        }
        return null;
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
