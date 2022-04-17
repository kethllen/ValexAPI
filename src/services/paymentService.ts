import * as paymentRepository from '../repositories/paymentRepository.js'
import bcrypt from 'bcrypt';

export function validPassword(password: string, searchedCardPassword: string) {
	const isPassword = bcrypt.compareSync(password, searchedCardPassword);
	if (!isPassword) throw {type : "unauthorized" , message :"invalid password"}
}

export function validCardType(searchedCardType: string, searchedBusinessType: string) {
	if (searchedCardType !== searchedBusinessType)
		throw {type : "bad_request" , message :"cardType and businessType must be identical"}
}

export function validCardBalance(balance: number, paymentAmount: number) {
	if (balance < paymentAmount)
		throw {type : "bad_request" , message :"insufficient balance to make the purchase"}
}

export async function createCardPayment(payment) {
  await paymentRepository.insert(payment);
}