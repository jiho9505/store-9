import constant from '../utils/constant';
import request from 'supertest';
import { app } from '../../app';

const server = request.agent(app);
const AUTH_ROOT = '/api/auth';
const SAMPLE_ID = 'user123';
const SAMPLE_PWD = '123456';
const WRONG_PWD = '1234';

describe('Auth test', () => {
  describe('login', () => {
    it('auth check without login', async () => {
      const res = await server.get(`${AUTH_ROOT}/check`).expect(403);

      expect(res.ok).toBe(false);
    });

    it('wrong login', async () => {
      const loginRes = await server
        .post(`${AUTH_ROOT}/login`)
        .send({ id: SAMPLE_ID, password: WRONG_PWD })
        .expect(constant.STATUS_AUTH_FAILURE);

      expect(loginRes.body.ok).toBe(false);
      expect(loginRes.body.message).toBe(constant.WRONG_INFO);

      const checkRes = await server.get(`${AUTH_ROOT}/check`).expect(constant.STATUS_NO_AUTHORIZED);

      expect(checkRes.body.ok).toBe(false);
      expect(checkRes.body.message).toBe(constant.LOGIN_REQUIRED);
    });

    it('auth check after proper login', async () => {
      const loginRes = await server
        .post(`${AUTH_ROOT}/login`)
        .send({ id: SAMPLE_ID, password: SAMPLE_PWD })
        .expect(200);

      expect(loginRes.body.ok).toBe(true);
      expect(loginRes.body.message).toBe(constant.LOGIN_SUCCESS);

      const checkRes = await server.get(`${AUTH_ROOT}/check`).expect(200);

      expect(checkRes.body.ok).toBe(true);
      expect(checkRes.body.message).toBe(constant.USER_AUTHOIRZED);
    });
  });
});
