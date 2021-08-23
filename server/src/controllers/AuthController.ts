import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories/user_repositiory';
import AuthRequest from '../../../shared/dtos/auth/request';
import jwt from '../utils/jwt';
import constant from '../utils/constant';
import { getJwtPayload, getUserObj, signUpDataValidationCheck } from '../utils/auth';
import { api } from '../api';
import { passwordUtils } from '../utils/password';

const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const { id: login_id, password }: AuthRequest.Login = req.body;
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.checkUserExist(login_id);
      // TODO 가입 여부 확인 미들웨어로 분리
      if (!user || !passwordUtils.compare(password, user.password)) {
        // TODO 이런 에러 처리 대신 에러 객체 만들어서 next
        res.status(constant.STATUS_AUTH_FAILURE).json({ ok: false, message: constant.WRONG_INFO });
        return;
      }
      const jwtPayload = getJwtPayload(user);
      const token = jwt.sign(jwtPayload);

      const cookieOptions = {
        httpOnly: true,
        signed: true,
        maxAge: constant.MILLISECONDS_OF_SEVEN_DAYS,
      };
      res.cookie(constant.AUTH_TOKEN_NAME, token, cookieOptions);
      res.json({ ok: true, message: constant.LOGIN_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, message: err.message });
    }
  },
  signup: async (req: Request, res: Response) => {
    const userInfo = req.body;
    const accessToken = req.signedCookies[constant.ACCESS_TOKEN_NAME];
    const userObj = getUserObj(userInfo);
    try {
      if (accessToken) {
        const gUserInfo = await api.requestJson(constant.GET_USER_INFO_URL, {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        userObj.password = passwordUtils.getRandomPwd(userObj.login_id);
        userObj.confirmPassword = userObj.password;
        res.clearCookie(constant.ACCESS_TOKEN_NAME);
      }
      if (!signUpDataValidationCheck(userObj)) {
        res
          .status(constant.STATUS_INVALID_DATA)
          .json({ ok: false, message: constant.USER_INFO_INVALID });
        return;
      }

      delete userObj['confirmPassword'];
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.checkUserExist(userInfo.id);
      if (user) {
        res
          .status(constant.STATUS_CONFLICT)
          .json({ ok: false, message: constant.USER_EXIST_ALREADY });
        return;
      }
      userObj.password = await passwordUtils.hash(userObj.password);
      const _ = await userRepository.createUser(userObj);

      res.json({ ok: true, message: constant.SIGN_UP_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, message: err.message });
    }
  },
  githubLogin: async (req: Request, res: Response) => {
    const { login_id, accessToken } = res.locals.githubUser;
    const userRepository = getCustomRepository(UserRepository);
    try {
      const user = await userRepository.checkUserExist(login_id);
      if (!user) {
        res.cookie(constant.ACCESS_TOKEN_NAME, accessToken, { httpOnly: true, signed: true });
        res.json({ ok: true, id: login_id, isNotJoined: true, message: constant.GO_SIGNUP_PAGE });
        return;
      }
      const jwtPayload = getJwtPayload(user);
      const token = jwt.sign(jwtPayload);

      const cookieOptions = {
        httpOnly: true,
        signed: true,
        maxAge: constant.MILLISECONDS_OF_SEVEN_DAYS,
      };
      res.cookie(constant.AUTH_TOKEN_NAME, token, cookieOptions);
      res.json({ ok: true, message: constant.LOGIN_SUCCESS });
    } catch (err) {
      res.status(constant.STATUS_SERVER_ERROR).json({ ok: false, message: err.message });
    }
  },
  logout: (req: Request, res: Response) => {
    res.clearCookie(constant.AUTH_TOKEN_NAME);
    res.json({ ok: true, message: constant.LOGOUT_SUCCESS });
  },
};

export default AuthController;
