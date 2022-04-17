import * as employeeRepository from '../repositories/employeeRepository.js';

export async function employeeValidation(employeeId: number) {

	const employee = await employeeRepository.findById(employeeId);
	if (!employee) throw {type: "not_found"};

	return employee;
}
export function generateNameOnTheCard(employeeFullName: string) {

	const employeeNameArray = employeeFullName
		.split(' ')
		.filter((name) => name.length >= 3);

  let cont =0;
  const nameOnTheCardArray =  employeeNameArray.map(name=> {
    if(cont === 0 || cont === employeeNameArray.length -1){
        cont++;
         return name;
    }else{
        cont++;
        return name[0];
       
    }
  }); 

	return (nameOnTheCardArray.join(' ')).toUpperCase();
}