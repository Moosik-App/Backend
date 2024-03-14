import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Tokens } from 'src/types';
import signUpDto from './dto/signUp.dto';
import dbClass from 'src/utils/db';
import { users } from 'src/utils/schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        ) {}
    async signUp(r: signUpDto): Promise<Tokens> {
        const hashedPass = await argon2.hash(r.password);
        const uuid = crypto.randomUUID();

        await dbClass.db.insert(users).values({
            uuid: uuid,
            username: r.username,
            password: hashedPass,
        }).returning();

        const tokens = await this.getTokens(uuid, 0)

        return {
            refresh_token: tokens.refresh_token,
            access_token: tokens.access_token
        }
    }

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
    }    

    async updateRtHash(uuid: string, rt: string): Promise<void> {
        const hash = await argon2.hash(rt);
        await dbClass.db.update(users).set({hashedRt: hash}).where(eq(users.uuid, uuid));
    }

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
    }
}
