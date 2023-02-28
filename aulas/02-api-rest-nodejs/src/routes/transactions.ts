import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { knex } from "../database";
import { randomUUID } from 'node:crypto';

export const transactionsRoutes = async (app: FastifyInstance) => {

    app.get('/', async () => {
        const transactions = await knex('transactions').select();
        return {
            transactions
        }
    });

    app.post('/', async (req, res) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        });
        const { title, amount, type } = createTransactionBodySchema.parse(req.body);
        knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        });
        return res.status(201).send(JSON.stringify({ message: 'Transaction created sucesso!!' }));
    });
}
