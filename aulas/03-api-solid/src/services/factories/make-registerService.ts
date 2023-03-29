import { RegisterService } from '@/services/register.service';
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function MakeRegisterService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    return registerService;
}