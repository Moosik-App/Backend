import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { Tokens } from 'src/types';
import { signUpDto } from './dto/signUp.dto';
import dbClass from 'src/utils/db';
import { users } from 'src/utils/schema';

@Injectable()
export class AuthService {
    async signUp(r: signUpDto): Promise<Tokens> {
        const hashedPass = await hash(r.password);
        const uuid = crypto.randomUUID();

        dbClass.db.insert(users).values({
            uuid: uuid,
            username: r.username,
            password: hashedPass,
        })

        return 
    }
}
