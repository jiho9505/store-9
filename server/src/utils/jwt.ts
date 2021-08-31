import jwt from 'jsonwebtoken';
import env from '../../config/env';

import constant from './constant';
import { JwtSignPayload } from './types';

const key = env.auth.jwtKey;

export default {
  sign: (payload: JwtSignPayload) => {
    const token = jwt.sign(payload, key, {
      expiresIn: '7d',
    });
    return token;
  },
  verify: (token: string) => {
    try {
      const decoded = jwt.verify(token, key);
      return { ok: true, decoded };
    } catch (err) {
      return { ok: false, err: constant.EXPIRE_MESSAGE };
    }
  },
};
