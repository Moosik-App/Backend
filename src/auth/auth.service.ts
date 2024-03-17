import * as argon2 from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Tokens } from 'src/types';
import { users } from 'src/utils/schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import signUpDto from './dto/signUp.dto';
import signInDto from './dto/signIn.dto';
import dbClass from 'src/utils/db';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        ) {}

    async signIn(r: signInDto): Promise<Tokens> {
        const user = await dbClass.db.query.users.findFirst({
            where: eq(users.username, r.username)
        });

        if(!user) throw new ForbiddenException('Wrong Credentials.');
        const pwMatch = await argon2.verify(user.password, r.password);
        if(!pwMatch) throw new ForbiddenException('Wrong Credentials.');

        const tokens = this.getTokens(user.uuid, user.perms);
        await this.updateRtHash(user.uuid, (await tokens).refresh_token);

        return tokens;
    }

    async signUp(r: signUpDto): Promise<Tokens> {
        const hashedPass = await argon2.hash(r.password);
        const uuid = randomUUID();

        await dbClass.db.insert(users).values({
            uuid: uuid,
            username: r.username,
            password: hashedPass,
        });

        
        const tokens = await this.getTokens(uuid, 0);
        await this.updateRtHash(uuid, tokens.refresh_token);

        return tokens;
    };

    async getTokens(uuid: string, perms: number): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: uuid,
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
    };

    async logout(uuid: string): Promise<boolean> {
        await dbClass.db.update(users).set({hashedRt: null}).where(eq(users.uuid, uuid));

        return true;
    };

    async updateRtHash(uuid: string, rt: string): Promise<void> {
        const hash = await argon2.hash(rt);
        await dbClass.db.update(users).set({hashedRt: hash}).where(eq(users.uuid, uuid));
    };

    async refreshTokens(uuid: string, rt: string): Promise<Tokens> {
        const user = await dbClass.db.query.users.findFirst({
            where: eq(users.uuid, uuid)
        });
        if (!user || !user.hashedRt ) throw new ForbiddenException('Access Denied');

        const rtMatch = await argon2.verify(user.hashedRt, rt);
        if (!rtMatch) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(uuid, user.perms);
        await this.updateRtHash(uuid, tokens.refresh_token);

        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        }
    };
};
