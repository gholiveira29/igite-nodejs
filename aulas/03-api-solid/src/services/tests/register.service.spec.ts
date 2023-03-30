import { expect, describe, it, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from '../error/user-already-exists-error';
import { RegisterService } from '../register.service';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe('Register Use Case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        sut = new RegisterService(inMemoryUsersRepository);
    });
    it('Should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password: '12345678910'
        });

        const isPasswordCorrectlyHash = await compare('12345678910', user.password_hash);
        expect(isPasswordCorrectlyHash).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const email = 'henriqueTeste@gmail.com';

        await sut.execute({
            name: 'Henrique',
            email,
            password: '12345678910'
        });

        await expect(() =>
            sut.execute({
                name: 'Henrique',
                email,
                password: '12345678910'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });

    it('Should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password: '12345678910'
        });

        expect(user.id).toEqual(expect.any(String));
    });
});
