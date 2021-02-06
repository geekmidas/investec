import { Address } from './types';

type Validator = (address: Address) => boolean;
/**
 * Validates that a postal code is numeric
 * 
 * @param postalCode 
 */
function validatePostalCode(postalCode: string | number){
  const code = postalCode.toString()
  const isNumber = /^\d+$/.test(code);
  if(!isNumber){
    console.log(`${postalCode} is not a valid postal code`)
  }

  return isNumber
  }
/**
 * Validates that the address detail on an address is not blank
 * 
 * @param addressLineDetail 
 */
function validateAddressDetails(addressLineDetail: Record<string, string>){
  if(!addressLineDetail){
    console.log('AddressLineDetail Should be defined')
    return;
  }
  const keys = Object.keys(addressLineDetail);
  const n = keys.length;
  for(let i = 0; i < n; i++) {
    const key = keys[i]
    const line = addressLineDetail[key];
    if(line && line.trim()){
      return true
    }
  }
  console.log('Address details cannot be null or empty')
  return false;
}
/**
 * Validates that the supplied address is a valid South African
 * address
 * 
 * @param address 
 */
function isSouthAfricanAddress(address: Address){
  const { provinceOrState } = address;
  if(!provinceOrState){
    console.log('Province has to be defined on a South African address')
    return false
  }

  const { code, name } = provinceOrState;
  const isValid = !!(code && name);
  if(!isValid){
    console.log('Name and code have to be defined on a province')
  }

  return isValid;
}

/**
 * Custom validation functions for countries based on their country codes
 */
const countryValidators: Record<string, Validator> = {
  ZA: isSouthAfricanAddress
}
/**
 * Validates the country on an address and extra country validations where
 * applicable
 * 
 * @param address 
 */
function validateCountry(address: Address){
  const { country } = address;
  if(!country){
    console.log('Country should be defined')
    return false;
  }
  const { code, name } = country;
  const isValid =  code && name;
  if(!isValid){
    console.log('Name and code have to be defined on the country')
    return false;
  }

  const validator = countryValidators[code];

  return validator ? validator(address) : true;
}
/**
 * Runs all relevant validations on an address
 * 
 * @param address 
 */
export function validateAddress(address: Address) {
  const { postalCode, addressLineDetail } = address;
  const isPostalCode = validatePostalCode(postalCode);
  const isAddressLine = validateAddressDetails(addressLineDetail);
  const isValidCountryAddress = validateCountry(address);

  return isPostalCode && isAddressLine && isValidCountryAddress
}