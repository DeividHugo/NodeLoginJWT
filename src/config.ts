import dotenv from 'dotenv';

dotenv.config();

export default {
    port: Number(process.env.PORT) || 8000,
    redis: {
        url: process.env.REDIS_URL,
    },
    auth: {
        secret: process.env.AUTH_SECRET || 'secret',
        expiresIn: process.env.AUTH_EXPIRES_IN || '7d',
    }
}; 