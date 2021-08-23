import jwt from 'jsonwebtoken';

import constant from './constant';
import { JwtSignPayload } from './types';

const key = process.env.JWT_KEY;

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
