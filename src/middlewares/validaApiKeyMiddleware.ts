import { NextFunction, Request, Response } from 'express';
import * as companyService from "../services/companyService.js" ;

export default async function validateApiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
	const xApiKey = (req.headers['x-api-key']).toString();

	const company = await companyService.validateApiKey(xApiKey);

	res.locals.company = company;

	next();
}