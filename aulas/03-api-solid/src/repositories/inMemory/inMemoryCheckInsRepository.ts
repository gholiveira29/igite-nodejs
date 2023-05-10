import { randomUUID } from 'node:crypto';
import { CheckInRepository } from '@/repositories/ckeck-ins-repository';
import { CheckIn, Prisma } from '@prisma/client';

export class InMemoryCheckInsRepository implements CheckInRepository {
    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInOnSomeDate = this.items.find((checkIn) => checkIn.user_id === userId);

        if (!checkInOnSomeDate)
            return null;

        return checkInOnSomeDate;

    }

    public items: CheckIn[] = [];
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        };
        this.items.push(checkIn);
        return checkIn;
    }

}