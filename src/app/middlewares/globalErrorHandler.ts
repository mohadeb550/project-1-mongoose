import { NextFunction, Request, Response } from "express";


// global error handler which always has 4 parameter 

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction)=> {

    const statusCode = 500;
    const message = error.message || 'something went wrong';
  
    return res.status(statusCode).json({
      "success" : false,
      message,
      error
    })
  }

  export default globalErrorHandler;