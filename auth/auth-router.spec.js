const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');


beforeEach(async () => {
    await db('users').truncate();
});

describe('register', () => {
    it('should return status code 201 created', async () => {
        const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'KJ', password: 'pswd' });
        expect(res.status).toBe(201);
    });
    
    it('should confirm username went into DB', async () => {
        const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'KJ', password: 'pswd' });
        expect({ username: 'KJ' });
    });
});


describe('login', () => {
    it('should confirm status code 200 on login', async () => {
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'KJ', password: 'pswd' })
            .then(res => {
                return request(server)
                    .post('/api/auth/login')
                    .send({ username: 'KJ', password: 'pswd' })
                    .then(res => {
                        expect(res.status).toBe(200);
                    })
            })
    })

    it('should return a token on login', async () => {
        return request(server)
            .post('/api/auth/register')
            .send({ username: 'KJ', password: 'pswd' })
            .then(res => {
                return request(server)
                    .post('/api/auth/login')
                    .send({ username: 'KJ', password: 'pswd' })
                    .then(res => {
                        expect(res.body.token);
                    })
            })
    })
})
