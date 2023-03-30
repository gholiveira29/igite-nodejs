import { CheckInService } from './../checkin.service';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { expect, describe, it, beforeEach } from 'vitest';

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('Check-In use case', () => {
    beforeEach(() => {
        inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInService(inMemoryCheckInsRepository);
    });

    it('Should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

});
