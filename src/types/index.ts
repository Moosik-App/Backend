export type Tokens = {
    refresh_token: string,
    access_token: string
};

export type UserReturn = {
    username: string,
    banner_url: string,
    avatar_url: string,
    totalScrobbles: number,
    perms: number,
};