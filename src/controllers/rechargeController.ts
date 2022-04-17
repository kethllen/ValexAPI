import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import * as rechargeService from '../services/rechargeService.js';

export async function createRecharge(req: Request, res: Response) {
	const recharge= req.body;
  const card = await cardService.findCardById(recharge.cardId);
	cardService.validateExpirationDate(card.expirationDate);

	await rechargeService.insertRecharge(recharge);

	res.sendStatus(201);
}