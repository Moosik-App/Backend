import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Tokens } from 'src/types';
import { signUpDto } from './dto/signUp.dto';
import dbClass from 'src/utils/db';
import { users } from 'src/utils/schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        ) {}
    async signUp(r: signUpDto): Promise<Tokens> {
        const hashedPass = await hash(r.password);
        const uuid = crypto.randomUUID();

        const user = dbClass.db.insert(users).values({
            uuid: uuid,
            username: r.username,
            password: hashedPass,
        })

        return 
    }

    async getTokens(uuid: string, email: string, perms: number): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: uuid,
            email: email,
            perms: perms,
        }

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: 'at-secret',
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: 'rt-secret',
                expiresIn: '7d',
            }),
        ]);

        return {
            refresh_token: rt,
            access_token: at
        }
    }    
}
