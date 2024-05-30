import { NextApiResponse } from "next"

export const successResponse = (res: NextApiResponse, statusCode = 200, data: any): void => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

export const errorResponse = (res: NextApiResponse, error: string, statusCode = 500): void => {
  res.status(statusCode).json({
    status: 'error',
    message: error,
  });
};