import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from '@/services/error/user-already-exists-error';
import { MakeRegisterService } from '@/services/factories/make-registerService';

export async function registerController(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);
    const registerService = MakeRegisterService();

    await registerService.execute({
        name,
        email,
        password
    }).then(() => { })
        .catch((err) => {
            if (err instanceof UserAlreadyExistsError) {
                return replay.status(409).send();
            }
            throw err;
        });

    return replay.status(201).send();
};