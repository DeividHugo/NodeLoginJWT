import jwt from 'jsonwebtoken';
import AuthError from '@app/Auth/exceptions/AuthError' ;
import config  from '@/config';
import { getValue, setValue } from '@/lib/redis';

export default class AuthService {
    async singIn(email: string, password: string): Promise<{ user: object, token: string}> {
        const user = {
            id: 1,
            email: 'deividhugoof@gmail.com',
            password: 'secret',
            fullName: 'Admin'
        }

        if (email !== user.email || password !== user.password) {
            throw new AuthError('Invalid credentials')
        }

        const { id, fullName } = user;

        const token = jwt.sign({ id }, config.auth.secret, {
            expiresIn: config.auth.expiresIn,
        })

        return {
            user: {
                id,
                fullName,
                email,
            },
            token,
        }
    };

    async singOut(token: string): Promise<void> {
        await this.blacklistToken(token);
    }

    async validateToken(token: string): Promise<string> {
        try {
            
            if (await this.isTokenBlacklisted(token)) {
                throw new AuthError('Token was blacklisted')
            }

            const decoded = jwt.verify(token, config.auth.secret) as {
                id: string
            };
            
            return decoded.id;

        } catch (error) {
            throw new AuthError('Invalid token');
        }
    };

    private async isTokenBlacklisted(token: string): Promise<boolean> {
        const blacklistedToken = await getValue(`tokens:invalidated:${token}`);

        return !!blacklistedToken
    };

    private async blacklistToken(token: string): Promise<void> {
        await setValue(`tokens:invalidated:${token}`, true);
    }
};