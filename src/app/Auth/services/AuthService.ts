import jwt from 'jsonwebtoken';
import AuthError from '@app/Auth/exceptions/AuthError' ;
import config  from '@/config'

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
    }
};