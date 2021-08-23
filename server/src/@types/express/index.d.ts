import { NextFunction, Request, Response } from 'express';

import { BaseResponseData } from '../../../../shared/dtos/base/response';

interface ParamDictionary {
  [key: string]: string;
}

declare global {
  export interface Res<ResBody = any, Locals extends Record<string, any> = Record<string, any>>
    extends Omit<Response, 'json'> {
    json: (data: BaseResponseData<ResBody>) => void;
  }

  export type RouteHandler<
    ReqParamsAndBody = Record<string, any>,
    ResJson = Record<string, any>
  > = (
    req: Request<ReqParamsAndBody, {}, ReqParamsAndBody, ReqParamsAndBody>,
    res: Res<ResJson>,
    next: NextFunction
  ) => void;

  export type Controller = Record<string, RouteHandler>;
}
