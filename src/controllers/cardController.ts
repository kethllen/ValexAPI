import { Request, Response } from 'express';
import * as employeeService from "../services/employeeService.js";
import * as cardService from '../services/cardService.js';
import { CardInsertData, Card } from '../repositories/cardRepository.js';
import { Employee } from '../repositories/employeeRepository.js';

export async function createCard(req: Request, res: Response) {
	const { employeeId, type } = req.body;

	const employee : Employee = await employeeService.employeeValidation(employeeId);
	const cardholderName : string = employeeService.generateNameOnTheCard(employee.fullName);
	const expirationDate : string = cardService.generateExpirationDate();
  const number : string = cardService.generateCardNumber();
  const securityCode : string = cardService.generateCardCVV();

	const newCard : CardInsertData = {
		employeeId,
		number,
		cardholderName,
		securityCode,
		expirationDate,
		password: null,
		isVirtual: false,
		originalCardId: null,
		isBlocked: false,
		type
	};

	await cardService.cardByTypeAndEmployeeId(type, employeeId);
	await cardService.createNewCard(newCard);

	res.sendStatus(201);
}
export async function activateCard(req: Request, res: Response){
  const {cardId} = req.params;
  const { cvv, password } = req.body;

  const card : Card = await cardService.findCardById(parseInt(cardId));
  cardService.validateExpirationDate(card.expirationDate);
  cardService.isActivatedCard(card.password)
  cardService.isValidaCVV(cvv, card.securityCode);
	const passwordHash : string = cardService.cardPasswordHash(password);

	await cardService.activeCard(parseInt(cardId), {
		...card,
		password: passwordHash
	});

	res.sendStatus(200);
}

export async function balanceCard(req: Request, res: Response) {
	const {cardId} = req.params;

	const card : Card = await cardService.findCardById(parseInt(cardId));
	const transactions  = await cardService.paymentsCard(card.id);
	const recharges = await cardService.rechargesCard(card.id);
	const balance : number = cardService.balanceCard(transactions, recharges);

	res.status(200).send({
		balance,
		transactions,
		recharges
	});
}