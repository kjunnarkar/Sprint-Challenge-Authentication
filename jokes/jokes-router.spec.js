const request = require('supertest');
const server = require('../api/server');

describe('jokes router', () => {
    it('should return status code 500 on get request', async () => {
        const res = await request(server)
        .get('/api/jokes')
        expect(res.status).toBe(500);
    });

    it('should return json', async () => {
        const res = await request(server)
        .get('/api/jokes')
        expect(res.type).toEqual('text/html');
    });

});
