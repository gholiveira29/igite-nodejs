import fastify from 'fastify';
import { knex } from './database';

const app = fastify();

app.get('/hello', () => {
    const teste = knex('sqlite_schema').select('*')
    return teste
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server ok!!');
})
