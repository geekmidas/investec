export interface AddressType {
  code: string;
  name: string;
}
  
export interface Address {
  id: string;
  type: AddressType;
  addressLineDetail: Record<string, string>;
  provinceOrState: AddressType,
  cityOrTown: string;
  country: AddressType;
  postalCode: string;
  lastUpdated: string;
}