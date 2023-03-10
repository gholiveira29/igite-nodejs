import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { registerService } from "@/services/register.service";

export async function registerController(request: FastifyRequest, replay: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    await registerService({
        name,
        email,
        password
    }).then(() => {})
        .catch((err) => {
            return replay.status(409).send();
        });

    return replay.status(201).send();
};