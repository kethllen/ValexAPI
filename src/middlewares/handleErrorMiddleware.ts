import {NextFunction, Request, Response } from "express";

export default function handleErrorMiddleware(error, req: Request, res: Response, next: NextFunction){
 
  if (error.type === "bad_request") return res.sendStatus(400).send(error.message);
  if (error.type === "unauthorized") return res.sendStatus(401).send(error.message);
  if (error.type === "not_found") return res.sendStatus(404).send(error.message);
  if (error.type === "conflict") return res.sendStatus(409).send(error.message);
  if (error.type === "unprocessable_entity") return res.sendStatus(422).send(error.message);
  console.log(error);
  res.sendStatus(500);
}