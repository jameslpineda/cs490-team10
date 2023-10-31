const request = require('supertest');
const app = require('../app'); 
describe('Forgot Password Endpoint', () => {
  it('should send a password reset link for a valid email', async () => {
    const validEmail = 'valid@username.com';

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: validEmail });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password reset link sent successfully to your email.');
  });

  it('should handle invalid email and return an error', async () => {
    const invalidEmail = 'invalidtests';

    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: invalidEmail });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email or email not found.');
  });
});