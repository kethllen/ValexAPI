import * as cardRepository from '../repositories/cardRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import { TransactionTypes, CardInsertData, Card} from '../repositories/cardRepository.js';
import * as creditCard from '../utils/cardUtils';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';


export async function cardByTypeAndEmployeeId(type: TransactionTypes, employeeId: number) {
	const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
	if (card) throw {type : "conflict", message : "employee already has a card of this type"}
}

export function generateCardNumber() {
	let number = faker.finance.creditCardNumber('mastercard');
	let isNumber = creditCard.valid_credit_card(number);

	while (number[0].toString() === '6' || !isNumber) {
		number = faker.finance.creditCardNumber('mastercard');
		isNumber = creditCard.valid_credit_card(number);

		if (number[0].toString() === '5' && isNumber) {
			break;
		}
	}

	if (number[0].toString() === '5') {
		while (!isNumber) {
			isNumber = creditCard.valid_credit_card(number);
		}
	}

	return number.split('-').join('');
}

export function generateCardCVV() {
	const cvv = faker.finance.creditCardCVV();

	return bcrypt.hashSync(cvv, 10);
}
export function generateExpirationDate() {
	return dayjs().add(5, 'year').format('MM/YY');
}

export async function createNewCard(newCard : CardInsertData) {
	await cardRepository.insert(newCard);
}

export async function findCardById(cardId : number){

  const card =  await cardRepository.findById(cardId);

  if(!card) throw {type: "not_found", message:"card not found"};

  return card;
  
}
export function validateExpirationDate(expirationDate : string){
  if (dayjs().format('MM/YY') > expirationDate) throw {type:"bad_request", message:"expired card"}
}
export function activatedCard(password: string) {
	if (password) throw {type:"bad_request", message:"activated card"}
}

export function activeCard(password: string) {
	if (!password) throw {type:"bad_request", message:'Card Not Activated'}
}


export function validaCVV(cvv: string, securityCode: string) {
	const isCVV = bcrypt.compareSync(cvv, securityCode);
	if (!isCVV) throw {type:"unauthorized", message:"cvv incorrect"}
}

export function cardPasswordHash(password: string) {
	const passwordHash = bcrypt.hashSync(password, 10);

	return passwordHash;
}

export async function activateCard(cardId: number, activatedCard: Card) {
	await cardRepository.update(cardId, activatedCard);
}

export async function paymentsCard(id: number) {
	const payments = await paymentRepository.findByCardId(id);
	if (!payments) throw {type: "not_found", message:"card not found"};

	const transactions = payments.map(payment => ({
		...payment,
		timestamp: dayjs(payment.timestamp).format('DD/MM/YYYY')
	}));

	return transactions;
}

export async function rechargesCard(id: number) {
	const isRecharges = await rechargeRepository.findByCardId(id);
	if (!isRecharges) throw {type: "not_found", message:"card not found"};

	const recharges = isRecharges.map(recharge => ({
		...recharge,
		timestamp: dayjs(recharge.timestamp).format('DD/MM/YYYY')
	}));

	return recharges;
}

export async function balanceCard(id: number) {
	const transactions  = await paymentsCard(id);
	const recharges = await rechargesCard(id);
	let totalRecharges = 0;
	if (recharges.length > 0) {
		recharges.map(recharge => (totalRecharges += recharge.amount));
	}
  let totalPayments = 0;
	if (transactions.length > 0) {
    transactions.map(payment => (totalPayments += payment.amount));
	}
	const balance = totalRecharges - totalPayments;

	return {
		balance,
		transactions,
		recharges
	}
}