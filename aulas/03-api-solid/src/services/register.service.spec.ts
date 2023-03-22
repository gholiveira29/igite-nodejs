import { expect, describe, it } from 'vitest';
import { compare } from 'bcryptjs';

import { UserAlreadyExistsError } from './error/user-already-exists-error';
import { RegisterService } from './register.service';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';

describe('Register Use Case', () => {
    it('Should hash user password upon registration', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(inMemoryUsersRepository);

        const { user } = await registerService.execute({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password: '12345678910'
        });

        const isPasswordCorrectlyHash = await compare('12345678910', user.password_hash);
        expect(isPasswordCorrectlyHash).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(inMemoryUsersRepository);

        const email = 'henriqueTeste@gmail.com';

        await registerService.execute({
            name: 'Henrique',
            email,
            password: '12345678910'
        });

        await expect(() =>
            registerService.execute({
                name: 'Henrique',
                email,
                password: '12345678910'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });

    it('Should be able to register', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(inMemoryUsersRepository);

        const { user } = await registerService.execute({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password: '12345678910'
        });

        expect(user.id).toEqual(expect.any(String));
    });
});
