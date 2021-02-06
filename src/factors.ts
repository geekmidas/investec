/**
 * Finds the greatest common factor of n and m
 * 
 * @param n 
 * @param m 
 */
function gcd(n: number, m: number){
  /**
   * Swap n and m when n > m;
   */
  const [min, max] = n > m ? [m, n] : [n, m];
  /**
   * We only have to go until the minimum of the two, because any number exceeding
   * Will not qualify as a factor
   */
  for(let i = min; i > 1; i--) {
    /**
     * Check if the current number divides both numbers
     */
    if(max % i === 0 && min%i === 0) {
      return i
    }
  }

  return 1
}
/**
 * Finds the common factor of a group of numbers in a list
 * 
 * @param duplicates A list of numbers
 */
function highestCommonFactor(duplicates: number[]) {
  /**
   * Remove any duplicates in the list
   */
  const numberSet = new Set(duplicates);
  /**
   * Sort the supplied numbers in ascending order
   */
  const numbers = Array.from(numberSet).sort((a,b) => a - b)
  const n = numbers.length;
  const [x, y] = numbers
  /** When length is zero */
  if(!n) {
    return 'No factors found'
  /** When the list has 1 number */
  } else if(n === 1) {
    return x;
  }
  /** The common factor for the first 2 numbers in the list */
  let factor = gcd(x, y)
  for(let i = 2; i < n; i ++){
    const nextNumber = numbers[i]
    /** Use the previous factor to find the next factor */
    factor = gcd(factor, nextNumber)
  }

  return factor;
}





console.log(highestCommonFactor([12, 9, 15]))