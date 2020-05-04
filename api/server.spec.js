const server = require('./server');
const request = require('supertest');

describe('server', () => {
    describe('confirm environment', () => {
        it('should be set to testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    });

    describe('GET /', () => {
        it('should return status code 200', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('should return json', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('should return "The Auth Challenge Server is Running"', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ message: 'The Auth Challenge Server is Running' });
        });
    });
});
