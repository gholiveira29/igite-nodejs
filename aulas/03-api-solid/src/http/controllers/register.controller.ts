import { UserAlreadyExistsError } from './../../services/error/user-already-exists-error';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { RegisterService } from "@/services/register.service";

export async function registerController(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.execute({
        name,
        email,
        password
    }).then(() => {})
        .catch((err) => {
            if (err instanceof UserAlreadyExistsError) {
                return replay.status(409).send();
            }
            throw err;
        });

    return replay.status(201).send();
};