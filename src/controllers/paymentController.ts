import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import * as paymentService from '../services/paymentService.js';
import * as businessService from '../services/businessService.js';

export async function createPayment(req: Request, res: Response) {
	const payment = req.body;

	const card = await cardService.findCardById(payment.cardId);
	cardService.validateExpirationDate(card.expirationDate);
	cardService.activeCard(card.password);
	paymentService.validPassword(payment.password, card.password);

	const business = await businessService.findBusinessById(payment.businessId);
	paymentService.validCardType(card.type, business.type);
  
	const balance  = await cardService.balanceCard(card.id);
  paymentService.validCardBalance(balance.balance, payment.amount);

	paymentService.createCardPayment(payment);

	res.sendStatus(201);
}