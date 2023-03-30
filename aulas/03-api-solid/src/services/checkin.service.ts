import { CheckInRepository } from '@/repositories/ckeck-ins-repository';
import { CheckIn, User } from '@prisma/client';

interface CheckInServiceRequest {
    userId: string;
    gymId: string;
}

interface CheckInServiceResponse {
    checkIn: CheckIn;
};

export class CheckInService {
    constructor(private checkInsRepository: CheckInRepository) { }
    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        });

        return {
            checkIn
        };
    }
}