import request from 'supertest';
import server from './server';

describe('All CRUD enpoints', () => {
  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/v1/users')
      .send({
        first_name: 'Florent',
        last_name: 'Capocci',
        email: 'florent-capocci@la-releve.com',
        phone: '0630303030',
        last_school: '42',
        study_level: 'BAC +3',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        first_name: 'Florent',
        last_name: 'Capocci',
        email: 'florent-capocci@la-releve.com',
        last_school: '42',
        study_level: 'BAC +3',
      })
    );
  });

  it('should fail creating a new user', async () => {
    const res = await request(server)
      .post('/api/v1/users')
      .send({
        last_name: 'Capocci',
        email: 'florent-capocci@la-releve.com',
        phone: '0630303030',
        last_school: '42',
        study_level: 'BAC +3',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 'validation',
        httpCode: 400,
        details: ['"first_name" is required'],
      })
    );
  });
});
