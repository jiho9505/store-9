import constant from '../utils/constant';
import request from 'supertest';
import { app } from '../../app';

// given
const server = request.agent(app);
const AUTH_ROOT = '/api/auth';
const SAMPLE_ID = 'user123';
const SAMPLE_PWD = '123456';
const WRONG_PWD = '1234';

describe('Auth test', () => {
  describe('로그인 테스트', () => {
    it('로그인 전 로그인 체크, 실패 사인 false를 받아야한다.', async () => {
      // when
      const res = await server.get(`${AUTH_ROOT}/check`).expect(403);

      // then
      expect(res.ok).toBe(false);
    });

    it('로그인 정보 틀린후, 로그인 체크시 실패 사인 false와 함께 로그인이 필요하다는 메시지가 필요하다.', async () => {
      // when
      const loginRes = await server
        .post(`${AUTH_ROOT}/login`)
        .send({ id: SAMPLE_ID, password: WRONG_PWD })
        .expect(constant.STATUS_AUTH_FAILURE);

      // then
      expect(loginRes.body.ok).toBe(false);
      expect(loginRes.body.message).toBe(constant.WRONG_INFO);

      // when
      const checkRes = await server.get(`${AUTH_ROOT}/check`).expect(constant.STATUS_NO_AUTHORIZED);

      // then
      expect(checkRes.body.ok).toBe(false);
      expect(checkRes.body.message).toBe(constant.LOGIN_REQUIRED);
    });

    it('로그인 올바르게 된 후 ', async () => {
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
