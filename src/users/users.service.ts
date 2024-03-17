import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import dbClass from 'src/utils/db';
import { users } from 'src/utils/schema';

@Injectable()
export class UsersService {

    async getCurrentUser(uuid: string) {
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

}
