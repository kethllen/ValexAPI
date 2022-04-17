import {NextFunction, Request, Response } from "express";

export default function validSchema(schema) {
  return function (req : Request, res : Response, next : NextFunction) {
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw {type : "unprocessable_entity", message : "invalid data"}
    }
    next();
  }
}