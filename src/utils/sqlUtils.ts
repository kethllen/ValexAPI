import {NextFunction, Request, Response } from "express";

export function mapObjectToUpdateQuery({ object, offset = 1 }) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}
export function errors(error, req: Request, res: Response, next: NextFunction){
  console.log(error);
  if (error.response) {
    return res.sendStatus(error.response.status);
  }

  res.sendStatus(500);
}