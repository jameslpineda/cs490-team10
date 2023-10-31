const request = require('supertest');
const app = require('../app'); // Your server setup file

describe('Verification Email Endpoint Tests', () => {
  it('sends a verification email with valid email', async () => {
    const response = await request(app)
      .post('/sendVerificationEmail')
      .send({ email: 'valid@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Verification email sent successfully');
  });

  it('responds with an error for invalid email', async () => {
    const response = await request(app)
      .post('/sendVerificationEmail')
      .send({ email: 'invalidemail' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email');
  });
});