import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';
import { AuthenticateService } from '../authenticate.service';
import { InvalidCredentialsError } from '../error/invalidCredentialsError';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe('Authenticante Use Case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateService(inMemoryUsersRepository);
    });

    it('Should be able to authenticate', async () => {
        await inMemoryUsersRepository.create({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password_hash: await hash('12345678910', 6)
        });

        const { user } = await sut.execute({
            email: 'henriqueTeste@gmail.com',
            password: '12345678910'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('Should not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email: 'henriqueTeste@gmail.com',
            password: '12345678910'
        })).rejects.toBeInstanceOf(InvalidCredentialsError);

    });

    it('Should not be able to authenticate with wrong password', async () => {
        await inMemoryUsersRepository.create({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password_hash: await hash('12345678910', 6)
        });

        await expect(() => sut.execute({
            email: 'henriqueTeste@gmail.com',
            password: '12345678'
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
