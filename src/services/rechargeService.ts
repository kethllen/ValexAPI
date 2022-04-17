import * as rechargeRepository from '../repositories/rechargeRepository.js';

export async function insertRecharge(recharge) {

	await rechargeRepository.insert(recharge);
}