import { Injectable } from '@nestjs/common';

@Injectable()
export class CallbackService {
    saveSpotifyKeys(rt) {
        console.log(rt)
    }
}
