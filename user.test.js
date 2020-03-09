/* eslint-disable no-undef */
// Disabled for test file only
import request from 'supertest';
import server from './server';

describe('All CRUD enpoints', () => {
  /* User creation */

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
        slug: 'florent-capocci',
      }),
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
      }),
    );
  });

  /* User PUT updates */

  it('should PUT update the new user', async () => {
    const beforeUpdate = await request(server)
      .get('/api/v1/users')
      .send({});

    expect(beforeUpdate.statusCode).toEqual(200);

    const { id } = beforeUpdate.body[0];
    const updatePayload = {
      first_name: 'Antoine',
      last_name: 'Piche',
      email: 'antoine-piche@la-releve.com',
      phone: '0630303030',
      last_school: 'Nesaispas',
      study_level: 'BAC +5',
    };

    const res = await request(server)
      .put(`/api/v1/users/${id}`)
      .send(updatePayload);

    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual(expect.objectContaining({}));

    const afterUpdate = await request(server)
      .get(`/api/v1/users/${id}`)
      .send({});

    expect(afterUpdate.statusCode).toEqual(200);
    expect(afterUpdate.body).toEqual(expect.objectContaining({
      first_name: 'Antoine',
      last_name: 'Piche',
      email: 'antoine-piche@la-releve.com',
      last_school: 'Nesaispas',
      study_level: 'BAC +5',
      slug: 'antoine-piche',
      id,
    }));
  });

  it('should fail PUT updating the new user', async () => {
    const beforeUpdate = await request(server)
      .get('/api/v1/users')
      .send({});

    expect(beforeUpdate.statusCode).toEqual(200);

    const { id } = beforeUpdate.body[0];
    const updatePayload = {
      email: 'antoine-piche@la-releve.com',
      phone: '0630303030',
      last_school: 'Nesaispas',
      study_level: 'BAC +5',
    };

    const res = await request(server)
      .put(`/api/v1/users/${id}`)
      .send(updatePayload);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.objectContaining({
      code: 'validation',
      details: [
        '"first_name" is required',
        '"last_name" is required',
      ],
      httpCode: 400,
    }));
  });

  /* User PATCH updates */

  it('should PATCH update the new user', async () => {
    const beforeUpdate = await request(server)
      .get('/api/v1/users')
      .send({});

    expect(beforeUpdate.statusCode).toEqual(200);

    const { id } = beforeUpdate.body[0];
    const updatePayload = {
      first_name: 'Baptiste',
      last_name: 'Tiers',
    };

    const res = await request(server)
      .patch(`/api/v1/users/${id}`)
      .send(updatePayload);

    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual(expect.objectContaining({}));

    const afterUpdate = await request(server)
      .get(`/api/v1/users/${id}`)
      .send({});

    expect(afterUpdate.statusCode).toEqual(200);
    expect(afterUpdate.body).toEqual(expect.objectContaining({
      ...beforeUpdate.body[0],
      slug: 'baptiste-tiers',
      first_name: 'Baptiste',
      last_name: 'Tiers',
    }));
  });
});
