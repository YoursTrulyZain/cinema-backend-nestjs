export class AuthResponseDto {
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}