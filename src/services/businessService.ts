import * as businessRepository from '../repositories/businessRepository.js';

export async function findBusinessById(id: number) {
  const business = await businessRepository.findById(id);
  if (!business) throw {type: "not_found", message:"Business not found"};

  return business;
}