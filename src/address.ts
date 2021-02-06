import data from './addresses.json';
import { Address, AddressType } from './types';
import { validateAddress } from './validations';
/**
 * Creates the address line in the order of their keys
 *
 * @param addressLineDetail 
 */
function getLineAddress(addressLineDetail: Record<string, string>){
  const keys = Object.keys(addressLineDetail);
  const sortedKeys = keys.sort((a, b) => {
    if (a == b) {
      return 0;
    }

    return a > b ? 1 : -1;
  })

  return sortedKeys.reduce((memo, key) => {
    const line = addressLineDetail[key].trim();
    return line ? `${memo},${line}` : memo;
  }, '')
}
/**
 * 
 * @param address 
 */
function getAddressType(address: Address): Record<string, string> {
  const types: (keyof Address)[] = ['type', 'provinceOrState', 'country'];

  return types.reduce((memo, key) => {
    const addressType = address[key] as AddressType;
    if(!addressType) {
      return memo
    }
    return {
      ...memo,
      [key]: addressType.name
    }
  }, {})
}
/**
 * Prints the supplied address if it is valid
 *
 * @param address 
 */
function prettyPrintAddress(address: Address) {
  const isAddress = validateAddress(address);

  if(!isAddress){
    return;
  }
  const lineAddress = getLineAddress(address.addressLineDetail);
  const { cityOrTown, postalCode } = address;
  const { type, provinceOrState, country} = getAddressType(address)

  console.log(`${type}: ${lineAddress} - ${cityOrTown} - ${provinceOrState} - ${postalCode} - ${country}`)
  
}
/**
 * Prints all the addresses supplied, excluding inValid addresses
 * 
 * @param addresses 
 */
function prettyPrintAddresses(addresses: Address[]) {
  addresses.forEach(prettyPrintAddress)
}

/**
 * Prints all the valid addresses for the supplied type
 * 
 * @param addressType 
 */
export function printAddressType(addressType: string){
  const addresses = data as Address[]
  const subAddresses = addresses.filter((address) => address.type.name === addressType);
  prettyPrintAddresses(subAddresses)
}

/**
 * Validates all the addresses in the file
 */
export function validateAll(){
  const addresses = data as Address[];
  addresses.forEach((address) => {
    console.log(JSON.stringify(address, null, 2));
    const isAddress = validateAddress(address);
    if(isAddress){
      console.log(`√ Address is valid :)`)
    }
  })

}