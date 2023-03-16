import { UserAlreadyExistsError } from './error/user-already-exists-error';
import { UsersRepository } from './../repositories/users-repository';
import { hash } from "bcryptjs";
import { User } from '@prisma/client';

interface RegisterServiceRequest {
    password: string;
    email: string;
    name: string;
}

interface RegisterServiceResponse {
    user: User;
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) {

    }
    async execute({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const password_hash = await hash(password, 6);
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        });

        return { user };
    }
}

