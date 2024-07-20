import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

const userModel = new UserModel();

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const result = userModel.authenticate(username, password);
        res.cookie('auth', username, {
            httpOnly: true,
            maxAge: 3600000, // 1 hora
            secure: process.env.NODE_ENV === 'production' // Utilize cookies seguros em produção
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        userModel.logout();
        res.clearCookie('auth');
        res.status(200).json({ message: 'Deslogado' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const register = (req: Request, res: Response) => {
    const { name, username, password } = req.body;
    try {
        const result = userModel.register(name, username, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getAuthenticatedUser = (req: Request, res: Response) => {
    try {
        const username = req.cookies.auth;
        if (!username) {
            res.status(401).json({ error: 'Necessario autenticação' });
            return;
        }
        const user = userModel.getAuthenticatedUserInfo();
        if (!user) {
            res.status(401).json({ error: 'Usuario não autenticado' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};
