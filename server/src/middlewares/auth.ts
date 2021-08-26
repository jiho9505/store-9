import { Request, Response, NextFunction, MiddlewareResponse } from 'express';
import { getCustomRepository } from 'typeorm';
import dotenv from 'dotenv';

import { UserRepository } from '../repositories/UserRepositiory';
import jwt from '../utils/jwt';
import constant from '../utils/constant';
import { getAccessToken } from '../utils/auth';
import { api } from '../api';
import { JwtSignPayload } from 'src/utils/types';
import { env } from '../config/env';

dotenv.config();

type JwtVerifyResult = {
  ok: boolean;
  decoded?: JwtSignPayload;
  err?: string;
};

const AuthMiddleware = {
  checkLogin: async (req: Request, res: MiddlewareResponse, next: NextFunction) => {
    try {
      const { AUTH_TOKEN: token } = req.signedCookies;

      if (!token) {
        res
          .status(constant.STATUS_NO_AUTHORIZED)
          .json({ ok: false, message: constant.LOGIN_REQUIRED });
        return;
      }

      const { ok, decoded, err }: JwtVerifyResult = jwt.verify(token);
      if (!ok) {
        res.status(constant.STATUS_NO_AUTHORIZED).json({ ok: false, message: err });
        return;
      }

      const userRepository = getCustomRepository(UserRepository);
      const result = await userRepository.checkUserExist(decoded.login_id);
      if (!result) {
        res
          .status(constant.STATUS_NO_AUTHORIZED)
          .json({ ok: false, message: constant.NOT_VALID_TOKEN });
        return;
      }
      res.locals.user = decoded;

      next();
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, message: err.message });
    }
  },
  githubAuthInitialRequest: async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;

    const loginPrivate = {
      client_id: env.github.clientId,
      client_secret: env.github.clientSecret,
      code,
    };
    const tokenPostOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginPrivate),
    };
    try {
      const token = await api.requestText(constant.GET_TOKEN_URL, tokenPostOptions);
      const accessToken: string = getAccessToken(token);
      const userInfo = await api.requestJson(constant.GET_USER_INFO_URL, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const authObj = {
        login_id: userInfo.login,
        accessToken,
      };
      res.locals.githubUser = authObj;
      next();
    } catch (err) {
      console.log(err.message);
      // next(err.message);
    }
  },
  checkAdmin: () => {},
};

export default AuthMiddleware;
