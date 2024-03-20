import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from 'src/utils/schema';
import { UserReturn } from 'src/types';
import dbClass from 'src/utils/db';

@Injectable()
export class UsersService {

    async getCurrentUser(uuid: string): Promise<UserReturn> {
        const user = await dbClass.db.query.users.findFirst({
            where: eq(users.uuid, uuid),
            columns: {
                username: true,
                banner_url: true,
                totalScrobbles: true,
                avatar_url: true,
                perms: true,
            }
        });

        return user;
    }

    async getUser(username: string): Promise<UserReturn> {
        const user = await dbClass.db.query.users.findFirst({
            where: eq(users.username, username),
            columns: {
                username: true,
                banner_url: true,
                totalScrobbles: true,
                avatar_url: true,
                perms: true,
            }
        });

        return user;
    }

}
