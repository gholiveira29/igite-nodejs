import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from '@/services/error/invalidCredentialsError';
import { MakeAuthenticateService } from '@/services/factories/make-authenticateService';

export async function authenticateController(request: FastifyRequest, replay: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);
    const authenticateService = MakeAuthenticateService();

    await authenticateService.execute({
        email,
        password
    }).then(() => { })
        .catch((err) => {
            if (err instanceof InvalidCredentialsError) {
                return replay.status(400).send();
            }
            throw err;
        });

    return replay.status(200).send();
};