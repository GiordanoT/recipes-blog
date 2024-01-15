import crypto from 'crypto';
import {Request} from 'express';

class U {
    static random(): string {
        return crypto.randomBytes(128).toString('base64');
    }
    static encrypt(password: string): string {
        return crypto.createHmac('sha256', password).update('SECRET_KEY').digest('hex');
    }
    static getToken(req: Request): string {
        return req.cookies['AUTH-TOKEN'] || '';
    }
    static isId(id: string): boolean {
        return !!(id.match(/^[0-9a-fA-F]{24}$/));
    }
    static sleep(s: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, s * 1000));
    }
}

export default U;
