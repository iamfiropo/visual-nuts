/**
 * @param {number} n
 * @return {string[]}
 * 
 
 Approach: String Concatenation

 Time Complexity: O(n)
 Space Complexity: O(n)
 */

function visualNuts(num) {
  if (typeof num !== 'number' ) return 'Please provide a number type'
  
  let result = [];

  for (i = 1; i <= num; ++i) {
    divisibleBy3 = i % 3 === 0;
    divisibleBy5 = i % 5 === 0;

    str = "";

    if (divisibleBy3) {
      str += "Visual";
    } else if (divisibleBy5) {
      str += "Nuts";
    } else {
      str += i;
    }

    result.push(str);
  }

  return result;
}

console.log(visualNuts(100));