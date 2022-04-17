import * as companyRepository from "../repositories/companyRepository.js";

export async function validateApiKey(xApiKey: string) {
  const company = await companyRepository.findByApiKey(xApiKey);
  if(!company) throw { type: "unauthorized", message : "invalid api key"}

  return company;
}