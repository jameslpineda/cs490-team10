const request = require('supertest');
const app = require('../app'); 

describe('User Signup Endpoint Tests', () => {
  it('creates a new user with valid data', async () => {
    const userData = {
      username: 'newUser',
      email: 'newuser@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/signup')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toEqual(expect.objectContaining(userData));
  });

  it('responds with an error for an existing user', async () => {
    const existingUserData = {
      username: 'existingUser',
      email: 'existinguser@example.com',
      password: 'password456',
    };

    // Create an existing user in the simulated database
    users.push(existingUserData);

    const response = await request(app)
      .post('/api/signup')
      .send(existingUserData);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User already exists');
  });
});
