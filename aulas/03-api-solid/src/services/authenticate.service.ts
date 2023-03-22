import { UsersRepository } from '@/repositories/users-repository';

interface AuthenticateSeriveRequest {
    email: string;
    password: string;
}

interface AuthenticateServiceResponse {
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepository) { }
    async execute({ email, password }: AuthenticateSeriveRequest) { }
}