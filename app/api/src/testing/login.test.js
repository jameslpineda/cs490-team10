const request = require('supertest');
const app = require('../app');

describe('User Login Endpoint', () => {
  it('should login a user with valid credentials', async () => {
    const validCredentials = {
      username: 'username',
      password: 'validpassword',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(validCredentials);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should handle invalid credentials and return an error', async () => {
    const invalidCredentials = {
      username: 'user',
      password: 'wrongpassword',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(invalidCredentials);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid username or password');
  });
});
