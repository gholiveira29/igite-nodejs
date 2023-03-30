import { ResourceNotFoundError } from '../error/resourceNotFoundError';
import { GetUserProfileService } from '../getUserProfile.service';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemoryUsersRepository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe('Get user profile user case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileService(inMemoryUsersRepository);
    });

    it('Should be able to get user profile', async () => {
        const createdUser = await inMemoryUsersRepository.create({
            name: 'Henrique',
            email: 'henriqueTeste@gmail.com',
            password_hash: await hash('12345678910', 6)
        });

        const { user } = await sut.execute({
            userId: createdUser.id
        });

        expect(user.name).toEqual('Henrique');
    });

    it('Should not be able to get user profile with wrong id', async () => {
        await expect(() => sut.execute({
            userId: 'non-existing-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError);

    });

});
