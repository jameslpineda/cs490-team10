import request from 'supertest';
import app from '../src/app';
import { v4 as uuidv4 } from 'uuid';

describe('Test API Endpoints', () => {

  it('POST /user/sign-up should send 422 if invalid email/password provided', async () => {
    const userData = {
      email: '',
      password: '',
    };

    const response = await request(app)
      .post('/user/sign-up')
      .expect(422)
      .send(userData);
  });

  it('POST /user/sign-in should send 422 if invalid email/password provided', async () => {
    const credentials = {
      email: '',
      password: '',
    };

    const response = await request(app)
      .post('/user/sign-in')
      .expect(422)
      .send(credentials);
  });

  it('Non-existent endpoint should return 404', async () => {
    const response = await request(app).get('/api/nonexistent');

    expect(response.status).toBe(404);
  });
});
