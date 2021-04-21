import { ErrorRequestHandler, Response } from "express";
import message from "../messages/message.json";

export default class ResponseHelper {
  constructor() {}

  public static sendResponse(
    res: Response,
    data: any,
    objConfig?: { status: number; msg: string }
  ): void {
    const response = {
      meta: {
        status: objConfig ? objConfig.status : 200,
        message: objConfig ? objConfig.msg : message.apiMessage.success,
      },
      data,
    };
    res.send({ response });
  }

  public static sendError(
    res: Response,
    err: ErrorRequestHandler | string,
    status?: number
  ): void {
    let resStatus;
    let resMsg;
    switch (status) {
      case 401:
        resStatus = 401;
        resMsg = message.apiMessage.status_401;
        break;
      case 403:
        resStatus = 403;
        resMsg = message.apiMessage.status_403;
        break;
      case 404:
        resStatus = 404;
        resMsg = message.apiMessage.status_404;
        break;
      case 405:
        resStatus = 405;
        resMsg = message.apiMessage.status_405;
        break;
      default:
        resStatus = 400;
        resMsg = message.apiMessage.status_400;
    }
    const response = {
      meta: {
        status: resStatus,
        message: resMsg,
      },
      error: err,
    };
    res.send({ response });
  }
}
