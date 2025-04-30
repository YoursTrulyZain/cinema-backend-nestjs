export interface IAuthRepository {
    validateUser(email: string, password: string);
}