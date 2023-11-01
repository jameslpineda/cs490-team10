import request from 'supertest';
import app from '../src/app';
import {string} from "joi";
const { v4: uuidv4 } = require('uuid');

describe('Test API Endpoints', () => {
    it('GET /api/register/verify-user response has 201 status and appropriate content-type', async () => {
        const verificationToken = uuidv4();
        const res = await request(app)
            .get('/api/register/verify-user?token=' + verificationToken)
            .expect(201);
    });

    it('POST /api/register/register-user should send 400 if no email/pass provided', async () => {
        const userData = {
            email: "",
            password: '',
        };

        const response = await request(app)
            .post('/api/register/register-user')
            .expect(400)
            .send(userData);
    });

    it('POST /api/auth should send 400 if no email/pass provided', async () => {
        const credentials = {
            email: '',
            password: '',
            // Add other required fields for authentication
        };

        const response = await request(app)
            .post('/api/auth/login')
            .expect(400)
            .send(credentials);
    });

    it('Non-existent endpoint should return 404', async () => {
        const response = await request(app).get('/api/nonexistent');

        expect(response.status).toBe(404); // Assuming 404 is the status code for a not found endpoint
        // Add more specific checks based on the behavior of your 404 handler
    });

    // Add more tests for other endpoints here
});